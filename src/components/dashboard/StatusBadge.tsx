import { cn } from "@/lib/utils";
import { CheckCircle2, Clock, AlertCircle, Loader2 } from "lucide-react";

type Status = "operational" | "processing" | "completed" | "error" | "pending";

interface StatusBadgeProps {
  status: Status;
  label?: string;
  className?: string;
}

const statusConfig: Record<Status, { icon: typeof CheckCircle2; className: string; defaultLabel: string }> = {
  operational: {
    icon: CheckCircle2,
    className: "status-operational",
    defaultLabel: "Operational",
  },
  completed: {
    icon: CheckCircle2,
    className: "status-operational",
    defaultLabel: "Completed",
  },
  processing: {
    icon: Loader2,
    className: "status-processing",
    defaultLabel: "Processing",
  },
  pending: {
    icon: Clock,
    className: "status-processing",
    defaultLabel: "Pending",
  },
  error: {
    icon: AlertCircle,
    className: "status-error",
    defaultLabel: "Error",
  },
};

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span className={cn("status-badge", config.className, className)}>
      <Icon className={cn("w-3.5 h-3.5", status === "processing" && "animate-spin")} />
      {label || config.defaultLabel}
    </span>
  );
}
