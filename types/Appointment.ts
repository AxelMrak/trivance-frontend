import { Service } from "@/types/Service";

export interface Appointment {
  id: string;
  // When responses include expansions, backend removes these FKs
  user_id?: string;
  client_id?: string;
  service_id?: string;
  status: "pending" | "confirmed" | "cancelled";
  start_date: string; // ISO date string
  description?: string | null;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  user?: {
    id: string;
    name: string;
    email?: string;
  };
  client?: {
    id: string;
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    address?: string | null;
    user: {
      id: string;
      name: string;
      email?: string;
    };
  };
  service?: Service;
}
