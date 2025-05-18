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

export default function ServiceForm({
  initialService,
}: {
  initialService?: Service;
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: initialService?.name || "",
      description: initialService?.description || "",
      price: Number(initialService?.price) || 0,
      duration: formatInterval(initialService?.duration) || "",
    },
  });

  return (
    <form>
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
            type="number"
            error={errors.price?.message}
          />
        )}
      />
      <Controller
        name="duration"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            value={formatInterval(field.value)}
            label="Duración del servicio"
            placeholder="Duración del servicio"
            error={errors.duration?.message}
          />
        )}
      />
    </form>
  );
}
