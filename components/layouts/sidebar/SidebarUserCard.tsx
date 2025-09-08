import { SettingsIcon } from "@components/icons/SettingsIcon";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { getRoleLabel } from "@/utils/functions";

// Skeleton component
const UserSkeleton = () => (
  <div
    className={`
      bg-white border border-gray-200 rounded-md w-full
      flex items-center transition-all duration-300 ease-in-out
      p-2
    `}
  >
    <div className="flex items-center justify-start gap-2 w-full">
      {/* Text Info Skeleton */}
      <div
        className={`
          flex flex-col transition-all duration-300 ease-in-out overflow-hidden
          justify-between
        `}
        style={{ whiteSpace: "nowrap" }}
      >
        {/* Name and role skeleton */}
        <div className="flex items-center gap-2 mb-1">
          <div className="h-5 bg-gray-200 rounded animate-pulse w-24"></div>
          <div className="h-4 bg-gray-100 rounded animate-pulse w-16"></div>
        </div>
        {/* Email skeleton */}
        <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
      </div>
    </div>
    {/* Settings icon skeleton */}
    <div className="w-6 h-6 bg-gray-200 rounded animate-pulse transition-all duration-300 ease-in-out"></div>
  </div>
);

export default function SidebarUserCard() {
  const { user } = useUser();

  if (!user?.user) {
    return <UserSkeleton />;
  }

  return (
    <div
      className={`
        bg-white border border-gray-200 rounded-md w-full
        flex items-center transition-all duration-300 ease-in-out
        p-2
      `}
    >
      <div className="flex items-center justify-start gap-2 w-full">
        {/* Text Info (nombre y email) */}
        <div
          className={`
            flex flex-col transition-all duration-300 ease-in-out overflow-hidden
            justify-between
          `}
          style={{ whiteSpace: "nowrap" }}
        >
          <span className="text-gray-800 font-semibold text-lg truncate">
            {user.user.name}
            <p className="inline-block ml-2 text-gray-500 font-normal text-sm">
              {user.user.role && getRoleLabel(user.user.role)}
            </p>
          </span>
          <span className="text-gray-600 text-sm truncate">
            {user.user.email}
          </span>
        </div>
      </div>
      <Link
        href="/settings"
        className="transition-all duration-300 ease-in-out hover:opacity-60 cursor-pointer text-gray-800"
      >
        <SettingsIcon className="w-6 h-6" />
      </Link>
    </div>
  );
}
