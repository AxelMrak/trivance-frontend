import AuthLayout from "@/components/layouts/AuthLayout";
import { LoginForm } from "@/components/features/auth/forms/LoginForm";
import Link from "next/link";

export default function Login() {
  return (
    <AuthLayout title="Bienvenido/a!" subtitle="Inicio de sesión">  
    <div className="w-full flex flex-col items-stretch justify-center gap-8">
      <div className="w-full flex flex-col items-stretch justify-center gap-8">
      <LoginForm />
      </div>
      <span className="text-2xl font-light text-gray-800">
        No tenes cuenta?{" "}
         <Link
          className="font-normal text-primary-base transition-all hover:underline"
          href="/register"
        >
           Registrate aca
         </Link>
        </span>
      </div>
    </AuthLayout>
  );
}
