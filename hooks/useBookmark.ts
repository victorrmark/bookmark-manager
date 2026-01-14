'use client';

import { useQuery, useMutation } from "@tanstack/react-query";
import type { Bookmark } from "@/types/bookmark";


export function useBookmark() {
  return useQuery<Bookmark[]>({
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

// export function useCreateBookmark() {
//   return useMutation({
//     mutationFn: async (newBookmark: