import { useState } from "react";
import LoginForm from "../Form/LoginForm";
import RegisterForm from "../Form/RegisterForm";

export default function AuthSection() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <section className="w-full lg:w-1/2  p-2 min-h-full flex flex-col items-start justify-evenly">
      <h1 className="text-8xl text-primary-base font-light">
        {isLogin ? "Bienvenido/a!" : "Crea una cuenta!"}
      </h1>
      {isLogin ? <LoginForm /> : <RegisterForm />}
      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={() => setIsLogin((prev) => !prev)}
          className="text-gray-600 hover:underline"
        >
          {isLogin
            ? "No tenes cuenta? Registrate"
            : "Tenes una cuenta? Inicia sesion"}
        </button>
      </div>
    </section>
  );
}
