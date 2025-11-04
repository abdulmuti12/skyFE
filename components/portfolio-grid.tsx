"use client"

import { useState } from "react"
import Link from "next/link" // Added Link import for navigation
import { TrendingUp } from "lucide-react"
import portfolioData from "@/data/portfolio-items.json"

export function PortfolioGrid() {
  const itemsPerPage = 8
  const totalItems = portfolioData.items.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const [currentPage, setCurrentPage] = useState(1)

  const items = portfolioData.items

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = items.slice(startIndex, endIndex)

  const totalInvested = portfolioData.summary.totalInvested
  const totalInvestmentValue = portfolioData.summary.totalInvestmentValue

  return (
    <section>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-6 mb-6 md:mb-8">
        {/* Total Invested */}
        <div className="bg-card border border-border rounded-lg p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm md:text-base mb-2">Total invested</p>
              <p className="text-xl md:text-2xl lg:text-3xl font-bold">{totalInvested}</p>
            </div>
            <div className="text-muted-foreground text-lg md:text-xl">$</div>
          </div>
        </div>

        {/* Total Investment Value */}
        <div className="bg-card border border-border rounded-lg p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm md:text-base mb-2">Total Investment Value</p>
              <p className="text-xl md:text-2xl lg:text-3xl font-bold">{totalInvestmentValue}</p>
            </div>
            <div className="text-muted-foreground text-lg md:text-xl">$</div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 mb-6 md:mb-8">
        {currentItems.map((item) => (
          <div
            key={item.id}
            className="group bg-card rounded-lg overflow-hidden border border-border hover:border-primary transition-colors cursor-pointer"
          >
            {/* Image Container */}
            <div className="relative overflow-hidden bg-muted h-32 sm:h-40 lg:h-48">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">
                {item.currency}
              </div>
              <button className="absolute top-2 right-2 bg-black/70 hover:bg-black/90 rounded p-1.5 transition-colors">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-3 md:p-4">
              {/* Title and Growth */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-bold text-sm md:text-base line-clamp-1 flex-1">{item.title}</h3>
                <span className="text-green-500 text-xs md:text-sm font-semibold flex items-center gap-1 flex-shrink-0">
                  <TrendingUp className="w-3 h-3 md:w-4 md:h-4" />
                  {item.growth}
                </span>
              </div>

              {/* Category */}
              <p className="text-xs md:text-sm text-muted-foreground mb-2">{item.category}</p>

              {/* Amounts */}
              <div className="space-y-2 mb-3 md:mb-4">
                <div className="flex items-center justify-between text-xs md:text-sm">
                  <span className="text-muted-foreground">
                    {item.investedAmount} {item.currency}
                  </span>
                  <span className="font-semibold">{item.investmentValue}</span>
                </div>
              </div>

              {/* View Details Button */}
              <Link href={`/investor/portfolio/${item.id}`} className="block w-full">
                <button className="w-full bg-muted hover:bg-muted/80 text-foreground text-xs md:text-sm font-medium py-2 rounded transition-colors">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-xs md:text-sm text-muted-foreground gap-3 md:gap-4">
        <span className="hidden lg:block">5 of {totalItems} result selected.</span>

        <div className="flex items-center gap-2 md:gap-3 lg:gap-4 flex-wrap justify-center sm:justify-start">
          <span className="hidden lg:block">Rows per page</span>
          <select
            className="bg-muted border border-border rounded px-2 py-1 text-foreground text-xs md:text-sm"
            value={itemsPerPage}
            disabled
          >
            <option>{itemsPerPage}</option>
          </select>

          <span className="text-xs md:text-sm">
            Page {currentPage} of {totalPages}
          </span>

          <div className="flex gap-1 md:gap-2">
            <button
              className="p-1 hover:bg-muted rounded text-xs md:text-sm disabled:opacity-50"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              ‹
            </button>
            <button
              className="p-1 hover:bg-muted rounded text-xs md:text-sm disabled:opacity-50"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              ›
            </button>
            <button
              className="p-1 hover:bg-muted rounded text-xs md:text-sm"
              onClick={() => setCurrentPage(totalPages)}
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
