import { z } from "zod";

export const loginSchema = z.object({
  email: z.string({
    required_error: "El correo electrónico es obligatorio",
  }).email({
    message: "El correo electrónico no es válido",
  }),
  password: z.string({
    required_error: "La contraseña es obligatoria",
      }).min(8, {
    message: "La contraseña debe tener al menos 8 caracteres",
      }),
  remember: z.boolean().optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
