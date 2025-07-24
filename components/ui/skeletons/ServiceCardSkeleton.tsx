
export default function ServiceCardSkeleton() {
  return (
    <article className="w-full flex flex-col items-start justify-between gap-4 p-4 bg-white border border-gray-300 rounded-md animate-pulse">
      <header className="w-full flex items-center justify-between gap-2">
        <div className="h-6 w-1/3 bg-gray-200 rounded" />
        <div className="flex items-center gap-2">
          <div className="h-5 w-16 bg-gray-200 rounded" />
          <div className="flex items-center gap-1 bg-gray-100 border border-gray-300 rounded-md px-2 py-1">
            <div className="w-5 h-5 bg-gray-300 rounded-full" />
            <div className="h-4 w-10 bg-gray-200 rounded" />
          </div>
        </div>
      </header>

      <div className="w-full h-12 bg-gray-200 rounded" />

      <div className="w-full flex flex-col items-stretch justify-between gap-2">
        <div className="w-full grid grid-cols-2 gap-2">
          <div className="h-10 bg-gray-200 rounded" />
          <div className="h-10 bg-gray-200 rounded" />
        </div>
        <div className="h-10 bg-gray-300 rounded" />
      </div>
    </article>
  );
}
