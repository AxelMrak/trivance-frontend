import AppointmentIcon from "@/components/icons/AppointmentIcon";
import CalendarIcon from "@/components/icons/CalendarIcon";
import ClientsIcon from "@/components/icons/ClientsIcon";
import HomeIcon from "@/components/icons/HomeIcon";
import ServicesIcon from "@/components/icons/ServicesIcon";
import { AppRoute } from "@/types/Route";

export const routes: AppRoute[] = [
  {
    path: "/dashboard",
    label: "Inicio",
    icon: HomeIcon,
  },
  {
    path: "/clients",
    label: "Clientes",
    icon: ClientsIcon,
  },
  {
    path: "/services",
    label: "Servicios",
    icon: ServicesIcon,
  },
  {
    path: "/calendar",
    label: "Calendario",
    icon: CalendarIcon,
  },
  {
    path: "/appointments",
    label: "Turnos",
    icon: AppointmentIcon,
  }
];
