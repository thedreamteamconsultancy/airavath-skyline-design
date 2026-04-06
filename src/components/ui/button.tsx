import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-heading font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_20px_hsl(189_100%_50%/0.4)] hover:scale-105",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-primary bg-transparent text-foreground hover:bg-primary/10 hover:shadow-[0_0_15px_hsl(189_100%_50%/0.2)]",
        secondary: "border border-primary bg-transparent text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300",
        ghost: "hover:bg-muted hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-primary text-primary-foreground hover:shadow-[0_0_30px_hsl(189_100%_50%/0.5)] hover:scale-105 tracking-[-0.02em] uppercase",
        "hero-outline": "border border-primary bg-transparent text-foreground hover:bg-primary/10 hover:shadow-[0_0_20px_hsl(189_100%_50%/0.3)] tracking-[-0.02em] uppercase",
        nav: "bg-primary text-primary-foreground font-heading font-medium text-base hover:shadow-[0_0_20px_hsl(189_100%_50%/0.5)] hover:scale-105 transition-all duration-[250ms] normal-case tracking-normal",
      },
      size: {
        default: "h-10 px-4 py-2 text-sm rounded-lg",
        sm: "h-9 rounded-md px-3 text-sm",
        lg: "h-14 rounded-lg px-9 text-base",
        nav: "h-[44px] px-7 rounded-[6px] text-base",
        icon: "h-10 w-10 rounded-lg",
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
