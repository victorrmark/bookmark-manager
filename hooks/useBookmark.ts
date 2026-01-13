'use client';

import { useQuery } from "@tanstack/react-query";


export function useBookmark() {
  return useQuery({
    queryKey: ["bookmark"],
    queryFn: async () => {
      const response = await fetch(`/api/bookmarks/fetch`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
}