"use client";
import React, { useState, useEffect } from "react";
import { useDialog } from "@/context/ModalContext";
import DeleteDialog from "@/components/layouts/dialogs/DeleteDialog";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";
import AppointmentCard from "@/components/features/appointments/AppointmentCard";
import { Appointment } from "@/types/Appointment";
import { generateCalendarLinks } from "@/utils/functions";
import Link from "next/link";
import { Service } from "@/types/Service";
import AppointmentForm from "@/components/features/forms/AppointmentForm";

interface AppointmentsContainerProps {
  initialAppointments: Appointment[];
  initialServices: Service[];
}

export default function AppointmentsContainer({
  initialAppointments,
  initialServices,
}: AppointmentsContainerProps) {
  const [appointments, setAppointments] =
    useState<Appointment[]>(initialAppointments);

  const [services, setServices] = useState<Service[]>(initialServices);
  const { openDialog, closeDialog } = useDialog();

  useEffect(() => {
    setServices(initialServices);
  }, [initialServices]);

  const handleDeleteClient = async (id: string): Promise<void> => {
    const deletePromise = fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/appointments/delete/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      },
    ).then(async (response) => {
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Error al eliminar el turno");
      }

      setAppointments((prev) => prev.filter((client) => client.id !== id));
      closeDialog();
      return "Turno eliminado correctamente";
    });

    toast.promise(deletePromise, {
      loading: "Eliminando turno...",
      success: (message) => message,
      error: (error: unknown) => {
        if (error instanceof Error) {
          return error.message || "Error al eliminar el turno";
        }
        console.error(error);
        return "Error al eliminar el turno";
      },
    });
  };

  const openDeleteDialog = (id: string, name?: string | null) => {
    openDialog(
      <DeleteDialog
        data={{ id, title: name || null }}
        onClose={closeDialog}
        onDelete={() => handleDeleteClient(id)}
      />,
    );
  };

  const openEditDialog = (appointment: Appointment) => {};

  const openAddToCalendarDialog = (appointment: Appointment) => {
    // TODO: FIX END DATE CALC. IT ASSUMES THAT WE USE A 30 MINUTE DURATION WHEN THE SERVICE DURATIONS IS A INTERVAL OBJECT OF SQL AND COULD BE ANYTHING
    const links = generateCalendarLinks({
      title: `Turno con ${appointment.user?.name}`,
      description: appointment.description || "Sin descripción",
      location: appointment.service?.location || "Sin ubicación",
      start: new Date(appointment.start_date),
      end: new Date(
        new Date(appointment.start_date).getTime() +
          (Number(appointment.service?.duration) || 30) * 60000,
      ),
    });
    openDialog(
      <div className="p-4 w-full flex flex-col items-start justify-start gap-4">
        <h2 className="text-xl font-semibold mb-4">Agregar a Calendario</h2>
        <div className="w-full grid grid-cols-3 items-center justify-center gap-4">
          {Object.entries(links).map(([key, link]) => (
            <Link
              className="bg-gray-50 text-gray-800 hover:bg-gray-100  rounded-md px-6 py-4 mb-2 w-full shadow border border-gray-200 flex items-center justify-center"
              key={key}
              href={link.link}
            >
              <link.icon className="w-14 h-14" />
            </Link>
          ))}
        </div>
      </div>,
    );
  };

  console.log(initialServices);
  return (
    <div className="w-full flex flex-col items-start justify-between gap-4">
      <div className="w-full flex items-center justify-between gap-4">
        <span className="text-2xl font-normal text-gray-500">
          {appointments.length} turnos encontrados
        </span>
        <Button
          variant="primary"
          className="w-full md:w-auto !text-2xl font-normal"
          onClick={() =>
            openDialog(
              <AppointmentForm
                services={initialServices}
                appointments={appointments}
              />,
            )
          }
        >
          Crear turno +
        </Button>
      </div>

      <section className="w-full grid grid-cols-1 md:grid-cols-3  gap-4">
        {appointments.length > 0 ? (
          appointments.map((appointment: Appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              openDeleteDialog={openDeleteDialog}
              openEditDialog={openEditDialog}
              openAddToCalendarDialog={openAddToCalendarDialog}
            />
          ))
        ) : (
          <div className="w-full flex items-center justify-start">
            <p className="text-2xl font-normal text-gray-900 text-start">
              No se encontraron turnos. Podés crear uno nuevo haciendo click en
              el botón de arriba.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
