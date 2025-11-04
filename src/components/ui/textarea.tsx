import * as React from "react";

import { cn } from "./utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "resize-none placeholder:text-muted-foreground focus-visible:border-[#A7B6A0] focus-visible:ring-[#A7B6A0]/30 aria-invalid:ring-destructive/20 aria-invalid:border-destructive flex field-sizing-content min-h-16 w-full rounded-2xl border-2 border-[#3A4A46] bg-white px-4 py-3 text-base transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm shadow-[0_2px_0_0_rgba(58,74,70,0.1)]",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
