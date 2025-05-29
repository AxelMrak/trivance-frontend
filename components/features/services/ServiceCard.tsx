import { Service } from "@/types/Service";
import Button from "@/components/ui/Button";
import { formatInterval, formatPrice } from "@/utils/format";
import ClockIcon from "@/components/icons/ClockIcon";
import EditIcon from "@/components/icons/EditIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import { ServiceFormValues } from "@/lib/validation/service.schema";

export default function ServiceCard({
  service,
  openDeleteDialog,
  openEditDialog,
  openViewDialog,
}: {
  service: Service;
  openDeleteDialog: (id: string, name?: string | null) => void;
  openEditDialog: (service: Service) => void;
  openViewDialog?: (service: Service) => void;
}) {
  return (
    <article className="w-full flex flex-col items-start justify-between gap-4 p-4 bg-white border border-gray-300 rounded-md">
      <header className="w-full flex items-center justify-between gap-2">
        <h2 className="text-xl font-semibold text-gray-800">{service.name}</h2>
        <div className="flex items-center justify-center gap-2">
          <span className="text-lg font-normal text-gray-500">
            {formatPrice(service.price)} ARS
          </span>
          <div className="flex items-center gap-1 bg-gray-50 border border-gray-300 rounded-md px-2 py-1 max-w-28 w-fit">
            <ClockIcon className="w-5 h-5 text-gray-500" />
            <span className="font-semibold text-gray-500">
              {formatInterval(service.duration)}
            </span>
          </div>
        </div>
      </header>
      <p className="text-md font-normal text-gray-400 max-h-20 truncate max-w-full">
        {service.description}
      </p>
      <div className="w-full grid grid-cols-3 gap-2">
        <Button
          variant="tertiary"
          className="w-full md:w-auto
                  !text-md font-normal !text-secondary-base border !border-secondary-base hover:bg-secondary-100 flex items-center justify-center gap-2"
          onClick={() => openEditDialog(service)}
        >
          <EditIcon className="w-5 h-5 " />
          Editar
        </Button>

        <Button
          variant="tertiary"
          className="w-full md:w-auto
                    !text-md font-normal text-red-500 border !border-red-500 hover:bg-red-100 flex items-center justify-center gap-2"
          onClick={() => openDeleteDialog(service.id, service.name || null)}
        >
          <TrashIcon className="w-5 h-5 " />
          Eliminar
        </Button>
        <Button
          variant="primary"
          className="w-full md:w-auto
                !text-md font-semibold"
                onClick={() => openViewDialog?.(service)}
        >

          Ver detalles
        </Button>
      </div>
    </article>
  );
}
