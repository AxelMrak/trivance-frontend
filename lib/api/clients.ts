import type { Client, CreateClientPayload } from "@/types/Client";

export async function getClients(): Promise<Client[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients/getAll`, {
    method: "GET",
    cache: "no-store",
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || "Error al obtener clientes");
  }
  return data;
}

export async function createClient(payload: CreateClientPayload): Promise<Client> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || "Error al crear el cliente");
  }
  return data;
}

export async function updateClient(
  id: string,
  payload: Partial<CreateClientPayload>,
): Promise<Client> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/clients/update/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    },
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || "Error al actualizar el cliente");
  }
  return data;
}

export async function deleteClient(id: string): Promise<{ id: string; message: string }> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/clients/delete/${id}`,
    { method: "DELETE", credentials: "include" },
  );
  const contentType = res.headers.get("content-type") || "";
  if (res.status === 204 || !contentType.includes("application/json")) {
    if (!res.ok) throw new Error("Error al eliminar el cliente");
    return { id, message: "Cliente eliminado correctamente" };
  }
  const text = await res.text();
  let data: any = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {}
  if (!res.ok) {
    const msg = (data && data.message) || text || "Error al eliminar el cliente";
    throw new Error(msg);
  }
  return data ?? { id, message: "Cliente eliminado correctamente" };
}
