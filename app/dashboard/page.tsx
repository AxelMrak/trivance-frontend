import Calendar from "@/components/features/calendar";
import Stats from "@/components/features/stats";
import { MainHeader } from "@/components/layouts/dashboard/MainHeader";
import { fetchWithToken } from "@/lib/api/fetchWithToken";

export default async function Dashboard() {
  const res = await fetchWithToken(
    "/appointments/getAll?include=service",
    "GET",
  );
  const appointments = await res.json();

  const summaryStats = await fetchWithToken(
    "/stats/appointments/summary/",
    "GET",
  ).then((res) => res.json());

  const mostUsedService = await fetchWithToken(
    "/stats/appointments/most-used-service?include=service",
    "GET",
  ).then((res) => res.json());

  console.log("Most Used Service:", mostUsedService);
  console.log("Summary Stats:", summaryStats);
  console.log("Appointments:", appointments);

  return (
    <>
      <MainHeader />
      <Calendar appointments={appointments} />
      <Stats summaryStats={summaryStats} mostUsedService={mostUsedService} />
    </>
  );
}
