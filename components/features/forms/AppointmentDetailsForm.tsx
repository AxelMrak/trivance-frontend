"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Appointment } from "@/types/Appointment";
import { Service } from "@/types/Service";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useEffect } from "react";
import toast from "react-hot-toast";

const appointmentDetailsSchema = z.object({
  service_id: z.string().min(1, "El servicio es requerido"),
  start_date: z.string().min(1, "La fecha es requerida"),
  description: z.string().optional(),
  status: z.enum(["pending", "confirmed", "cancelled"]),
});

type AppointmentDetailsFormValues = z.infer<typeof appointmentDetailsSchema>;

interface AppointmentDetailsFormProps {
  initialAppointment: Appointment;
  services: Service[];
  onAppointmentUpdated: (updatedAppointment: Appointment) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

export default function AppointmentDetailsForm({
  initialAppointment,
  services,
  onAppointmentUpdated,
  onDelete,
  onClose,
}: AppointmentDetailsFormProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentDetailsFormValues>({
    resolver: zodResolver(appointmentDetailsSchema),
    defaultValues: {
      service_id: initialAppointment.service?.id || "",
      start_date: new Date(initialAppointment.start_date)
        .toISOString()
        .slice(0, 16),
      description: initialAppointment.description || "",
      status: initialAppointment.status,
    },
  });

  useEffect(() => {
    reset({
      service_id: initialAppointment.service?.id || "",
      start_date: new Date(initialAppointment.start_date)
        .toISOString()
        .slice(0, 16),
      description: initialAppointment.description || "",
      status: initialAppointment.status,
    });
  }, [initialAppointment, reset]);

  const onSubmit = async (data: AppointmentDetailsFormValues) => {
    const updatePromise = fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/appointments/update/${initialAppointment.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      },
    ).then(async (response) => {
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Error al actualizar el turno");
      }
      const updatedAppointment = await response.json();
      onAppointmentUpdated(updatedAppointment);
      return "Turno actualizado correctamente";
    });

    toast.promise(updatePromise, {
      loading: "Actualizando turno...",
      success: (message) => message,
      error: (error) => (error as Error).message || "Error al actualizar el turno",
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col items-start justify-start gap-4 p-4"
    >
      <h2 className="text-2xl font-semibold mb-4">
        Detalles del Turno de {initialAppointment.user?.name}
      </h2>

      <div className="w-full space-y-2">
        <Input
          label="Cliente"
          value={initialAppointment.user?.name}
          disabled
        />
        <Input
          label="Email del Cliente"
          value={initialAppointment.user?.email}
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent bg-gray-50"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent bg-gray-50"
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

      <div className="w-full grid grid-cols-3 items-center gap-4 mt-4">
        <Button
          variant="destructive"
          onClick={() => onDelete(initialAppointment.id)}
          type="button"
          className="w-full"
        >
          Eliminar
        </Button>
        <Button
          variant="tertiary"
          onClick={onClose}
          type="button"
          className="w-full"
        >
          Cancelar
        </Button>
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
  );
}
