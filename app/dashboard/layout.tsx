import { Sidebar } from "@/components/layouts/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="w-full h-full min-h-svh grid grid-cols-[auto_1fr] items-stretch">
      <Sidebar />
      <main className="p-4">{children}</main>
    </div>
  );
}
