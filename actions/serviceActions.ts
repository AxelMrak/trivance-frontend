'use server'

import { revalidatePath } from 'next/cache';

export async function removeService(serviceId: string) {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/delete/${serviceId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  revalidatePath('/dashboard/services');
}
