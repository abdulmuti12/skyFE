"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty"
import { Plus } from "lucide-react"

interface Investor {
  id: string
  name: string
  username: string
  project: string
  amount: number
  avatar: string
}

const investors: Investor[] = []

export function LatestInvestors() {
  const investorCount = investors.length
  const hasInvestors = investorCount > 0

  if (!hasInvestors) {
    return (
      <div className="bg-card border border-border rounded-lg p-4 md:p-6 h-full flex flex-col">
        <h2 className="text-lg md:text-xl font-semibold mb-2">Latest Investors</h2>
        <p className="text-sm text-muted-foreground mb-6">You gained 0 investors this month.</p>

        <Empty className="flex-1 border-0 p-0">
          <EmptyHeader>
            <EmptyTitle className="text-2xl md:text-3xl">No Investors Yet</EmptyTitle>
            <EmptyDescription className="text-base">
              Start your first film project and begin your funding journey today.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-full px-6 py-2 text-sm gap-2">
              <Plus className="w-4 h-4" />
              Create Film
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    )
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6">
      <h2 className="text-lg md:text-xl font-semibold mb-2">Latest Investors</h2>
      <p className="text-sm text-muted-foreground mb-4">You gained {investorCount} investors this month.</p>

      <div className="space-y-3">
        {investors.map((investor) => (
          <div
            key={investor.id}
            className="flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors gap-3"
          >
            <Avatar className="h-10 w-10 flex-shrink-0">
              <AvatarImage src={investor.avatar || "/placeholder.svg"} alt={investor.name} />
              <AvatarFallback>{investor.username.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium truncate">{investor.username}</p>
              <p className="text-xs text-muted-foreground truncate">{investor.project}</p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-sm font-semibold text-right">{investor.amount.toLocaleString()}</span>
              <span className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded cursor-pointer transition-colors">
                USKY
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
