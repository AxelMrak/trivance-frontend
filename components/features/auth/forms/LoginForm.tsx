"use client";

import { ReactElement } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { loginSchema, LoginFormValues } from "@/lib/validation/auth.schema";
import { login } from "@/lib/api/auth";
import { Controller, useForm } from "react-hook-form";

export const LoginForm = (): ReactElement => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValidating },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    const loginPromise = login(data);
    await toast.promise(loginPromise, {
      loading: "Iniciando sesión...",
      success: (data) => {
        if (data?.user) {
          return `Bienvenido/a ${data.user.name}`;
        }
        return "Iniciando sesión...";
      },
      error: (error) => `${error}`,
    });
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-start gap-8">
      <Controller
        control={control}
        name="email" 
        render={({ field }) => (
          <Input
            label="Correo electrónico"
            type="email"
            placeholder="maria@trivance.com"
            error={errors.email?.message}
            className="text-3xl"
            required
            {...field}
          />
          )}
        />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Input
            label="Contraseña"
            type="password"
            placeholder="********"
            className="text-3xl text-gray-800"
            error={errors.password?.message}
            required
            {...field}
          />
        )}
        />
      <Button
        type="submit"
        variant="primary"
        className="w-full !text-3xl !font-light !text-start"
      >
        Iniciar sesión
      </Button>
    </form>
  );
};

