import { LogoColor } from "@/components/icons/Logos";
import GlobalSearch from "@/components/features/search/GlobalSearch";

export default function SidebarHeader() {
  return (
    <header className="flex flex-col items-center justify-center gap-2">
      <div
        className={`flex items-center justify-center p-2 gap-3 w-full relative`}
      >
        <LogoColor
          className={`transition-all duration-300 ease-in-out w-40 h-40`}
          id="SidebarHeader"
        />
      </div>
      <GlobalSearch />
    </header>
  );
}
