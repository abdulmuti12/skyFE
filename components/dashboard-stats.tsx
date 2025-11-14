"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, DollarSign, FolderOpen, Users } from "lucide-react"
import statsData from "@/data/dashboard-stats.json"

interface StatCard {
  title: string
  value: string
  change: string
  icon: React.ReactNode
}

const defaultStats = [
  {
    title: "Total Funding Received",
    value: "-",
    change: "- increase from last month",
<<<<<<< HEAD
    icon: <span className="text-xl">$</span>,
=======
    icon: "dollar",
>>>>>>> main
  },
  {
    title: "Active Projects",
    value: "-",
    change: "- increase from last month",
<<<<<<< HEAD
    icon: <span className="text-xl">📁</span>,
=======
    icon: "folder",
>>>>>>> main
  },
  {
    title: "Total Investors",
    value: "-",
    change: "- increase from last month",
<<<<<<< HEAD
    icon: <span className="text-xl">👥</span>,
=======
    icon: "users",
>>>>>>> main
  },
  {
    title: "Monthly Growth Rate",
    value: "-",
    change: "- increase from last month",
<<<<<<< HEAD
    icon: <TrendingUp className="w-5 h-5" />,
=======
    icon: "trending",
>>>>>>> main
  },
]

const dataToUse = statsData.length > 0 ? statsData : defaultStats

const stats: StatCard[] = dataToUse.map((stat) => {
  let icon: React.ReactNode
  switch (stat.icon) {
    case "dollar":
      icon = <DollarSign className="w-5 h-5" />
      break
    case "folder":
      icon = <FolderOpen className="w-5 h-5" />
      break
    case "users":
      icon = <Users className="w-5 h-5" />
      break
    case "trending":
      icon = <TrendingUp className="w-5 h-5" />
      break
    default:
      icon = <span className="text-xl">📊</span>
  }
  return {
    ...stat,
    icon,
  }
})

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
