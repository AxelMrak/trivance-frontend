import Appointments from "@/components/features/appointments";
import { MainHeader } from "@/components/layouts/dashboard/MainHeader";

export default function AppointmentsPage() {
  return <>
    <MainHeader title="Turnos" />
    <Appointments />
  </>;
}
