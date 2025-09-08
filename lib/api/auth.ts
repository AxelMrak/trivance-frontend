export async function login(payload: { email: string; password: string }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Error al iniciar sesión");
  }
  return data;
}

export async function register(payload: {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Error al registrar");
  }
  return data;
}

export async function logout() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-out`,
      {
        method: "POST",
        credentials: "include",
      },
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Error al cerrar sesión");
    }

    return data;
  } finally {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");

      document.cookie.split(";").forEach((c) => {
        const eqPos = c.indexOf("=");
        const name = eqPos > -1 ? c.substr(0, eqPos).trim() : c.trim();
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
      });
    }
  }
}
