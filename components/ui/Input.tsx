"use client";

import { useState } from "react";
import { EyeClosed } from "@components/icons/EyeClosed";
import { EyeOpen } from "@components/icons/EyeOpen";
import { ErrorIcon } from "@components/icons/ErrorIcon";

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
    <div
      className={`w-full flex flex-col items-start gap-3 text-xl ${className}`}
    >
      <label htmlFor={name} className="block !font-normal text-gray-900">
        {label} {required && touched && <span className="text-red-500">*</span>}
      </label>
      <div className="relative w-full !bg-gray-50 rounded-md">
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
            disabled ? "bg-gray-200 cursor-not-allowed" : "bg-gray-50"
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
      <span
        className={`text-sm font-normal flex items-center gap-1 transition-opacity duration-300 ${
          error ? "text-red-500" : "text-gray-400"
        } ${error || required ? "opacity-100" : "opacity-0"}`}
      >
        {error ? (
          <>
            <ErrorIcon width={15} height={15} />
            {error}
          </>
        ) : required ? (
          "* Requerido"
        ) : null}
      </span>
    </div>
  );
}
