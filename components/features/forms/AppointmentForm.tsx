"use client";

import type React from "react";

import { useState } from "react";

import ChevronIcon from "@/components/icons/ChevronIcon";
import CalendarIcon from "@/components/icons/CalendarIcon";
import ClockIcon from "@/components/icons/ClockIcon";
import Badge from "@/components/ui/Badge";
import { useUser } from "@/context/UserContext";
import ServicesIcon from "@/components/icons/ServicesIcon";
import Button from "@/components/ui/Button";
import { Service } from "@/types/Service";
import { Appointment } from "@/types/Appointment";
import RoleGuard from "../global/RoleGuard";
import { UserRole } from "@/types/User";
import toast from "react-hot-toast";
import { ErrorIcon } from "@/components/icons/ErrorIcon";
import MPLogo from "@/components/icons/MPLogo";
// import AppointmentIcon from "@/components/icons/AppointmentIcon";
import { FormData, timeSlots } from "@/utils/appointment";
import { useEffect } from "react";
import { MONTHS } from "@/utils/const";
import { useRouter } from "next/navigation";
import { formatInterval } from "@/utils/format";
import {
  createAppointment,
  createPaymentLink,
  getAppointment,
} from "@/lib/api/appointments";

const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`flex flex-col items-start gap-4 w-full  ${className}`}>
    {children}
  </div>
);

const CardHeader = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`${className}`}>{children}</div>;

const CardTitle = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <h3
    className={`text-lg font-semibold leading-none tracking-tight ${className}`}
  >
    {children}
  </h3>
);

const CardDescription = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <p className={`text-sm text-gray-600 mt-1.5 ${className}`}>{children}</p>;

const CardContent = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`${className}`}>{children}</div>;

