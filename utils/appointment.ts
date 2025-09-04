
export type AppointmentStatus = "pending" | "confirmed" | "cancelled";

export interface FormData {
  user_id: string;
  service_id: string;
  date: string;
  time: string;
  start_date?: string;
  description: string;
  status: AppointmentStatus;
}

export const timeSlots: string[] = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];
