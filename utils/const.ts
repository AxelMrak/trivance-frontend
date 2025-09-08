import { UserRole } from "@/types/User";

export const DAYS_OF_WEEK = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];

export const MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export const ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.GUEST]: "Invitado",
  [UserRole.CLIENT]: "Cliente",
  [UserRole.STAFF]: "Personal",
  [UserRole.MANAGER]: "Gerente",
  [UserRole.ADMIN]: "Administrador",
  [UserRole.SUPER_USER]: "Super Usuario",
} as const;
