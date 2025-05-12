import HeaderMobile from "@/components/layouts/headerMobile";
import { Sidebar } from "@/components/layouts/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full min-h-svh grid grid-cols-1 lg:grid-cols-[auto_1fr] lg:grid-rows-1">
      <Sidebar className="hidden lg:flex" />
      <div className="flex flex-col h-full lg:h-auto">
        <HeaderMobile className="flex lg:hidden shrink-0" />
        <main className="flex-1 min-h-0 overflow-auto ">
          {children}
        </main>
      </div>
    </div>
  );
}

