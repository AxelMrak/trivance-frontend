import { Suspense } from 'react';
import SearchInput from '@/components/ui/SearchInput';
import ClientsContainer from './ClientContainer';
import ClientContainerSkeleton from '@/components/ui/skeletons/ClientContainerSkeleton';
import { cookies } from 'next/headers';

export default async function Clients() {
	const cookieStore = await cookies();
	const token = cookieStore.get('token')?.value;

	const res = await fetch(`${process.env.API_URL}/clients/get-all`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		cache: 'no-store',
	}); 

	if (!res.ok) throw new Error('Failed to fetch clients');

	const clients = await res.json();

	return (
		<div className="...">
			<SearchInput placeholder="Buscar cliente" className="..." />
			<Suspense fallback={<ClientContainerSkeleton />}>
				<ClientsContainer initialClients={clients} />
			</Suspense>
		</div>
	);
}
