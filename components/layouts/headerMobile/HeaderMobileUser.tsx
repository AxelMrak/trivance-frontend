import { useUser } from "@/context/UserContext"
import { SettingsIcon } from "@/components/icons/SettingsIcon"

export default function HeaderMobileUser() {

  const { user } = useUser();

  return (
    <section className="w-full flex items-center gap-4 px-4 justify-between">
      <div className="flex flex-row items-center gap-4">
        <div className="relative w-14 h-14 rounded-full overflow-hidden">
          <img
            src="https://avatar.iran.liara.run/public"
            alt="User Profile"
            className="absolute inset-0 object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-gray-800 font-semibold text-base truncate">
            {user?.user?.name}
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
  )
}
