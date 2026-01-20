'use client'
import BookmarkCard from "@/components/layout/bookmarks-card";
import { useBookmark } from "@/hooks/useBookmark";


export default function Home() {
  const { data: bookmarks } = useBookmark();
  console.log("Bookmarks Data:", bookmarks);

  return (
    <>
      {bookmarks?.map((bookmark) => (
        <BookmarkCard key={bookmark.id} bookmark={bookmark} />
      ))}
    </>
  );
}
