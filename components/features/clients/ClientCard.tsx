import { Client } from '@/types/Client';
import Button from '@/components/ui/Button';
import PhoneIcon from '@/components/icons/PhoneIcon';
import MailIcon from '@/components/icons/MessageIcon';

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
    <article className="w-full flex flex-col items-start justify-between gap-4 p-4 bg-white border border-gray-300 rounded-md">
      <header className="w-full flex items-center justify-between gap-2">
        <h2 className="text-xl font-semibold text-gray-800">{client.name}</h2>
      </header>
      <div className="w-full grid grid-cols-3 gap-2">
        <Button
          variant="tertiary"
          className="w-full md:w-auto !text-md font-normal !text-secondary-base border !border-gray-500 flex items-center justify-center gap-2"
        >
          <PhoneIcon className="w-5 h-5" />
          Llamar
        </Button>

        <Button
          variant="tertiary"
          className="w-full md:w-auto !text-md font-normal text-blue-600 border !border-blue-500 flex items-center justify-center gap-2"
        >
          <MailIcon className="w-5 h-5" />
          Mensaje
        </Button>

        <Button
          variant="primary"
          className="w-full md:w-auto !text-md font-semibold"
          onClick={() => openEditDialog(client)}
        >
          Ver detalle
        </Button>
      </div>
    </article>
  );
}
