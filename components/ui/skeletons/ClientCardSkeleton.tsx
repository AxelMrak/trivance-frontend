export default function ClientCardSkeleton() {
	return (
		<article className="w-full flex flex-col gap-4 p-4 bg-white border border-gray-300 rounded-md animate-pulse">
			<div className="w-full flex items-center justify-between gap-2">
				<div className="h-6 bg-gray-200 rounded w-2/3"></div>
				<div className="flex gap-2">
					<div className="h-6 w-16 bg-gray-200 rounded"></div>
					<div className="h-6 w-16 bg-gray-200 rounded"></div>
				</div>
			</div>
			<div className="h-4 bg-gray-200 rounded w-full"></div>
			<div className="h-4 bg-gray-200 rounded w-3/4"></div>
			<div className="grid grid-cols-3 gap-2 mt-2">
				<div className="h-10 bg-gray-200 rounded"></div>
				<div className="h-10 bg-gray-200 rounded"></div>
				<div className="h-10 bg-gray-200 rounded"></div>
			</div>
		</article>
	);
}
