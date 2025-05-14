import { CreateServicePayload, Service } from "@/types/Service";

export async function getServices(): Promise<Service[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/services`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Error al obtener los servicios");
  }

  return data;
};

export async function getService(id: string): Promise<Service> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/services/${id}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Error al obtener el servicio");
  }
  return data;
}

export async function createService(payload: CreateServicePayload): Promise<Service> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/services`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Error al crear el servicio");
  }
  return data;
}

export async function updateService(payload: Partial<CreateServicePayload>, id: string): Promise<Service> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/services/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Error al actualizar el servicio");
  }
  return data;
}

export async function deleteService(id: string): Promise<{ message: string, id: string }> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/services/${id}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Error al eliminar el servicio");
  }
  return data;
}
