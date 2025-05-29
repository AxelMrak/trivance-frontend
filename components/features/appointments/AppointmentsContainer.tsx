'use client';
import { useState } from 'react';
import { Client } from '@/types/Client';
import { useDialog } from '@/context/ModalContext';
import DeleteDialog from '@/components/layouts/dialogs/DeleteDialog';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import ClientForm from '@/components/features/forms/ClientForm';
import AppointmentCard from '@/components/features/appointments/AppointmentCard';
import { Appointment } from '@/types/Appointment';

interface AppointmentsContainerProps {
  initialAppointments: Appointment[];

}

export default function AppointmentsContainer({
  initialAppointments,
}: AppointmentsContainerProps) {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const { openDialog, closeDialog } = useDialog();

  const handleDeleteClient = async (id: string): Promise<void> => {
    const deletePromise = fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/appointments/delete/${id}`,
      {
        method: 'DELETE',
        credentials: 'include',
      }
    ).then(async (response) => {
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Error al eliminar el turno');
      }

      setAppointments((prev) => prev.filter((client) => client.id !== id));
      closeDialog();
      return 'Turno eliminado correctamente';
    });

    toast.promise(deletePromise, {
      loading: 'Eliminando turno...',
      success: (message) => message,
      error: (error: unknown) => {
        if (error instanceof Error) {
          return error.message || 'Error al eliminar el turno';
        }
        console.error(error);
        return 'Error al eliminar el turno';
      },
    });
  };

  const openDeleteDialog = (id: string, name?: string | null) => {
    openDialog(
      <DeleteDialog
        data={{ id, title: name || null }}
        onClose={closeDialog}
        onDelete={() => handleDeleteClient(id)}
      />
    );
  };

  const openEditDialog = (appointment: Appointment) => {
  };

  return (
    <div className="w-full flex flex-col items-start justify-between gap-4">
      <div className="w-full flex items-center justify-between gap-4">
        <span className="text-2xl font-normal text-gray-500">
          {appointments.length} turnos encontrados
        </span>
        <Button
          variant="primary"
          className="w-full md:w-auto !text-2xl font-normal"
        >
          Crear turno +
        </Button>
      </div>

      <section className="w-full grid grid-cols-1 md:grid-cols-4  gap-4">

        {appointments.length > 0 ? (
          appointments.map((appointment: Appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              openDeleteDialog={openDeleteDialog}
              openEditDialog={openEditDialog}
            />
          ))
        ) : (
          <div className="w-full flex items-center justify-start">
            <p className="text-2xl font-normal text-gray-900 text-start">
              No se encontraron turnos. Podés crear uno nuevo haciendo click
              en el botón de arriba.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
