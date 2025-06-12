import React from "react";
import { useUser } from "@/context/UserContext";
import { UserRole } from "@/types/User";

interface RoleGuardProps {
    minRole: UserRole;
    fallback?: React.ReactNode;
    children: React.ReactNode;
}

export default function RoleGuard({minRole, fallback, children}: RoleGuardProps) {
    const { user } = useUser();
    
    if(!user.user ||  user.user.role < minRole) {
        return <>{fallback || <p>No tienes permisos suficientes para acceder a esta página</p>}</>;
    }
    return <>{children}</>;
}



