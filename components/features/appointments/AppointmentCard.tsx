import { Appointment } from "@/types/Appointment";
import Button from "@/components/ui/Button";
import { SendIcon } from "@/components/icons/SendIcon";
import { formatStatus } from "@/utils/format";
import Badge from "@/components/ui/Badge";
import RoleGuard from "@/components/features/global/RoleGuard";
import { UserRole } from "@/types/User";

import dynamic from "next/dynamic";

const AppointmentDate = dynamic(() => import("./AppointmentDate"), {
  ssr: false,
});
export default function AppointmentCard({
  appointment,
  openEditDialog,
  openAddToCalendarDialog,
}: {
  appointment: Appointment;
  openEditDialog?: (appointment: Appointment) => void;
  openAddToCalendarDialog?: (appointment: Appointment) => void;
}) {
  const appointmentIsToday =
    new Date(appointment.start_date).toDateString() ===
    new Date().toDateString();
  return (
    <article className="w-full flex flex-col gap-2 p-4 bg-white border border-gray-300 rounded-md">
      <div className="w-full flex flex-row items-start justify-between gap-4">
        <RoleGuard minRole={UserRole.ADMIN}>
          <h2 className="text-xl font-semibold text-gray-800">
            {appointment.user?.name}
          </h2>
        </RoleGuard>
        <div className="flex items-center justify-center gap-2 text-lg">
          <Badge
            variant={
              appointment.status === "pending"
                ? "warning"
                : appointment.status === "confirmed"
                  ? "success"
                  : "error"
            }
            className="capitalize
            "
            size="lg"
          >
            {formatStatus(appointment.status)}
          </Badge>
          {appointmentIsToday && (
            <Badge variant="special" size="lg">
              Hoy
            </Badge>
          )}
        </div>
      </div>
      <div className="w-full flex flex-col items-start justify-start gap-1">
        <p className="text-lg font-medium">
          <AppointmentDate date={appointment.start_date} />
        </p>
        <p className="text-gray-600 text-lg font-medium">
          {appointment.service?.name || "Servicio no disponible"}
        </p>
        <p className="text-gray-500 text-md">
          {appointment.description || "Sin descripción"}
        </p>
      </div>
      <div className="w-full grid grid-cols-1  md:grid-cols-3 gap-2 text-base">
        <RoleGuard minRole={UserRole.ADMIN}>
          <Button
            variant="secondary"
            className="w-full flex items-center justify-center gap-2"
          >
            Enviar recordatorio
            <SendIcon className="w-5 h-5" />
          </Button>
          <Button
            variant="tertiary"
            className="w-full"
            onClick={() => openAddToCalendarDialog(appointment)}
          >
            Agregar al calendario
          </Button>
        </RoleGuard>
        <Button
          variant="primary"
          className="w-full"
          onClick={() => openEditDialog(appointment)}
        >
          Ver detalle
        </Button>
      </div>
    </article>
  );
}
