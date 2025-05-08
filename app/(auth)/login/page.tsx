import Image from 'next/image';
import {LogoColor} from '@/components/icons/Logos';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
//TODO: Components and refactor all. Separate logic and use zod with react hook form for login and register forms. Also, we need a conditional or wrapper to switch between forms easily.
export default function Login() {
  return (
    <main className="w-full  grid grid-cols-1 lg:grid-cols-2 items-start justify-between p-4 gap-12">
      <section className="w-full h-[95vh] relative rounded-lg shadow hidden lg:block">
        <Image
          src="/images/login-bg.webp"
          alt="Login Image"
          fill
          className="object-cover rounded-lg"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/30 rounded-lg "/>
          <LogoColor className="absolute top-0 left-5 w-50 h-50" /> 
      </section>
      <section className="w-full h-full flex flex-col items-start justify-start gap-12">
          <LogoColor className="block lg:hidden w-50 h-50" />
          <h1 className="text-7xl lg:text-7xl text-primary-base font-normal">
            Bienvenido/a !
          </h1>
        <h2 className="!text-6xl text-gray-800 font-thin">
          Inicio de sesión
        </h2>
        <form className="w-full flex flex-col items-start justify-center gap-8">
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
          <Button
            type="submit"
            variant="primary"
            className="w-fit !text-3xl 
            !font-light"
          >
            Iniciar sesión
          </Button>
        </form>
      </section>
    </main>
  )
};
