import { z } from 'zod';

export const clientSchema = z.object({
	name: z.string().min(1, 'El nombre es obligatorio'),
	email: z.string().email('Correo electrónico inválido'),
	phone: z.string().min(6, 'Número de teléfono inválido'),
	address: z.string().min(1, 'La dirección es obligatoria'),
});

export type ClientFormValues = z.infer<typeof clientSchema>;
