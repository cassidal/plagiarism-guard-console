import { ReactNode } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: number;
    label: string;
  };
  icon?: ReactNode;
  loading?: boolean;
  className?: string;
}

export function KPICard({
  title,
  value,
  subtitle,
  trend,
  icon,
  loading = false,
  className,
}: KPICardProps) {
  if (loading) {
    return (
      <div className={cn("kpi-card", className)}>
        <div className="flex items-start justify-between mb-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-8 rounded" />
        </div>
        <Skeleton className="h-8 w-32 mb-2" />
        <Skeleton className="h-4 w-20" />
      </div>
    );
  }

  const getTrendIcon = () => {
    if (!trend) return null;
    if (trend.value > 0) return <TrendingUp className="w-4 h-4" />;
    if (trend.value < 0) return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  const getTrendClass = () => {
    if (!trend) return "";
    if (trend.value > 0) return "kpi-trend-up";
    if (trend.value < 0) return "kpi-trend-down";
    return "text-muted-foreground";
  };

  return (
    <div className={cn("kpi-card", className)}>
      <div className="flex items-start justify-between mb-3">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        {icon && (
          <div className="text-muted-foreground">{icon}</div>
        )}
      </div>
      <div className="text-3xl font-bold text-foreground mb-1">{value}</div>
      <div className="flex items-center gap-2">
        {trend && (
          <span className={cn("flex items-center gap-1", getTrendClass())}>
            {getTrendIcon()}
            <span>{Math.abs(trend.value)}%</span>
          </span>
        )}
        {subtitle && (
          <span className="text-sm text-muted-foreground">{subtitle}</span>
        )}
        {trend && (
          <span className="text-sm text-muted-foreground">{trend.label}</span>
        )}
      </div>
    </div>
  );
}
