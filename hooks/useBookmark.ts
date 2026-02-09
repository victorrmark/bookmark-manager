"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Bookmark } from "@/types/bookmark";
import type { BookmarkFormData } from "@/types/bookmark-data";

interface EditBookmarkData extends BookmarkFormData { 
  bookmark_id: string
}

export function useBookmark(userId: string | undefined) {
  return useQuery<Bookmark[]>({
    queryKey: ["bookmark", "active", userId],
    queryFn: async () => {
      const response = await fetch(`/api/bookmarks/get`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!userId,
  });
}

export function useArchives() {
  return useQuery<Bookmark[]>({
    queryKey: ["bookmark", "archived"],
    queryFn: async () => {
      const response = await fetch(`/api/archives`);
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
      const response = await fetch(`/api/bookmarks/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => null);
        throw new Error(
          error?.error || `Request failed with ${response.status}`,
        );
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmark"] });
    },
  });
}

export function usePinBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/bookmarks/${id}/pin`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookmark_id: id }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok`);
      }

      return response.json();
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["bookmark"] });
      const previousData = queryClient.getQueryData(["bookmark"]);

      queryClient.setQueryData(["bookmark"], (oldData: Bookmark[]) =>
        oldData?.map((data) =>
          data.id === id ? { ...data, is_pinned: !data.is_pinned } : data,
        ),
      );

      return {previousData}
    },
    onError: (_err, _id, context) => {
      queryClient.setQueryData(["bookmark"], context?.previousData)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmark"] });
    },
  });
}


export function useArchiveBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/bookmarks/${id}/archive`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookmark_id: id }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => null);
        throw new Error(
          error?.error || `Request failed with ${response.status}`,
        );
      }
      return response.json();
    },
    
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmark"] });
    },
  });
}

export function useDeleteBookmark() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/archives/${id}/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookmark_id: id }),
      });
      if (!response.ok) {
        const error = await response.json().catch(() => null);
        throw new Error(
          error?.error || `Request failed with ${response.status}`,
        );
      }
      return response.json();
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["bookmark"] });
      const previousData = queryClient.getQueryData(["bookmark"]);

      queryClient.setQueryData(["bookmark"], (oldData: Bookmark[]) =>
        oldData?.filter((data) => data.id !== id),
      );

      return {previousData}
    },
    onError: (_err, _id, context) => {
      queryClient.setQueryData(["bookmark"], context?.previousData)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmark"] });
    },
  });
}

export function useMarkVisitedBookmark() {
  const queryClient = useQueryClient();
  const last_visited = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/bookmarks/${id}/visit`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookmark_id: id }),
      });
      if (!response.ok) {
        const error = await response.json().catch(() => null);
        throw new Error(
          error?.error || `Request failed with ${response.status}`,
        );
      }
      return response.json();
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["bookmark"] });
      const previousData = queryClient.getQueryData(["bookmark"]);

      queryClient.setQueryData(["bookmark"], (oldData: Bookmark[]) =>
        oldData?.map((data) => 
          data.id == id
            ? { ...data, visit_count: data.visit_count + 1, last_visited }
            : data
        ),
      );

      return {previousData}
    },
    onError: (_err, _id, context) => {
      queryClient.setQueryData(["bookmark"], context?.previousData)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmark"] });
    },
  });
}

export function useEditBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: EditBookmarkData) => {
      const response = await fetch(`/api/bookmarks/${data.bookmark_id}/edit`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => null);
        throw new Error(
          error?.error || `Request failed with ${response.status}`,
        );
      }
      return response.json();
    },
    
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmark"] });
    },
  });
}