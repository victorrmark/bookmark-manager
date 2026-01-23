'use client'
import BookmarkCard from "@/components/layout/bookmarks-card";
import { useArchives } from "@/hooks/useBookmark";


export default function Archived() {
  const { data: bookmarks } = useArchives();
  console.log("Bookmarks Data:", bookmarks);

  return (
    <>
      {bookmarks?.map((bookmark) => (
        <BookmarkCard key={bookmark.id} bookmark={bookmark} />
      ))}
    </>
  );
}
