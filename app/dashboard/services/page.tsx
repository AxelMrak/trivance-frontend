import { MainHeader } from "@/components/layouts/dashboard/MainHeader";
import Services from "@/components/features/services";

export default async function ServicePage() {
  return (
    <>
      <MainHeader title="Servicios" />
      <Services />
    </>
  );
}
