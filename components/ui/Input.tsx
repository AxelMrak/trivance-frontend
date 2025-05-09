"use client";

import { useState } from "react";
import { EyeClosed } from "@components/icons/EyeClosed";
import { EyeOpen } from "@components/icons/EyeOpen";

type InputProps = {
  label: string;
  name: string;
  type?: "text" | "password" | "email" | "number";
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  required?: boolean;
  touched?: boolean;
  className?: string;
};

export default function Input({
  label,
  name,
  type = "text",
  value = "",
  onChange,
  onBlur,
  error,
  disabled = false,
  placeholder,
  required = false,
  touched = false,
  className = "",
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;
  return (
    <div className={`w-full flex flex-col items-start gap-3 ${className}`}>
      <label htmlFor={name} className="block !font-normal text-gray-800">
        {label} {required && touched && <span className="text-red-500">*</span>}
      </label>
      <div className="relative w-full">
        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          placeholder={placeholder}
          className={`w-full px-3 py-2 border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent ${
            disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"
          }`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeClosed className="h-8 w-8" aria-hidden="true" />
            ) : (
              <EyeOpen className="h-8 w-8" aria-hidden="true" />
            )}
          </button>
        )}
      </div>
      <p
        className={`mt-1 text-sm text-red-500 font-normal ${
          error ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
      >
        {error}
      </p>
    </div>
  );
}
