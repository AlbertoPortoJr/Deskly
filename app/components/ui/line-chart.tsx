"use client"

import * as React from "react"
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { cn } from "@/lib/utils"

interface LineChartProps {
  data: Array<{ name: string; value: number; [key: string]: string | number }>
  className?: string
  height?: number
  showGrid?: boolean
  showTooltip?: boolean
  color?: string
  strokeWidth?: number
}

const LineChart = React.forwardRef<HTMLDivElement, LineChartProps>(
  ({ data, className, height = 300, showGrid = true, showTooltip = true, color = "#3b82f6", strokeWidth = 2, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <ResponsiveContainer width="100%" height={height}>
          <RechartsLineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={color} 
              strokeWidth={strokeWidth}
              dot={{ fill: color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    )
  }
)
LineChart.displayName = "LineChart"

export { LineChart }
