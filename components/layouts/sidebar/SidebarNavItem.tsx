import { AppRoute } from "@/types/Route";
import Link from "next/link";

export default function SidebarNavItem({
  item,
  collapsed,
}: {
  item: AppRoute;
  collapsed: boolean;
}) {


  return (
    <Link
      className={`text-gray-800 flex flex-row items-center cursor-pointer transition-colors hover:opacity-70 ${collapsed && 'justify-center'} gap-2`}
      href={item.path}
    >
      <item.icon
        width={34}
        height={34}
      />
      <span className={`text-gray-800 text-xl ${collapsed ? 'hidden' : 'block'}`}>
        {item.label}
      </span>
    </Link>
  );
}
