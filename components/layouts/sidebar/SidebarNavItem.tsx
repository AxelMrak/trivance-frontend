import { AppRoute } from "@/types/Route";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarNavItem({ item }: { item: AppRoute }) {
  const pathname = usePathname();
  const isActive = pathname === item.path;

  return (
    <Link
      href={item.path}
      className={`
        text-gray-800 flex items-center gap-2 cursor-pointer
        transition-all duration-300 ease-in-out hover:opacity-70
        ${isActive ? "text-primary-base" : "text-gray-800"}
`}
    >
      <item.icon
        className={`
          transition-all duration-300 ease-in-out
        `}
      />

      <span
        className={`
          text-gray-800 text-2xl transition-all duration-300 ease-in-out
          overflow-hidden whitespace-nowrap
          ${isActive ? "text-primary-base" : "text-gray-800"}
`}
      >
        {item.label}
      </span>
    </Link>
  );
}
