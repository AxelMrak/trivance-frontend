"use client";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { ReactElement } from "react";
import { useUser } from "@/context/UserContext";
import { AuthenticatedSection } from "../AuthenticatedSection";

export const RegisterForm = (): ReactElement => {
  const { user } = useUser();

  return (
    <section className="w-full flex flex-col items-stretch justify-center gap-8">
      {user && user.user ? (
        <AuthenticatedSection />
      ) : (
        <form className="w-full flex flex-col items-stretch justify-center gap-8">
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
