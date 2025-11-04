"use client"

import { TrendingUp } from "lucide-react"

interface Investor {
  id: number
  asset: string
  price: string
  holdings: string
  change: string
}

const investorsData: Investor[] = [
  { id: 1, asset: "Beyond the Horizon", price: "1250 USKY", holdings: "1250 USKY", change: "+8%" },
  { id: 2, asset: "Beyond the Horizon", price: "1250 USKY", holdings: "1250 USKY", change: "+8%" },
  { id: 3, asset: "Beyond the Horizon", price: "1250 USKY", holdings: "1250 USKY", change: "+8%" },
  { id: 4, asset: "Beyond the Horizon", price: "1250 USKY", holdings: "1250 USKY", change: "+8%" },
  { id: 5, asset: "Beyond the Horizon", price: "1250 USKY", holdings: "1250 USKY", change: "+8%" },
  { id: 6, asset: "Beyond the Horizon", price: "1250 USKY", holdings: "1250 USKY", change: "+8%" },
  { id: 7, asset: "Beyond the Horizon", price: "1250 USKY", holdings: "1250 USKY", change: "+8%" },
  { id: 8, asset: "Beyond the Horizon", price: "1250 USKY", holdings: "1250 USKY", change: "+8%" },
  { id: 9, asset: "Beyond the Horizon", price: "1250 USKY", holdings: "1250 USKY", change: "+8%" },
  { id: 10, asset: "Beyond the Horizon", price: "1250 USKY", holdings: "1250 USKY", change: "+8%" },
]

export function LatestInvestorsTable() {
  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 h-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-lg md:text-xl font-semibold mb-1">Latest Investors</h2>
        <p className="text-sm text-muted-foreground">You made 205 sales this month</p>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="sticky top-0 bg-card">
            <tr className="border-b border-border">
              <th className="text-left text-xs md:text-sm font-semibold text-muted-foreground pb-3">Asset</th>
              <th className="text-right text-xs md:text-sm font-semibold text-muted-foreground pb-3">Price</th>
              <th className="text-right text-xs md:text-sm font-semibold text-muted-foreground pb-3">Holdings</th>
            </tr>
          </thead>
          <tbody>
            {investorsData.map((investor) => (
              <tr key={investor.id} className="border-b border-border last:border-0">
                <td className="py-3 text-xs md:text-sm">{investor.asset}</td>
                <td className="py-3 text-right text-xs md:text-sm">{investor.price}</td>
                <td className="py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <span className="text-xs md:text-sm">{investor.holdings}</span>
                    <span className="flex items-center gap-0.5 text-green-500 text-xs font-semibold">
                      <TrendingUp className="w-3 h-3" />
                      {investor.change}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
