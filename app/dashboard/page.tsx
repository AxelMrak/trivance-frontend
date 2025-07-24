import Calendar from "@/components/features/calendar";
import { MainHeader } from "@/components/layouts/dashboard/MainHeader";
import { fetchWithToken } from "@/lib/api/fetchWithToken";

export default async function Dashboard() {
  const res = await fetchWithToken("/appointments/getAll", "GET");
  const appointments = await res.json();

  return (
    <>
      <MainHeader />
      <Calendar appointments={appointments} />
    </>
  );
}
