import { z } from "zod";

// ? Schema for login form
export const loginSchema = z.object({
  email: z
    .string({
      required_error: "El correo electrónico es obligatorio",
    })
    .email({
      message: "El correo electrónico no es válido",
    }),
  password: z
    .string({
      required_error: "La contraseña es obligatoria",
    })
    .min(8, {
      message: "La contraseña debe tener al menos 8 caracteres",
    }),
  remember: z.boolean().optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

// ? Schema for register form
export const registerSchema = z
  .object({
    name: z
      .string({ required_error: "El nombre es obligatorio" })
      .min(3, { message: "El nombre debe tener al menos 3 caracteres" }),

    email: z
      .string({ required_error: "El correo electrónico es obligatorio" })
      .email({ message: "El correo electrónico no es válido" }),

    password: z
      .string({ required_error: "La contraseña es obligatoria" })
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),

    confirmedPassword: z.string({
      required_error: "La confirmación de la contraseña es obligatoria",
    }),

    phone: z
      .string({ required_error: "El teléfono es obligatorio" })
      .min(10, { message: "El teléfono debe tener al menos 10 caracteres" }),

    address: z
      .string({ required_error: "La dirección es obligatoria" })
      .min(10, { message: "La dirección debe tener al menos 10 caracteres" }),
  })
  .refine((data) => data.password === data.confirmedPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmedPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
