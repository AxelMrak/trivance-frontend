import AppointmentIcon from "@/components/icons/AppointmentIcon";
import CalendarIcon from "@/components/icons/CalendarIcon";
import ClientsIcon from "@/components/icons/ClientsIcon";
import HomeIcon from "@/components/icons/HomeIcon";
import ServicesIcon from "@/components/icons/ServicesIcon";
import { AppRoute } from "@/types/Route";
import { UserRole } from "@/types/User";


const baseDashboardPath = "/dashboard";


export const routes: AppRoute[] = [
  {
    path: baseDashboardPath,
    label: "Inicio",
    icon: HomeIcon,
    minRole: UserRole.CLIENT,
  },
  {
    path: `${baseDashboardPath}/clients`,
    label: "Clientes",
    icon: ClientsIcon,
    minRole: UserRole.ADMIN,
  },
  {
    path: `${baseDashboardPath}/services`,
    label: "Servicios",
    icon: ServicesIcon,
    minRole: UserRole.ADMIN,
  },
  {
    path: `${baseDashboardPath}/calendar`,
    label: "Calendario",
    icon: CalendarIcon,
    minRole: UserRole.CLIENT,
  },
  {
    path: `${baseDashboardPath}/appointments`,
    label: "Turnos",
    icon: AppointmentIcon,
    minRole: UserRole.CLIENT,
  }
];
