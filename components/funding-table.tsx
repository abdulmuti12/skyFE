"use client"

import { useState } from "react"
import { MoreVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface FundingCampaign {
  id: string
  title: string
  targetFunding: string
  currentFunding: string
  progress: number
  investors: number
  status: "Funding" | "Completed"
}

const mockData: FundingCampaign[] = [
  {
    id: "1",
    title: "Echoes of Tomorrow",
    targetFunding: "45,000 USKY",
    currentFunding: "36,250 USKY",
    progress: 69,
    investors: 540,
    status: "Funding",
  },
  {
    id: "2",
    title: "Dreambound",
    targetFunding: "50,000 USKY",
    currentFunding: "39,880 USKY",
    progress: 85,
    investors: 423,
    status: "Completed",
  },
  {
    id: "3",
    title: "Beyond the Horizon",
    targetFunding: "50,000 USKY",
    currentFunding: "47,300 USKY",
    progress: 103,
    investors: 922,
    status: "Completed",
  },
  {
    id: "4",
    title: "Neon Mirage",
    targetFunding: "35,000 USKY",
    currentFunding: "36,250 USKY",
    progress: 75,
    investors: 453,
    status: "Funding",
  },
  {
    id: "5",
    title: "Parallel Hearts",
    targetFunding: "45,000 USKY",
    currentFunding: "47,300 USKY",
    progress: 73,
    investors: 583,
    status: "Funding",
  },
  {
    id: "6",
    title: "Silent Verse",
    targetFunding: "45,000 USKY",
    currentFunding: "41,250 USKY",
    progress: 72,
    investors: 429,
    status: "Completed",
  },
  {
    id: "7",
    title: "Mirage Runner",
    targetFunding: "45,000 USKY",
    currentFunding: "36,250 USKY",
    progress: 105,
    investors: 426,
    status: "Funding",
  },
  {
    id: "8",
    title: "Moonlit Sonata",
    targetFunding: "55,000 USKY",
    currentFunding: "58,900 USKY",
    progress: 98,
    investors: 740,
    status: "Completed",
  },
  {
    id: "9",
    title: "Stardust Prophecy",
    targetFunding: "55,000 USKY",
    currentFunding: "24,300 USKY",
    progress: 83,
    investors: 196,
    status: "Completed",
  },
  {
    id: "10",
    title: "Crimson Shadows",
    targetFunding: "45,000 USKY",
    currentFunding: "33,750 USKY",
    progress: 102,
    investors: 536,
    status: "Funding",
  },
]

export function FundingTable() {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())

  const toggleRowSelection = (id: string) => {
    const newSelected = new Set(selectedRows)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedRows(newSelected)
  }

  const toggleAllSelection = () => {
    if (selectedRows.size === mockData.length) {
      setSelectedRows(new Set())
    } else {
      setSelectedRows(new Set(mockData.map((f) => f.id)))
    }
  }

  return (
    <div className="w-full">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto border border-border rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left text-sm font-semibold">Title</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Target Funding</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Current Funding</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Progress</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Investors</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
              <th className="px-4 py-3 text-center text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((campaign) => (
              <tr key={campaign.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 text-sm">{campaign.title}</td>
                <td className="px-4 py-3 text-sm">{campaign.targetFunding}</td>
                <td className="px-4 py-3 text-sm">{campaign.currentFunding}</td>
                <td className="px-4 py-3 text-sm">{campaign.progress}%</td>
                <td className="px-4 py-3 text-sm">{campaign.investors}</td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex items-center gap-2">
                    {campaign.status === "Completed" ? (
                      <>
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span>{campaign.status}</span>
                      </>
                    ) : (
                      <>
                        <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                        <span>{campaign.status}</span>
                      </>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-muted">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem asChild>
                        <Link href={`/creator/funding/${campaign.id}`}>See Funding Details</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Withdraw Funds</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Share Campaign</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden divide-y divide-border border border-border rounded-lg overflow-hidden">
        <div className="px-4 py-3 bg-muted/30 flex items-center gap-3">
          <input
            type="checkbox"
            checked={selectedRows.size === mockData.length && mockData.length > 0}
            onChange={toggleAllSelection}
            className="rounded border-border cursor-pointer flex-shrink-0"
          />
          <span className="text-xs font-semibold text-muted-foreground flex-1">Title</span>
          <span className="text-xs font-semibold text-muted-foreground">Target Funding</span>
        </div>
        {mockData.map((campaign) => (
          <div
            key={campaign.id}
            className="px-4 py-3 flex items-center justify-between gap-3 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <input
                type="checkbox"
                checked={selectedRows.has(campaign.id)}
                onChange={() => toggleRowSelection(campaign.id)}
                className="rounded border-border cursor-pointer flex-shrink-0"
              />
              <p className="text-sm font-medium truncate">{campaign.title}</p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="text-xs text-muted-foreground whitespace-nowrap">{campaign.targetFunding}</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-muted flex-shrink-0">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href={`/creator/funding/${campaign.id}`}>See Funding Details</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Withdraw Funds</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Share Campaign</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 text-sm text-muted-foreground">
        <div>0 of 100 row(s) selected.</div>
        <div className="flex items-center gap-2">
          <span>Rows per page</span>
          <select className="bg-muted border border-border rounded px-2 py-1 text-foreground">
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
          <span className="ml-4">Page 1 of 10</span>
          <div className="flex gap-1 ml-4">
            <button className="p-1 hover:bg-muted rounded disabled:opacity-50" disabled>
              ≪
            </button>
            <button className="p-1 hover:bg-muted rounded disabled:opacity-50" disabled>
              ‹
            </button>
            <button className="p-1 hover:bg-muted rounded">›</button>
            <button className="p-1 hover:bg-muted rounded">≫</button>
          </div>
        </div>
      </div>
    </div>
  )
}
