import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createFullUrl(urlWithoutProtocol: string): string {
  // Check if the URL already contains a protocol (http:// or https://)
  if (urlWithoutProtocol.startsWith("http://") || urlWithoutProtocol.startsWith("https://")) {
    return urlWithoutProtocol; // Already a full URL
  } else {
    // Prepend "https://" to create a full URL
    return `https://${urlWithoutProtocol}`;
  }
}
