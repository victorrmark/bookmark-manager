import { useQuery } from "@tanstack/react-query"
import { fetchProfile } from "@/lib/api/profile"

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })
}
