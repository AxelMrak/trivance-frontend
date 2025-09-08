"use client";

import type React from "react";
import { useState } from "react";
import { Appointment } from "@types/Appointment";
import { CalendarDay } from "@types/Calendar";
import { generateCalendarDays } from "@utils/functions";
import { DAYS_OF_WEEK, MONTHS } from "@utils/const";
import { formatDate, formatTime } from "@utils/format";
import Badge from "@/components/ui/Badge";
import { CustomLink } from "@/components/ui/CustomLink";

interface CalendarProps {
  appointments: Appointment[];
  className?: string;
  isLoading?: boolean;
}

const CalendarSkeleton = ({ className }: { className?: string }) => (
  <div
    className={`bg-white rounded-lg border border-gray-200 p-6 ${className} w-full`}
  >
    <div className="flex items-center justify-between mb-6">
      <div className="h-7 bg-gray-200 rounded animate-pulse w-32"></div>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="w-8 h-8 bg-gray-200 rounded-md animate-pulse"></div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {Array(7)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="p-2 text-center">
                <div className="h-4 bg-gray-200 rounded animate-pulse mx-auto w-6"></div>
              </div>
            ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {Array(42)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="relative p-2 h-12 border border-transparent rounded-md"
              >
                <div className="h-4 bg-gray-200 rounded animate-pulse w-6 mx-auto"></div>
              </div>
            ))}
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="text-center py-8">
          <div className="h-5 bg-gray-200 rounded animate-pulse w-48 mx-auto"></div>
        </div>
      </div>
    </div>
  </div>
);

const Calendar: React.FC<CalendarProps> = ({
  appointments,
  className = "",
}) => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);
  if (!appointments) {
    return <CalendarSkeleton className={className} />;
  }

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const calendarDays = generateCalendarDays(
    year,
    month,
    appointments,
    selectedDay?.date,
  );

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    newDate.setMonth(month + (direction === "next" ? 1 : -1));
    setCurrentDate(newDate);
    setSelectedDay(null);
  };

  const handleDayClick = (day: CalendarDay) => {
    if (day.isCurrentMonth) {
      setSelectedDay(day);
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmado";
      case "pending":
        return "Pendiente";
      case "cancelled":
        return "Cancelado";
      default:
        return status;
    }
  };

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 p-6 ${className} w-full`}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {MONTHS[month]} {year}
        </h2>
        <div className="flex items-center gap-2 ">
          <button
            onClick={() => navigateMonth("prev")}
            className="p-2 hover:bg-gray-100  transition-colors rounded-full w-8 h-8 flex items-center justify-center bg-gray-50 border border-gray-200 cursor-pointer"
            aria-label="Mes anterior"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => navigateMonth("next")}
            className="p-2 hover:bg-gray-100  transition-colors rounded-full w-8 h-8 flex items-center justify-center bg-gray-50 border border-gray-200 cursor-pointer"
            aria-label="Mes siguiente"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAYS_OF_WEEK.map((day) => (
              <div
                key={day}
                className="p-2 text-center text-sm font-semibold text-gray-500"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => (
              <button
                key={index}
                onClick={() => handleDayClick(day)}
                className={`
                  relative p-2 h-12 text-sm border border-transparent rounded-md transition-all
 hover:shadow hover:border-gray-300 cursor-pointer
                  ${day.isCurrentMonth ? "text-gray-900 " : "text-gray-300"}
                  ${day.isToday ? "bg-blue-50 border-blue-200 text-blue-600 font-medium" : ""}
                  ${day.isSelected ? "bg-blue-500 text-white hover:bg-blue-600 shadow-sm" : ""}
                `}
                disabled={!day.isCurrentMonth}
              >
                <span className="block">{day.date.getDate()}</span>
                {day.appointmentCount > 0 && (
                  <span
                    className={`
                    absolute top-1 right-1 w-6 h-6 text-sm rounded-full flex items-center justify-center
                    ${day.isSelected ? "bg-white text-blue-500" : "bg-blue-500 text-white"}
                  `}
                  >
                    {day.appointmentCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          {selectedDay ? (
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  {formatDate(selectedDay.date, null)}
                  <span className="ml-2  text-gray-500 font-normal">
                    {selectedDay.appointmentCount} turno
                    {selectedDay.appointmentCount !== 1 ? "s" : ""}
                  </span>
                </h3>
              </div>

              <div className="space-y-3 h-96 overflow-y-scroll">
                {selectedDay.appointments.length > 0 ? (
                  selectedDay.appointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="bg-gray-50 rounded-lg border border-gray-200 px-4 py-3 flex items-center justify-between w-full"
                    >
                      <div className="flex items-start justify-between w-full">
                        <div className="flex-1 flex flex-col items-start gap-1">
                          <p className="text-lg text-gray-900 capitalize">
                            {appointment.service?.name || "Sin servicio"}
                          </p>
                          <p className="text-lg text-gray-700 font-semibold">
                            {formatTime(new Date(appointment.start_date))}
                          </p>
                          <CustomLink
                            href={`dashboard/appointments/${appointment.id}`}
                            variant="primary"
                            className="mt-1"
                          >
                            Ver detalles
                          </CustomLink>
                        </div>
                        <Badge
                          size="lg"
                          variant={
                            appointment.status === "confirmed"
                              ? "success"
                              : appointment.status === "pending"
                                ? "warning"
                                : "error"
                          }
                        >
                          {getStatusText(appointment.status)}
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    No hay turnos para este día
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">
                Selecciona una fecha para ver los turnos
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
