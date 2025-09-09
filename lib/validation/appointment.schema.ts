import { z } from "zod";

export const appointmentUpdateSchema = z.object({
  service_id: z.string().min(1, "El servicio es requerido"),
  start_date: z
    .string()
    .min(1, "La fecha es requerida")
    .refine(
      (value) => {
        const date = new Date(value);
        const hours = date.getHours();
        return hours >= 9 && hours <= 17;
      },
      { message: "La hora debe estar entre 09:00 y 17:00" },
    ),
  description: z.string().optional(),
  status: z.enum(["pending", "confirmed", "cancelled"]),
});

export type AppointmentUpdateFormValues = z.infer<typeof appointmentUpdateSchema>;

export const appointmentCreateSchema = z.object({
  service_id: z.string().min(1, "El servicio es requerido"),
  date: z.string().min(1, "La fecha es requerida"),
  time: z.string().min(1, "La hora es requerida"),
  description: z.string().optional(),
  status: z.enum(["pending", "confirmed"]).optional(),
  client_id: z.string().optional(),
});

export type AppointmentCreateFormValues = z.infer<typeof appointmentCreateSchema>;

