import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

const variants = {
  primary: "bg-terracotta text-ivory hover:bg-terracotta/90 shadow-card",
  secondary: "bg-saffron text-ivory hover:bg-saffron/90 shadow-card",
  outline: "border-2 border-terracotta text-terracotta hover:bg-terracotta hover:text-ivory",
  ghost: "text-terracotta hover:bg-terracotta/10",
};

const sizes = {
  sm: "px-4 py-1.5 text-sm",
  md: "px-6 py-2.5 text-base",
  lg: "px-8 py-3.5 text-lg",
};

export const Button = ({ variant = "primary", size = "md", className, children, ...props }: ButtonProps) => (
  <button
    className={clsx(
      "rounded-full font-medium tracking-wide transition-all duration-200 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed",
      variants[variant],
      sizes[size],
      className
    )}
    {...props}
  >
    {children}
  </button>
);
