"use client";

import { useUser } from "@/context/UserContext";
import { logout } from "@/lib/api/auth";
import { toast } from "react-hot-toast";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { LogoutIcon } from "@/components/icons/LogoutIcon";

export const LogoutButton = () => {
  const { userDispatch } = useUser();
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
      error: (error) => {
        userDispatch({ type: "LOGOUT" });
        router.push("/login");
        return error?.response?.data?.message || "Error al cerrar sesión";
      },
    });
  };

  return (
    <Button
      variant="tertiary"
      className={`
          w-full !text-lg flex items-center gap-2
          transition-all duration-300 ease-in-out
border !border-gray-700 !text-gray-700
        `}
      onClick={handleLogout}
    >
      <p className={` line-clamp-1`}>Cerrar sesión</p>
      <LogoutIcon className="w-6 h-6" />
    </Button>
  );
};
