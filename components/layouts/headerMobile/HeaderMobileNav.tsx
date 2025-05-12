"use client";

import { routes } from "@/lib/navigation";
import { AppRoute } from "@/types/Route";
import Link from "next/link";

export default function HeaderMobileNav({ handleCloseMenu }: { handleCloseMenu: () => void }) {
  return (
    <nav className="flex flex-col gap-6">
      {routes.map((route: AppRoute) => (
        <Link
          key={route.label}
          href={route.path}
          onClick={handleCloseMenu}
          className="w-full flex items-center justify-start gap-4 text-2xl text-gray-800 hover:bg-gray-100 py-2 px-4 rounded transition-all duration-200"
        >
          <route.icon className="w-6 h-6 text-gray-800" />
          <span className="text-lg font-semibold">{route.label}</span>
        </Link>
      ))}
    </nav>
  );
}

