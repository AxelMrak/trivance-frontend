import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import AuthLayout from '@/components/layouts/AuthLayout';

export default function Register() {
  return (
     <AuthLayout title="Bienvenido/a!" subtitle="Registro">
      <form className="w-full flex flex-col items-stretch justify-center gap-8">
        <Input
          label="Correo electrónico"
          name="email"
          type="email"
          placeholder="maria@trivance.com"
          className="text-3xl"
        />
        <Input
          label="Contraseña"
          name="password"
          type="password"
          placeholder="********"
          className="text-3xl"
        />
        <Button type="submit" variant="primary" className="w-fit !text-3xl !font-light">
          Iniciar sesión
        </Button>
      </form>
    </AuthLayout>
  )
};
