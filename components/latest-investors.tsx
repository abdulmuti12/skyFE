"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const investors = [
  {
    name: "fredthegreat",
    project: "Beyond the Horizon",
    amount: "4,791.80",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=fredthegreat",
  },
  {
    name: "johndukes",
    project: "Eclipse Rising",
    amount: "9,336.08",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=johndukes",
  },
  {
    name: "judithrodriguez",
    project: "Neon Mirage",
    amount: "8,338.52",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=judithrodriguez",
  },
  {
    name: "rodgerstruck",
    project: "Silent Echoes",
    amount: "741.28",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rodgerstruck",
  },
  {
    name: "alexbuckmaster",
    project: "After the Storm",
    amount: "1,629.88",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alexbuckmaster",
  },
  {
    name: "alexbuckmaster",
    project: "Silent Echoes",
    amount: "1,629.88",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alexbuckmaster2",
  },
]

export function LatestInvestors() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle>Latest Investors</CardTitle>
        <p className="text-sm text-muted-foreground mt-2">You gained 256 investors this month.</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {investors.map((investor, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={investor.avatar || "/placeholder.svg"} alt={investor.name} />
                  <AvatarFallback>{investor.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{investor.name}</p>
                  <p className="text-xs text-muted-foreground">{investor.project}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded">USKY</span>
                <p className="text-sm font-medium">{investor.amount}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
