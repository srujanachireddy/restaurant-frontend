import { cn } from "@/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "olive";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const Button = ({
  variant = "primary",
  size = "md",
  loading,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) => {
  const base =
    "inline-flex items-center justify-center font-body font-700 rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";

  const variants = {
    primary:
      "bg-terra-500 hover:bg-terra-600 text-white shadow-terra focus:ring-terra-400",
    secondary:
      "bg-cream-100 hover:bg-cream-200 text-charcoal border border-cream-300 focus:ring-cream-300",
    danger: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-400",
    ghost:
      "bg-transparent hover:bg-cream-100 text-charcoal focus:ring-cream-300",
    olive: "bg-olive-500 hover:bg-olive-600 text-white focus:ring-olive-400",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3.5 text-base gap-2",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};
