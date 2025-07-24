import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react"
import Link from "next/link"

export interface CustomLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  variant?: "primary" | "secondary" | "muted" | "underline" | "button"
  children: ReactNode
  external?: boolean
  showExternalIcon?: boolean
}

const CustomLink = forwardRef<HTMLAnchorElement, CustomLinkProps>(
  ({ variant = "primary", className, children, external, showExternalIcon = true, href, ...props }, ref) => {
    const isExternal = external || (typeof window !== "undefined" && href.startsWith("http") && !href.includes(window.location.hostname))

    const baseStyles = [
      "inline-flex items-center transition-all duration-200 ease-out",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      "group relative"
    ]

    const variants = {
      primary: [
        "text-primary-base hover:brightness-110",
        "focus-visible:ring-primary-base",
        "after:absolute after:bottom-0 after:left-0 after:h-0.5",
        "after:w-0 after:bg-primary-base after:transition-all after:duration-300",
        "hover:after:w-full"
      ],
      secondary: [
        "text-secondary-base hover:brightness-110",
        "focus-visible:ring-secondary-base",
        "after:absolute after:bottom-0 after:left-0 after:h-0.5",
        "after:w-0 after:bg-secondary-base after:transition-all after:duration-300",
        "hover:after:w-full"
      ],
      muted: [
        "text-[var(--color-muted)] hover:text-[var(--color-foreground)]",
        "focus-visible:ring-[var(--color-foreground)]",
        "transition-colors duration-200"
      ],
      underline: [
        "text-primary-base underline underline-offset-4 decoration-2",
        "hover:decoration-primary-base hover:text-primary-base",
        "focus-visible:ring-primary-base",
        "transition-all duration-200"
      ],
      button: [
        "bg-primary-base text-white px-4 py-2 rounded-xl",
        "hover:shadow-md hover:brightness-110 ",
        "focus-visible:ring-primary-base",
        "transition-all duration-200 shadow-sm"
      ]
    }

    const ExternalIcon = () => (
      <svg
        className="ml-1 h-3 w-3 "
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    )

    const linkContent = (
      <>
        <span >{children}</span>
        {isExternal && showExternalIcon && variant !== "button" && <ExternalIcon />}
        {isExternal && showExternalIcon && variant === "button" && (
          <span className="ml-1 ">↗</span>
        )}
      </>
    )

    const composedClassName = [
      ...baseStyles,
      ...(variants[variant] || []),
      className
    ].filter(Boolean).join(" ")

    const linkProps = {
      ref,
      className: composedClassName,
      ...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {}),
      ...props
    }

    if (isExternal) {
      return (
        <a href={href} {...linkProps}>
          {linkContent}
        </a>
      )
    }

    return (
      <Link href={href} {...linkProps}>
        {linkContent}
      </Link>
    )
  }
)

CustomLink.displayName = "CustomLink"

export { CustomLink }

