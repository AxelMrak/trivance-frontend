'use client';
import { LogoColor } from "@/components/icons/Logos";
import { SidebarIcon } from "@/components/icons/SidebarIcon";
import { useUser } from "@/context/UserContext";
import Button from "@/components/ui/Button";
import { NotificationIcon } from "@/components/icons/NotificationIcon";
import { useState } from "react";
import { SettingsIcon } from "../icons/SettingsIcon";
import { routes } from "@/lib/navigation";

export const Sidebar = () => {

  const [collapsed, setCollapsed] = useState(false);
  const { user } = useUser();
  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <aside
      className={`h-full bg-gray-50 text-white transition-discrete duration-300 ease-in-out p-2 
      ${collapsed ? 'w-32' : 'w-64'} flex flex-col items-stretch justify-between`}
    >
      <header className={`flex items-center justify-between p-2 gap-6 w-full`}>
        <LogoColor
          className={`${collapsed ? 'w-32' : 'w-34 '} w-32 h-24`}
        />
        <button onClick={toggle} className="text-gray-700 hover:text-gray-900 cursor-pointer transition-transform hover:scale-110">
          <SidebarIcon
            width={collapsed ? 20 : 32}
            height={collapsed ? 20 : 32}
          />
        </button>
      </header>

      <nav className="flex flex-col gap-14 p-4">
        {
          routes.map((route) => (
            <div className={`text-gray-800 flex flex-row items-center cursor-pointer transition-colors hover:opacity-70 ${collapsed && 'justify-center'
              } gap-2`} key={route.label}>
              <route.icon
                width={34}
                height={34}
              />
              <span className={`text-gray-800 text-xl ${collapsed ? 'hidden' : 'block'}`}>
                {route.label}
              </span>
            </div>
          ))
        }
      </nav>

      <footer className="flex flex-col items-center justify-center gap-4">
        <div className="grid grid-cols-3 items-center justify-between gap-2 w-full">
          <Button
            variant="primary"
            className={`w-full !text-lg flex flex-row items-center ${collapsed ? 'justify-center' : 'justify-between'
              } gap-2 !py-1 !px-2 !col-span-2`}
            onClick={() => alert("¡Hola!")}
          >
            {collapsed ? null : <span className="whitespace-nowrap">Nuevo turno</span>}
            <span>+</span>
          </Button>
        </div>
        <div className={`bg-white flex flex-row items-center ${collapsed ? 'justify-center' : 'justify-start'} gap-4 border border-gray-200 ${collapsed ? 'px-4 py-2' : 'p-2'}  rounded-md w-full transition-transform `}>
          <div className={`rounded-full overflow-hidden ${collapsed ? 'hidden' : 'block'} w-10 h-10 relative`}>
            <img
              src={'https://avatar.iran.liara.run/public'}
              alt="User Profile"
              className="absolute inset-0 object-cover w-full h-full rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <span className={`text-gray-800 font-semibold ${collapsed ? 'text-sm' : 'text-lg'}`}>
              {user?.user?.name}
            </span>
            <span className={`text-gray-600 ${collapsed ? 'hidden' : 'text-sm'}`}>
              {user?.user?.email}
            </span>
          </div>

          <SettingsIcon width={collapsed ? 26 : 32} height={collapsed ? 26 : 32} className="self-start hover:opacity-60 transition-transform cursor-pointer" />
        </div>
      </footer>
    </aside>
  );


};
