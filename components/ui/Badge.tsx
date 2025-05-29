import type React from "react"

type BadgeVariant = "primary" | "secondary" | "tertiary" | "success" | "warning" | "error" | "special"
type BadgeSize = "sm" | "md" | "lg"

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  size?: BadgeSize
  className?: string
}

const Badge: React.FC<BadgeProps> = ({ children, variant = "primary", size = "md", className }) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium whitespace-nowrap transition-all duration-200 cursor-default select-none"

  const variantClasses = {
    primary: "bg-primary-100 text-primary-900 border border-primary-200",
    secondary: "bg-secondary-100 text-secondary-900 border border-secondary-200",
    tertiary: "bg-slate-100 text-slate-700 border border-slate-200",
    success: "bg-green-100 text-green-800 border border-green-200",
    warning: "bg-yellow-100 text-yellow-800 border border-yellow-200",
    error: "bg-red-100 text-red-800 border border-red-200",
    special: "bg-blue-100 text-blue-800 border border-blue-200 font-semibold",
  }

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs leading-4",
    md: "px-3 py-1 text-xs leading-[18px]",
    lg: "px-4 py-1.5 text-sm leading-5",
  }

  return <span className={
    `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className || ""}`
  }>{children}</span>
}

export default Badge
