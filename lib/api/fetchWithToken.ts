import { cookies } from "next/headers";
export async function fetchWithToken(
  proxyPath: string,
  method: RequestInit["method"] = "GET",
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`${process.env.API_URL}${proxyPath}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  return res;
}
