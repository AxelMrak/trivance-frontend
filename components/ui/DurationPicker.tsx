import React, { useState, useEffect, useCallback } from "react";

interface DurationPickerProps {
  value?: string;
  onChange: (value: string) => void;
}

const DurationPicker: React.FC<DurationPickerProps> = ({
  value = "0mins",
  onChange,
}) => {
  const parseDuration = useCallback(
    (duration: string): { hours: number; minutes: number } => {
      if (!duration) return { hours: 0, minutes: 0 };
      const hoursMatch = duration.match(/(\d+)\s*(hr|h)/);
      const minutesMatch = duration.match(/(\d+)\s*(mins|min)/);
      return {
        hours: hoursMatch ? parseInt(hoursMatch[1], 10) : 0,
        minutes: minutesMatch ? parseInt(minutesMatch[1], 10) : 0,
      };
    },
    [],
  );

  const [hours, setHours] = useState(parseDuration(value).hours);
  const [minutes, setMinutes] = useState(parseDuration(value).minutes);

  useEffect(() => {
    const formatDuration = () => {
      let durationString = "";
      if (hours > 0) {
        durationString += `${hours}hr`;
      }
      if (minutes > 0) {
        if (durationString) durationString += " ";
        durationString += `${minutes}mins`;
      }
      if (hours === 0 && minutes === 0) {
        return "0mins";
      }
      return durationString;
    };
    onChange(formatDuration());
  }, [hours, minutes, onChange]);

  const handleHoursChange = (amount: number) => {
    setHours((prev) => Math.max(0, prev + amount));
  };

  const handleMinutesChange = (amount: number) => {
    setMinutes((prev) => {
      const newMinutes = prev + amount;
      if (newMinutes >= 60) {
        setHours((h) => h + 1);
        return newMinutes - 60;
      }
      if (newMinutes < 0) {
        if (hours > 0) {
          setHours((h) => h - 1);
          return 60 + newMinutes;
        }
        return 0;
      }
      return newMinutes;
    });
  };

  const presets = ["30mins", "1hr", "1hr 30mins", "2hrs"];

  const selectPreset = (preset: string) => {
    const { hours, minutes } = parseDuration(preset);
    setHours(hours);
    setMinutes(minutes);
  };
  return (
    <div className="p-4 rounded-lg bg-white  border border-gray-200 w-full">
      <div className="flex items-center justify-center gap-4">
        <div className="flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={() => handleHoursChange(1)}
            className="w-10 h-10 text-2xl font-bold rounded-full text-gray-700  bg-gray-200   hover:bg-gray-300  cursor-pointer"
          >
            +
          </button>
          <span className="text-4xl font-bold my-1 text-gray-900 ">
            {String(hours).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={() => handleHoursChange(-1)}
            className="w-10 h-10 text-2xl font-bold rounded-full text-gray-700  bg-gray-200   hover:bg-gray-300  cursor-pointer"
          >
            -
          </button>
        </div>
        <span className="text-4xl font-bold text-gray-500 ">:</span>
        <div className="flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={() => handleMinutesChange(15)}
            className="w-10 h-10 text-2xl font-bold rounded-full text-gray-700  bg-gray-200   hover:bg-gray-300  cursor-pointer"
          >
            +
          </button>
          <span className="text-4xl font-bold my-1 text-gray-900 ">
            {String(minutes).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={() => handleMinutesChange(-15)}
            className="w-10 h-10 text-2xl font-bold rounded-full text-gray-700  bg-gray-200   hover:bg-gray-300 cursor-pointer"
          >
            -
          </button>
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {presets.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => selectPreset(p)}
            className="px-3 py-1 text-xs rounded-full text-primary-500 border border-gray-300 hover:opacity-50 transition-opacity  cursor-pointer font-semibold"
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DurationPicker;
