
import Button from "@/components/ui/Button";
import SidebarUserCard from "@components/layouts/sidebar/SidebarUserCard";

export default function SidebarFooter({ collapsed }: { collapsed: boolean }) {
  return (
    <footer className="flex flex-col items-center justify-center gap-4 w-full transition-all duration-300 ease-in-out">
      <div className="grid grid-cols-3 items-center gap-2 w-full">
        <Button
          variant="primary"
          className={`
            w-full !text-lg flex items-center gap-2  !col-span-2
            transition-all duration-300 ease-in-out
            ${collapsed ? 'justify-center' : 'justify-between'}
          `}
          onClick={() => alert("¡Hola!")}
        >
          <span
            className={`
              transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden
              ${collapsed ? 'opacity-0 max-w-0 hidden' : 'opacity-100 max-w-xs'}
            `}
          >
            Nuevo turno
          </span>
          <span className="text-xl leading-none">+</span>
        </Button>
      </div>

      <SidebarUserCard collapsed={collapsed} />
    </footer>
  );
}

