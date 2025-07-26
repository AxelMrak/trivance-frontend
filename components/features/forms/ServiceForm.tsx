"use client";

import Input from "@/components/ui/Input";
import {
  ServiceFormValues,
  serviceSchema,
} from "@/lib/validation/service.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { formatInterval } from "@utils/format";
import { Service } from "@/types/Service";
import Button from "@/components/ui/Button";
import SaveIcon from "@/components/icons/SaveIcon";
import DurationPicker from "@/components/ui/DurationPicker";
import DiscardIcon from "@/components/icons/DiscardIcon";

interface ServiceFormProps {
  initialService?: Service;
  onSubmit: (data: ServiceFormValues) => Promise<void>;
  onClose: () => void;
}

export default function ServiceForm({
  initialService,
  onSubmit,
  onClose,
}: ServiceFormProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, dirtyFields, isSubmitting },
  } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: initialService?.name || "",
      description: initialService?.description || "",
      price: Number(initialService?.price) || 0,
      duration:
        typeof initialService?.duration === "string"
          ? initialService.duration
          : formatInterval(initialService?.duration) || "0",
    },
  });

  const handleFormSubmit = async (data: ServiceFormValues) => {
    await onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-full flex flex-col items-start justify-start gap-4"
    >
      <h2 className="text-2xl font-normal mb-4">
        {initialService ? "Actualizar servicio" : "Crear servicio"}
      </h2>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label="Nombre del servicio"
            placeholder="Nombre del servicio"
            error={errors.name?.message}
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
            label="Descripción del servicio"
            placeholder="Descripción del servicio"
            error={errors.description?.message}
          />
        )}
      />

      <Controller
        name="price"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label="Precio del servicio"
            placeholder="Precio del servicio"
            onChange={(event) =>
              field.onChange(
                event.target.value === "" ? "" : +event.target.value,
              )
            }
            type="number"
            error={errors.price?.message}
          />
        )}
      />

      <div className="w-full flex flex-col items-start gap-4">
        <label className="block text-xl font-normal text-gray-900 ">
          Duración del servicio
        </label>
        <Controller
          name="duration"
          control={control}
          render={({ field }) => <DurationPicker {...field} />}
        />
        {errors.duration && (
          <p className="mt-1 text-sm text-red-600">{errors.duration.message}</p>
        )}
      </div>

      <div className="w-full grid grid-cols-2 items-center gap-4 ">
        <Button
          variant="primary"
          type="submit"
          disabled={Object.keys(errors).length > 0 || isSubmitting}
          className="w-full"
        >
          <SaveIcon className="w-4 h-4 mr-2" />
          {initialService ? "Guardar cambios" : "Crear servicio"}
        </Button>
        <Button
          variant="tertiary"
          onClick={onClose}
          className="w-full disable:opacity-50 disabled:text-gray-500 disabled:cursor-not-allowed"
        >
          <DiscardIcon className="w-4 h-4 mr-2" />
          Cancelar
        </Button>
      </div>
    </form>
  );
}
