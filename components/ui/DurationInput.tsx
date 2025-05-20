"use client"

import type React from "react"

import { useState, useEffect } from "react"
import ClockIcon from "../icons/ClockIcon"
import CalendarIcon from "../icons/CalendarIcon"
import ChevronIcon from "../icons/ChevronIcon"

type IntervalUnit = "seconds" | "minutes" | "hours" | "days" | "weeks" | "months"

const unitTranslations = {
  seconds: { singular: "segundo", plural: "segundos", abbr: "seg" },
  minutes: { singular: "minuto", plural: "minutos", abbr: "min" },
  hours: { singular: "hora", plural: "horas", abbr: "h" },
  days: { singular: "día", plural: "días", abbr: "d" },
  weeks: { singular: "semana", plural: "semanas", abbr: "sem" },
  months: { singular: "mes", plural: "meses", abbr: "mes" },
}

interface VisualIntervalInputProps {
  onChange: (value: {
    type: string
    notNull: boolean
    value: number
    unit: IntervalUnit
    formatted: string
  }) => void
  className?: string
  defaultUnit?: IntervalUnit
}

export default function DurationInput({ onChange, className, defaultUnit = "hours" }: VisualIntervalInputProps) {
  const [hours, setHours] = useState<number>(0)
  const [minutes, setMinutes] = useState<number>(0)
  const [seconds, setSeconds] = useState<number>(0)
  const [unit, setUnit] = useState<IntervalUnit>(defaultUnit)
  const [isTimeMode, setIsTimeMode] = useState(
    defaultUnit === "hours" || defaultUnit === "minutes" || defaultUnit === "seconds",
  )
  const [value, setValue] = useState<number>(1)
  const [formattedValue, setFormattedValue] = useState<string>("")

  {/*  useEffect(() => {
    setIsTimeMode(unit === "hours" || unit === "minutes" || unit === "seconds")
  }, [unit])
*/}
  const formatValue = (val: number, unitType: IntervalUnit, h = 0, m = 0, s = 0): string => {
    if (unitType === "hours" || unitType === "minutes" || unitType === "seconds") {
      if (h > 0 && m === 0 && s === 0) {
        return `${h} ${h === 1 ? unitTranslations.hours.singular : unitTranslations.hours.plural}`
      } else if (h === 0 && m > 0 && s === 0) {
        return `${m} ${m === 1 ? unitTranslations.minutes.singular : unitTranslations.minutes.plural}`
      } else if (h === 0 && m === 0 && s > 0) {
        return `${s} ${s === 1 ? unitTranslations.seconds.singular : unitTranslations.seconds.plural}`
      } else if (h > 0 || m > 0 || s > 0) {
        const parts = []
        if (h > 0) parts.push(`${h}${unitTranslations.hours.abbr}`)
        if (m > 0) parts.push(`${m}${unitTranslations.minutes.abbr}`)
        if (s > 0) parts.push(`${s}${unitTranslations.seconds.abbr}`)
        return parts.join(" ")
      }
      return "0 segundos"
    } else {
      const translation = unitTranslations[unitType]
      return `${val} ${val === 1 ? translation.singular : translation.plural}`
    }
  }

  /*
  useEffect(() => {
    let totalSeconds = 0
    let formatted = ""

    if (isTimeMode) {
      totalSeconds = hours * 3600 + minutes * 60 + seconds
      formatted = formatValue(0, unit, hours, minutes, seconds)
    } else {
      switch (unit) {
        case "days":
          totalSeconds = value * 86400
          break
        case "weeks":
          totalSeconds = value * 604800
          break
        case "months":
          totalSeconds = value * 2592000
          break
        default:
          totalSeconds = value
      }
      formatted = formatValue(value, unit)
    }

    setFormattedValue(formatted)

    onChange({
      type: "interval",
      notNull: true,
      value: totalSeconds,
      unit,
      formatted,
    })
  }, [hours, minutes, seconds, unit, value, isTimeMode, onChange])
*/

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<number>>,
    max: number = Number.POSITIVE_INFINITY,
  ) => {
    const val = e.target.value === "" ? 0 : Number.parseInt(e.target.value, 10)
    if (!isNaN(val)) {
      setter(Math.max(0, Math.min(max, val)))
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4 mb-4">
        <button
          type="button"
          onClick={() => setIsTimeMode(true)}

          className={
            `flex items-center gap-2 px-4 py-2 rounded-md ${isTimeMode ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`
          }
        >
          <ClockIcon className="w-4 h-4" />
          <span>Tiempo</span>
        </button>
        <button
          type="button"
          onClick={() => setIsTimeMode(false)}

          className={
            `flex items-center gap-2 px-4 py-2 rounded-md ${!isTimeMode ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`
          }
        >
          <CalendarIcon className="w-4 h-4" />
          <span>Calendario</span>
        </button>
      </div>

      {isTimeMode ? (
        <div className="flex items-center justify-center gap-4">
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => setHours((prev) => prev + 1)}
              className="p-1 rounded-full hover:bg-muted"
            >
              <ChevronIcon className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={hours}
              onChange={(e) => handleInputChange(e, setHours)}
              className="w-16 h-16 text-center text-2xl font-medium border rounded-lg"
            />
            <button
              type="button"
              onClick={() => setHours((prev) => Math.max(0, prev - 1))}
              className="p-1 rounded-full hover:bg-muted"
            >
              <ChevronIcon className="w-5 h-5 rotate-180" />
            </button>
            <span className="text-xs text-muted-foreground mt-1">Horas</span>
          </div>
          <div className="text-2xl font-medium">:</div>
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => setMinutes((prev) => Math.min(59, prev + 1))}
              className="p-1 rounded-full hover:bg-muted"
            >
              <ChevronIcon className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={minutes}
              onChange={(e) => handleInputChange(e, setMinutes, 59)}
              className="w-16 h-16 text-center text-2xl font-medium border rounded-lg"
            />
            <button
              type="button"
              onClick={() => setMinutes((prev) => Math.max(0, prev - 1))}
              className="p-1 rounded-full hover:bg-muted"
            >
              <ChevronIcon className="w-5 h-5 rotate-180" />
            </button>
            <span className="text-xs text-muted-foreground mt-1">Minutos</span>
          </div>
          <div className="text-2xl font-medium">:</div>
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => setSeconds((prev) => Math.min(59, prev + 1))}
              className="p-1 rounded-full hover:bg-muted"
            >
              <ChevronIcon className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={seconds}
              onChange={(e) => handleInputChange(e, setSeconds, 59)}
              className="w-16 h-16 text-center text-2xl font-medium border rounded-lg"
            />
            <button
              type="button"
              onClick={() => setSeconds((prev) => Math.max(0, prev - 1))}
              className="p-1 rounded-full hover:bg-muted"
            >
              <ChevronIcon className="w-5 h-5 rotate-180" />
            </button>
            <span className="text-xs text-muted-foreground mt-1">Segundos</span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-4 mb-2">
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => setValue((prev) => prev + 1)}
                className="p-1 rounded-full hover:bg-muted"
              >
                <ChevronIcon className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={value}
                onChange={(e) => handleInputChange(e, setValue, undefined)}
                className="w-16 h-16 text-center text-2xl font-medium border rounded-lg"
              />
              <button
                type="button"
                onClick={() => setValue((prev) => Math.max(1, prev - 1))}
                className="p-1 rounded-full hover:bg-muted"
              >
                <ChevronIcon className="w-5 h-5 rotate-180" />
              </button>
            </div>

            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as IntervalUnit)}
              className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            >
              <option value="days">Días</option>
              <option value="weeks">Semanas</option>
              <option value="months">Meses</option>
            </select>
          </div>
        </div>
      )}
    </div>
  )
}
