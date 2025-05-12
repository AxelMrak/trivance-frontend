import { routes } from "@/lib/navigation";
import { AppRoute } from "@/types/Route";
import SidebarNavItem from "@components/layouts/sidebar/SidebarNavItem";

export default function SidebarNav({
  collapsed,
}: {
  collapsed: boolean;
}) {
  return (
    <nav className="flex flex-col gap-14 p-4">
      {
        routes.map((route: AppRoute) => (
          <SidebarNavItem
            key={route.label}
            item={route}
            collapsed={collapsed}
          />
        ))
      }
    </nav>
  )
}
