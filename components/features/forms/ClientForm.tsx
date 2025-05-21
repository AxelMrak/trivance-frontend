'use client';

import { Client } from '@/types/Client';

export default function ClientDetails({ client }: { client: Client }) {
	return (
		<div className="w-full">
			<h2 className="text-2xl font-normal mb-4">Detalles del cliente</h2>

			<div className="mb-4">
				<label className="block font-semibold text-gray-700">
					Nombre del cliente
				</label>
				<p className="text-lg text-gray-900">{client.name}</p>
			</div>

			<div className="mb-4">
				<label className="block font-semibold text-gray-700">
					Correo electrónico
				</label>
				<p className="text-lg text-gray-900">{client.email}</p>
			</div>

			<div className="mb-4">
				<label className="block font-semibold text-gray-700">Teléfono</label>
				<p className="text-lg text-gray-900">{client.phone}</p>
			</div>

			<div className="mb-4">
				<label className="block font-semibold text-gray-700">Dirección</label>
				<p className="text-lg text-gray-900">{client.address}</p>
			</div>

			<div className="mb-4">
				<label className="block font-semibold text-gray-700">
					Fecha de creación
				</label>
				<p className="text-lg text-gray-900">
					{new Date(client.created_at).toLocaleString()}
				</p>
			</div>
		</div>
	);
}
