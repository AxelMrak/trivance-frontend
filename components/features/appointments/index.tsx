import { Suspense } from "react";
import SearchInput from "@/components/ui/SearchInput";
import ClientContainerSkeleton from "@/components/ui/skeletons/ClientContainerSkeleton";
import { fetchWithToken } from "@/lib/api/fetchWithToken";
import AppointmentsContainer from "@components/features/appointments/AppointmentsContainer";
import { ErrorPageComponent } from "@/components/features/error";

export default async function Appointments({
  selectedAppointmentId,
}: { selectedAppointmentId?: string } = {}) {
  try {
    const res = await fetchWithToken(
      "/appointments/getAll?include=service,user,client",
      "GET",
    );

    if (!res.ok) {
      const message = await res.text();
      throw new Error(message || "Error al obtener turnos");
    }
    const appointments = await res.json();

    return (
      <div className="w-full min-h-[80svh] flex flex-col items-start justify-start gap-4 p-4 text-center bg-white">
        <Suspense fallback={<ClientContainerSkeleton />}>
          <AppointmentsContainer
            initialAppointments={
              Array.isArray(appointments) ? appointments : []
            }
          />
        </Suspense>
      </div>
    );
  } catch (error) {
    return (
      <ErrorPageComponent
        error={(error as Error) || new Error("Error desconocido")}
      />
    );
  }
}
