export async function fetchProfile() {
  const res = await fetch("/api/profile", {
    method: "GET",
    credentials: "include"
  })

  if (!res.ok) {
    throw new Error("Failed to fetch profile")
  }

  return res.json()
}
