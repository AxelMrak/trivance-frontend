import { LogoColor } from "@/components/icons/Logos";
import { SidebarIcon } from "@/components/icons/SidebarIcon";
import SearchInput from "@/components/ui/SearchInput";

export default function SidebarHeader({
  collapsed,
  toggle,
}: {
  collapsed: boolean;
  toggle: () => void;
}) {
  return (
    <header className="flex flex-col items-center justify-center gap-2">
      <div className={`flex items-center justify-between p-2 gap-3 w-full`}>
        <LogoColor
          className={`transition-all duration-300 ease-in-out ${collapsed ? 'w-32' : 'w-40'} h-24`}
        />
        <button onClick={toggle} className="text-gray-700 hover:text-gray-900 cursor-pointer transition-transform hover:scale-110">
          <SidebarIcon
            width={collapsed ? 20 : 32}
            height={collapsed ? 20 : 32}
          />
        </button>
      </div>
      <SearchInput placeholder="Buscar..." />
    </header>
  );
}
