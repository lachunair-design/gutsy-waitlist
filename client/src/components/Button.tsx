import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center border-2 border-gutsy-black font-bold uppercase tracking-wide transition-all duration-100 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: "bg-gutsy-red text-white hover:bg-red-700",
        secondary: "bg-gutsy-yellow text-gutsy-black hover:bg-yellow-500",
        outline: "bg-transparent text-gutsy-black hover:bg-gutsy-black hover:text-white",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
      },
      brutalist: {
        true: "shadow-brutalist hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px]",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      brutalist: true,
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, brutalist, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, brutalist }), className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
