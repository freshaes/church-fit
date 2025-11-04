import * as React from "react";
import { Slot } from "@radix-ui/react-slot@1.1.2";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border-2 px-3 py-1 text-xs font-bold w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none shadow-[0_2px_0_0_rgba(58,74,70,0.1)] transition-all overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-[#3A4A46] bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-[#3A4A46] bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-[#3A4A46] bg-destructive text-white [a&]:hover:bg-destructive/90",
        outline:
          "border-[#3A4A46] bg-white text-foreground [a&]:hover:bg-secondary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
