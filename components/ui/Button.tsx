"use client";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "gold" | "outline-gold" | "ghost" | "dark";
type Size = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  gold: "btn-gold rounded-full text-dark-950 font-bold tracking-wide",
  "outline-gold": "btn-outline-gold rounded-full font-semibold tracking-wide",
  ghost: "bg-transparent text-dark-100 hover:text-gold-400 hover:bg-white/5 rounded-full transition-all duration-200",
  dark: "bg-dark-800 text-dark-100 hover:bg-dark-700 border border-dark-700 rounded-full transition-all duration-200",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
  xl: "px-10 py-5 text-xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "gold", size = "md", fullWidth, className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 cursor-pointer select-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
);
Button.displayName = "Button";
