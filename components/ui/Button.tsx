import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size    = "xs" | "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:   Variant;
  size?:      Size;
  isLoading?: boolean;
  leftIcon?:  ReactNode;
  rightIcon?: ReactNode;
  children:   ReactNode;
}

// ─── Variant classes ──────────────────────────────────────────────────────────
const VARIANT_CLASSES: Record<Variant, string> = {
  primary:   "btn-primary",
  secondary: "btn-secondary",
  ghost:     "btn-ghost",
  danger:    "btn bg-error text-white hover:bg-error-dark focus-visible:ring-error active:bg-error-dark",
};

const SIZE_CLASSES: Record<Size, string> = {
  xs: "px-2.5 py-1 text-xs rounded",
  sm: "btn-sm",
  md: "",          // default btn size
  lg: "btn-lg",
};

// ─── Component ────────────────────────────────────────────────────────────────
/**
 * Button
 *
 * Accessible, polymorphic button component.
 * Uses forwardRef for compatibility with external form libraries.
 *
 * @example
 * <Button variant="primary" size="lg" leftIcon={<Icon />}>
 *   Get Started
 * </Button>
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant    = "primary",
      size       = "md",
      isLoading  = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      className  = "",
      ...rest
    },
    ref,
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-busy={isLoading}
        aria-disabled={isDisabled}
        className={[
          "btn",
          VARIANT_CLASSES[variant],
          SIZE_CLASSES[size],
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {/* Loading spinner */}
        {isLoading && (
          <svg
            className="h-4 w-4 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12" cy="12" r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}

        {/* Left icon */}
        {!isLoading && leftIcon && (
          <span className="shrink-0" aria-hidden="true">{leftIcon}</span>
        )}

        {/* Label */}
        <span>{children}</span>

        {/* Screen-reader loading hint */}
        {isLoading && (
          <span className="sr-only">Loading, please wait</span>
        )}

        {/* Right icon */}
        {!isLoading && rightIcon && (
          <span className="shrink-0" aria-hidden="true">{rightIcon}</span>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
export default Button;
