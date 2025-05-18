import SearchInput from "@/components/ui/SearchInput";
import ServicesContainer from "./ServicesContainer";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { ServicesContainerSkeleton } from "@/components/ui/skeletons/ServicesContainerSkeleton";

export default async function Services() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const res = await fetch(`${process.env.API_URL}/services/getAll`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Error fetching services");
    throw new Error("Failed to fetch services");
  }

  const services = await res.json();

  return (
    <div className="w-full min-h-[85svh] flex flex-col items-start justify-start gap-4 p-4 text-center bg-white">
      <SearchInput placeholder="Buscar servicio" className="w-full text-2xl" />
      <Suspense fallback={<ServicesContainerSkeleton />}>
        <ServicesContainer initialServices={services} />
      </Suspense>
    </div>
  );
}
