"use client"

import type React from "react"
import { useState } from "react"
import { Appointment } from "@types/Appointment"
import { CalendarDay } from "@types/Calendar"
import { generateCalendarDays } from "@utils/functions"
import { DAYS_OF_WEEK, MONTHS } from "@utils/const";
import { formatDate, formatTime } from "@utils/format"
import Badge from "@/components/ui/Badge"

interface CalendarProps {
  appointments: Appointment[]
  className?: string
}

const Calendar: React.FC<CalendarProps> = ({ appointments, className = "" }) => {
  const today = new Date()
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const calendarDays = generateCalendarDays(year, month, appointments, selectedDay?.date)

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    newDate.setMonth(month + (direction === "next" ? 1 : -1))
    setCurrentDate(newDate)
    setSelectedDay(null)
  }

  const handleDayClick = (day: CalendarDay) => {
    if (day.isCurrentMonth) {
      setSelectedDay(day)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "text-green-600"
      case "pending":
        return "text-yellow-600"
      case "cancelled":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "confirmado"
      case "pending":
        return "pendiente"
      case "cancelled":
        return "cancelado"
      default:
        return status
    }
  }

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className} w-full`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {MONTHS[month]} {year}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateMonth("prev")}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Mes anterior"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => navigateMonth("next")}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Mes siguiente"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-2">
          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAYS_OF_WEEK.map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => (
              <button
                key={index}
                onClick={() => handleDayClick(day)}
                className={`
                  relative p-2 h-12 text-sm border border-transparent rounded-md transition-all
                  ${day.isCurrentMonth ? "text-gray-900 hover:bg-gray-50" : "text-gray-300"}
                  ${day.isToday ? "bg-blue-50 border-blue-200 text-blue-600 font-medium" : ""}
                  ${day.isSelected ? "bg-blue-500 text-white hover:bg-blue-600" : ""}
                `}
                disabled={!day.isCurrentMonth}
              >
                <span className="block">{day.date.getDate()}</span>
                {day.appointmentCount > 0 && (
                  <span
                    className={`
                    absolute top-1 right-1 w-4 h-4 text-xs rounded-full flex items-center justify-center
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

        {/* Appointment Details */}
        <div className="lg:col-span-1">
          {selectedDay ? (
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-3">
                <h3 className="text-lg font-medium text-gray-900">{formatDate(selectedDay.date)}</h3>
                <p className="text-sm text-gray-500">
                  {selectedDay.appointmentCount} turno{selectedDay.appointmentCount !== 1 ? "s" : ""}
                </p>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {selectedDay.appointments.length > 0 ? (
                  selectedDay.appointments.map((appointment) => (
                    <div key={appointment.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{appointment.service?.name || "Servicio"}</p>
                          <p className="text-sm text-gray-600">{appointment.user?.name || "Cliente"}</p>
                          <p className="text-sm text-gray-500">{formatTime(new Date(appointment.start_date))}</p>
                          {appointment.description && (
                            <p className="text-sm text-gray-500 mt-1">{appointment.description}</p>
                          )}
                        </div>
                        <Badge
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
                  <p className="text-gray-500 text-center py-8">No hay turnos para este día</p>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Selecciona una fecha para ver los turnos</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Calendar
