import { cookies } from "next/headers";
// TODO: REDIRECT THIS TO A PROXY HANDLER TO HANDLE TOKENS ROTATION. THE PROXY IS ALREADY CREATED IN THE API ROUTES BUT WE NEED TO AVOID USE AUTHORIZATION HEADER ON IT. SO WE NEED TO CHANGE TOKENS TO SET ACCESS TOKEN AND REFRESH TOKEN ON COOKIES CALLED "access_token" AND "refresh_token" INSTEAD OF USING AUTHORIZATION HEADER. THIS WAY WE CAN USE THE PROXY TO HANDLE TOKENS ROTATION AND REFRESH THEM WHEN THEY EXPIRE.
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
  });
  return res;
}
