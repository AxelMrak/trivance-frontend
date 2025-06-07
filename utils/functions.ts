import { AppleLogo } from '@/components/icons/AppleLogo'
import { GoogleCalendarLogo } from '@/components/icons/GoogleCalendarLogo'
import { OutlookLogo } from '@/components/icons/OutlookLogo'
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

  startDate.setDate(startDate.getDate() - startDate.getDay())

  const days: CalendarDay[] = []
  const currentDate = new Date(startDate)

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



interface CalendarLinkOptions {
  title: string;
  description?: string;
  location?: string;
  start: Date;
  end: Date;
}

export const generateCalendarLinks = ({
  title,
  description = "",
  location = "",
  start = new Date(),
  end = new Date(start.getTime() + 60 * 60 * 1000), // Default to 1 hour later
}: CalendarLinkOptions) => {
  const startUTC = new Date(start.getTime() - start.getTimezoneOffset() * 60000);
  const endUTC = new Date(end.getTime() - end.getTimezoneOffset() * 60000);
  const startLocal = start.toISOString().replace(/-|:|\.\d+/g, "").slice(0, 15) + "Z"; // Format to YYYYMMDDTHHMMSSZ

  const encodedTitle = encodeURIComponent(title);
  const encodedDesc = encodeURIComponent(description);
  const encodedLoc = encodeURIComponent(location);

  const links = {
    google: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodedTitle}&dates=${startUTC}/${endUTC}&details=${encodedDesc}&location=${encodedLoc}&sf=true&output=xml`,
    outlook: `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&startdt=${encodeURIComponent(
      startLocal
    )}&enddt=${encodeURIComponent(end.toISOString())}&subject=${encodedTitle}&body=${encodedDesc}&location=${encodedLoc}`,
    apple: generateICSFile({ title, description, location, start, end }),
  };

  const linksWithIcons = {
    google: {
      name: "Google Calendar",
      icon: GoogleCalendarLogo,
      link: links.google,
    },
    outlook: {
      name: "Outlook Calendar",
      icon: OutlookLogo,
      link: links.outlook,
    },
    apple: {
      name: "Apple Calendar",
      icon: AppleLogo,
      link: links.apple,
    },
  };

  return linksWithIcons;
};

function generateICSFile({ title, description, location, start, end }: CalendarLinkOptions) {
  const dtstamp = new Date().toISOString().replace(/-|:|\.\d+/g, "").slice(0, 15) + "Z"; // Format to YYYYMMDDTHHMMSSZ
  const dtstart = start.toISOString().replace(/-|:|\.\d+/g, "").slice(0, 15) + "Z"; // Format to YYYYMMDDTHHMMSSZ
  const dtend = end.toISOString().replace(/-|:|\.\d+/g, "").slice(0, 15) + "Z"; // Format to YYYYMMDDTHHMMSSZ

  const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTAMP:${dtstamp}
DTSTART:${dtstart}
DTEND:${dtend}
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:${location}
END:VEVENT
END:VCALENDAR`.trim();

  return `data:text/calendar;charset=utf8,${encodeURIComponent(icsContent)}`;
}
