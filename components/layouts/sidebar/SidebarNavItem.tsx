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
      href={item.path}
      className={`
        text-gray-800 flex items-center gap-2 cursor-pointer
        transition-all duration-300 ease-in-out hover:opacity-70
        ${collapsed ? 'justify-center' : 'justify-start'}
`}
    >
      <item.icon
        className={`
          transition-all duration-300 ease-in-out
          ${collapsed ? 'w-6 h-6' : 'w-8 h-8'}
        `}
      />

      <span
        className={`
          text-gray-800 text-2xl transition-all duration-300 ease-in-out
          overflow-hidden whitespace-nowrap
          ${collapsed ? 'opacity-0 max-w-0 hidden' : 'opacity-100 max-w-fit'}
`}
      >
        {item.label}
      </span>
    </Link>
  );
}

