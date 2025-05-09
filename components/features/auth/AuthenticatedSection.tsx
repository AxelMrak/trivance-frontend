"use client";
import { useUser } from "@/context/UserContext";
import { logout } from "@/lib/api/auth";
import { toast } from "react-hot-toast";
import Button from "@/components/ui/Button";
import { useRouter } from "next/router";

export const AuthenticatedSection = () => {
  const { user, userDispatch } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    const logoutPromise = logout();
    await toast.promise(logoutPromise, {
      loading: "Cerrando sesión...",
      success: () => {
        userDispatch({ type: "LOGOUT" });
        router.push("/login");
        return "Sesión cerrada";
      },
      error: (error) => `${error}`,
    });
  };

  return (
    <div className="w-full flex flex-col items-stretch justify-center gap-8">
      <h2 className="text-3xl font-light text-gray-800">
        Ya iniciaste sesión como {user?.user?.name}
      </h2>
      <Button
        variant="secondary"
        className="w-full !text-3xl !font-light !text-start"
        onClick={handleLogout}
      >
        Cerrar sesión
      </Button>
    </div>
  );
};
