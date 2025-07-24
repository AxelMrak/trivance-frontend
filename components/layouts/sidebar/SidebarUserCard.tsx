import { SettingsIcon } from '@components/icons/SettingsIcon';
import { useUser } from '@/context/UserContext';
import Link from 'next/link';

export default function SidebarUserCard({ collapsed }: { collapsed: boolean }) {
	const { user } = useUser();

	return (
		<div
			className={`
        bg-white border border-gray-200 rounded-md w-full
        flex items-center transition-all duration-300 ease-in-out
        ${collapsed ? 'justify-center p-2 gap-2' : 'justify-between p-2 gap-4'}
      `}
		>
			<div className="flex items-center justify-center gap-2">
				{/* Avatar */}
				<div
					className={`
            relative rounded-full overflow-hidden transition-all duration-300 ease-in-out
            ${collapsed ? 'w-10 h-10' : 'w-10 h-10'}
          `}
				>
					<img
						src="https://avatar.iran.liara.run/public"
						alt="User Profile"
						className="absolute inset-0 object-cover w-full h-full rounded-full"
					/>
				</div>

				{/* Text Info (nombre y email) */}
				<div
					className={`
            flex flex-col transition-all duration-300 ease-in-out overflow-hidden
            ${collapsed ? 'max-w-0 opacity-0' : 'max-w-xs opacity-100'}
          `}
					style={{ whiteSpace: 'nowrap' }}
				>
					<span className="text-gray-800 font-semibold text-lg truncate">
						{user?.user?.name}
					</span>
					<span className="text-gray-600 text-sm truncate">
						{user?.user?.email}
					</span>
				</div>
			</div>

			<Link
				href="/settings"
				className="transition-all duration-300 ease-in-out hover:opacity-60 cursor-pointer text-gray-800"
			>
				<SettingsIcon className="w-6 h-6" />
			</Link>
		</div>
	);
}
