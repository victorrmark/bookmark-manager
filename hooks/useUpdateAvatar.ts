"use client"

import { useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/lib/supabase"

export function useUpdateAvatar() {
  const queryClient = useQueryClient()

  const updateAvatar = async (avatarId: string, userId: string) => {
    const { error } = await supabase
      .from("profiles")
      .update({ avatar_id: avatarId })
      .eq("id", userId)

    if (error) throw error

    queryClient.invalidateQueries({
      queryKey: ["profile"]
    })
  }

  return updateAvatar
}
