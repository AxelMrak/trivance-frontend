import { Client } from '@/types/Client';
import Button from '@/components/ui/Button';


export default function ClientCard({
	client,
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
				<div className="flex items-center justify-center gap-2">
					<span className="text-sm text-gray-500">{client.email}</span>
					<span className="text-sm text-gray-500">{client.phone}</span>
				</div>
			</header>

			<p className="text-md font-normal text-gray-400 max-h-20 truncate max-w-full">
				{client.address}
			</p>

			<div className=" grid grid-cols-3 gap-2">
				{/* Llamar */}
				<a
					href={`tel:${client.phone}`}
					className="w-full md:w-auto text-md font-normal text-secondary-base border border-gray-500 flex items-center justify-center gap-2 rounded-md px-4 py-2"
				>
					{/* <PhoneIcon className="w-5 h-5" /> */}
					Llamar
				</a>

				{/* Mensaje */}
				<a
					href={`mailto:${client.email}`}
					className="w-full md:w-auto text-md font-normal text-blue-600 border border-blue-500 flex items-center justify-center gap-2 rounded-md px-4 py-2"
				>
					{/* <MailIcon className="w-5 h-5" /> */}
					Mensaje
				</a>

				{/* Ver detalle */}
				<Button
					variant="primary"
					className="w-full md:w-auto !text-md font-semibold flex items-center justify-center gap-2"
					onClick={() => openEditDialog(client)}
				>
					Ver detalle
				</Button>
			</div>
		</article>
	);
}
