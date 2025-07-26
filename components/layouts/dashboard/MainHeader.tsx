"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";

export const MainHeader = ({ title }: { title?: string }) => {
  const { user } = useUser();
  const userName = user?.user?.name || 'Usuario';

  const [time, setTime] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);


  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("es-AR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
      setDate(
        now.toLocaleDateString("es-AR", {
          day: "2-digit",
          month: "2-digit",
        })
      );
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000); 

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <header className="flex items-center justify-between p-4 bg-primary-base text-white w-full rounded-md">
      <h1 className="text-4xl font-normal capitalize">
        {title || `Hola ${userName}!`}
      </h1>
      <p className="text-4xl text-white font-normal">
        {time}
        <span className="text-2xl font-thin ml-2">{date}</span>
      </p>
    </header>
  );
};

