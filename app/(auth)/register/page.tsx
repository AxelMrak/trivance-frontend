import AuthLayout from "@/components/layouts/AuthLayout";
import { RegisterForm } from "@/components/features/auth/forms/RegisterForm";

export default function Register() {
  return (
    <AuthLayout title="Bienvenido/a!" subtitle="Registro">
      <RegisterForm />
    </AuthLayout>
  );
}
