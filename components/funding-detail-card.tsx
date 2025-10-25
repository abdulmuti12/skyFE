"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TrendingUp } from "lucide-react"

export function FundingDetailCard() {
  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 mb-6">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {/* Movie Poster */}
        <div className="w-full md:w-56 h-48 md:h-36 bg-muted rounded-lg overflow-hidden flex-shrink-0">
          <img src="/02.jpg" alt="Beyond the Horizon" className="w-full h-full object-cover" />
        </div>

        {/* Movie Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-xl md:text-2xl font-bold">Beyond the Horizon</h2>
              <span className="px-2 py-0.5 bg-blue-500 text-white text-xs font-semibold rounded">USKY</span>
              <div className="flex items-center gap-1 text-green-500 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>1.8%</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-3">Adventure</p>

            {/* Creator */}
            <div className="flex items-center gap-2 mb-4">
              <Avatar className="h-6 w-6">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=cinemaxdev" alt="cinemaxdev" />
                <AvatarFallback>CD</AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">cinemaxdev</span>
            </div>
          </div>

          {/* Funding Progress */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-bold">$5.2K</span>
              <span className="text-lg font-bold">$50K</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-yellow-400 h-2 rounded-full" style={{ width: "10.4%" }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
