import { useUser } from "@/context/UserContext";
import { SettingsIcon } from "@/components/icons/SettingsIcon";
import { getRoleLabel } from "@/utils/functions";

export default function HeaderMobileUser() {
  const { user } = useUser();

  return (
    <section className="w-full flex items-center gap-4 px-4 justify-between">
      <div className="flex flex-row items-center gap-4">
        <div className="flex flex-col">
          <span className="text-gray-800 font-semibold text-lg truncate">
            {user?.user?.name}
            <p className="inline-block ml-2 text-gray-500 font-normal text-sm">
              {user?.user?.role && getRoleLabel(user?.user?.role)}
            </p>
          </span>
          <span className="text-gray-600 text-sm truncate">
            {user?.user?.email}
          </span>
        </div>
      </div>
      <SettingsIcon
        className={`transition-all duration-300 ease-in-out hover:opacity-60 cursor-pointer border-gray-800 w-12 h-12`}
      />
    </section>
  );
}
