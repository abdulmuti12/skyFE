"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const last6MonthsData = [
  { month: "Jul", value: 2400 },
  { month: "Aug", value: 5000 },
  { month: "Sep", value: 3000 },
  { month: "Oct", value: 4200 },
  { month: "Nov", value: 2200 },
  { month: "Dec", value: 3100 },
]

const thisYearData = [
  { month: "Jan", value: 2400 },
  { month: "Feb", value: 5000 },
  { month: "Mar", value: 3000 },
  { month: "Apr", value: 4200 },
  { month: "May", value: 2200 },
  { month: "Jun", value: 3100 },
  { month: "Jul", value: 2400 },
  { month: "Aug", value: 5000 },
  { month: "Sep", value: 3000 },
  { month: "Oct", value: 4200 },
  { month: "Nov", value: 2200 },
  { month: "Dec", value: 3100 },
]

export function FundingOverview() {
  const [timeframe, setTimeframe] = useState<"6months" | "year">("6months")
  const [isDark, setIsDark] = useState(false)

  const data = timeframe === "6months" ? last6MonthsData : thisYearData

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"))
    }

    checkDarkMode()

    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    return () => observer.disconnect()
  }, [])

  const textColor = isDark ? "#fafafa" : "#242424"
  const borderColor = isDark ? "#434343" : "#ebe9e9"
  const cardBg = isDark ? "#242424" : "#ffffff"
  const barColor = isDark ? "#ffffff" : "#000000"

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>Funding Overview</CardTitle>
        <div className="flex gap-2">
          <Button
            variant={timeframe === "6months" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeframe("6months")}
            className={timeframe === "6months" ? "bg-foreground text-background hover:bg-foreground/90" : ""}
          >
            Last 6 Months
          </Button>
          <Button
            variant={timeframe === "year" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeframe("year")}
            className={timeframe === "year" ? "bg-foreground text-background hover:bg-foreground/90" : ""}
          >
            This Year
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={borderColor} vertical={false} />
            <XAxis dataKey="month" stroke={textColor} tick={{ fill: textColor }} />
            <YAxis stroke={textColor} tick={{ fill: textColor }} />
            <Tooltip
              cursor={false} // ⬅ ini yang menghilangkan highlight grey
              contentStyle={{
                backgroundColor: cardBg,
                border: `1px solid ${borderColor}`,
                color: textColor,
              }}
              labelStyle={{ color: textColor }}
            />
            <Bar dataKey="value" fill={barColor} radius={[8, 8, 0, 0]} activeBar={false} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
