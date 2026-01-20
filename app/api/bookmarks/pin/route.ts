import { createClient } from "@/utils/supabase/server";
import { NextResponse, NextRequest } from "next/server";

export async function PATCH(req: NextRequest) {
  const supabase = await createClient();

  const { bookmark_id } = await req.json();

  const { data: bookmark } = await supabase
    .from("bookmarks")
    .select("is_pinned")
    .eq("id", bookmark_id)
    .single();

  const { data, error: bookmarkError } = await supabase
    .from("bookmarks")
    .update({
      is_pinned: !bookmark?.is_pinned,
    })
    .eq("id", bookmark_id)
    .select()
    .single();

  if (bookmarkError) {
    return NextResponse.json({ error: bookmarkError.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
