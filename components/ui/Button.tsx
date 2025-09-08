"use client";
import React from "react";

type BaseProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "destructive";
  disabled?: boolean;
  className?: string;
  isLoading?: boolean;
  size?: "sm" | "md" | "lg";
};

type ButtonProps = BaseProps & {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

type SizeClasses = {
  [key: string]: string;
};

type VariantClasses = {
  [key: string]: string;
};

const getButtonClasses = (variant: string, size: string) => {
  const baseClasses = `
    inline-flex items-center justify-center  rounded-md
    disabled:opacity-50 disabled:cursor-not-allowed
hover:shadow transition-shadow
cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2
  `;

  const sizeClasses: SizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const variantClasses: VariantClasses = {
    primary:
      "bg-primary-base text-white border border-primary-base  focus:ring-primary-500",
    secondary:
      "bg-secondary-900 text-white border border-secondary-900  focus:ring-secondary-500",
    tertiary:
      "bg-white text-primary-base border border-primary-base focus:ring-primary-500",
    destructive:
      "bg-white text-red-500 border border-red-500  focus:ring-red-500",
  };

  return `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]}`
    .replace(/\s+/g, " ")
    .trim();
};

const LoadingContent = () => (
  <div className="flex items-center gap-2">
    <div className="animate-spin h-4 w-4 border-2 border-t-transparent rounded-full border-current" />
    <span>Cargando...</span>
  </div>
);

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  type = "button",
  onClick,
  disabled = false,
  className = "",
  isLoading = false,
  size = "md",
}) => {
  const classes = `${getButtonClasses(variant, size)} ${className}`;

  return (
    <button
      type={type}
      onClick={disabled || isLoading ? undefined : onClick}
      disabled={disabled || isLoading}
      className={classes}
    >
      {isLoading ? <LoadingContent /> : children}
    </button>
  );
};

export default Button;
