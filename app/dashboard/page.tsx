import Calendar from "@/components/features/calendar";
import { Suspense } from "react";
import ClientContainerSkeleton from "@/components/ui/skeletons/ClientContainerSkeleton";
import Stats from "@/components/features/stats";
import { MainHeader } from "@/components/layouts/dashboard/MainHeader";
import { fetchWithToken } from "@/lib/api/fetchWithToken";
// RoleGuard is client-only; Stats guards itself by role client-side

export default async function Dashboard() {
  // Appointments
  const appointmentsRes = await fetchWithToken(
    "/appointments/getAll?include=service",
    "GET",
  );
  const appointments = appointmentsRes.ok ? await appointmentsRes.json() : [];

  // Summary stats
  const summaryRes = await fetchWithToken(
    "/stats/appointments/summary/",
    "GET",
  );
  const summaryStats = summaryRes.ok ? await summaryRes.json() : undefined;

  // Most used service
  const musRes = await fetchWithToken(
    "/stats/appointments/most-used-service?include=service",
    "GET",
  );
  const mostUsedService = musRes.ok ? await musRes.json() : undefined;

  return (
    <>
      <MainHeader />
      <Suspense fallback={<ClientContainerSkeleton />}>
        <Calendar appointments={appointments} />
      </Suspense>
      <Suspense
        fallback={
          <div className="bg-white border border-gray-200 rounded p-6">
            Cargando estadísticas...
          </div>
        }
      >
        <Stats summaryStats={summaryStats} mostUsedService={mostUsedService} />
      </Suspense>
    </>
  );
}
