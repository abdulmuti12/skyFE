"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

interface StatCard {
  title: string
  value: string
  change: string
  icon: React.ReactNode
}

const stats: StatCard[] = [
  {
    title: "Total Funding Received",
    value: "45,231.89 USKY",
    change: "+201% increase from last month",
    icon: <span className="text-xl">$</span>,
  },
  {
    title: "Active Projects",
    value: "2",
    change: "+180.1% increase from last month",
    icon: <span className="text-xl">📁</span>,
  },
  {
    title: "Total Investors",
    value: "+12,234",
    change: "+19% increase from last month",
    icon: <span className="text-xl">👥</span>,
  },
  {
    title: "Monthly Growth Rate",
    value: "+573",
    change: "+2.01% increase from last month",
    icon: <TrendingUp className="w-5 h-5" />,
  },
]

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">{stat.title}</h3>
              <div className="text-muted-foreground">{stat.icon}</div>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
