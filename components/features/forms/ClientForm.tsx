"use client";

import { useMemo, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import SaveIcon from "@/components/icons/SaveIcon";
import DiscardIcon from "@/components/icons/DiscardIcon";
// no dialog usage here; handled by container

import { ClientFormValues, clientSchema } from "@/lib/validation/client.schema";
import { Client } from "@/types/Client";

type Props = {
  initialClient?: Client;
  onSubmit: (data: ClientFormValues) => Promise<void>;
  onClose: () => void;
};

export default function ClientForm({ initialClient, onSubmit, onClose }: Props) {
  const router = useRouter();

  const defaultValues = useMemo<ClientFormValues>(
    () => ({
      name: initialClient?.name ?? "",
      phone: initialClient?.phone ?? "",
      address: initialClient?.address ?? "",
      email: initialClient?.email ?? "",
    }),
    [initialClient],
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const handleFormSubmit = async (data: ClientFormValues) => {
    await onSubmit(data);
  };

  const fields: Array<{
    name: keyof ClientFormValues;
    label: string;
    placeholder: string;
    autoComplete?: string;
    inputMode?: React.ComponentProps<"input">["inputMode"];
    type?: React.ComponentProps<"input">["type"];
  }> = [
    {
      name: "name",
      label: "Nombre",
      placeholder: "Nombre completo",
      autoComplete: "name",
    },
    {
      name: "email",
      label: "Correo electrónico",
      placeholder: "email@ejemplo.com",
      autoComplete: "email",
      type: "email",
    },
    {
      name: "phone",
      label: "Teléfono",
      placeholder: "+54 9 11 1234 5678",
      autoComplete: "tel",
      inputMode: "tel",
    },
    {
      name: "address",
      label: "Dirección",
      placeholder: "Dirección completa",
      autoComplete: "street-address",
    },
  ];

  return (
    <form
      noValidate
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-full flex flex-col items-start justify-start gap-4"
    >
      <h2 className="text-2xl font-normal mb-2">
        {initialClient ? "Actualizar cliente" : "Crear cliente"}
      </h2>

      <fieldset className="w-full flex flex-col gap-4" disabled={isSubmitting}>
        {fields.map((f) => (
          <Controller
            key={f.name}
            name={f.name}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type={f.type}
                label={f.label}
                placeholder={f.placeholder}
                autoComplete={f.autoComplete}
                inputMode={f.inputMode}
                error={errors[f.name]?.message}
              />
            )}
          />
        ))}
      </fieldset>

      <div className="w-full grid grid-cols-2 items-center gap-4">
        <Button
          type="button"
          variant="tertiary"
          disabled={!isDirty || isSubmitting}
          onClick={() => reset()}
          className="w-full disabled:opacity-50 disabled:text-gray-500 disabled:cursor-not-allowed whitespace-nowrap"
        >
          <DiscardIcon className="w-4 h-4 mr-2" />
          Deshacer cambios
        </Button>

        <Button
          variant="primary"
          type="submit"
          disabled={Boolean(Object.keys(errors).length) || isSubmitting}
          className="w-full whitespace-nowrap disabled:opacity-50 disabled:text-gray-500 disabled:cursor-not-allowed"
        >
          <SaveIcon className="w-4 h-4 mr-2" />
          {initialClient ? "Actualizar cliente" : "Crear cliente"}
        </Button>
      </div>
    </form>
  );
}
