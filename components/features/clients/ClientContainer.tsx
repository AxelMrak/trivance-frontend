"use client";

import { useState } from "react";
import { Client } from "@/types/Client";
import ClientCard from "@/components/features/clients/ClientCard";
import { useDialog } from "@/context/ModalContext";
import DeleteDialog from "@/components/layouts/dialogs/DeleteDialog";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";
import ClientForm from "@/components/features/forms/ClientForm";
import Pagination from "@/components/ui/Pagination";
import SearchInput from "@/components/ui/SearchInput";
import NotFoundMsg from "@/components/ui/NotFoundMsg";
import { createClient, deleteClient, updateClient } from "@/lib/api/clients";
import type { ClientFormValues } from "@/lib/validation/client.schema";

interface ClientsContainerProps {
  initialClients: Client[];
}

export default function ClientsContainer({
  initialClients,
}: ClientsContainerProps) {
  const [clients, setClients] = useState<Client[]>(initialClients ?? []);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const pageSize = 8;
  const { openDialog, closeDialog } = useDialog();

  const handleDeleteClient = async (id: string): Promise<void> => {
    const deletePromise = deleteClient(id).then(() => {
      setClients((prev) => prev.filter((client) => client.id !== id));
      closeDialog();
      return "Cliente eliminado correctamente";
    });

    toast.promise(deletePromise, {
      loading: "Eliminando cliente...",
      success: (message) => message,
      error: (error: unknown) => {
        if (error instanceof Error) {
          return error.message || "Error al eliminar el cliente";
        }
        console.error(error);
        return "Error al eliminar el cliente";
      },
    });
  };

  const openDeleteDialog = (id: string, name?: string | null) => {
    openDialog(
      <DeleteDialog
        data={{ id, title: name || null }}
        onClose={closeDialog}
        onDelete={() => handleDeleteClient(id)}
      />,
    );
  };

  const handleCreateClient = async (data: ClientFormValues) => {
    const promise = createClient(data).then((created) => {
      setClients((prev) => [created, ...prev]);
      closeDialog();
      return "Cliente creado correctamente";
    });
    toast.promise(promise, {
      loading: "Creando cliente...",
      success: (m) => m,
      error: (e) => (e as Error).message || "Error al crear el cliente",
    });
  };

  const handleUpdateClient = async (client: Client, data: ClientFormValues) => {
    const promise = updateClient(client.id, data).then((updated) => {
      setClients((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
      closeDialog();
      return "Cliente actualizado correctamente";
    });
    toast.promise(promise, {
      loading: "Actualizando cliente...",
      success: (m) => m,
      error: (e) => (e as Error).message || "Error al actualizar el cliente",
    });
  };

  const openEditDialog = (client: Client) => {
    openDialog(
      <ClientForm
        initialClient={client}
        onSubmit={(values) => handleUpdateClient(client, values)}
        onClose={closeDialog}
      />,
    );
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setQuery(query);

    if (query.trim() === "") {
      setClients(initialClients);
    } else {
      const filtered = initialClients.filter((client) => {
        const nameMatch = client.name
          ? client.name.toLowerCase().includes(query)
          : false;
        const emailMatch = client.email
          ? client.email.toLowerCase().includes(query)
          : false;
        const addressMatch = client.address
          ? client.address.toLowerCase().includes(query)
          : false;
        const phoneMatch = client.phone
          ? client.phone.toLowerCase().includes(query)
          : false;
        return nameMatch || emailMatch || addressMatch || phoneMatch;
      });
      setClients(filtered);
      setPage(1); // Reset to first page on new search
    }
  };

  return (
    <div className="w-full flex flex-col items-start justify-between gap-4">
      <div className="w-full flex items-center justify-between gap-4">
        <SearchInput value={query} onChange={handleSearch} />
        <Button
          variant="primary"
          className="w-full md:w-auto !text-md whitespace-nowrap"
          onClick={() =>
            openDialog(
              <ClientForm onSubmit={handleCreateClient} onClose={closeDialog} />,
            )
          }
        >
          Crear cliente +
        </Button>
      </div>
      <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        {clients.length > 0 ? (
          clients
            .slice((page - 1) * pageSize, page * pageSize)
            .map((client) => (
              <ClientCard
                key={client.id}
                client={client}
                openDeleteDialog={openDeleteDialog}
                openEditDialog={openEditDialog}
              />
            ))
        ) : (
          <NotFoundMsg message="No se encontraron clientes." />
        )}
      </section>
      <Pagination
        total={clients.length}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
      />
    </div>
  );
}
