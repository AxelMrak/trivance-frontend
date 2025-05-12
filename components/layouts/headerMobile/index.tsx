"use client";

import { useState } from "react";
import { LogoColor } from "@/components/icons/Logos";
import MenuIcon from "@/components/icons/MenuIcon";
import CloseIcon from "@/components/icons/CloseIcon";
import Button from "@/components/ui/Button";
import { routes } from "@/lib/navigation";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { SettingsIcon } from "@/components/icons/SettingsIcon";
import { NotificationIcon } from "@/components/icons/NotificationIcon";

export default function HeaderMobile({
  className = "",
}: {
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();

  return (
    <header className={`flex flex-col w-full bg-white text-primary-base ${className} sticky top-0 z-50 min-h-screen`}>
      <div className="flex flex-row items-center justify-between gap-4 w-full p-4  bg-white grow-0">
        <LogoColor className="w-28 h-28" id="HeaderMobile" />
        <div className="flex flex-row items-center gap-4">
          <Button
            className="w-fit !text-lg flex items-center justify-center gap-2 h-fit text-primary-base shadow-none hover:opacity-60 cursor-pointer bg-transparent transition-all duration-300 ease-in-out !border-none hover:!border-none"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? (
              <CloseIcon className="w-12 h-12 text-gray-800" />
            ) : (
              <MenuIcon className="w-12 h-12 text-primary-base" />
            )}
          </Button>
          <Button
            className={`
    w-full !text-lg flex items-center justify-center gap-2
    transition-all duration-300 ease-in-out
    !text-gray-800 !hover:opacity-60 bg-white hover:text-gray-900 hover:!border-gray-800
    !p-0 h-full relative border-none shadow-none
  `}
            onClick={() => alert("¡Hola!")}
          >
            <div className="relative">
              <NotificationIcon className="w-8 h-8" />
              <span
                className="
        absolute top-1 right-1 bg-secondary-base text-white 
        rounded-full w-2 h-2 flex items-center justify-center
        font-semibold shadow-md"
              >
              </span>
            </div>
          </Button>

        </div>
      </div>

      {/* Animated Menu */}
      <div
        className={`
          w-full overflow-hidden transition-all duration-300 ease-in-out px-8 grow flex flex-col justify-between items-start gap-4
          ${isOpen ? "max-h-full py-6" : "max-h-0 py-0"}
        `}
      >
        <nav className="flex flex-col gap-6">
          {routes.map((route) => (
            <Link
              key={route.label}
              href={route.path}
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-start gap-4 text-2xl text-gray-800 hover:bg-gray-100 py-2 px-4 rounded transition-all duration-200"
            >
              <route.icon className="w-6 h-6 text-gray-800" />
              <span className="text-lg font-semibold">{route.label}</span>
            </Link>
          ))}
        </nav>

        {/* User Section */}
        <section className="w-full flex items-center gap-4 px-4 justify-between">
          <div className="flex flex-row items-center gap-4">
            <div className="relative w-14 h-14 rounded-full overflow-hidden">
              <img
                src="https://avatar.iran.liara.run/public"
                alt="User Profile"
                className="absolute inset-0 object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-gray-800 font-semibold text-base truncate">
                {user?.user?.name}
              </span>
              <span className="text-gray-600 text-sm truncate">
                {user?.user?.email}
              </span>
            </div>
          </div>
          <SettingsIcon
            className={`
          transition-all duration-300 ease-in-out hover:opacity-60 cursor-pointer border-gray-800
  w-12 h-12
`}
          />
        </section>
      </div>
    </header>
  );
}