export default function AppointmentForm({
  services,
  appointments,
  onAppointmentCreated,
}: {
  services: Service[];
  appointments: Appointment[];
  onAppointmentCreated: () => void;
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const { user } = useUser();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    user_id: user?.user?.id || "",
    service_id: "",
    date: "",
    time: "",
    start_date: "",
    description: "",
    status: "pending",
  });
  const [clients, setClients] = useState<
    Array<{ id: string; name: string; email?: string }>
  >([]);
  const [occupiedMap, setOccupiedMap] = useState<Record<string, string[]>>({});
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const selectedService = services.find(
    (service) => service.id === formData.service_id,
  );
  const totalSteps = 3;
  const formatLocalDate = (d: Date): string => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  const getOccupiedDates = () => {
    return Object.keys(occupiedMap);
  };

  const getOccupiedTimes = (date: string) => {
    return occupiedMap[date] || [];
  };

  const [monthOffset, setMonthOffset] = useState(0);
  const generateCalendarDays = () => {
    const base = new Date();
    base.setDate(1);
    base.setMonth(base.getMonth() + monthOffset);
    const year = base.getFullYear();
    const month = base.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [] as Array<{
      date: string;
      day: number;
      isOccupied: boolean;
      isToday: boolean;
    }>;
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      const dateString = date.toISOString().split("T")[0];
      const occupiedTimes = getOccupiedTimes(dateString);
      const fullyBooked = occupiedTimes.length >= timeSlots.length;
      const today = new Date();
      const isToday =
        today.getFullYear() === year &&
        today.getMonth() === month &&
        today.getDate() === d;
      days.push({ date: dateString, day: d, isOccupied: fullyBooked, isToday });
    }
    return days;
  };

  // Fetch occupied slots per month
  useEffect(() => {
    (async () => {
      try {
        const base = new Date();
        base.setMonth(base.getMonth() + monthOffset);
        const monthStr = `${base.getFullYear()}-${String(base.getMonth() + 1).padStart(2, "0")}`;
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/appointments/occupiedSlots?month=${encodeURIComponent(monthStr)}`,
          {
            credentials: "include",
          },
        );
        if (!res.ok) return;
        const data = await res.json();
        if (data && typeof data === "object") setOccupiedMap(data);
      } catch {
        // no-op
      }
    })();
  }, [monthOffset]);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleServiceSelect = (service_id: string) => {
    setFormData({ ...formData, service_id });
  };

  const handleDateSelect = (date: string) => {
    setFormData({ ...formData, start_date: date, time: "", date });
  };

  const handleTimeSelect = (time: string) => {
    setFormData({ ...formData, time });
  };

  const [reservedAppt, setReservedAppt] = useState<Appointment | null>(null);
  const [awaitingPayment, setAwaitingPayment] = useState(false);
  const [isPolling, setIsPolling] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const handleReserve = async () => {
    const payload: any = {
      service_id: formData.service_id,
      start_date: new Date(
        `${formData.date}T${formData.time}:00`,
      ).toISOString(),
      description: formData.description || undefined,
    };
    const role = user?.user?.role ?? UserRole.CLIENT;
    if (role >= UserRole.STAFF && selectedClientId) {
      payload.client_id = selectedClientId;
    }
    await toast.promise(
      createAppointment(payload).then((data) => {
        setReservedAppt(data);
        const requiresDeposit = Boolean(data?.service?.requires_deposit);
        setAwaitingPayment(requiresDeposit);
        if (!requiresDeposit) {
          onAppointmentCreated();
        }
      }),
      {
        loading: "Reservando turno...",
        success: (m) => {
          onAppointmentCreated();
          return `Turno reservado${awaitingPayment ? ", por favor procede al pago" : ""}`;
        },
        error: (e) => (e as Error).message || "Error al reservar el turno",
      },
    );
  };

  const handlePayAndReserve = async () => {
    await toast.promise(
      async () => {
        const payload: any = {
          service_id: formData.service_id,
          start_date: new Date(
            `${formData.date}T${formData.time}:00`,
          ).toISOString(),
          description: formData.description || undefined,
        };
        const role = user?.user?.role ?? UserRole.CLIENT;
        if (role >= UserRole.STAFF && selectedClientId) {
          payload.client_id = selectedClientId;
        }
        const appointment = await createAppointment(payload);
        setReservedAppt(appointment);
        setAwaitingPayment(true);

        const payment = await createPaymentLink(appointment.id);
        window.open(payment.paymentLink, "_blank");
        router.refresh();
        // Start polling for confirmation
        setIsPolling(true);
        let tries = 0;
        const maxTries = 60; // ~3-5 mins depending on interval
        const interval = setInterval(async () => {
          tries++;
          try {
            const appt = await getAppointment(appointment.id);
            if (appt?.status === "confirmed") {
              clearInterval(interval);
              setIsPolling(false);
              setAwaitingPayment(false);
              setReservedAppt(appt);
              onAppointmentCreated(appt);
            }
            if (tries >= maxTries) {
              clearInterval(interval);
              setIsPolling(false);
            }
          } catch (_e) {
            // swallow
          }
        }, 3000);
      },
      {
        loading: "Procesando pago y reserva...",
        success: "Turno reservado y redirigiendo al pago",
        error: "Error al procesar el pago o la reserva",
      },
    );
  };

  const handleCancel = () => {
    setCurrentStep(1);
    setFormData({
      service_id: "",
      date: "",
      time: "",
      description: "",
      user_id: user?.user?.id || "",
      start_date: "",
      status: "pending",
    });
    setSelectedClientId("");
  };

  // Fetch clients list for staff+ to create on behalf of a client
  useEffect(() => {
    const role = user?.user?.role ?? UserRole.CLIENT;
    if (role < UserRole.STAFF) return;
    (async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/clients/getAll`,
          {
            credentials: "include",
          },
        );
        if (!res.ok) return;
        const data = await res.json();
        if (Array.isArray(data)) {
          setClients(
            data.map((u: any) => ({ id: u.id, name: u.name, email: u.email })),
          );
        }
      } catch {
        // no-op
      }
    })();
  }, [user?.user?.role]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="my-4 flex items-center justify-between w-full">
        <h1 className="text-2xl font-bold">Reservar Cita</h1>
        <Badge variant="secondary" size="lg">
          Paso <strong className="mx-1">{currentStep}</strong> de {totalSteps}
        </Badge>
      </div>

      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ServicesIcon className="w-5 h-5" />
              Selecciona un Servicio
            </CardTitle>
            <CardDescription>Elige el servicio que necesitas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 w-full">
            <div className="grid gap-4 max-h-[400px] overflow-y-auto shadow p-2 border border-gray-200 rounded-lg">
              {services &&
                services.map((service) => (
                  <div
                    key={service.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      formData.service_id === service.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleServiceSelect(service.id)}
                  >
                    <div className="flex flex-col items-start gap-2 w-full">
                      <div className="flex items-center gap-2 w-full justify-between">
                        <h3 className="font-semibold capitalize">
                          {service.name}
                        </h3>
                        <p className="font-semibold text-lg text-gray-600">
                          ${service.price}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500 text-left">
                        Duración aproximada:{" "}
                        <span className="capitalize">
                          {formatInterval(service.duration)}
                        </span>
                      </p>
                      {service.requires_deposit && (
                        <Badge variant="secondary" className="mt-1">
                          Requiere depósito
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
            </div>

            <div className="flex justify-end">
              <Button onClick={handleNext} disabled={!formData.service_id}>
                Siguiente
                <ChevronIcon className="w-4 h-4 ml-2 rotate-90" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              Selecciona Fecha y Hora
            </CardTitle>
            <CardDescription>Elige cuándo quieres tu cita</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 w-full">
            <div>
              <div className="flex items-center justify-between w-full !text-xs">
                <Button
                  variant="tertiary"
                  onClick={() => setMonthOffset((m) => m - 1)}
                >
                  Mes anterior
                </Button>
                <span className=" text-gray-700">
                  {
                    MONTHS[
                      new Date(
                        new Date().getFullYear(),
                        new Date().getMonth() + monthOffset,
                        1,
                      ).getMonth()
                    ]
                  }{" "}
                  {new Date(
                    new Date().getFullYear(),
                    new Date().getMonth() + monthOffset,
                    1,
                  ).getFullYear()}
                </span>
                <Button
                  variant="tertiary"
                  onClick={() => setMonthOffset((m) => m + 1)}
                >
                  Mes siguiente
                </Button>
              </div>
              <div className="grid grid-cols-7 gap-2 mt-2">
                {generateCalendarDays().map((day, index) => {
                  const occTimes = getOccupiedTimes(day.date);
                  const partial = !day.isOccupied && occTimes.length > 0;
                  return (
                    <button
                      key={index}
                      className={`p-2 text-sm rounded-lg border transition-all flex flex-col items-center justify-center ${
                        formData.date === day.date
                          ? "bg-blue-500 text-white border-blue-500"
                          : day.isOccupied
                            ? "bg-red-100 text-red-500 border-red-200 cursor-not-allowed"
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                      onClick={() =>
                        !day.isOccupied && handleDateSelect(day.date)
                      }
                      disabled={day.isOccupied}
                    >
                      <div className="flex items-center gap-1">
                        <span>{day.day}</span>
                        {occTimes.length > 0 && !day.isOccupied && (
                          <span className="text-[10px] text-currentColor">
                            {occTimes.length}/{timeSlots.length}
                          </span>
                        )}
                      </div>
                      {day.isOccupied ? (
                        <ErrorIcon className="w-4 h-4 inline text-red-500" />
                      ) : partial ? (
                        <span className="mt-1 w-2 h-2 rounded-full bg-yellow-400 inline-block" />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
            {formData.date && (
              <div>
                <label className="text-base font-medium">Hora</label>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {timeSlots.map((time) => {
                    const occ = getOccupiedTimes(formData.date);
                    const isOccupied = occ.includes(time);
                    return (
                      <button
                        key={time}
                        className={`p-3 text-sm rounded-lg border transition-all ${
                          formData.time === time
                            ? "bg-blue-500 text-white border-blue-500"
                            : isOccupied
                              ? "bg-red-100 text-red-500 border-red-200 cursor-not-allowed"
                              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                        onClick={() => !isOccupied && handleTimeSelect(time)}
                        disabled={isOccupied}
                      >
                        <ClockIcon className="w-4 h-4 mr-2 inline" />
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}{" "}
            <div className="flex justify-between">
              <Button variant="tertiary" onClick={handlePrevious}>
                <ChevronIcon className="w-4 h-4 mr-2 -rotate-90" />
                Anterior
              </Button>
              <Button
                onClick={handleNext}
                disabled={!formData.date || !formData.time}
              >
                Siguiente
                <ChevronIcon className="w-4 h-4 ml-2 rotate-90" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Detalles y Confirmación
            </CardTitle>
            <CardDescription>Completa los detalles de tu cita</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 w-full">
            {reservedAppt && awaitingPayment && (
              <div className="p-4 border border-yellow-300 bg-yellow-50 rounded">
                <p className="mb-2">
                  Este servicio requiere seña. Por favor realiza el pago para
                  confirmar el turno.
                </p>
                <div className="flex items-center gap-2">
                  <button
                    className=" px-4 py-2 rounded-lg transition-colors text-blue-500 border border-blue-500 hover:bg-blue-50 flex items-center whitespace-nowrap text-center justify-center font-semibold"
                    onClick={async () => {
                      try {
                        setPaymentError(null);
                        const res = await fetch(
                          `${process.env.NEXT_PUBLIC_API_URL}/appointments/payment/${reservedAppt.id}/link`,
                          {
                            method: "POST",
                            credentials: "include",
                          },
                        );
                        if (!res.ok)
                          throw new Error("No se pudo generar el link de pago");
                        const data = await res.json();
                        window.open(data.paymentLink, "_blank");
                      } catch (e) {
                        setPaymentError((e as Error).message);
                      }
                    }}
                  >
                    <MPLogo className="w-12 h-auto inline mr-2" />
                    Pagar ahora
                  </button>
                  {isPolling && (
                    <span className="text-sm text-gray-600">
                      Esperando confirmación de pago...
                    </span>
                  )}
                  {paymentError && (
                    <span className="text-sm text-red-600">{paymentError}</span>
                  )}
                </div>
              </div>
            )}
            {/* Staff can select a client to create on behalf */}
            <RoleGuard minRole={UserRole.STAFF} fallback={<></>}>
              <div className="space-y-2 flex flex-col items-start w-full">
                <label htmlFor="client_id" className="font-semibold">
                  Cliente (opcional)
                </label>
                <select
                  id="client_id"
                  className="w-full border rounded-lg p-2"
                  value={selectedClientId}
                  onChange={(e) => setSelectedClientId(e.target.value)}
                >
                  <option value="">Seleccionar cliente...</option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} {c.email ? `• ${c.email}` : ""}
                    </option>
                  ))}
                </select>
              </div>
            </RoleGuard>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Resumen de la Cita</h3>
              <div className="space-y-1 text-sm">
                <p>
                  <strong>Servicio:</strong> {selectedService?.name}
                </p>
                <p>
                  <strong>Fecha:</strong> {formData.date}
                </p>
                <p>
                  <strong>Hora:</strong> {formData.time}
                </p>
                {selectedClientId && (
                  <p>
                    <strong>Cliente seleccionado:</strong>{" "}
                    {clients.find((c) => c.id === selectedClientId)?.name}
                  </p>
                )}
                <p>
                  <strong>Duración:</strong> {selectedService?.duration.hours}{" "}
                  {selectedService?.duration.hours > 1 ? "horas" : "hora"}
                </p>
                <p>
                  <strong>Precio:</strong> ${selectedService?.price}
                </p>
              </div>
            </div>

            <div className="space-y-2 flex flex-col items-start w-full">
              <label htmlFor="description" className="font-semibold">
                Descripción
              </label>
              <textarea
                id="description"
                placeholder="Describe brevemente el motivo de tu cita..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="min-h-[100px] w-full border rounded-lg p-2 border border-gray-200"
              />
            </div>
            <RoleGuard minRole={UserRole.STAFF} fallback={<></>}>
              <div className="space-y-2 flex flex-col items-start w-full">
                <label htmlFor="status" className="font-semibold">
                  Estado de la reserva
                </label>
                <select
                  id="status"
                  className="w-full border rounded-lg p-2"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                >
                  <option value="pending">Pendiente</option>
                  <option value="confirmed">Confirmada</option>
                </select>
              </div>
            </RoleGuard>

            <div className="space-y-4 mt-4">
              <RoleGuard
                minRole={UserRole.STAFF}
                fallback={
                  <>
                    {selectedService?.requires_deposit && (
                      <Badge variant="secondary" className="mb-2 " size="lg">
                        Se guardará el turno por 30 minutos sin pagar la seña
                      </Badge>
                    )}

                    <div className="w-full flex items-center justify-between">
                      <div className="w-full grid grid-cols-1  gap-4">
                        {selectedService?.requires_deposit ? (
                          <>
                            <button
                              className=" px-4 py-2 rounded-lg transition-colors text-blue-500 border border-blue-500 hover:bg-blue-50 flex items-center whitespace-nowrap text-center justify-center font-semibold"
                              onClick={handlePayAndReserve}
                            >
                              <MPLogo className="w-12 h-auto inline mr-2" />
                              Pagar y Reservar
                            </button>
                          </>
                        ) : null}
                        <Button
                          variant="primary"
                          onClick={handleReserve}
                          className="flex items-center px-4 py-2 rounded-lg transition-colors whitespace-nowrap text-center justify-center font-semibold !text-xl"
                        >
                          Reservar
                        </Button>
                      </div>
                    </div>
                  </>
                }
              >
                <div className="flex justify-between">
                  <Button variant="tertiary" onClick={handlePrevious}>
                    <ChevronIcon className="w-4 h-4 mr-2" />
                    Anterior
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="secondary" onClick={handleCancel}>
                      Cancelar
                    </Button>
                    <Button onClick={handleReserve}>Reservar</Button>
                  </div>
                </div>
              </RoleGuard>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
