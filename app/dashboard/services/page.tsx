import { MainHeader } from "@/components/layouts/dashboard/MainHeader";
import { Suspense } from "react";
import ServiceCardSkeleton from "@/components/ui/skeletons/ServiceCardSkeleton";
import Services from "@/components/features/services";


export default async function ServicePage() {

  const data = await fetch(`http://localhost:3000/api/services`, {
    method: "GET",
  });
  const services = await data.json();
  return (
    <main className="w-full h-full flex flex-col items-center justify-start gap-4 p-4 text-center bg-white">
      <MainHeader title="Servicios" />
      <Suspense fallback={
        <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <ServiceCardSkeleton key={i} />
          ))}
        </section>
      }>
        <Services services={services} />
      </Suspense>
    </main>
  );
}

