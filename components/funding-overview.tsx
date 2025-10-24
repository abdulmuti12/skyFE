"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { month: "Jan", value: 2000 },
  { month: "Feb", value: 3000 },
  { month: "Mar", value: 2500 },
  { month: "Apr", value: 1800 },
  { month: "May", value: 2200 },
  { month: "Jun", value: 2800 },
  { month: "Jul", value: 3500 },
  { month: "Aug", value: 3200 },
  { month: "Sep", value: 2900 },
  { month: "Oct", value: 3800 },
  { month: "Nov", value: 3100 },
  { month: "Dec", value: 2600 },
]

export function FundingOverview() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>Funding Overview</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Last 6 Months
          </Button>
          <Button variant="outline" size="sm">
            This Year
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: `1px solid var(--color-border)`,
              }}
            />
            <Bar dataKey="value" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
