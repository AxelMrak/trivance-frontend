import type { Appointment } from "@/types/Appointment";

export interface Order {
  id: string;
  status: "paid" | "pending" | "cancelled" | "failed" | string;
  appointmentId?: string;
  appointment?: Appointment;
}
