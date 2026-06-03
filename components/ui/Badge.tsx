import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "gold" | "dark" | "green" | "blue";
  className?: string;
}

const variants = {
  gold: "bg-gold-500/10 text-gold-400 border border-gold-500/20",
  dark: "bg-dark-800 text-dark-300 border border-dark-700",
  green: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  blue: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
};

export function Badge({ children, variant = "dark", className }: BadgeProps) {
  return (
    <span className={cn("inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium", variants[variant], className)}>
      {children}
    </span>
  );
}
