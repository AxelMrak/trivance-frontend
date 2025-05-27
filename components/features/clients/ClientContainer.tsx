'use client';

import { useState } from 'react';
import { Client } from '@/types/Client';
import ClientCard from '@/components/features/clients/ClientCard';
import { useDialog } from '@/context/ModalContext';
import DeleteDialog from '@/components/layouts/dialogs/DeleteDialog';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import ClientForm from '@/components/features/forms/ClientForm';

interface ClientsContainerProps {
	initialClients: Client[];
}

export default function ClientsContainer({
	initialClients,
}: ClientsContainerProps) {
	const [clients, setClients] = useState<Client[]>(initialClients);
	const { openDialog, closeDialog } = useDialog();

	const handleDeleteClient = async (id: string): Promise<void> => {
		const deletePromise = fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/clients/delete/${id}`,
			{
				method: 'DELETE',
				credentials: 'include',
			}
		).then(async (response) => {
			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(errorText || 'Error al eliminar el cliente');
			}

			setClients((prev) => prev.filter((client) => client.id !== id));
			closeDialog();
			return 'Cliente eliminado correctamente';   
		});

		toast.promise(deletePromise, {
			loading: 'Eliminando cliente...',
			success: (message) => message,
			error: (error: unknown) => {
                if (error instanceof Error) {
                    return error.message || 'Error al eliminar el cliente';
                }
				console.error(error);
                return 'Error al eliminar el cliente';
			},
		});
	};

	const openDeleteDialog = (id: string, name?: string | null) => {
		openDialog(
			<DeleteDialog
				data={{ id, title: name || null }}
				onClose={closeDialog}
				onDelete={() => handleDeleteClient(id)}
			/>
		);
	};

	const openEditDialog = (client: Client) => {
		openDialog(<ClientForm client={client} />);
    };

	return (
		<div className="w-full flex flex-col items-start justify-between gap-4">
			<div className="w-full flex items-center justify-between gap-4">
				<span className="text-2xl font-normal text-gray-500">
					{clients.length} clientes encontrados
				</span>
				<Button
					variant="primary"
					className="w-full md:w-auto !text-2xl font-normal"
				>
					Crear cliente +
				</Button>
			</div>
			<section className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
				{clients.length > 0 ? (
					clients.map((client) => (
						<ClientCard
							key={client.id}
							client={client}
							openDeleteDialog={openDeleteDialog}
							openEditDialog={openEditDialog}
						/>
					))
				) : (
					<div className="w-full flex items-center justify-start">
						<p className="text-2xl font-normal text-gray-900 text-start">
							No se encontraron clientes. Podés crear uno nuevo haciendo click
							en el botón de arriba.
						</p>
					</div>
				)}
			</section>
		</div>
	);
}
