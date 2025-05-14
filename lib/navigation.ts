import AppointmentIcon from "@/components/icons/AppointmentIcon";
import CalendarIcon from "@/components/icons/CalendarIcon";
import ClientsIcon from "@/components/icons/ClientsIcon";
import HomeIcon from "@/components/icons/HomeIcon";
import ServicesIcon from "@/components/icons/ServicesIcon";
import { AppRoute } from "@/types/Route";
const baseDashboardPath = "/dashboard";

export const routes: AppRoute[] = [
  {
    path: baseDashboardPath,
    label: "Inicio",
    icon: HomeIcon,
  },
  {
    path: `${baseDashboardPath}/clients`,
    label: "Clientes",
    icon: ClientsIcon,
  },
  {
    path: `${baseDashboardPath}/services`,
    label: "Servicios",
    icon: ServicesIcon,
  },
  {
    path: `${baseDashboardPath}/calendar`,
    label: "Calendario",
    icon: CalendarIcon,
  },
  {
    path: `${baseDashboardPath}/appointments`,
    label: "Turnos",
    icon: AppointmentIcon,
  }
];
