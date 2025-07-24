import AuthLayout from "@/components/layouts/AuthLayout";
import { LoginForm } from "@/components/features/auth/forms/LoginForm";

export default function Login() {
  return (
    <AuthLayout title="Bienvenido/a!" subtitle="Inicio de sesión">
      <LoginForm />
    </AuthLayout>
  );
}
