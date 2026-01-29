import { createClient } from "@/utils/supabase/server";
import { NextResponse, NextRequest } from "next/server";

interface Tag {
  tag: string;
  id: number;
}

export async function PATCH(req: NextRequest) {
  const supabase = await createClient();

  const { title, description, url, tags, bookmark_id } = await req.json();

  const favicon_url = `https://s2.googleusercontent.com/s2/favicons?domain_url=${url}&sz=64`;

  const {error} = await supabase.rpc("update_bookmark_with_tags", {
    p_bookmark_id: bookmark_id,
    p_title: title,
    p_description: description,
    p_url: url,
    p_favicon_url: favicon_url,
    p_tags: tags.map((tag: Tag) => tag.id),
  });

  if(error){
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
