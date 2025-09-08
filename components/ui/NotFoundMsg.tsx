export default function NotFoundMsg({ message }: { message?: string }) {
  return (
    <div className="w-full h-full flex flex-row items-center justify-start gap-2 text-gray-500 my-4">
      <h2 className="text-xl ">{message || "No se encontraron resultados"}</h2>
    </div>
  );
}
