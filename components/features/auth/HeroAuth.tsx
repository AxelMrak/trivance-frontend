import Image from "next/image";
import { LogoColor } from "@/components/icons/Logos";

export const HeroAuth = () => {
  return (
    <section className="w-full shadow hidden lg:block sticky top-0 h-svh rounded-r-sm">
      <Image
        src="/images/login-bg.webp"
        alt="Login Image"
        fill
        className="object-cover  shadow rounded-r-sm"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/30  shadow rounded-r-sm" />
      <LogoColor className="absolute top-0 left-5 w-50 h-50" id="desktop" />
    </section>
  );
};
