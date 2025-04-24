import { Form, useNavigation } from "@remix-run/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { POST_CREDENTIALS } from "~/api/auth/signIn";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email inválido")
    .required("Este campo es obligatorio"),
  password: yup
    .string()
    .min(6, "Mínimo 6 caracteres")
    .required("Este campo es obligatorio"),
});

type LoginFormData = yup.InferType<typeof schema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const [userData, setUserData] = useState<any>(null);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const handleSignIn = async (formData: LoginFormData) => {
    const loginPromise = POST_CREDENTIALS(formData.email, formData.password);

    toast.promise(loginPromise, {
      loading: "Iniciando sesión...",
      success: (res: any) => {
        console.log("Login successful", res);
        const user = res.user;
        const token = res.session?.access_token;

        if (token) {
          document.cookie = `access_token=${token}; path=/; max-age=86400; secure; SameSite=Lax`;
          document.cookie = `refresh_token=${res.session?.refresh_token}; path=/; max-age=86400; secure; SameSite=Lax`;
          document.cookie = `user=${JSON.stringify(
            user
          )}; path=/; max-age=86400; secure; SameSite=Lax`;
        }
        console.log("user", user);
        setUserData(user);
        return `¡Bienvenido, ${user.name || "usuario"}!`;
      },
      error: (err: any) => {
        console.error("Login failed", err);
        return `Error al iniciar sesión: ${err.status || err.toString()}`;
      },
    });
  };
  useEffect(() => {
    const userCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("user="));
    if (userCookie) {
      const user = JSON.parse(userCookie.split("=")[1]);
      setUserData(user);
    }
  }, []);
  if (userData) {
    return (
      <div className=" rounded-md space-y-4">
        <h2 className="text-4xl font-semibold text-primary-base">
          ¡Hola, {userData.email || "usuario"}!
        </h2>
        <div className="bg-gray-100 p-4 rounded-md text-sm font-mono overflow-x-auto max-h-60">
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
      </div>
    );
  }

  return (
    <Form
      method="post"
      onSubmit={handleSubmit(handleSignIn)}
      className="space-y-4 min-h-full w-full"
    >
      <h2 className="text-5xl font-thin">Inicio de sesión</h2>
      <div>
        <input
          {...register("email")}
          placeholder="Email"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>
      <div>
        <input
          type="password"
          {...register("password")}
          placeholder="Contraseña"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-primary-base text-white font-semibold py-2 rounded"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Ingresando..." : "Iniciar sesión"}
      </button>
    </Form>
  );
}
