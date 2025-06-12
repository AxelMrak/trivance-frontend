import { UserRole } from "@/types/User";

export type AppRoute = {
	path: string;
	label: string;
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	minRole: UserRole;
};
