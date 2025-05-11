import { SettingsIcon } from "@components/icons/SettingsIcon";
import { useUser } from "@/context/UserContext";

export default function SidebarUserCard({
  collapsed,
}: {
  collapsed: boolean;
}) {
  const { user } = useUser();

  return (
    <div className={`bg-white flex flex-row items-center ${collapsed ? 'justify-center' : 'justify-start'} gap-4 border border-gray-200 ${collapsed ? 'px-4 py-2' : 'p-2'}  rounded-md w-full transition-transform `}>
      <div className={`rounded-full overflow-hidden ${collapsed ? 'hidden' : 'block'} w-10 h-10 relative`}>
        <img
          src={'https://avatar.iran.liara.run/public'}
          alt="User Profile"
          className="absolute inset-0 object-cover w-full h-full rounded-full"
        />
      </div>
      <div className="flex flex-col">
        <span className={`text-gray-800 font-semibold ${collapsed ? 'text-sm' : 'text-lg'}`}>
          {user?.user?.name}
        </span>
        <span className={`text-gray-600 ${collapsed ? 'hidden' : 'text-sm'}`}>
          {user?.user?.email}
        </span>
      </div>

      <SettingsIcon width={collapsed ? 26 : 32} height={collapsed ? 26 : 32} className="self-start hover:opacity-60 transition-transform cursor-pointer" />
    </div>
  )
}
