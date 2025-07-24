import { MainHeader } from '@/components/layouts/dashboard/MainHeader';
import Clients from '@/components/features/clients';

export default async function ClientPage() {
  return (


    <>
      <MainHeader title="Clientes" />
      <Clients />
    </>
  );
}
