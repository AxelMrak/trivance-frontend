import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data: any) => {
    Promise.resolve(console.log("register", data));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 min-h-full w-full"
    >
      <h2 className="text-5xl font-thin">Registro</h2>
      <div>
        <input
          {...register("name")}
          placeholder="Email"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <input
          type="password"
          {...register("password")}
          placeholder="Contraseña"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />{" "}
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-primary-base text-white font-semibold py-2 rounded"
      >
        Crear cuenta
      </button>
    </form>
  );
}
