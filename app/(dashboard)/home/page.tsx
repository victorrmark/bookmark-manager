'use client'
import BookmarkCard from "@/components/layout/bookmark-card";
import { useBookmark } from "@/hooks/useBookmark";

// async function fetchBookmarks() {
//   const supabase = await createClient();
  
//     const {
//       data: { user },
//     } = await supabase.auth.getUser();
  
//     const { data: bookmarks, error } = await supabase
//       .from("bookmarks")
//       .select("*, bookmark_tags(tags(tag, id))")
//       .eq("user_id", user?.id);

//       if (error) {
//         console.error("Error fetching bookmarks:", error.message);
//         return [];
//       }

//       return bookmarks;
// }

export default function Home() {
  const { data: bookmarks } = useBookmark();
  // console.log("Bookmarks Data:", bookmarks);

  return (
    <>
      {bookmarks?.map((bookmark) => (
        <BookmarkCard key={bookmark.id} bookmark={bookmark} />
      ))}
    </>
  );
}
