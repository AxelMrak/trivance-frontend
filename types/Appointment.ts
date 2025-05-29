import { Service } from "@/types/Service";

export interface Appointment {
  id: string;
  user_id: string;
  service_id: string;
  status: "pending" | "confirmed" | "cancelled";
  start_date: string; // ISO date string
  description?: string | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  user?: {
    id: string;
    name: string;
  },
  service?: Service
}
