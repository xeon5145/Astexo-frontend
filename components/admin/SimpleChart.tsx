"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ChartDataPoint {
  label: string;
  value: number;
}

interface SimpleChartProps {
  title: string;
  data: ChartDataPoint[];
  type?: 'bar' | 'line';
  className?: string;
}

export default function SimpleChart({ 
  title, 
  data, 
  type = 'bar', 
  className 
}: SimpleChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));
  const chartHeight = 200;
  const chartWidth = 300;

  if (type === 'bar') {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="text-base">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between gap-2 h-48">
            {data.map((point, index) => {
              const height = (point.value / maxValue) * (chartHeight - 40);
              return (
                <div key={index} className="flex flex-col items-center gap-2 flex-1">
                  <div className="text-xs font-medium text-muted-foreground">
                    {point.value}
                  </div>
                  <div 
                    className="bg-primary rounded-t-sm transition-all duration-500 ease-out w-full min-h-[4px]"
                    style={{ height: `${height}px` }}
                  />
                  <div className="text-xs text-muted-foreground text-center">
                    {point.label}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Line chart implementation
  const points = data.map((point, index) => {
    const x = (index / (data.length - 1)) * (chartWidth - 40) + 20;
    const y = chartHeight - 20 - ((point.value / maxValue) * (chartHeight - 40));
    return { x, y, value: point.value, label: point.label };
  });

  const pathData = points.reduce((path, point, index) => {
    const command = index === 0 ? 'M' : 'L';
    return `${path} ${command} ${point.x} ${point.y}`;
  }, '');

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <svg width={chartWidth} height={chartHeight} className="overflow-visible">
            {/* Grid lines */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Line */}
            <path
              d={pathData}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              className="drop-shadow-sm"
            />
            
            {/* Points */}
            {points.map((point, index) => (
              <g key={index}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="4"
                  fill="hsl(var(--primary))"
                  className="drop-shadow-sm"
                />
                <text
                  x={point.x}
                  y={point.y - 10}
                  textAnchor="middle"
                  className="text-xs fill-muted-foreground"
                >
                  {point.value}
                </text>
              </g>
            ))}
            
            {/* X-axis labels */}
            {points.map((point, index) => (
              <text
                key={index}
                x={point.x}
                y={chartHeight - 5}
                textAnchor="middle"
                className="text-xs fill-muted-foreground"
              >
                {point.label}
              </text>
            ))}
          </svg>
        </div>
      </CardContent>
    </Card>
  );
}