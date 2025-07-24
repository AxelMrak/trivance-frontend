"use client";
import { useUser } from "@/context/UserContext";
import { LogoutButton } from "@components/features/auth/LogoutButton";

export const AuthenticatedSection = () => {
  const { user } = useUser();


  return (
    <div className="w-full flex flex-col items-stretch justify-center gap-8">
      <h2 className="text-3xl font-light text-gray-800">
        Ya iniciaste sesión como {user?.user?.name}
      </h2>
      <LogoutButton collapsed={false} />
    </div>
  );
};
