"use client";

import Input from "@/components/ui/Input";
import { ClientFormValues, clientSchema } from "@/lib/validation/client.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Client } from "@/types/Client";
import Button from "@/components/ui/Button";
import SaveIcon from "@/components/icons/SaveIcon";
import DiscardIcon from "@/components/icons/DiscardIcon";
import toast from "react-hot-toast";

export default function ClientForm({
  initialClient,
}: {
  initialClient?: Client;
}) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, dirtyFields, isSubmitting },
  } = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: initialClient?.name || "",
      email: initialClient?.email || "",
      phone: initialClient?.phone || "",
      address: initialClient?.address || "",
    },
  });

  const onSubmit = async (data: ClientFormValues) => {
    const url = initialClient
      ? `${process.env.NEXT_PUBLIC_API_URL}/clients/update/${initialClient.id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/clients/create`;
    const method = initialClient ? "PUT" : "POST";

    await toast.promise(
      fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      }).then(async (response) => {
        if (!response.ok) {
          throw new Error("Error al guardar el cliente");
        }
        reset();
      }),
      {
        loading: initialClient
          ? "Actualizando cliente..."
          : "Creando cliente...",
        success: initialClient
          ? "Cliente actualizado con éxito"
          : "Cliente creado con éxito",
        error: "Hubo un error al guardar el cliente",
      },
    );
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col items-start justify-start gap-4"
    >
      <h2 className="text-2xl font-normal mb-4">
        {initialClient ? "Actualizar cliente" : "Crear cliente"}
      </h2>

      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label="Nombre"
            placeholder="Nombre completo"
            error={errors.name?.message}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label="Correo electrónico"
            placeholder="email@ejemplo.com"
            error={errors.email?.message}
          />
        )}
      />

      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label="Teléfono"
            placeholder="+54 9 11 1234 5678"
            error={errors.phone?.message}
          />
        )}
      />

      <Controller
        name="address"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label="Dirección"
            placeholder="Dirección completa"
            error={errors.address?.message}
          />
        )}
      />

      <div className="w-full grid grid-cols-2 items-center gap-4">
        <Button
          variant="primary"
          type="submit"
          disabled={Object.keys(errors).length > 0 || isSubmitting}
          className="w-full"
        >
          <SaveIcon className="w-4 h-4 mr-2" />
          {initialClient ? "Actualizar cliente" : "Crear cliente"}
        </Button>
        <Button
          variant="tertiary"
          disabled={Object.keys(dirtyFields).length === 0}
          onClick={() => reset()}
          className="w-full disable:opacity-50 disabled:text-gray-500 disabled:cursor-not-allowed whitespace-nowrap"
        >
          <DiscardIcon className="w-4 h-4 mr-2" />
          Deshacer cambios
        </Button>
      </div>
    </form>
  );
}
