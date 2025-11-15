"use client"

import { TrendingUp, Bookmark, Grid3x3, List, ChevronDown, MoreVertical } from 'lucide-react'
import { useState } from "react"
import Link from "next/link"
import investmentData from "@/data/investment-items.json"

type FilterType = "featured" | "mostValuable" | "newCoin" | "oldestCoin" | "lastReply"
type ViewType = "grid" | "list"

export function InvestmentGrid() {
  const itemsPerPage = 10
  const projects = investmentData.projects
  const totalProjects = projects.length
  const totalPages = Math.ceil(totalProjects / itemsPerPage)
  
  const [currentPage, setCurrentPage] = useState(1)
  const [activeFilter, setActiveFilter] = useState<FilterType>("featured")
  const [viewType, setViewType] = useState<ViewType>("grid")

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProjects = projects.slice(startIndex, endIndex)

  const generateMockData = (id: number) => {
    const baseValue = 5200 + (id * 100)
    return {
      mcap: `$${(baseValue / 1000).toFixed(1)}K`,
      ath: `${(baseValue * 1.2).toFixed(0)}`,
      age: "6m",
      txns: (500 + id * 50).toString(),
      vol24h: `$${(baseValue * 8).toFixed(2)}`,
      investors: (274 + id * 30).toString(),
      change6m: (Math.random() * 300 - 50).toFixed(2),
      change1h: (Math.random() * 10 - 5).toFixed(2),
      change6h: (Math.random() * 20 - 10).toFixed(2),
      change24h: (Math.random() * 30 - 15).toFixed(2),
    }
  }

  return (
    <section>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 lg:mb-6">
        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          <button
            onClick={() => setActiveFilter("featured")}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
              activeFilter === "featured"
                ? "bg-white text-black"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            ⭐ Featured
          </button>
          <button
            onClick={() => setActiveFilter("mostValuable")}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
              activeFilter === "mostValuable"
                ? "bg-white text-black"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            💎 Most Valuable
          </button>
          <button
            onClick={() => setActiveFilter("newCoin")}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
              activeFilter === "newCoin"
                ? "bg-white text-black"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            🌟 New Coin
          </button>
          <button
            onClick={() => setActiveFilter("oldestCoin")}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
              activeFilter === "oldestCoin"
                ? "bg-white text-black"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            ⏰ Oldest Coin
          </button>
          <button
            onClick={() => setActiveFilter("lastReply")}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
              activeFilter === "lastReply"
                ? "bg-white text-black"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            💬 Last Reply
          </button>
        </div>

        {/* View Toggle Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewType("grid")}
            className={`p-2 rounded-lg transition-colors ${
              viewType === "grid" ? "bg-muted" : "hover:bg-muted/50"
            }`}
            aria-label="Grid view"
          >
            <Grid3x3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewType("list")}
            className={`p-2 rounded-lg transition-colors ${
              viewType === "list" ? "bg-muted" : "hover:bg-muted/50"
            }`}
            aria-label="List view"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {viewType === "grid" ? (
        // Grid View
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {currentProjects.map((project) => {
            const raisedNum = Number.parseFloat(project.raised.replace("K", ""))
            const goalNum = Number.parseFloat(project.goal.replace("K", ""))
            const progressPercentage = (raisedNum / goalNum) * 100

            return (
              <Link
                key={project.id}
                href={`/investor/movie/${project.id}`}
                className="group bg-card rounded-lg overflow-hidden border border-border hover:border-primary transition-colors cursor-pointer"
              >
                <div className="relative overflow-hidden bg-muted h-32 sm:h-40 lg:h-48">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  
                  <div className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded">
                    USKY
                  </div>

                  <button 
                    className="absolute top-2 right-2 bg-black/70 hover:bg-black/90 p-1.5 rounded transition-colors"
                    onClick={(e) => {
                      e.preventDefault()
                    }}
                  >
                    <Bookmark className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </button>
                </div>

                <div className="p-2 sm:p-3 lg:p-4">
                  <h3 className="font-bold text-xs sm:text-sm lg:text-base mb-1 line-clamp-1">{project.title}</h3>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mb-2">{project.category}</p>

                  <div className="flex items-center gap-1.5 mb-2 sm:mb-3">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex-shrink-0" />
                    <span className="text-[10px] sm:text-xs text-muted-foreground truncate">{project.creator}</span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] sm:text-xs mb-2">
                    <span className="text-foreground font-semibold">{project.raised}</span>
                    <span className="text-green-500 font-semibold flex items-center gap-0.5">
                      <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      1.8%
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] sm:text-xs text-muted-foreground mb-1.5">
                    <span>{project.raised}</span>
                    <span>{project.goal}</span>
                  </div>

                  <div className="w-full bg-muted rounded-full h-1 sm:h-1.5 overflow-hidden">
                    <div className="h-full bg-yellow-500" style={{ width: `${Math.min(progressPercentage, 100)}%` }} />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      ) : (
        // List/Table View
        <div className="overflow-x-auto">
          {/* Mobile Table - 3 columns */}
          <table className="w-full text-xs lg:hidden">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Film Title</th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Graph</th>
                <th className="text-right py-3 px-2 font-medium text-muted-foreground">MCAP</th>
              </tr>
            </thead>
            <tbody>
              {currentProjects.map((project) => {
                const mockData = generateMockData(project.id)
                return (
                  <tr key={project.id} className="border-b border-border/50 hover:bg-muted/30">
                    <td className="py-3 px-2">
                      <button className="flex items-center gap-2 text-left">
                        <ChevronDown className="w-3 h-3 text-muted-foreground" />
                        <span className="font-medium truncate max-w-[120px]">{project.title}</span>
                      </button>
                    </td>
                    <td className="py-3 px-2">
                      <svg width="60" height="30" viewBox="0 0 60 30" className="text-green-500">
                        <path
                          d="M 0 25 Q 15 15, 30 18 T 60 10"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    </td>
                    <td className="py-3 px-2 text-right font-semibold text-green-500">
                      {mockData.mcap}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {/* Desktop Table - Full columns */}
          <table className="w-full text-xs hidden lg:table">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-3 font-medium text-muted-foreground">Film Title</th>
                <th className="text-left py-3 px-3 font-medium text-muted-foreground">Graph</th>
                <th className="text-right py-3 px-3 font-medium text-muted-foreground">MCAP</th>
                <th className="text-right py-3 px-3 font-medium text-muted-foreground">ATH</th>
                <th className="text-center py-3 px-3 font-medium text-muted-foreground">Age</th>
                <th className="text-right py-3 px-3 font-medium text-muted-foreground">TXNS</th>
                <th className="text-right py-3 px-3 font-medium text-muted-foreground">24h Vol</th>
                <th className="text-right py-3 px-3 font-medium text-muted-foreground">Investors</th>
                <th className="text-right py-3 px-3 font-medium text-muted-foreground">6m</th>
                <th className="text-right py-3 px-3 font-medium text-muted-foreground">1h</th>
                <th className="text-right py-3 px-3 font-medium text-muted-foreground">6h</th>
                <th className="text-right py-3 px-3 font-medium text-muted-foreground">24h</th>
                <th className="py-3 px-3"></th>
              </tr>
            </thead>
            <tbody>
              {currentProjects.map((project) => {
                const mockData = generateMockData(project.id)
                const parseChange = (val: string) => Number.parseFloat(val)
                
                return (
                  <tr key={project.id} className="border-b border-border/50 hover:bg-muted/30">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{project.title}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <svg width="80" height="40" viewBox="0 0 80 40" className="text-green-500">
                        <path
                          d="M 0 30 Q 20 20, 40 22 T 80 15"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    </td>
                    <td className="py-3 px-3 text-right font-semibold text-green-500">
                      {mockData.mcap}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <div className="w-12 h-1.5 bg-yellow-500 rounded-full" />
                        <span>{mockData.ath}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center">{mockData.age}</td>
                    <td className="py-3 px-3 text-right">{mockData.txns}</td>
                    <td className="py-3 px-3 text-right">{mockData.vol24h}</td>
                    <td className="py-3 px-3 text-right">{mockData.investors}</td>
                    <td className={`py-3 px-3 text-right font-medium ${
                      parseChange(mockData.change6m) >= 0 ? "text-green-500" : "text-red-500"
                    }`}>
                      {parseChange(mockData.change6m) >= 0 ? "+" : ""}{mockData.change6m}%
                    </td>
                    <td className={`py-3 px-3 text-right font-medium ${
                      parseChange(mockData.change1h) >= 0 ? "text-green-500" : "text-red-500"
                    }`}>
                      {parseChange(mockData.change1h) >= 0 ? "+" : ""}{mockData.change1h}%
                    </td>
                    <td className={`py-3 px-3 text-right font-medium ${
                      parseChange(mockData.change6h) >= 0 ? "text-green-500" : "text-red-500"
                    }`}>
                      {parseChange(mockData.change6h) >= 0 ? "+" : ""}{mockData.change6h}%
                    </td>
                    <td className={`py-3 px-3 text-right font-medium ${
                      parseChange(mockData.change24h) >= 0 ? "text-green-500" : "text-red-500"
                    }`}>
                      {parseChange(mockData.change24h) >= 0 ? "+" : ""}{mockData.change24h}%
                    </td>
                    <td className="py-3 px-3">
                      <button className="p-1 hover:bg-muted rounded">
                        <MoreVertical className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-between mt-4 sm:mt-6 lg:mt-8 text-xs sm:text-sm text-muted-foreground gap-3 sm:gap-4">
        <span className="hidden lg:block">0 of {totalProjects} row(s) selected.</span>

        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 flex-wrap justify-center sm:justify-end">
          <span className="hidden lg:block">Rows per page</span>
          <select
            className="bg-muted border border-border rounded px-2 py-1 text-foreground text-xs sm:text-sm"
            value={itemsPerPage}
            disabled
          >
            <option>{itemsPerPage}</option>
          </select>

          <span className="text-xs sm:text-sm whitespace-nowrap">
            Page {currentPage} of {totalPages}
          </span>

          <div className="flex gap-1 sm:gap-2">
            <button
              className="p-1.5 hover:bg-muted rounded text-xs sm:text-sm disabled:opacity-50"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              aria-label="First page"
            >
              «
            </button>
            <button
              className="p-1.5 hover:bg-muted rounded text-xs sm:text-sm disabled:opacity-50"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              ‹
            </button>
            <button
              className="p-1.5 hover:bg-muted rounded text-xs sm:text-sm disabled:opacity-50"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              ›
            </button>
            <button
              className="p-1.5 hover:bg-muted rounded text-xs sm:text-sm disabled:opacity-50"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              aria-label="Last page"
            >
              »
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
