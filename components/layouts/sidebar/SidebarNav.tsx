import { routes } from '@/lib/navigation';
import { AppRoute } from '@/types/Route';
import SidebarNavItem from '@components/layouts/sidebar/SidebarNavItem';
import { useUser } from '@/context/UserContext';

export default function SidebarNav({ collapsed }: { collapsed: boolean }) {
	const { user } = useUser();
	const accessibleRoutes =
		user.user &&
		!user.loading &&
		routes.filter((route) => user.user!.role >= route.minRole);

	return (
		<nav className="flex flex-col gap-14 p-4">
			{accessibleRoutes &&
				accessibleRoutes.map((route: AppRoute) => (
					<SidebarNavItem key={route.path} item={route} collapsed={collapsed} />
				))}
		</nav>
	);
}
