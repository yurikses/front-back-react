// types/imageSearch.ts
export interface GoogleImage {
  link: string;
  title: string;
  image: {
    contextLink: string;
    thumbnailLink: string;
    width: number;
    height: number;
  };
}

export interface GoogleSearchResponse {
  items?: GoogleImage[];
  searchInformation: {
    totalResults: string;
  };
  error?: {
    code: number;
    message: string;
  };
}

export interface SearchParams {
  query: string;
  num?: number; // количество результатов (max 10 для бесплатного плана)
}