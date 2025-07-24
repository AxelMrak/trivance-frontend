
import { LogoColor } from "@/components/icons/Logos";

import Link from "next/link";

export default function NotFoundComponent() {
  return (
    <main className="flex flex-col items-center justify-center w-full h-screen gap-4 p-4 text-center bg-white">
      <LogoColor className="w-45 h-45" />
      <h1 className="text-4xl font-bold text-gray-800">
        404 - Página no encontrada
      </h1>
      <p className="text-lg text-gray-600">
        Lo sentimos, la página que estás buscando no existe o ha sido eliminada.
        Por favor, verifica la URL o vuelve a la página de inicio.
      </p>
      <Link
        className="px-4 py-2 text-white text-xl !bg-primary-base rounded-md hover:bg-primary-dark"
        href="/dashboard"
      >
        Ir a la página de inicio
      </Link>
    </main>
  )
}
