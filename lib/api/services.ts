import { CreateServicePayload, Service } from "@/types/Service";

export async function getServices(): Promise<Service[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/services/getAll`,
    {
      method: "GET",
      cache: "no-store",
    },
  );
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Error al obtener los servicios");
  }

  return data;
}

export async function getService(id: string): Promise<Service> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/services/get/${id}`,
    {
      method: "GET",
      cache: "no-store",
    },
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Error al obtener el servicio");
  }
  return data;
}

export async function createService(
  payload: CreateServicePayload,
): Promise<Service> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/services/create`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    },
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Error al crear el servicio");
  }
  return data;
}

export async function updateService(
  payload: Partial<CreateServicePayload>,
  id: string,
): Promise<Service> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/services/update/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    },
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Error al actualizar el servicio");
  }
  return data;
}

export async function deleteService(
  id: string,
): Promise<{ message: string; id: string }> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/services/delete/${id}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    },
  );
  const contentType = res.headers.get("content-type") || "";
  // Handle 204 No Content or empty body
  if (res.status === 204 || !contentType.includes("application/json")) {
    if (!res.ok) {
      throw new Error("Error al eliminar el servicio");
    }
    return { message: "Servicio eliminado correctamente", id };
  }
  const text = await res.text();
  let data: any = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }
  if (!res.ok) {
    const msg = (data && data.message) || text || "Error al eliminar el servicio";
    throw new Error(msg);
  }
  return data ?? { message: "Servicio eliminado correctamente", id };
}
