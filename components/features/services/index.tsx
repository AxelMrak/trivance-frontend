import SearchInput from "@/components/ui/SearchInput";
import ServicesContainer from "./ServicesContainer";
import { Suspense } from "react";
import { ServicesContainerSkeleton } from "@/components/ui/skeletons/ServicesContainerSkeleton";
import { fetchWithToken } from "@/lib/api/fetchWithToken";
import { ErrorPageComponent } from "@/components/features/error";

export default async function Services() {
  try {
    const res = await fetchWithToken("/services/getAll", "GET");
    if (!res.ok) {
      const message = await res.text();
      throw new Error(message || "Error al obtener servicios");
    }
    const services = await res.json();

    return (
      <div className="w-full min-h-[80svh] flex flex-col items-start justify-start gap-4 p-4 text-center bg-white">
        <SearchInput
          placeholder="Buscar servicio"
          className="w-full text-2xl"
        />
        <Suspense fallback={<ServicesContainerSkeleton />}>
          <ServicesContainer
            initialServices={Array.isArray(services) ? services : []}
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
