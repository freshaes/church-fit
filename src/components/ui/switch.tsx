"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch@1.1.3";

import { cn } from "./utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-[#E5DDD4] focus-visible:border-[#A7B6A0] focus-visible:ring-[#A7B6A0]/30 inline-flex h-7 w-12 shrink-0 items-center rounded-full border-2 border-[#3A4A46] transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 shadow-[0_2px_0_0_rgba(58,74,70,0.1)]",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-white pointer-events-none block size-5 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-[2px] shadow-[0_1px_2px_rgba(0,0,0,0.1)]",
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
