import type { Appointment } from '@types/Appointment'
import type { CalendarDay } from '@types/Calendar'
import { isSameDay } from '@utils/boolean'

export const getAppointmentsForDate = (appointments: Appointment[], date: Date): Appointment[] => {
  return appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.start_date)
    return isSameDay(appointmentDate, date)
  })
}

export const generateCalendarDays = (
  year: number,
  month: number,
  appointments: Appointment[],
  selectedDate?: Date,
): CalendarDay[] => {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDate = new Date(firstDay)
  const today = new Date()

  // Start from Sunday of the week containing the first day
  startDate.setDate(startDate.getDate() - startDate.getDay())

  const days: CalendarDay[] = []
  const currentDate = new Date(startDate)

  // Generate 42 days (6 weeks)
  for (let i = 0; i < 42; i++) {
    const dayAppointments = getAppointmentsForDate(appointments, currentDate)

    days.push({
      date: new Date(currentDate),
      isCurrentMonth: currentDate.getMonth() === month,
      isToday: isSameDay(currentDate, today),
      isSelected: selectedDate ? isSameDay(currentDate, selectedDate) : false,
      appointmentCount: dayAppointments.length,
      appointments: dayAppointments,
    })

    currentDate.setDate(currentDate.getDate() + 1)
  }

  return days
}

export function generateGoogleMapsLink(address: string): string {
  const encodedAddress = encodeURIComponent(address)
  return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`
}

