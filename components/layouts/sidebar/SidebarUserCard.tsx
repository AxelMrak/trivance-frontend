import { SettingsIcon } from "@components/icons/SettingsIcon";
import { useUser } from "@/context/UserContext";
import Link from "next/link";

export default function SidebarUserCard({ collapsed }: { collapsed: boolean }) {
  const { user } = useUser();

  return (
    <div
      className={`
        bg-white border border-gray-200 rounded-md w-full
        flex items-center transition-all duration-300 ease-in-out
        ${collapsed ? 'justify-center p-2 gap-2' : 'justify-between p-2 gap-4'}
      `}
    >
      <div className="flex items-center justify-center gap-2">
        {/* Avatar */}
        <div
          className={`
          relative rounded-full overflow-hidden transition-all duration-300 ease-in-out
          ${collapsed ? 'w-0 h-0 opacity-0 hidden' : 'w-10 h-10 opacity-100'}
        `}
        >
          <img
            src="https://avatar.iran.liara.run/public"
            alt="User Profile"
            className="absolute inset-0 object-cover w-full h-full rounded-full"
          />
        </div>

        {/* Text Info */}
        <div
          className={`
          flex flex-col transition-all duration-300 ease-in-out overflow-hidden
          ${collapsed ? 'max-w-0 opacity-0 hidden' : 'max-w-xs opacity-100'}
        `}
        >
          <span className="text-gray-800 font-semibold text-lg truncate">
            {user?.user?.name}
          </span>
          <span className="text-gray-600 text-sm truncate">
            {user?.user?.email}
          </span>
        </div>
        <span className={`text-gray-800 font-semibold text-sm ${collapsed ? 'max-w-full opacity-100' : 'max-w-0 opacity-0 hidden'} transition-all duration-300 ease-in-out`}>
          {user?.user?.name}
        </span>
      </div>
      <Link
        href="/settings"
        className={`
          transition-all duration-300 ease-in-out hover:opacity-60 cursor-pointer text-gray-800
        `}>
        <SettingsIcon
          className={`
          transition-all duration-300 ease-in-out hover:opacity-60 cursor-pointer text-gray-800
  w-6 h-6
`}
        />
      </Link >
    </div>
  );
}

