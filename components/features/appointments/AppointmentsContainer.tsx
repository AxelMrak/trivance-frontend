"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDialog } from "@/context/ModalContext";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";
import AppointmentCard from "@/components/features/appointments/AppointmentCard";
import { Appointment } from "@/types/Appointment";
import { generateCalendarLinks } from "@/utils/functions";
import Link from "next/link";
import { Service } from "@/types/Service";
import AppointmentForm from "@/components/features/forms/AppointmentForm";
import { useUser } from "@/context/UserContext";
import Pagination from "@/components/ui/Pagination";
import { useRouter } from "next/navigation";

interface AppointmentsContainerProps {
  initialAppointments: Appointment[];
}

export default function AppointmentsContainer({
  initialAppointments,
}: AppointmentsContainerProps) {
  const [appointments, setAppointments] = useState<Appointment[]>(
    initialAppointments ?? [],
  );
  const { openDialog, closeDialog } = useDialog();
  const { user } = useUser();
  const router = useRouter();
  const openedIdRef = useRef<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const pageSize = 8;
  const onAppointmentCreated = useCallback(async () => {
    try {
      const [servicesRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/getAll`, {
          credentials: "include",
        }),
      ]);
      const services = (await servicesRes.json()) as Service[];
      openDialog(
        <AppointmentForm
          services={Array.isArray(services) ? services : []}
          appointments={[] as any}
          onAppointmentCreated={() => {
            closeDialog();
            router.refresh();
          }}
        />,
      );
    } catch (_e) {
      // no-op; could show a toast here if desired
    }
  }, [openDialog, closeDialog]);

  const openEditDialog = useCallback((appointment: Appointment) => {
    if (typeof window !== "undefined") {
      window.location.href = `/dashboard/appointments/${appointment.id}`;
    }
  }, []);

  const openAddToCalendarDialog = (appointment: Appointment) => {
    const links = generateCalendarLinks({
      title: `Turno con ${appointment.client?.user?.name || appointment.user?.name}`,
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
              target="_blank"
              rel="noopener noreferrer"
              title={`Agregar a ${link.name}`}
            >
              <link.icon className="w-14 h-14" />
            </Link>
          ))}
        </div>
      </div>,
    );
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
          onClick={() => onAppointmentCreated()}
        >
          Crear turno +
        </Button>
      </div>

      <section className="w-full grid grid-cols-1 md:grid-cols-2  gap-4">
        {appointments.length > 0 ? (
          appointments
            .slice((page - 1) * pageSize, page * pageSize)
            .map((appointment: Appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
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
      <Pagination
        total={appointments.length}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
      />
    </div>
  );
}
