"use client";

import { useState } from "react";
import { Service } from "@/types/Service";
import ServiceCard from "@components/features/services/ServiceCard";
import { useDialog } from "@/context/ModalContext";
import DeleteDialog from "@/components/layouts/dialogs/DeleteDialog";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";
import ServiceForm from "@components/features/forms/ServiceForm";

interface ServicesContainerProps {
  initialServices: Service[];
}

export default function ServicesContainer({
  initialServices,
}: ServicesContainerProps) {

  const [services, setServices] = useState<Service[]>(initialServices);

  const { openDialog, closeDialog } = useDialog();

  const handleDeleteService = async (id: string): Promise<void> => {
    const deletePromise = fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/services/delete/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      },
    ).then(async (response) => {
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Error al eliminar el servicio");
      }

      setServices((prev) => prev.filter((service) => service.id !== id));
      closeDialog();

      return "Servicio eliminado correctamente";
    });

    toast.promise(deletePromise, {
      loading: "Eliminando servicio...",
      success: (message) => message,
      error: (error: any) => {
        console.error(error);
        return error.message || "Error al eliminar el servicio";
      },
    });
  };


  const openDeleteDialog = (id: string, name?: string | null) => {
    openDialog(
      <DeleteDialog
        data={{ id, title: name || null }}
        onClose={closeDialog}
        onDelete={() => handleDeleteService(id)}
      />,
    );
  };

  const openEditDialog = (service: Service) => {
    openDialog(<ServiceForm initialService={service} />);
  };

  return (
    <div className="w-full flex flex-col items-start justify-between gap-4">
      <div className="w-full flex items-center justify-between gap-4">
        <span className="text-2xl font-normal text-gray-500">
          {services.length} servicios encontrados
        </span>
        <Button
          variant="primary"
          className="w-full md:w-auto
              !text-2xl font-normal"
        >
          Crear servicio +
        </Button>
      </div>
      <section className="w-full grid grid-cols-1 md:grid-cols-3  gap-4">
        {services.length > 0 ? (
          services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              openDeleteDialog={openDeleteDialog}
              openEditDialog={openEditDialog}
            />
          ))
        ) : (
          <div className="w-full flex items-center justify-start">
            <p className="text-2xl font-normal text-gray-900 text-start">
              No se encontraron servicios. Podés crear uno nuevo haciendo click
              en el botón de arriba.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
