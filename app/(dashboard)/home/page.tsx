'use client'
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
  const { data, error } = useBookmark();
  // const bookmarksData = await fetchBookmarks();
  console.log("Bookmarks Data:", data);

  return (
    <>
      {Array.from({ length: 30 }).map((_, index) => (
        <div
          key={index}
          className="w-[100px] h-[100px] outline outline-red-500"
        >
          Bookmark {index + 1}
        </div>
      ))}
    </>
  );
}
