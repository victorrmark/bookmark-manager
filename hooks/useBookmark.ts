"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Bookmark } from "@/types/bookmark";
import type { BookmarkFormData } from "@/types/bookmark-data";


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
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: BookmarkFormData) => {
      const response = await fetch(`/api/bookmarks/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmark"] });
    }
  });
}
