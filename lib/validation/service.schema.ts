import { z } from "zod";

// ? Schema for service form
export const serviceSchema = z.object({
  name: z
    .string({ required_error: "El nombre del servicio es obligatorio" })
    .min(3, {
      message: "El nombre del servicio debe tener al menos 3 caracteres",
    }),
  description: z
    .string({ required_error: "La descripción del servicio es obligatoria" })
    .min(10, {
      message: "La descripción del servicio debe tener al menos 10 caracteres",
    }),
  price: z
    .number({ required_error: "El precio del servicio es obligatorio" })
    .positive({
      message: "El precio del servicio debe ser un número positivo",
    }),
  duration: z.string({
    required_error: "La duración del servicio es obligatoria",
  }),
  requires_deposit: z.boolean().optional().default(false),
});

export type ServiceFormValues = z.infer<typeof serviceSchema>;
