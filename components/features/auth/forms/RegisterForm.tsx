"use client";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { ReactElement } from "react";
import { useUser } from "@/context/UserContext";
import { AuthenticatedSection } from "../AuthenticatedSection";
import {
  RegisterFormValues,
  registerSchema,
} from "@/lib/validation/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { register } from "@/lib/api/auth";
import Input from "@/components/ui/Input";
import { toast } from "react-hot-toast";

export const RegisterForm = (): ReactElement => {
  const { user, userDispatch } = useUser();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValidating, isSubmitSuccessful },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    const registerPromise = register(data);
    await toast.promise(registerPromise, {
      loading: "Creando cuenta...",
      success: (data) => {
        if (data?.user) {
          userDispatch({ type: "SET_USER", payload: data.user });
          return `Bienvenido/a ${data?.user?.name}`;
        }
        return "Iniciando sesión...";
      },
      error: (error) => `${error}`,
    });
  };

  return (
    <section className="w-full flex flex-col items-stretch justify-center gap-8">
      {user && user.user ? (
        <AuthenticatedSection />
      ) : (
        <form
          className="w-full flex flex-col items-stretch justify-center gap-8 pb-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <Input
                label="Nombre"
                type="text"
                placeholder="Maria"
                error={errors.name?.message}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Input
                label="Correo electrónico"
                type="email"
                placeholder="maria@trivance.com"
                error={errors.email?.message}
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
                error={errors.password?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="confirmedPassword"
            control={control}
            render={({ field }) => (
              <Input
                label="Confirmar contraseña"
                type="password"
                placeholder="********"
                error={errors.confirmedPassword?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Input
                label="Teléfono"
                type="text"
                placeholder="11 1234 5678"
                error={errors.phone?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <Input
                label="Dirección"
                type="text"
                placeholder="Av. Corrientes 1234"
                error={errors.address?.message}
                {...field}
              />
            )}
          />

          <Button
            type="submit"
            variant="secondary"
            className="!text-3xl !font-light w-full"
          >
            Registrate
          </Button>
          <span className="text-2xl font-light text-gray-800">
            Ya tenes cuenta?{" "}
            <Link
              className="font-normal text-secondary-800 transition-all hover:underline"
              href="/login"
            >
              Inicia sesión aca
            </Link>
          </span>
        </form>
      )}
    </section>
  );
};
