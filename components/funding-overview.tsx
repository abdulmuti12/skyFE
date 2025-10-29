"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const dataByTimeframe = {
  "1H": [
    { label: "00:00", value: 3200 },
    { label: "00:05", value: 3400 },
    { label: "00:10", value: 3100 },
    { label: "00:15", value: 3600 },
    { label: "00:20", value: 3300 },
    { label: "00:25", value: 3800 },
    { label: "00:30", value: 3500 },
    { label: "00:35", value: 3900 },
    { label: "00:40", value: 3700 },
    { label: "00:45", value: 4100 },
    { label: "00:50", value: 3800 },
    { label: "00:55", value: 4200 },
  ],
  "4H": [
    { label: "00:00", value: 2800 },
    { label: "04:00", value: 3200 },
    { label: "08:00", value: 4100 },
    { label: "12:00", value: 3600 },
    { label: "16:00", value: 4400 },
    { label: "20:00", value: 3900 },
  ],
  "1D": [
    { label: "00:00", value: 2400 },
    { label: "02:00", value: 2800 },
    { label: "04:00", value: 3200 },
    { label: "06:00", value: 3600 },
    { label: "08:00", value: 4100 },
    { label: "10:00", value: 3800 },
    { label: "12:00", value: 4300 },
    { label: "14:00", value: 3900 },
    { label: "16:00", value: 4500 },
    { label: "18:00", value: 4200 },
    { label: "20:00", value: 3700 },
    { label: "22:00", value: 3400 },
  ],
  "1M": [
    { label: "Week 1", value: 3200 },
    { label: "Week 2", value: 4100 },
    { label: "Week 3", value: 3600 },
    { label: "Week 4", value: 4800 },
  ],
  "6M": [
    { label: "Jan", value: 2800 },
    { label: "Feb", value: 4200 },
    { label: "Mar", value: 3500 },
    { label: "Apr", value: 4600 },
    { label: "May", value: 3900 },
    { label: "Jun", value: 5100 },
  ],
  "1Y": [
    { label: "Jan", value: 2400 },
    { label: "Feb", value: 5200 },
    { label: "Mar", value: 3000 },
    { label: "Apr", value: 4100 },
    { label: "May", value: 2400 },
    { label: "Jun", value: 3200 },
    { label: "Jul", value: 2500 },
    { label: "Aug", value: 5300 },
    { label: "Sep", value: 3000 },
    { label: "Oct", value: 4000 },
    { label: "Nov", value: 2400 },
    { label: "Dec", value: 3200 },
  ],
}

export function FundingOverview() {
  const [timeframe, setTimeframe] = useState<"1H" | "4H" | "1D" | "1M" | "6M" | "1Y">("1Y")
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

  const chartData = dataByTimeframe[timeframe]

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-semibold">Funding Overview</CardTitle>
        <div className="flex gap-0 bg-black/40 rounded-lg p-1 border border-border">
          {(["1H", "4H", "1D", "1M", "6M", "1Y"] as const).map((period) => (
            <Button
              key={period}
              variant="ghost"
              size="sm"
              onClick={() => setTimeframe(period)}
              className={`h-9 px-4 text-sm font-medium rounded-md transition-colors ${
                timeframe === period
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-transparent text-white/70 hover:text-white hover:bg-gray-800/50"
              }`}
            >
              {period}
            </Button>
          ))}
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
