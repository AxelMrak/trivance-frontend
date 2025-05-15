'use client';
import { useState } from "react";
import SidebarNav from "@components/layouts/sidebar/SidebarNav";
import SidebarFooter from "@components/layouts/sidebar/SidebarFooter";
import SidebarHeader from "@components/layouts/sidebar/SidebarHeader";

export const Sidebar = ({
  className = "",
}: {
  className?: string;
}) => {

  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <aside
      className={`h-screen sticky top-0 bg-gray-50 text-white transition-discrete duration-300 ease-in-out p-2
      ${collapsed ? 'w-32' : 'w-64'} flex-col items-stretch justify-between ${className}`}
    >

      <SidebarHeader collapsed={collapsed} toggle={toggle} />
      <SidebarNav collapsed={collapsed} />
      <SidebarFooter collapsed={collapsed} />
    </aside>
  );


};
