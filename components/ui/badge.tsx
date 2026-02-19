import { cn } from "@/lib/utils";
import type { BadgeVariant } from "@/lib/utils";

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-primary/20 text-primary border-primary/30",
  secondary: "bg-secondary text-muted-foreground border-secondary",
  destructive: "bg-destructive/20 text-red-400 border-destructive/30",
  warning: "bg-warning/20 text-amber-400 border-warning/30",
  success: "bg-success/20 text-green-400 border-success/30",
};

export function Badge({ variant = "default", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
