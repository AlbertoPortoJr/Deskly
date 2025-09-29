"use client"

import * as React from "react"
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts"
import { cn } from "@/lib/utils"

interface PieChartProps {
  data: Array<{ name: string; value: number; [key: string]: string | number }>
  className?: string
  height?: number
  showTooltip?: boolean
  showLegend?: boolean
  colors?: string[]
  innerRadius?: number
  outerRadius?: number
}

const PieChart = React.forwardRef<HTMLDivElement, PieChartProps>(
  ({ 
    data, 
    className, 
    height = 300, 
    showTooltip = true, 
    showLegend = true,
    colors = [
      "#3b82f6",
      "#10b981", 
      "#f59e0b",
      "#ef4444",
      "#8b5cf6"
    ],
    innerRadius = 0,
    outerRadius = 80,
    ...props 
  }, ref) => {
    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <ResponsiveContainer width="100%" height={height}>
          <RechartsPieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
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
            {showLegend && (
              <Legend 
                wrapperStyle={{
                  color: "#1f2937",
                }}
              />
            )}
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    )
  }
)
PieChart.displayName = "PieChart"

export { PieChart }
