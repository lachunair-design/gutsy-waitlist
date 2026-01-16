import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

export async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`/api${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  // Check if response is JSON to avoid "Unexpected token A" error
  const contentType = response.headers.get("content-type");
  
  if (!response.ok) {
    if (contentType && contentType.includes("application/json")) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Request failed");
    }
    // If server sends HTML error page, throw a readable string instead
    throw new Error(`Server Error: ${response.status}. Please try again later.`);
  }

  return response.json();
}
