"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox@1.1.4";
import { CheckIcon } from "lucide-react@0.487.0";

import { cn } from "./utils";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer bg-white data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-[#3A4A46] focus-visible:border-[#A7B6A0] focus-visible:ring-[#A7B6A0]/30 aria-invalid:ring-destructive/20 aria-invalid:border-destructive size-5 shrink-0 rounded-lg border-2 border-[#3A4A46] shadow-[0_2px_0_0_rgba(58,74,70,0.1)] transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
