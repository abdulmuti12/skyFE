"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import dataByTimeframe from "@/data/funding-overview_nill.json"

const emptyData = {
  "6M": [
    { label: "Jan", value: 0 },
    { label: "Feb", value: 0 },
    { label: "Mar", value: 0 },
    { label: "Apr", value: 0 },
    { label: "May", value: 0 },
    { label: "Jun", value: 0 },
  ],
  "1Y": [
    { label: "Jan", value: 0 },
    { label: "Feb", value: 0 },
    { label: "Mar", value: 0 },
    { label: "Apr", value: 0 },
    { label: "May", value: 0 },
    { label: "Jun", value: 0 },
    { label: "Jul", value: 0 },
    { label: "Aug", value: 0 },
    { label: "Sep", value: 0 },
    { label: "Oct", value: 0 },
    { label: "Nov", value: 0 },
    { label: "Dec", value: 0 },
  ],
}

export function FundingOverview() {
  const [timeframe, setTimeframe] = useState<"6M" | "1Y">("6M")
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"))
    }

    checkDarkMode()

    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    return () => observer.disconnect()
  }, [])

  const textColor = isDark ? "#9ca3af" : "#6b7280"
  const borderColor = isDark ? "#374151" : "#e5e7eb"
  const cardBg = isDark ? "#1f2937" : "#ffffff"
  const barColor = isDark ? "#d1d5db" : "#e5e7eb"

  const hasData = dataByTimeframe && Object.keys(dataByTimeframe).length > 0
  const dataSource = hasData ? dataByTimeframe : emptyData
  const chartData = dataSource[timeframe]

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-semibold">Funding Overview</CardTitle>
        <div className="flex gap-0 bg-black/40 rounded-lg p-1 border border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTimeframe("6M")}
            className={`h-9 px-4 text-sm font-medium rounded-md transition-colors ${
              timeframe === "6M"
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-transparent text-white/70 hover:text-white hover:bg-gray-800/50"
            }`}
          >
            Last 6 Months
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTimeframe("1Y")}
            className={`h-9 px-4 text-sm font-medium rounded-md transition-colors ${
              timeframe === "1Y"
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-transparent text-white/70 hover:text-white hover:bg-gray-800/50"
            }`}
          >
            This Year
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={borderColor} vertical={false} />
            <XAxis
              dataKey="label"
              stroke={textColor}
              tick={{ fill: textColor, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              stroke={textColor}
              tick={{ fill: textColor, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              ticks={[0, 1500, 3000, 4500, 6000]}
              domain={[0, 6000]}
            />
            <Tooltip
              cursor={false}
              contentStyle={{
                backgroundColor: cardBg,
                border: `1px solid ${borderColor}`,
                borderRadius: "6px",
                color: textColor,
              }}
              labelStyle={{ color: textColor }}
            />
            <Bar dataKey="value" fill={barColor} radius={[4, 4, 0, 0]} activeBar={false} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
