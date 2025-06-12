"use client";

import { useEffect, useState } from "react";
import { formatDate } from "@/utils/format";
function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`bg-gray-200 animate-pulse rounded ${className}`} />;
}
export default function AppointmentDate({ date }: { date: string }) {
  const [formattedDate, setFormattedDate] = useState<string | null>(null);

  useEffect(() => {
    if (date) {
      const value = formatDate(date, true);
      setFormattedDate(value);
    }
  }, [date]);

  return (
    <span className="text-gray-800 min-w-[150px]">
      {formattedDate ? formattedDate : <Skeleton className="h-5 w-32" />}
    </span>
  );
}
