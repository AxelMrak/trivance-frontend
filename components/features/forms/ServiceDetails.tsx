'use client';

import { Service } from '@/types/Service';


export default function ServiceDetails({ service }: { service: Service }) {
	return (
		<div className="w-full">
			<h2 className="text-2xl font-semibold mb-4">Detalles del servicio</h2>

			<div className="mb-4">
				<label className="block font-semibold text-gray-700">
					Nombre del servicio
				</label>
				<p className="text-lg text-gray-900 pl-4">{service.name}</p>
			</div>

			<div className="mb-4">
				<label className="block font-semibold text-gray-700">Descripción</label>
				<p className="text-lg text-gray-900 pl-4">{service.description}</p>
			</div>

			<div className="mb-4">
				<label className="block font-semibold text-gray-700">Precio</label>
				<p className="text-lg text-gray-900 pl-4">{service.price} ARS
				</p>
			</div>

		
		</div>
	);
}
