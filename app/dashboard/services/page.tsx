
import Services from "@/components/features/services";
import { MainHeader } from "@/components/layouts/dashboard/MainHeader";
export default async function ServicePage() {


  const services = [
    {
      id: "08ceb311-c67c-476c-83db-f11e9729a4c4",
      company_id: "6f299074-dc4c-47b7-9aed-4683fb29d97e",
      name: "Initial Consultation",
      description: "A 30-minute session to understand client needs and provide professional advice.",
      duration: { hours: 0, minutes: 30 },
      price: "5000.00",
      created_at: "2025-05-14 21:38:56.042"
    },
    {
      id: "2f4b3d1a-95d6-4a7c-91f2-9f9de18459f1",
      company_id: "7a2fd0c3-2c1a-45b2-8c6a-2bcd4f7230ae",
      name: "Website Audit",
      description: "Comprehensive review of your website's performance, SEO, and UX.",
      duration: { hours: 1, minutes: 0 },
      price: "15000.00",
      created_at: "2025-05-14 21:39:00.000"
    },
    {
      id: "4c6501a5-c404-4b9e-bc0b-d6123fe2c8e3",
      company_id: "53bcce55-d9b3-4c0d-8f6e-b44fc127a476",
      name: "Logo Design",
      description: "Professional logo design including 3 initial concepts and 2 revisions.",
      duration: { hours: 1, minutes: 30 },
      price: "20000.00",
      created_at: "2025-05-14 21:39:04.000"
    },
    {
      id: "ac785c4d-301f-47ed-b97b-4d4f1813b3f7",
      company_id: "c72e8758-3d20-4e1e-987b-9a7cb45f8c7c",
      name: "Resume Writing",
      description: "Get a polished, professional resume tailored to your target industry.",
      duration: { hours: 0, minutes: 45 },
      price: "8000.00",
      created_at: "2025-05-14 21:39:08.000"
    },
    {
      id: "63ef230f-5db4-4967-95d1-8a5e46d9b860",
      company_id: "a4efc173-8e23-4a61-a228-47ac6b22ccf9",
      name: "Social Media Strategy Session",
      description: "We’ll help you plan effective content and campaign strategies.",
      duration: { hours: 1, minutes: 0 },
      price: "12000.00",
      created_at: "2025-05-14 21:39:12.000"
    },
    {
      id: "6f5a6e2b-2d3b-4391-84f9-e6b7dbf98121",
      company_id: "7cf31995-2916-4d9d-8758-232eb1fbd65d",
      name: "Business Photography",
      description: "1-hour professional photo session for business or branding purposes.",
      duration: { hours: 1, minutes: 0 },
      price: "18000.00",
      created_at: "2025-05-14 21:39:16.000"
    },
    {
      id: "ea8c0b93-8f4e-4073-bd0e-97a3f0e87c12",
      company_id: "3de2441b-5ae5-4e38-8bd5-30f1803f6f90",
      name: "Home Cleaning (Standard)",
      description: "A thorough standard cleaning for small to medium homes.",
      duration: { hours: 2, minutes: 0 },
      price: "25000.00",
      created_at: "2025-05-14 21:39:20.000"
    },
    {
      id: "a85c0ec9-f84d-4d79-84e1-5908dcf9d963",
      company_id: "db7a25ef-0d48-4cb2-8719-fba5882dfdf7",
      name: "Pet Grooming",
      description: "Full grooming package including bath, haircut, and nail trimming.",
      duration: { hours: 1, minutes: 15 },
      price: "14000.00",
      created_at: "2025-05-14 21:39:24.000"
    },
    {
      id: "7cd7893f-34d2-4e6f-94e3-764874823b0f",
      company_id: "b4d2fcf9-0a57-48bb-94fa-1a1c4f151db8",
      name: "Makeup Session",
      description: "Professional makeup for events or photoshoots.",
      duration: { hours: 1, minutes: 0 },
      price: "13000.00",
      created_at: "2025-05-14 21:39:28.000"
    },
    {
      id: "43e914c2-9d6c-476e-9ee1-120b5f254c7c",
      company_id: "97b44ea3-f274-4ce7-a091-826b3c681712",
      name: "Fitness Training Session",
      description: "One-on-one personal training session tailored to your goals.",
      duration: { hours: 1, minutes: 0 },
      price: "10000.00",
      created_at: "2025-05-14 21:39:32.000"
    }
  ];


  return (
    <main className="w-full h-full flex flex-col items-center justify-start gap-4 p-4 text-center bg-white">
      <MainHeader title="Servicios" />
      <Services services={services} />
    </main >
  );
}
