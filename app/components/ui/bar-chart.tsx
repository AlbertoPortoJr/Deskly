"use client"

import * as React from "react"
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { cn } from "@/lib/utils"

interface BarChartProps {
  data: Array<{ name: string; value: number; [key: string]: string | number }>
  className?: string
  height?: number
  showGrid?: boolean
  showTooltip?: boolean
  color?: string
}

const BarChart = React.forwardRef<HTMLDivElement, BarChartProps>(
  ({ data, className, height = 300, showGrid = true, showTooltip = true, color = "#3b82f6", ...props }, ref) => {
    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <ResponsiveContainer width="100%" height={height}>
          <RechartsBarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />}
            <XAxis 
              dataKey="name" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
            />
            {showTooltip && (
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                  color: "#1f2937",
                }}
              />
            )}
            <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    )
  }
)
BarChart.displayName = "BarChart"

export { BarChart }
