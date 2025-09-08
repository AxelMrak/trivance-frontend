"use client";
import { LogoutButton } from "@/components/features/auth/LogoutButton";
import { LogoutIcon } from "@/components/icons/LogoutIcon";
import { NotificationIcon } from "@/components/icons/NotificationIcon";
import Button from "@/components/ui/Button";
import { useDialog } from "@/context/ModalContext";
import AppointmentForm from "@/components/features/forms/AppointmentForm";
import { useCallback } from "react";
import type { Service } from "@/types/Service";
import type { Appointment } from "@/types/Appointment";
import SidebarUserCard from "@components/layouts/sidebar/SidebarUserCard";
import { useRouter } from "next/navigation";

export default function SidebarFooter() {
  const { openDialog, closeDialog } = useDialog();
  const router = useRouter();
  const openNewAppointment = useCallback(async () => {
    try {
      const [servicesRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/getAll`, {
          credentials: "include",
        }),
      ]);
      const services = (await servicesRes.json()) as Service[];
      openDialog(
        <AppointmentForm
          services={Array.isArray(services) ? services : []}
          appointments={[] as any}
          onAppointmentCreated={() => {
            closeDialog();
            router.refresh();
          }}
        />,
      );
    } catch (_e) {
      // no-op; could show a toast here if desired
    }
  }, [openDialog, closeDialog]);

  return (
    <footer className="flex flex-col items-center justify-center gap-4 w-full transition-all duration-300 ease-in-out">
      <Button
        variant="primary"
        className={`
            w-full  flex items-center gap-2  !col-span-2
            transition-all duration-300 ease-in-out
          `}
        onClick={openNewAppointment}
      >
        <span
          className={`
              transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden
            `}
        >
          Nuevo turno
        </span>
        <span className="text-xl leading-none">+</span>
      </Button>
      {/*
        <Button
          className={`
    w-full !text-lg flex items-center justify-center gap-2
    transition-all duration-300 ease-in-out
    !text-gray-800 !hover:opacity-60 bg-white hover:text-gray-900 hover:!border-gray-800
    !p-0 h-full relative
    ${collapsed ? "px-1 py-1" : "px-2 py-2"}
  `}
          onClick={() => alert("¡Hola!")}
        >
          <div className="relative">
            <NotificationIcon className="w-6 h-6" />
            <span
              className="
        absolute top-0 right-1 bg-secondary-base text-white text-xs
        rounded-full w-2 h-2 flex items-center justify-center
        font-semibold shadow-md"
            >
            </span>
          </div>
        </Button>
 */}

      <SidebarUserCard />
      <LogoutButton />
    </footer>
  );
}
