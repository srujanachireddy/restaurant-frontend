import { cn } from "../../utils/cn";

interface BadgeProps {
  label: string;
  variant?: "default" | "success" | "warning" | "danger" | "info";
}

export const Badge = ({ label, variant = "default" }: BadgeProps) => (
  <span
    className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold",
      {
        "bg-stone-100 text-stone-700": variant === "default",
        "bg-green-100 text-green-700": variant === "success",
        "bg-yellow-100 text-yellow-700": variant === "warning",
        "bg-red-100 text-red-700": variant === "danger",
        "bg-blue-100 text-blue-700": variant === "info",
      },
    )}
  >
    {label}
  </span>
);
