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

interface FormData {
  user_id: string;
  service_id: string;
  date: string;
  time: string;
  start_date?: string; // Optional, used for API request
  description: string;
  status: "pending" | "confirmed" | "cancelled";
}

const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

export default function AppointmentForm({
  services,
  appointments,
}: {
  services: Service[];
  appointments: Appointment[];
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const { user } = useUser();
  const [formData, setFormData] = useState<FormData>({
    user_id: user?.user?.id || "",
    service_id: "",
    date: "",
    time: "",
    start_date: "", // This will be set based on date and time
    description: "",
    status: "pending",
  });
  const selectedService = services.find(
    (service) => service.id === formData.service_id,
  );
  const totalSteps = 3;
  const getOccupiedDates = () => {
    return appointments
      .filter((apt) => apt.status === "confirmed")
      .map((apt) => {
        const date = new Date(apt.start_date);
        return date.toISOString().split("T")[0];
      });
  };

  const getOccupiedTimes = (date: string) => {
    return appointments
      .filter((apt) => {
        const aptDate = new Date(apt.start_date);
        const aptDateString = aptDate.toISOString().split("T")[0];
        return aptDateString === date && apt.status === "confirmed";
      })
      .map((apt) => {
        const date = new Date(apt.start_date);
        return date.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        });
      });
  };

  const generateCalendarDays = () => {
    const today = new Date();
    const days = [];
    const occupiedDates = getOccupiedDates();

    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateString = date.toISOString().split("T")[0];

      days.push({
        date: dateString,
        day: date.getDate(),
        isOccupied: occupiedDates.includes(dateString),
        isToday: i === 0,
      });
    }

    return days;
  };

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

  const handleReserve = async () => {
    await toast.promise(
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      }).then(async (res) => {
        if (!res.ok) throw new Error("No se pudo reservar el turno");
        const data = await res.json();
        console.log("Turno reservado:", data);
      }),
      {
        loading: "Reservando turno...",
        success: "Turno reservado por 30 minutos",
        error: "Error al reservar el turno",
      },
    );
  };

  const handlePayAndReserve = async () => {
    await toast.promise(
      async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/appointments/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(formData),
          },
        );

        if (!res.ok) throw new Error("No se pudo reservar el turno");

        const appointment = await res.json();

        const paymentRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/appointments/payment/${appointment.id}/link`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        );

        if (!paymentRes.ok)
          throw new Error("No se pudo generar el link de pago");

        const payment = await paymentRes.json();
        window.location.href = payment.paymentLink;
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
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Reservar Cita</h1>
          <Badge variant="tertiary">
            Paso {currentStep} de {totalSteps}
          </Badge>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
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
            <div className="grid gap-4 max-h-[400px] overflow-y-auto">
              {services &&
                services.map((service) => (
                  <div
                    key={service.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${formData.service_id === service.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                      }`}
                    onClick={() => handleServiceSelect(service.id)}
                  >
                    <div className="flex justify-between items-start flex-wrap">
                      <div>
                        <h3 className="font-semibold capitalize">
                          {service.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Duración: {service.duration.hours}{" "}
                          {service.duration.hours > 1 ? "horas" : "hora"}
                        </p>
                        {service.requires_deposit && (
                          <Badge variant="secondary" className="mt-1">
                            Requiere depósito
                          </Badge>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">${service.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="flex justify-end">
              <Button onClick={handleNext} disabled={!formData.service_id}>
                Siguiente
                <ChevronIcon className="w-4 h-4 ml-2" />
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
          <CardContent className="space-y-6">
            <div>
              <label className="text-base font-medium">Fecha</label>
              <div className="grid grid-cols-7 gap-2 mt-2">
                {generateCalendarDays().map((day, index) => (
                  <button
                    key={index}
                    className={`p-2 text-sm rounded-lg border transition-all ${formData.date === day.date
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
                    {day.day}
                    {day.isOccupied && (
                      <div className="text-xs mt-1">Ocupado</div>
                    )}
                  </button>
                ))}
              </div>
            </div>
            {formData.date && (
              <div>
                <label className="text-base font-medium">Hora</label>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {timeSlots.map((time) => {
                    const isOccupied = getOccupiedTimes(formData.date).includes(
                      time,
                    );
                    return (
                      <button
                        key={time}
                        className={`p-3 text-sm rounded-lg border transition-all ${formData.time === time
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
                <ChevronIcon className="w-4 h-4 mr-2" />
                Anterior
              </Button>
              <Button
                onClick={handleNext}
                disabled={!formData.date || !formData.time}
              >
                Siguiente
                <ChevronIcon className="w-4 h-4 ml-2" />
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
                className="min-h-[100px] w-full border rounded-lg p-2"
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

            <div className="space-y-4">
              <RoleGuard
                minRole={UserRole.STAFF}
                fallback={
                  <>
                    {selectedService?.requires_deposit && (
                      <Badge variant="secondary" className="mb-2">
                        Se guardará el turno por 30 minutos sin pagar la seña
                      </Badge>
                    )}

                    <div className="flex justify-between">
                      <Button variant="tertiary" onClick={handlePrevious}>
                        <ChevronIcon className="w-4 h-4 mr-2" />
                        Anterior
                      </Button>
                      <div className="flex gap-2">
                        <Button variant="secondary" onClick={handleCancel}>
                          Cancelar
                        </Button>
                        <Button variant="primary" onClick={handleReserve}>
                          Reservar
                        </Button>

                        {selectedService?.requires_deposit ? (
                          <>
                            <Button onClick={handlePayAndReserve}>
                              Pagar y Reservar
                            </Button>
                          </>
                        ) : (
                          <Button onClick={handleReserve}>Reservar</Button>
                        )}
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
