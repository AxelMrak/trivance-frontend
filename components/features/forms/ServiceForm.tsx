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
import DiscardIcon from "@/components/icons/DiscardIcon";

export default function ServiceForm({
  initialService,
}: {
  initialService?: Service;
}) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: initialService?.name || "",
      description: initialService?.description || "",
      price: Number(initialService?.price) || 0,
      duration: formatInterval(initialService?.duration) || "",
    },
  });

  const onSubmit = async (data: ServiceFormValues) => {
    const { name, description, price, duration } = data;
    const serviceData = {
      name,
      description,
      price: price.toString(),
      duration: duration,
    };
    const url = initialService
      ? `${process.env.NEXT_PUBLIC_API_URL}/services/update/${initialService.id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/services/create`;
    const method = initialService ? "PUT" : "POST";
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(serviceData),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Error al guardar el servicio");
      }
      reset();
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
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
            type="number"
            error={errors.price?.message}
          />
        )}
      />

      <div className="w-full grid grid-cols-2 items-center gap-4">
        <Button
          variant="primary"
          type="submit"
        >
          <SaveIcon className="w-4 h-4 mr-2" />
          {
            initialService ? "Actualizar servicio" : "Crear servicio"
          }
        </Button>
        <Button
          variant="tertiary"
          disabled={Object.keys(dirtyFields).length === 0}
          onClick={() => reset()}
          className="w-full disable:opacity-50 disabled:text-gray-500 disabled:cursor-not-allowed"
        >
          <DiscardIcon className="w-4 h-4 mr-2" />
          Deshacer cambios
        </Button>
      </div>
    </form>
  );
}
