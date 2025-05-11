import Button from "@/components/ui/Button";

export default function SidebarFooter(
  {
    collapsed,
  }: {
    collapsed: boolean;
  }
) {
  return (
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

    </footer>

  );
}
