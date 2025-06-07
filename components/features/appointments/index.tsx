import { Suspense } from "react";
import SearchInput from "@/components/ui/SearchInput";
import ClientContainerSkeleton from "@/components/ui/skeletons/ClientContainerSkeleton";
import { fetchWithToken } from "@/lib/api/fetchWithToken";
import AppointmentsContainer from "@components/features/appointments/AppointmentsContainer";

export default async function Appointments() {
  const res = await fetchWithToken("/appointments/getAll", "GET");
  const appointments = await res.json();
  return (
    <div className="w-full min-h-[85svh] flex flex-col items-start justify-start gap-4 p-4 text-center bg-white">
      <SearchInput placeholder="Buscar turnos" className="..." />
      <Suspense fallback={<ClientContainerSkeleton />}>
        <AppointmentsContainer initialAppointments={appointments} />
      </Suspense>
    </div>
  );
}
