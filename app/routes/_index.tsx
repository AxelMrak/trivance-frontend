import type { MetaFunction } from "@remix-run/node";
import { LogoColor } from "~/components/Icons/Logo";
import AuthSection from "~/components/Sections/AuthSection";

export const meta: MetaFunction = () => {
  return [
    { title: "TriVance" },
    { name: "description", content: "Welcome to TriVance!" },
  ];
};

export default function Index() {
  return (
    <main className="w-full flex flex-col lg:flex-row h-screen items-center justify-between p-4  gap-6">
      <HeroSection />
      <AuthSection />
    </main>
  );
}

function HeroSection() {
  return (
    <section
      className=" w-full lg:w-1/2 h-full flex items-center justify-center relative rounded-md"
      style={{
        backgroundImage: "url('/images/login-bg.webp')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-20 "></div>
      <LogoColor className="absolute top-4 left-4 w-32 h-32" />
    </section>
  );
}
