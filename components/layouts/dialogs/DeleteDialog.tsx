import Button from "@/components/ui/Button";
import TrashIcon from "@/components/icons/TrashIcon";

export default function DeleteDialog({
  data,
  onClose,
  onDelete,
}: {
  data: {
    id: string;
    title: string | null;
  };
  onClose: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 p-4 text-center">
      <h2 className="text-2xl font-semibold text-gray-800">
        ¿Estás seguro de que quieres eliminar {data.title}?
      </h2>
      <p className="text-md font-normal text-gray-500">
        Esta acción no se puede deshacer.
      </p>
      <div className="w-full flex items-center justify-center gap-4">
        <Button
          variant="tertiary"
          className="!bg-gray-200
          !text-gray-800 border !border-gray-300 hover:bg-gray-300 flex items-center justify-center gap-2"
          onClick={onClose}
        >
          Cancelar
        </Button>
        <Button
          variant="tertiary"
          className="!bg-red-500 text-white border border-red-500 hover:bg-red-600 flex items-center justify-center gap-2"
          onClick={onDelete}
        >
          <TrashIcon className="w-5 h-5 " />
          Eliminar
        </Button>
      </div>
    </div>
  );
}
