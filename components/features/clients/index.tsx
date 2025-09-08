import { Suspense } from "react";
import SearchInput from "@/components/ui/SearchInput";
import ClientsContainer from "./ClientContainer";
import ClientContainerSkeleton from "@/components/ui/skeletons/ClientContainerSkeleton";
import { fetchWithToken } from "@/lib/api/fetchWithToken";
import { ErrorPageComponent } from "@/components/features/error";

export default async function Clients() {
  try {
    const res = await fetchWithToken("/clients/getAll", "GET");
    if (!res.ok) {
      const message = await res.text();
      throw new Error(message || "Error al obtener clientes");
    }
    const clients = await res.json();
    console.log(clients);
    return (
      <div className="w-full min-h-[85svh] flex flex-col items-start justify-start gap-4 p-4 text-center bg-white">
        <SearchInput placeholder="Buscar cliente" className="w-full text-2xl" />
        <Suspense fallback={<ClientContainerSkeleton />}>
          <ClientsContainer
            initialClients={Array.isArray(clients) ? clients : []}
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
