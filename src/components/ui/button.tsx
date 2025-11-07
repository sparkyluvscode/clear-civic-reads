import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:bg-primary/95 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group",
        destructive: "bg-destructive text-destructive-foreground shadow-lg hover:shadow-xl hover:bg-destructive/95 hover:scale-[1.02]",
        outline: "border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-primary/50 shadow-sm hover:shadow-md",
        secondary: "bg-secondary text-secondary-foreground shadow-md hover:shadow-lg hover:bg-secondary/90 hover:scale-[1.02]",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        glass: "glass-strong text-white border-white/45 hover:border-white/70 shadow-glass-strong hover:shadow-glass-hover hover:scale-[1.03] hover:-translate-y-0.5 transition-all duration-500 relative overflow-hidden shimmer group",
        premium: "bg-gradient-to-br from-primary via-primary to-accent text-white border-2 border-white/30 shadow-glow-blue hover:shadow-glow-teal hover:scale-[1.05] hover:-translate-y-1 transition-all duration-500 relative overflow-hidden group font-bold",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-14 rounded-xl px-10 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
