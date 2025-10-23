"use client"

import { Bookmark, TrendingUp } from "lucide-react"
import { useState } from "react"

export function MovieGrid() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8 // ✅ hanya 8 data per halaman

  const movies = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    title: "Beyond the Horizon",
    category: "Adventure",
    creator: "cinemaxdev",
    growth: "1.8%",
    views: "5.2K",
    maxViews: "50K",
    image: "/latest-movie.png",
  }))

  return (
    <section>
      <h2 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6">Latest Movie</h2>

      {/* Grid Movies */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="group bg-card rounded-lg overflow-hidden border border-border hover:border-primary transition-colors"
          >
            {/* Image Container */}
            <div className="relative overflow-hidden bg-muted h-32 lg:h-40">
              <img
                src={movie.image || "/placeholder.svg"}
                alt={movie.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute top-2 left-2 bg-purple-500 text-white px-2 py-1 rounded text-xs font-semibold">
                USKY
              </div>
              <button className="absolute top-2 right-2 bg-black/50 rounded p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <Bookmark className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="p-2 lg:p-4">
              <h3 className="font-bold text-xs lg:text-sm mb-1 line-clamp-1">{movie.title}</h3>
              <p className="text-xs text-muted-foreground mb-2 lg:mb-3">{movie.category}</p>

              {/* Creator Info */}
              <div className="flex items-center gap-2 mb-2 lg:mb-3">
                <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex-shrink-0" />
                <span className="text-xs text-muted-foreground truncate">{movie.creator}</span>
              </div>

              {/* Stats */}
              <div className="space-y-1.5 lg:space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{movie.views}</span>
                  <span className="text-green-500 flex items-center gap-0.5">
                    <TrendingUp className="w-2.5 h-2.5 lg:w-3 lg:h-3" />
                    {movie.growth}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{movie.maxViews}</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-muted rounded-full h-1.5 lg:h-2 overflow-hidden">
                  <div className="h-full bg-yellow-500" style={{ width: "60%" }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination / Footer Info */}
      <div className="flex flex-col lg:flex-row items-center justify-between mt-6 lg:mt-8 text-xs lg:text-sm text-muted-foreground gap-4">
        <span className="hidden lg:block">0 of 8 row(s) selected.</span>
        <div className="flex items-center gap-2 lg:gap-4">
          <span className="hidden lg:block">Rows per page</span>
          <select className="bg-muted border border-border rounded px-2 py-1 text-foreground text-xs lg:text-sm">
            <option>8</option>
            <option>16</option>
            <option>24</option>
          </select>
          <span className="text-xs lg:text-sm">Page {currentPage} of 1</span>
          <div className="flex gap-1 lg:gap-2">
            <button className="p-1 hover:bg-muted rounded text-xs lg:text-sm">‹</button>
            <button className="p-1 hover:bg-muted rounded text-xs lg:text-sm">›</button>
          </div>
        </div>
      </div>
    </section>
  )
}
