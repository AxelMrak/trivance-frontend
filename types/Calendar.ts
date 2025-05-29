import type { Appointment } from '@types/Appointment'

export interface CalendarDay {
  date: Date
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
  appointmentCount: number
  appointments: Appointment[]
}

