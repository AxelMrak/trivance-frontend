import { Suspense } from "react";
import SearchInput from "@/components/ui/SearchInput";
import ClientsContainer from "./ClientContainer";
import ClientContainerSkeleton from "@/components/ui/skeletons/ClientContainerSkeleton";
import { fetchWithToken } from "@/lib/api/fetchWithToken";

export default async function Clients() {
  const res = await fetchWithToken("/clients/getAll", "GET");
  const clients = await res.json();
  return (
    <div className="w-full min-h-[85svh] flex flex-col items-start justify-start gap-4 p-4 text-center bg-white">
      <SearchInput placeholder="Buscar cliente" className="..." />
      <Suspense fallback={<ClientContainerSkeleton />}>
        <ClientsContainer initialClients={clients} />
      </Suspense>
    </div>
  );
}
