import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "outline" | "success" | "warning" | "muted";

const styles: Record<Variant, string> = {
  default: "bg-primary/10 text-primary-700 border-primary/20",
  outline: "border-slate-200 text-slate-700",
  success: "bg-emerald-50 text-emerald-700 border-emerald-200",
  warning: "bg-amber-50 text-amber-700 border-amber-200",
  muted: "bg-slate-100 text-slate-700 border-slate-200",
};

export function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        styles[variant],
        className
      )}
      {...props}
    />
  );
}
