import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import AuthLayout from '@/components/layouts/AuthLayout';
import Link from 'next/link';

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
        <Button type="submit" variant="secondary" className="!text-3xl !font-light w-full">
          Registrate
        </Button>
                <span className="text-2xl font-light text-gray-800">
          Ya tenes cuenta? <Link className="font-normal text-secondary-800 transition-all hover:underline" href="/login">Inicia sesión aca</Link>
        </span>
      </form>
    </AuthLayout>
  )
};
