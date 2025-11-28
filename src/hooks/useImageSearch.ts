// hooks/useImageSearch.ts
import { useState, useCallback, useRef, useEffect } from 'react';
import type { GoogleImage } from '../types/imageSearch';
import { GoogleSearchService } from '../services/imageSearchService';

interface UseImageSearchReturn {
  images: GoogleImage[];
  loading: boolean;
  error: string | null;
  searchImages: (query: string) => void;
  hasMore: boolean;
  cancelSearch: () => void;
}

export const useImageSearch = (debounceDelay: number = 500): UseImageSearchReturn => {
  const [images, setImages] = useState<GoogleImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // В браузере таймер — number
  const debounceRef = useRef<number | null>(null);

  const cancelSearch = useCallback(() => {
    if (debounceRef.current !== null) {
      window.clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
    setLoading(false);
  }, []);

  const performSearch = useCallback(async (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) {
      setImages([]);
      setError(null);
      return;
    }

    cancelSearch();
    setLoading(true);
    setError(null);

    try {
      const response = await GoogleSearchService.executeSearch(trimmed, 10);

      if (response.items && response.items.length > 0) {
        setImages(response.items);
      } else {
        setImages([]);
        setError('No images found');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Failed to load images');
      } else {
        setError('Failed to load images');
      }
      setImages([]);
    } finally {
      setLoading(false);
    }
  }, [cancelSearch]);

  const searchImages = useCallback((query: string) => {
    if (debounceRef.current !== null) {
      window.clearTimeout(debounceRef.current);
    }

    if (!query.trim()) {
      cancelSearch();
      setImages([]);
      setError(null);
      return;
    }

    debounceRef.current = window.setTimeout(() => {
      performSearch(query);
      debounceRef.current = null;
    }, debounceDelay);
  }, [performSearch, debounceDelay, cancelSearch]);

  // Чистим таймер при размонтировании
  useEffect(() => {
    return () => {
      if (debounceRef.current !== null) {
        window.clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return {
    images,
    loading,
    error,
    searchImages,
    hasMore: images.length > 0,
    cancelSearch,
  };
};