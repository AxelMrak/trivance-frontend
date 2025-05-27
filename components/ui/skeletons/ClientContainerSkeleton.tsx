import ClientCardSkeleton from './ClientCardSkeleton';

export default function ClientContainerSkeleton() {
	return (
		<div className="w-full flex flex-col items-start justify-between gap-4">
			<div className="w-full flex items-center justify-between gap-4">
				<div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
				<div className="h-10 w-40 bg-gray-200 rounded animate-pulse"></div>
			</div>
			<section className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
				{Array.from({ length: 4 }).map((_, index) => (
					<ClientCardSkeleton key={index} />
				))}
			</section>
		</div>
	);
}
