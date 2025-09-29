"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"
import { cn } from "@/lib/utils"

// Re-export all recharts components
export * from "recharts"

// Custom chart container with shadcn/ui styling
const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: Record<string, { color?: string; index?: number }>
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <div
      data-chart={chartId}
      ref={ref}
      className={cn(
        "flex aspect-video justify-center text-xs",
        className
      )}
      {...props}
    >
      <ChartStyle config={config} />
      {children}
    </div>
  )
})
ChartContainer.displayName = "Chart"

const ChartStyle = ({ config }: { config: Record<string, { color?: string; index?: number }> }) => {
  // Generate CSS variables for chart colors

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
:root {
  --chart-1: ${config.chart1?.color || "220 70% 50%"};
  --chart-2: ${config.chart2?.color || "160 60% 45%"};
  --chart-3: ${config.chart3?.color || "30 80% 55%"};
  --chart-4: ${config.chart4?.color || "280 65% 60%"};
  --chart-5: ${config.chart5?.color || "340 75% 55%"};
}
        `,
      }}
    />
  )
}

// Chart tooltip component
const ChartTooltip = RechartsPrimitive.Tooltip

// Chart legend component  
const ChartLegend = RechartsPrimitive.Legend

export {
  ChartContainer,
  ChartTooltip,
  ChartLegend,
}
