"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  isLoading?: boolean;
  className?: string;
}

export default function MetricCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  isLoading = false,
  className
}: MetricCardProps) {
  if (isLoading) {
    return (
      <Card className={cn("transition-all duration-200 hover:shadow-md", className)}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="h-4 w-20 bg-muted animate-pulse rounded" />
            {Icon && <div className="h-5 w-5 bg-muted animate-pulse rounded" />}
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-8 w-16 bg-muted animate-pulse rounded mb-2" />
          <div className="h-3 w-24 bg-muted animate-pulse rounded" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("transition-all duration-200 hover:shadow-md", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          {Icon && (
            <Icon className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <div className="text-2xl font-bold text-card-foreground">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>
          {trend && (
            <div className={cn(
              "text-xs font-medium flex items-center gap-1",
              trend.isPositive ? "text-green-600" : "text-red-600"
            )}>
              <span>{trend.isPositive ? "↗" : "↘"}</span>
              {Math.abs(trend.value)}%
            </div>
          )}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}