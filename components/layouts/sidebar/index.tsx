"use client";
import SidebarNav from "@components/layouts/sidebar/SidebarNav";
import SidebarFooter from "@components/layouts/sidebar/SidebarFooter";
import SidebarHeader from "@components/layouts/sidebar/SidebarHeader";

export const Sidebar = ({ className = "" }: { className?: string }) => {
  return (
    <aside
      className={`h-screen sticky top-0 bg-gray-50 text-white transition-discrete duration-300 ease-in-out px-4 py-6
       flex-col items-stretch justify-between border-r border-gray-200 shadow-r ${className}`}
    >
      <SidebarHeader />
      <SidebarNav />
      <SidebarFooter />
    </aside>
  );
};
