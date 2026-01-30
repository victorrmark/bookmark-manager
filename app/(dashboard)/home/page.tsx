'use client'
import BookmarkCard from "@/components/layout/bookmarks-card";
import { useBookmark } from "@/hooks/useBookmark";
import { useMemo } from "react";
import { useBookmarkContext } from "../BookmarkContext";


export default function Home() {
  const { data: bookmarks = [] } = useBookmark();
  const { selectedId, searchQuery, sortBy } = useBookmarkContext();

  // console.log("Bookmarks Data:", bookmarks);
  const visibleBookmarks = useMemo(() => {
    let result = bookmarks;



    if (searchQuery) {
      result = result?.filter((bookmark) =>
        bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bookmark.url.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    const pinned = result?.filter((bookmark) => bookmark.is_pinned);
    const unpinned = result?.filter((bookmark) => !bookmark.is_pinned);

    return [...pinned!, ...unpinned!]

    unpinned.sort((a, b) => {
      if (sortBy === "recent") {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      if (sortBy === "lastVisited") {
        return new Date(b.last_visited).getTime() - new Date(a.last_visited).getTime();
      }
      if (sortBy === "mostVisited") {
        return b.visit_count - a.visit_count;
      }
      return 0;

    })


  }, [bookmarks, selectedId, searchQuery, sortBy]);

  return (
    <>
      {visibleBookmarks?.map((bookmark) => (
        <BookmarkCard key={bookmark.id} bookmark={bookmark} />
      ))}
    </>
  );
}
