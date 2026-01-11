import { createClient } from "@/utils/supabase/server";

interface Tag {
  tag: string;
  id: number;
}

export async function POST(req: Request) {
  const supabase = await createClient();

  const { title, description, url, tags } = await req.json();

  const faviron_url = `https://s2.googleusercontent.com/s2/favicons?domain_url=${url}&sz=64`;

  const date = new Date();

  const created_at = `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: bookmark, error: bookmarkError } = await supabase
    .from("bookmarks")
    .insert({
      user_id: user?.id,
      title,
      description,
      url,
      faviron_url,
      created_at,
    })
    .select()
    .single();

  if (bookmarkError) {
    return Response.json({ error: bookmarkError.message }, { status: 400 });
  }

  const bookmarkTags = tags.map((tag: Tag) => ({
    bookmark_id: bookmark.id,
    tag_id: tag.id,
  }));

  const { error: tagError } = await supabase
    .from("bookmark_tags")
    .insert(bookmarkTags);

  if (tagError) {
    // rollback bookmark if tag insert fails
    await supabase.from("bookmarks").delete().eq("id", bookmark.id);

    return Response.json({ error: tagError.message }, { status: 400 });
  }

  return Response.json({ success: true, bookmark });
}
