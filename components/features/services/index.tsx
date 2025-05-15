import { Service } from "@/types/Service";
import Button from "@/components/ui/Button";
import SearchInput from "@/components/ui/SearchInput";
import ServiceCard from "./ServiceCard";
import ServiceCardSkeleton from "@/components/ui/skeletons/ServiceCardSkeleton";
export default function Services({ services }: { services: Service[] }) {
  return (
    <div className="w-full min-h-[85svh] flex flex-col items-start justify-start gap-4 p-4 text-center bg-white">
      <div className="w-full flex flex-col items-start justify-between gap-4">
        <SearchInput placeholder="Buscar servicio" className="w-full text-2xl" />
        <div className="w-full flex items-center justify-between gap-4">
          <span className="text-2xl font-normal text-gray-500">
            {services.length} servicios encontrados
          </span>
          <Button
            variant="primary"
            className="w-full md:w-auto
              !text-2xl font-normal"

          >
            Crear servicio
            +
          </Button>
        </div>
      </div>
      <section className="w-full grid grid-cols-1 md:grid-cols-2  gap-4">
        {
          services ? services.length > 0 ? (
            services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))
          ) : (
            <div className="w-full flex items-center justify-start">
              <p className="text-2xl font-normal text-gray-900 text-start ">
                No se encontraron servicios. Podes crear uno nuevo haciendo click en el botón de arriba.
              </p>
            </div>
          ) : (
            Array.from({ length: 4 }, (_, index) => (
              <ServiceCardSkeleton key={index} />
            )))
        }
      </section>

    </div>
  );
}
