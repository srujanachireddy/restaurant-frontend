import { cn } from "@/utils/cn";

interface BadgeProps {
  label: string;
  variant?: "default" | "success" | "warning" | "danger" | "info" | "olive";
}

const variants = {
  default: "bg-cream-200 text-warm-700",
  success: "bg-olive-100 text-olive-700",
  warning: "bg-cream-300 text-warm-700",
  danger: "bg-red-100 text-red-700",
  info: "bg-blue-100 text-blue-700",
  olive: "bg-olive-100 text-olive-600",
};

export const Badge = ({ label, variant = "default" }: BadgeProps) => (
  <span
    className={cn(
      "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-body font-700 tracking-wide",
      variants[variant],
    )}
  >
    {label}
  </span>
);
