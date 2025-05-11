'use client';
import { LogoColor } from "@/components/icons/Logos";
import { SidebarIcon } from "@/components/icons/SidebarIcon";
import { useUser } from "@/context/UserContext";
import Button from "@/components/ui/Button";
import { NotificationIcon } from "@/components/icons/NotificationIcon";
import { useState } from "react";
import { SettingsIcon } from "@components/icons/SettingsIcon";
import SidebarNav from "@components/layouts/sidebar/SidebarNav";
import SidebarFooter from "@components/layouts/sidebar/SidebarFooter";

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
      <SidebarNav collapsed={collapsed} />
      <SidebarFooter collapsed={collapsed} />
    </aside>
  );


};
