import { MainHeader } from "@/components/layouts/dashboard/MainHeader";
import { fetchWithToken } from "@/lib/api/fetchWithToken";
import { ErrorPageComponent } from "@/components/features/error";
import AppointmentDetailsView from "@/components/features/appointments/AppointmentDetailsView";
import { Suspense } from "react";
import AppointmentDetailsSkeleton from "@/components/ui/skeletons/AppointmentDetailsSkeleton";

export default async function AppointmentDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const [apptRes, servicesRes] = await Promise.all([
      fetchWithToken(
        `/appointments/get/${params.id}?include=service,user,client`,
        "GET",
      ),
      fetchWithToken("/services/getAll", "GET"),
    ]);

    if (!apptRes.ok) {
      const message = await apptRes.text();
      throw new Error(message || "Error al obtener el turno");
    }
    if (!servicesRes.ok) {
      const message = await servicesRes.text();
      throw new Error(message || "Error al obtener servicios");
    }

    const appointment = await apptRes.json();
    const services = await servicesRes.json();

    return (
      <>
        <MainHeader title="Detalle del turno" />
        <div className="w-full min-h-[80svh] flex flex-col items-start justify-start gap-4 p-4 text-center bg-white">
          <Suspense fallback={<AppointmentDetailsSkeleton />}>
            <AppointmentDetailsView
              initialAppointment={appointment}
              services={Array.isArray(services) ? services : []}
            />
          </Suspense>
        </div>
      </>
    );
  } catch (error) {
    return (
      <ErrorPageComponent
        error={(error as Error) || new Error("Error desconocido")}
      />
    );
  }
}
