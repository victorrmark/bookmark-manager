import { createClient } from "@/utils/supabase/server";
import { NextResponse, NextRequest } from "next/server";

export async function PATCH(req: NextRequest) {
  const supabase = await createClient();

  const { bookmark_id } = await req.json();

  const { data, error } = await supabase
    .rpc("toggle_bookmark_pin", { bookmark_id })
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ bookmark: data });
}
