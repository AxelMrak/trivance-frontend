"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { getOrderById, confirmOrderDemo } from "@/lib/api/orders";
import { getAppointment } from "@/lib/api/appointments";
import type { Appointment } from "@/types/Appointment";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export default function PaymentSuccessDashboardPage() {
  const search = useSearchParams();
  const orderId = useMemo(() => search.get("order_id") || "", [search]);

  const [orderStatus, setOrderStatus] = useState<string>("pending");
  const [appointment, setAppointment] = useState<Appointment | undefined>();
  const [error, setError] = useState<string>("");
  const [isPolling, setIsPolling] = useState(true);

  const triesRef = useRef(0);
  const demoForcedRef = useRef(false);

  useEffect(() => {
    if (!orderId) return;

    let cancelled = false;
    const maxTries = 60;

    const forceConfirmDemo = async () => {
      if (demoForcedRef.current) return;
      try {
        await confirmOrderDemo(orderId);
        demoForcedRef.current = true;
      } catch {
        // Silent fail
      }
    };

    const poll = async () => {
      if (cancelled) return;

      try {
        if (!demoForcedRef.current) {
          await forceConfirmDemo();
        }

        const order = await getOrderById(orderId);
        if (cancelled) return;

        setOrderStatus(order.status);

        if ((order as any).appointment) {
          setAppointment((order as any).appointment as Appointment);
        } else if (order.appointmentId) {
          try {
            const appt = await getAppointment(order.appointmentId);
            setAppointment(appt);
            if (appt.status === "confirmed") {
              setOrderStatus("paid");
            }
          } catch {
            // Silent fail
          }
        }

        if (["paid", "cancelled", "failed"].includes(order.status)) {
          setIsPolling(false);
          return;
        }
      } catch (e: any) {
        if (cancelled) return;
        setError(e?.message || "Error fetching payment status");
      } finally {
        triesRef.current += 1;
        if (!cancelled && triesRef.current < maxTries && isPolling) {
          setTimeout(poll, 3000);
        } else {
          setIsPolling(false);
        }
      }
    };

    poll();
    return () => {
      cancelled = true;
    };
  }, [orderId, isPolling]);

  const isSuccess =
    orderStatus === "paid" || appointment?.status === "confirmed";
  const isFailed = ["cancelled", "failed"].includes(orderStatus);

  const getStatusBadge = () => {
    if (isSuccess) return { variant: "success" as const, text: "Confirmado" };
    if (isFailed) return { variant: "error" as const, text: "Error" };
    return { variant: "warning" as const, text: "Pendiente" };
  };

  if (!orderId) {
    return (
      <div className="max-w-lg mx-auto p-6">
        <div className="bg-white rounded-lg border p-6">
          <p className="text-gray-600">Falta el número de orden.</p>
        </div>
      </div>
    );
  }

  const status = getStatusBadge();

  return (
    <div className="max-w-lg mx-auto p-6">
      <div className="bg-white rounded-lg border p-6 space-y-6">
        {/* Header */}
        <div className="text-center">
          <Badge variant={status.variant} size="lg">
            {status.text}
          </Badge>
          <h1 className="text-xl font-semibold mt-3">
            {isSuccess ? "Turno Confirmado" : "Confirmando Turno"}
          </h1>
        </div>
        {/* Order Number */}
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-1">Número de Orden</div>
          <div className="font-mono text-sm text-gray-800">{orderId}</div>
        </div>
        {/* Appointment Date/Time */}
        {appointment && (
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">Fecha y Hora</div>
            <div className="text-sm font-medium">
              {new Date(appointment.start_date).toLocaleString()}
            </div>
          </div>
        )}
        {/* Loading State */}
        {isPolling && (
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            Confirmando pago...
          </div>
        )}
        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded p-3 text-sm text-red-700 text-center">
            Error al confirmar el pago
          </div>
        )}
        {/* Success Message */}
        {!isPolling && isSuccess && (
          <div className="bg-green-50 border border-green-200 rounded p-3 text-sm text-green-700 text-center">
            ¡Tu turno ha sido confirmado!
          </div>
        )}
        {/* Failed Message */}
        {!isPolling && isFailed && (
          <div className="bg-red-50 border border-red-200 rounded p-3 text-sm text-red-700 text-center">
            El pago no fue aprobado.
          </div>
        )}
        {/* Actions */}
        <div className="flex gap-3 justify-center">
          <Link href="/dashboard">
            <Button variant="tertiary">Volver al Panel</Button>
          </Link>
          {appointment && (
            <Link href={`/dashboard/appointments/${appointment.id}`}>
              <Button variant="primary">Ver Turno</Button>
            </Link>
          )}
        </div>{" "}
      </div>
    </div>
  );
}

