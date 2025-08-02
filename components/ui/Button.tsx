"use client";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "destructive";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  isLoading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  type = "button",
  onClick,
  disabled = false,
  className = "",
  isLoading = false,
}) => {
  const baseStyles =
    "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 shadow hover:shadow-sm transition-all cursor-pointer transition-colors ";

  const variants = {
    primary:
      "bg-primary-base text-white hover:bg-transparent hover:text-primary-base hover:border-primary-base",
    secondary:
      "bg-secondary-900 text-white hover:bg-transparent hover:text-secondary-900 hover:border-secondary-900",
    tertiary:
      "bg-white text-primary-base border border-primary-base hover:border-primary-600 hover:text-primary-600 hover:bg-transparent",
    destructive:
      "bg-transparent text-red-500 border border-red-500 hover:bg-red-500 hover:text-white",
  };

  const disabledStyles = "opacity-50 !cursor-not-allowed";
  const loadingStyles = "opacity-50 !cursor-not-allowed";

  const variantStyles = variants[variant];

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles} ${disabled ? disabledStyles : ""} ${className} ${isLoading ? loadingStyles : ""}`}
    >
      {children && !isLoading ? (
        children
      ) : (
        <div className="flex items-center">
          <p className="font-normal text-current">
            {isLoading ? "Cargando..." : ""}
          </p>
          {isLoading && (
            <div className="ml-2 animate-spin h-5 w-5 border-4 border-t-transparent rounded-full border-current"></div>
          )}
        </div>
      )}
    </button>
  );
};

export default Button;
