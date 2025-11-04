import * as React from "react";
import { Slot } from "@radix-ui/react-slot@1.1.2";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-bold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none border-2 shadow-[0_3px_0_0_rgba(58,74,70,0.15)] active:shadow-none active:translate-y-[2px] hover:scale-[1.02]",
  {
    variants: {
      variant: {
        default: "bg-primary border-[#3A4A46] text-primary-foreground hover:bg-[#95A58E]",
        destructive:
          "bg-destructive border-[#3A4A46] text-white hover:bg-[#D45B47]",
        outline:
          "border-[#3A4A46] bg-white text-foreground hover:bg-secondary",
        secondary:
          "bg-secondary border-[#3A4A46] text-secondary-foreground hover:bg-[#E6DFD8]",
        ghost:
          "border-transparent shadow-none hover:bg-secondary hover:text-accent-foreground",
        link: "border-transparent shadow-none text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 py-2.5 has-[>svg]:px-4",
        sm: "h-9 rounded-full gap-1.5 px-4 has-[>svg]:px-3",
        lg: "h-12 rounded-full px-7 has-[>svg]:px-5 text-base",
        icon: "size-11 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
    }
>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };
