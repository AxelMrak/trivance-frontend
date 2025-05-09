export async function login(payload: { email: string; password: string }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`, {
    method: 'POST',
    credentials: 'include', 
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Error al iniciar sesión');
  }

  return data;
}
