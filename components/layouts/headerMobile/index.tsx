"use client";

import { useState } from "react";
import { LogoColor } from "@/components/icons/Logos";
import MenuIcon from "@/components/icons/MenuIcon";
import CloseIcon from "@/components/icons/CloseIcon";
import Button from "@/components/ui/Button";
import { NotificationIcon } from "@/components/icons/NotificationIcon";
import HeaderMobileNav from "@components/layouts/headerMobile/HeaderMobileNav";
import HeaderMobileUser from "@components/layouts/headerMobile/HeaderMobileUser";
import { LogoutButton } from "@/components/features/auth/LogoutButton";

export default function HeaderMobile({
  className = "",
}: {
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  const handleMenuSwitch = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header
      className={`flex flex-col w-full bg-white text-primary-base ${className} ${isOpen ? "h-screen fixed inset-0" : "h-fit"} `}
    >
      <div className="flex flex-row items-center justify-between gap-4 w-full p-4  bg-white grow-0">
        <LogoColor className="w-28 h-28" id="HeaderMobile" />
        <div className="flex flex-row items-center gap-4">
          <Button
            className="w-fit !text-lg flex items-center justify-center gap-2 h-fit text-primary-base shadow-none hover:opacity-60 cursor-pointer bg-transparent transition-all duration-300 ease-in-out !border-none hover:!border-none"
            onClick={handleMenuSwitch}
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
              ></span>
            </div>
          </Button>
        </div>
      </div>

      <div
        className={`
          w-full overflow-hidden transition-all duration-300 ease-in-out px-8 grow flex flex-col justify-between items-start gap-4 sticky top-0
          ${isOpen ? "max-h-full py-6" : "max-h-0 py-0"}
        `}
      >
        <HeaderMobileNav handleCloseMenu={handleCloseMenu} />
        <div className="w-full flex flex-col items-center gap-4">
          <HeaderMobileUser />
          <LogoutButton collapsed={false} />
        </div>
      </div>
    </header>
  );
}
