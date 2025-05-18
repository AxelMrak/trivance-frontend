import ServiceCardSkeleton from "@components/ui/skeletons/ServiceCardSkeleton";

export function ServicesContainerSkeleton() {
  return (
    <div className="w-full flex flex-col items-start justify-between gap-4 animate-pulse">
      <div className="w-full flex items-center justify-between gap-4">
        <div className="h-8 w-48 bg-gray-200 rounded-md" />
        <div className="h-10 w-40 md:w-52 bg-primary/30 rounded-md" />
      </div>
      <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ServiceCardSkeleton key={i} />
        ))}
      </section>
    </div>
  );
}
