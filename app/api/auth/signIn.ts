import { BACKEND_URL } from "~/utils/consts";

export const POST_CREDENTIALS = async (email: string, password: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error("Error signing in");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};
