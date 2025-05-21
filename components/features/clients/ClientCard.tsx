import { Client } from '@/types/Client';
import Button from '@/components/ui/Button';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { PhoneIcon } from '@/components/icons/PhoneIcon';

export default function ClientCard({
  client,
  openDeleteDialog,
  openEditDialog,
}: {
  client: Client;
  openDeleteDialog: (id: string, name?: string | null) => void;
  openEditDialog: (client: Client) => void;
}) {
  return (
    <article className="w-full flex flex-col gap-4 p-4 bg-white border border-gray-300 rounded-md">
      <header className="w-full flex items-center justify-between gap-2">
        <h2 className="text-xl font-semibold text-gray-800 truncate">{client.name}</h2>
      </header>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        <a
          href={`https://wa.me/${client.phone}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <Button
            variant="tertiary"
            className="w-full !text-md font-normal !text-[#25d366] border !border-[#25d366] flex items-center justify-center gap-2"
          >
            <WhatsAppIcon className="w-5 h-5" />
            Mensaje
          </Button>
        </a>

        <a href={`tel:${client.phone}`} className="w-full">
          <Button
            variant="tertiary"
            className="w-full !text-md font-normal !text-blue-600 border !border-blue-600 flex items-center justify-center gap-2"
          >
            <PhoneIcon className="w-5 h-5" />
            Llamar
          </Button>
        </a>

        <Button
          variant="primary"
          className="w-full !text-md font-semibold"
          onClick={() => openEditDialog(client)}
        >
          Ver detalle
        </Button>
      </div>
    </article>
  );
}
