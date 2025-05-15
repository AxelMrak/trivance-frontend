import { cookies } from "next/headers";
import { MainHeader } from "@/components/layouts/dashboard/MainHeader";
import { Suspense } from "react";
import ServiceCardSkeleton from "@/components/ui/skeletons/ServiceCardSkeleton";
import Services from "@/components/features/services";

export default async function ServicePage() {
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

  const data = await res.json();

  return (
    <main className="w-full h-full flex flex-col items-center justify-start gap-4 p-4 text-center bg-white">
      <MainHeader title="Servicios" />
      <Suspense
        fallback={
          <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <ServiceCardSkeleton key={i} />
            ))}
          </section>
        }
      >
        <Services services={data} />
      </Suspense>
    </main>
  );
}


