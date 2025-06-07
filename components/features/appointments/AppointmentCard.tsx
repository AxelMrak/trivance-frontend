import { Appointment } from '@/types/Appointment';
import Button from '@/components/ui/Button';
import { SendIcon } from '@/components/icons/SendIcon';
import { formatDate } from '@/utils/format';
import Badge from '@/components/ui/Badge';

export default function AppointmentCard({
  appointment,
  openDeleteDialog,
  openEditDialog,
}: {
  appointment: Appointment;
  openDeleteDialog?: (id: string, name?: string | null) => void;
  openEditDialog?: (appointment: Appointment) => void;
}) {
  const appointmentIsToday = new Date(appointment.start_date).toDateString() === new Date().toDateString();
  return (
    <article className="w-full flex flex-col gap-4 p-4 bg-white border border-gray-300 rounded-md">
      <div className='w-full flex flex-row items-start justify-between gap-4'>
        <h2 className="text-xl font-semibold text-gray-800">
          {appointment.user?.name}
        </h2>
        <div className="flex items-center justify-center gap-2 text-lg">

          <Badge variant={
            appointment.status === 'pending'
              ? 'warning'
              : appointment.status === 'confirmed'
                ? 'success'
                : 'error'
          } className="capitalize
            " size="lg">
            {appointment.status}
          </Badge>
          {
            appointmentIsToday && (
              <Badge variant="special" size="lg">
                Hoy
              </Badge>
            )
          }

        </div>
      </div>
      <div className="w-full flex flex-col items-start justify-start gap-2">
        <span className=" text-gray-800">
          {formatDate(appointment.start_date, true)}
        </span>

        <p className="text-gray-600 text-lg font-medium">
          {appointment.service?.name || 'Servicio no disponible'}
        </p>
        <p className="text-gray-500 text-md">
          {appointment.description || 'Sin descripción'}
        </p>
      </div>
      <div className="w-full grid grid-cols-1  md:grid-cols-2 gap-2 text-sm">
        <Button
          variant="secondary"
          className="w-full flex items-center justify-center gap-2 whitespace-nowrap"
        >
          Enviar recordatorio
          <SendIcon className="w-5 h-5" />
        </Button>

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
