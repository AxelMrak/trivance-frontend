import Calendar from "@/components/features/calendar";
import { MainHeader } from "@/components/layouts/dashboard/MainHeader";
import { fetchWithToken } from "@/lib/api/fetchWithToken";
import { Suspense } from "react";
import ClientContainerSkeleton from "@/components/ui/skeletons/ClientContainerSkeleton";

export default async function CalendarPage() {
  const res = await fetchWithToken("/appointments/getAll?include=service", "GET");
  const appointments = await res.json();
  return <>
    <MainHeader title="Calendario" />
    <Suspense fallback={<ClientContainerSkeleton />}>
      <Calendar appointments={appointments} />
    </Suspense>
  </>
}
