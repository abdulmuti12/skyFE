"use client"

import { Bookmark, TrendingUp } from "lucide-react"
import { useState } from "react"

export function WatchlistGrid() {
  const itemsPerPage = 8
  const totalItems = 100
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const [currentPage, setCurrentPage] = useState(1)
  const [watchlist, setWatchlist] = useState<Set<number>>(new Set())

  // Simulasi data watchlist
  const items = Array.from({ length: totalItems }, (_, i) => ({
    id: i + 1,
    title: "Beyond the Horizon",
    category: "Adventure",
    creator: "cinemaxdev",
    currentPrice: "5.2K",
    targetPrice: "50K",
    growth: "1.8%",
    image: "/investment-card.jpg",
    currency: "USRY",
  }))

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = items.slice(startIndex, endIndex)

  const toggleBookmark = (id: number) => {
    const newWatchlist = new Set(watchlist)
    if (newWatchlist.has(id)) {
      newWatchlist.delete(id)
    } else {
      newWatchlist.add(id)
    }
    setWatchlist(newWatchlist)
  }

  return (
    <section>
      {/* Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
        {currentItems.map((item) => (
          <div
            key={item.id}
            className="group bg-card rounded-lg overflow-hidden border border-border hover:border-primary transition-colors cursor-pointer"
          >
            {/* Image Container */}
            <div className="relative overflow-hidden bg-muted h-24 sm:h-28 lg:h-40">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute top-2 left-2 bg-blue-500 text-white text-[10px] sm:text-xs font-semibold px-2 py-1 rounded">
                {item.currency}
              </div>
              <button
                onClick={() => toggleBookmark(item.id)}
                className="absolute top-2 right-2 bg-black/70 hover:bg-black/90 rounded p-1.5 transition-colors"
                aria-label="Add to watchlist"
              >
                <Bookmark
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${watchlist.has(item.id) ? "fill-white text-white" : "text-white"}`}
                />
              </button>
            </div>

            {/* Content */}
            <div className="p-2 sm:p-3 lg:p-4">
              {/* Title and Growth */}
              <div className="flex items-start justify-between gap-2 mb-1 sm:mb-2">
                <h3 className="font-bold text-xs sm:text-sm line-clamp-1 flex-1">{item.title}</h3>
                <span className="text-green-500 text-[10px] sm:text-xs font-semibold flex items-center gap-0.5 flex-shrink-0">
                  <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  {item.growth}
                </span>
              </div>

              {/* Category */}
              <p className="text-[10px] sm:text-xs text-muted-foreground mb-1.5 sm:mb-2 lg:mb-3">{item.category}</p>

              {/* Creator */}
              <div className="flex items-center gap-2 mb-2 sm:mb-3 lg:mb-4">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex-shrink-0" />
                <span className="text-[10px] sm:text-xs text-muted-foreground truncate">{item.creator}</span>
              </div>

              {/* Prices */}
              <div className="space-y-1 sm:space-y-1.5">
                <div className="flex items-center justify-between text-[10px] sm:text-xs">
                  <span className="text-muted-foreground">Current</span>
                  <span className="text-green-500 font-semibold">${item.currentPrice}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] sm:text-xs">
                  <span className="text-muted-foreground">Target</span>
                  <span className="text-muted-foreground">${item.targetPrice}</span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-muted rounded-full h-1 sm:h-1.5 lg:h-2 overflow-hidden mt-1.5 sm:mt-2">
                  <div className="h-full bg-yellow-500" style={{ width: "36%" }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-4 sm:mt-6 lg:mt-8 text-xs sm:text-sm text-muted-foreground gap-3 sm:gap-4">
        <span className="hidden lg:block">0 of {totalItems} row(s) selected.</span>

        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 flex-wrap justify-center sm:justify-start">
          <span className="hidden lg:block">Rows per page</span>
          <select
            className="bg-muted border border-border rounded px-2 py-1 text-foreground text-xs sm:text-sm"
            value={itemsPerPage}
            disabled
          >
            <option>{itemsPerPage}</option>
          </select>

          <span className="text-xs sm:text-sm">
            Page {currentPage} of {totalPages}
          </span>

          <div className="flex gap-1 sm:gap-2">
            <button
              className="p-1 hover:bg-muted rounded text-xs sm:text-sm disabled:opacity-50"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              ‹
            </button>
            <button
              className="p-1 hover:bg-muted rounded text-xs sm:text-sm disabled:opacity-50"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              ›
            </button>
            <button
              className="p-1 hover:bg-muted rounded text-xs sm:text-sm"
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
