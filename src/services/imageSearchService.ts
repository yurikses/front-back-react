// services/imageSearchService.ts
import type { GoogleSearchResponse } from '../types/imageSearch';

const API_KEY = 'AIzaSyDPiKkBYyHto4wEi4sY0aTsmzd1jMutkxc';
const SEARCH_ENGINE_ID = 'c55a9d41d89d94b39';
const BASE_URL = 'https://www.googleapis.com/customsearch/v1';

export class GoogleSearchService {
  static async executeSearch(query: string, num: number = 10): Promise<GoogleSearchResponse> {
    const trimmed = query.trim();
    if (!trimmed) {
      return { items: [], searchInformation: { totalResults: '0' } };
    }
    console.log(`Searching for ${trimmed}`)
    const url = new URL(BASE_URL);
    url.searchParams.set('key', API_KEY);
    url.searchParams.set('cx', SEARCH_ENGINE_ID);
    url.searchParams.set('q', trimmed);
    url.searchParams.set('searchType', 'image');
    url.searchParams.set('num', String(Math.min(num, 10)));
    url.searchParams.set('safe', 'medium');

    const response = await fetch(url.toString());

    if (!response.ok) {
      let message = 'Failed to execute search';
      try {
        const data = await response.json() as GoogleSearchResponse;
        if (data.error?.message) {
          message = data.error.message;
        }
      } catch {
        // ignore parse error, оставляем дефолтное сообщение
      }
      throw new Error(message);
    }

    const data = await response.json() as GoogleSearchResponse;

    return {
      items: data.items ?? [],
      searchInformation: data.searchInformation,
      error: data.error,
    };
  }
}