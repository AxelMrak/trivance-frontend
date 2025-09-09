import type { Appointment } from "@/types/Appointment";

export type UpdateAppointmentPayload = Partial<{
  service_id: string;
  start_date: string; // ISO
  description: string | null;
  status: "pending" | "confirmed" | "cancelled";
}>;

export type CreateAppointmentPayload = {
  service_id: string;
  start_date: string; // ISO
  description?: string;
  client_id?: string; // optional for staff
};

export async function createAppointment(
  payload: CreateAppointmentPayload,
): Promise<Appointment> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/appointments/create`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    },
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || "No se pudo reservar el turno");
  }
  return data;
}

export async function updateAppointment(
  id: string,
  payload: UpdateAppointmentPayload,
): Promise<Appointment> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/appointments/update/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    },
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || "Error al actualizar el turno");
  }
  return data;
}

export async function deleteAppointment(id: string): Promise<{ message: string }> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/appointments/delete/${id}`,
    { method: "DELETE", credentials: "include" },
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || "Error al eliminar el turno");
  }
  return data;
}

export async function getAppointment(id: string): Promise<Appointment> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/appointments/get/${id}`,
    { credentials: "include", cache: "no-store" },
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || "Error al obtener el turno");
  }
  return data;
}

export async function createPaymentLink(
  id: string,
): Promise<{ paymentLink: string; orderId?: string; paymentDetails?: any }> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/appointments/payment/${id}/link`,
    { method: "POST", credentials: "include" },
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || "No se pudo generar el link de pago");
  }
  return data;
}
