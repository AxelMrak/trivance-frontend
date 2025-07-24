import { HeroAuth } from "@/components/features/auth/HeroAuth";
import { LogoColor } from "@/components/icons/Logos";

type AuthLayoutProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export default function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <main className="w-full h-full min-h-svh grid grid-cols-1 lg:grid-cols-2 items-stretch justify-between gap-12 relative">
      <HeroAuth />
      <section className="w-full h-full flex flex-col items-start justify-start gap-10 lg:gap-12 p-6 lg:pr-22">
        <div className="flex flex-row items-start gap-2 flex-wrap">
          <LogoColor className="block lg:hidden w-40 h-40" />
          <h1 className="hidden lg:block lg:text-7xl text-primary-base font-thin">
            {title}
          </h1>
        </div>
        <h2 className="text-5xl lg:text-6xl text-gray-800 font-normal">
          {subtitle}
        </h2>
        {children}
      </section>
    </main>
  );
}
