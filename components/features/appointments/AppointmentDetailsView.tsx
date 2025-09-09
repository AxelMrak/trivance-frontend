"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Appointment } from "@/types/Appointment";
import { Service } from "@/types/Service";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import { formatStatus } from "@/utils/format";
import { useUser } from "@/context/UserContext";
import { UserRole } from "@/types/User";
import { generateCalendarLinks } from "@/utils/functions";
import Link from "next/link";
import { appointmentUpdateSchema, type AppointmentUpdateFormValues } from "@/lib/validation/appointment.schema";
import { deleteAppointment, updateAppointment, createPaymentLink } from "@/lib/api/appointments";

type AppointmentFormValues = AppointmentUpdateFormValues;

export default function AppointmentDetailsView({
  initialAppointment,
  services,
}: {
  initialAppointment: Appointment;
  services: Service[];
}) {
  const { user } = useUser();
  const [appointment, setAppointment] =
    useState<Appointment>(initialAppointment);
  const isOwner = Boolean(
    user?.user?.id && appointment.user?.id === user.user.id,
  );
  const role = user?.user?.role ?? UserRole.CLIENT;
  console.log(role);
  const isStaffOrHigher = role >= UserRole.STAFF;
  const isManagerOrHigher = role >= UserRole.MANAGER;
  const canEditDate = (isStaffOrHigher && isOwner) || isManagerOrHigher;
  const canEditStatus = (isStaffOrHigher && isOwner) || isManagerOrHigher;
  const canEditService = isStaffOrHigher && isOwner;
  const canEditDescription = isOwner;
  const canDelete = role === UserRole.ADMIN || role === UserRole.STAFF;

  const defaultValues: AppointmentFormValues = useMemo(
    () => ({
      service_id:
        appointment.service?.id || (appointment.service_id as any) || "",
      start_date: new Date(
        new Date(appointment.start_date).getTime() -
          new Date().getTimezoneOffset() * 60000,
      )
        .toISOString()
        .slice(0, 16),
      description: appointment.description || "",
      status: appointment.status,
    }),
    [appointment],
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentUpdateSchema),
    defaultValues,
  });

  const onSubmit = async (data: AppointmentFormValues) => {
    const payload: any = {};
    if (canEditService) payload.service_id = data.service_id;
    if (canEditDate)
      payload.start_date = new Date(data.start_date).toISOString();
    if (canEditDescription) payload.description = data.description;
    if (canEditStatus) payload.status = data.status;

    const updatePromise = updateAppointment(appointment.id, payload).then((updated) => {
      setAppointment(updated);
      reset({
        service_id: updated.service?.id || updated.service_id || "",
        start_date: new Date(
          new Date(updated.start_date).getTime() -
            new Date().getTimezoneOffset() * 60000,
        )
          .toISOString()
          .slice(0, 16),
        description: updated.description || "",
        status: updated.status,
      });
      return "Turno actualizado correctamente";
    });

    toast.promise(updatePromise, {
      loading: "Actualizando turno...",
      success: (message) => message,
      error: (error) =>
        (error as Error).message || "Error al actualizar el turno",
    });
  };

  const onDelete = async () => {
    if (!canDelete) return;
    const confirmed = window.confirm("¿Seguro que deseas eliminar este turno?");
    if (!confirmed) return;
    const deletePromise = deleteAppointment(appointment.id).then(() => "Turno eliminado correctamente");

    toast.promise(deletePromise, {
      loading: "Eliminando turno...",
      success: async (message) => {
        // Navigate back after deletion
        if (typeof window !== "undefined") {
          window.location.href = "/dashboard/appointments";
        }
        return message;
      },
      error: (error) =>
        (error as Error).message || "Error al eliminar el turno",
    });
  };

  const calendarLinks = useMemo(() => {
    return generateCalendarLinks({
      title: `Turno con ${appointment.user?.name ?? "cliente"}`,
      description: appointment.description || "Sin descripción",
      start: new Date(appointment.start_date),
      end: new Date(
        new Date(appointment.start_date).getTime() +
          (Number(appointment.service?.duration) || 30) * 60000,
      ),
    });
  }, [appointment]);

  const generatePaymentLink = async () => {
    const payPromise = createPaymentLink(appointment.id).then((data) => {
      const url = data.paymentLink as string;
      if (url) window.open(url, "_blank");
      return "Link de pago generado";
    });
    toast.promise(payPromise, {
      loading: "Generando link de pago...",
      success: (m) => m,
      error: (e) =>
        (e as Error).message || "No se pudo generar el link de pago",
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="text-left">
          <h2 className="text-2xl font-semibold text-gray-900 capitalize">
            {appointment.service?.name || "Turno"}
          </h2>
          <p className="text-gray-600">
            {appointment.description || "Sin descripción"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            size="lg"
            variant={
              appointment.status === "confirmed"
                ? "success"
                : appointment.status === "pending"
                  ? "warning"
                  : "error"
            }
            className="capitalize"
          >
            {formatStatus(appointment.status)}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="md:col-span-2 flex flex-col gap-4 items-start"
        >
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              name="client"
              label="Cliente"
              value={
                appointment.client?.name ||
                appointment.client?.user?.name ||
                appointment.user?.name ||
                ""
              }
              disabled
            />
            <Input
              name="created_by"
              label="Creado por"
              value={appointment.user?.name || ""}
              disabled
            />
            <Input
              name="email"
              label="Email cliente"
              value={
                appointment.client?.user?.email || appointment.user?.email || ""
              }
              disabled
            />
          </div>

          <Controller
            name="service_id"
            control={control}
            render={({ field }) => (
              <div className="w-full">
                <label
                  htmlFor="service_id"
                  className="block text-sm font-medium text-gray-700"
                >
                  Servicio
                </label>
                <select
                  {...field}
                  id="service_id"
                  disabled={!canEditService}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent bg-gray-50 select-font-size disabled:opacity-60"
                >
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                </select>
                {errors.service_id && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.service_id.message}
                  </p>
                )}
              </div>
            )}
          />

          <Controller
            name="start_date"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="datetime-local"
                label="Fecha y Hora"
                error={errors.start_date?.message}
                disabled={!canEditDate}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="textarea"
                label="Descripción"
                placeholder="Añade una descripción..."
                error={errors.description?.message}
                disabled={!canEditDescription}
              />
            )}
          />

          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <div className="w-full">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Estado
                </label>
                <select
                  {...field}
                  id="status"
                  disabled={!canEditStatus}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent bg-gray-50 select-font-size disabled:opacity-60"
                >
                  <option value="pending">Pendiente</option>
                  <option value="confirmed">Confirmado</option>
                  <option value="cancelled">Cancelado</option>
                </select>
                {errors.status && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.status.message}
                  </p>
                )}
              </div>
            )}
          />

          <div className="w-full grid grid-cols-2 gap-4">
            {canDelete && (
              <Button
                variant="destructive"
                onClick={onDelete}
                type="button"
                className="w-full"
              >
                Eliminar
              </Button>
            )}
            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting}
              className="w-full"
            >
              Guardar Cambios
            </Button>
          </div>
        </form>

        <aside className="md:col-span-1 flex flex-col gap-4">
          <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
            <h3 className="font-semibold mb-2">Acciones rápidas</h3>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(calendarLinks).map(([key, link]) => (
                <Link
                  key={key}
                  href={link.link}
                  className="bg-white text-gray-800 hover:bg-gray-100  rounded-md px-3 py-3 w-full shadow border border-gray-200 flex items-center justify-center"
                >
                  <link.icon className="w-8 h-8" />
                </Link>
              ))}
            </div>
          </div>

          <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
            <h3 className="font-semibold mb-2">Recordatorios</h3>
            <p className="text-sm text-gray-600 mb-3">
              Envia un recordatorio al cliente por email.
            </p>
            <Button
              variant="secondary"
              className="w-full"
              onClick={async () => {
                const p = fetch(
                  `${process.env.NEXT_PUBLIC_API_URL}/appointments/${appointment.id}/remind`,
                  {
                    method: "POST",
                    credentials: "include",
                  },
                ).then(async (res) => {
                  if (!res.ok) {
                    try {
                      const json = await res.json();
                      throw new Error(
                        json?.message || "No se pudo enviar el recordatorio",
                      );
                    } catch {
                      const txt = await res.text();
                      throw new Error(
                        txt || "No se pudo enviar el recordatorio",
                      );
                    }
                  }
                  return "Recordatorio enviado";
                });
                toast.promise(p, {
                  loading: "Enviando recordatorio...",
                  success: (m) => m,
                  error: (e) =>
                    (e as Error).message || "No se pudo enviar el recordatorio",
                });
              }}
              disabled={!isStaffOrHigher && !isOwner}
            >
              Enviar recordatorio
            </Button>
          </div>

          {appointment.service?.requires_deposit && (
            <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
              <h3 className="font-semibold mb-2">Pago</h3>
              <p className="text-sm text-gray-600 mb-3">
                {role >= UserRole.STAFF
                  ? "Este servicio requiere seña. Generá un link de pago y compártelo con el cliente."
                  : "Este servicio requiere seña. Realiza el pago para confirmar tu turno."}
              </p>
              <Button
                variant="secondary"
                onClick={generatePaymentLink}
                className="w-full"
              >
                {role >= UserRole.STAFF
                  ? "Generar link de pago"
                  : "Pagar ahora"}
              </Button>
            </div>
          )}

          <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
            <h3 className="font-semibold mb-2">Información del servicio</h3>
            <p className="capitalize">
              {appointment.service?.name || "Sin servicio"}
            </p>
            {appointment.service?.price && (
              <p>Precio: ${appointment.service.price}</p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
