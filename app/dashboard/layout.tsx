import { Sidebar } from "@/components/layouts/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="w-full h-full min-h-svh grid grid-cols-[auto_1fr] items-stretch">
      <Sidebar className="hidden lg:flex" />
      <main className="w-full p-2 bg-amber-300">{children}</main>
    </div>
  );
}
