import { IntervalObject } from "@/types/Interval"

export function formatInterval(interval: IntervalObject): string {
  if (!interval || typeof interval !== 'object') {
		return 'Sin duración definida';
	}
  const {
    years = 0,
    months = 0,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
  } = interval

  const parts: string[] = []

  if (years) parts.push(`${years} año${years > 1 ? 's' : ''}`)
  if (months) parts.push(`${months} mes${months > 1 ? 'es' : ''}`)
  if (days) parts.push(`${days} día${days > 1 ? 's' : ''}`)
  if (hours) parts.push(`${hours}h`)
  if (minutes) parts.push(`${minutes}min`)
  if (seconds && parts.length === 0) parts.push(`${seconds}s`)

  return parts.length > 0 ? parts.join(' ') : 'Sin duración definida'
}
export function formatPrice(value: string | number): string {
  const number = typeof value === "string" ? parseFloat(value) : value;
  return number.toLocaleString("es-AR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
}

