"use client"

import { Bookmark, TrendingUp } from "lucide-react"
import { useState } from "react"

export function MovieGrid() {
  const itemsPerPage = 8 
  const [currentPage, setCurrentPage] = useState(1)

  const movies = [
    {
      id: 1,
      title: "Cermin Tua",
      category: "Adventure",
      creator: "cinemaxdev",
      growth: "2.3%",
      views: "5.6K",
      maxViews: "50K",
      image: "/01.jpg",
    },
    {
      id: 2,
      title: "Lukisan Angkor Berdarah",
      category: "Sci-Fi",
      creator: "luminastudio",
      growth: "3.1%",
      views: "8.4K",
      maxViews: "50K",
      image: "/02.jpg",
    },
    {
      id: 3,
      title: "Topeng Arwah Dari Hue",
      category: "Drama",
      creator: "aurorapix",
      growth: "1.2%",
      views: "4.2K",
      maxViews: "50K",
      image: "/03.jpg",
    },
    {
      id: 4,
      title: "Kutukan Pulau Hantu",
      category: "Action",
      creator: "oceantide",
      growth: "2.9%",
      views: "9.1K",
      maxViews: "50K",
      image: "/04.jpg",
    },
    {
      id: 5,
      title: "Crimson Sky",
      category: "Thriller",
      creator: "darklens",
      growth: "1.8%",
      views: "6.3K",
      maxViews: "50K",
      image: "/05.jpg",
    },
    {
      id: 6,
      title: "Dreamcatcher",
      category: "Fantasy",
      creator: "starlightmedia",
      growth: "4.0%",
      views: "7.8K",
      maxViews: "50K",
      image: "/06.jpg",
    },
    {
      id: 7,
      title: "Echoes of Time",
      category: "Mystery",
      creator: "echoart",
      growth: "2.1%",
      views: "3.9K",
      maxViews: "50K",
      image: "/07.jpg",
    },
    {
      id: 8,
      title: "Golden Frame",
      category: "Documentary",
      creator: "visioncrew",
      growth: "1.5%",
      views: "2.8K",
      maxViews: "50K",
      image: "/08.jpg",
    },
    {
      id: 9,
      title: "Neon City",
      category: "Cyberpunk",
      creator: "techmotion",
      growth: "3.8%",
      views: "9.9K",
      maxViews: "50K",
      image: "/04.jpg",
    },
    {
      id: 10,
      title: "Frozen Flame",
      category: "Fantasy",
      creator: "polarstudio",
      growth: "2.5%",
      views: "5.2K",
      maxViews: "50K",
      image: "/04.jpg",
    },
  ]

  const totalMovies = movies.length
  const totalPages = Math.ceil(totalMovies / itemsPerPage)

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentMovies = movies.slice(startIndex, endIndex)

  return (
    <section>
      <h2 className="text-lg md:text-xl lg:text-2xl font-bold mb-3 md:mb-4 lg:mb-6">
        Latest Movie
      </h2>

      {/* ✅ Grid responsif */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
        {currentMovies.map((movie) => (
          <div
            key={movie.id}
            className="group bg-card rounded-lg overflow-hidden border border-border hover:border-primary transition-colors"
          >
            {/* Gambar */}
            <div className="relative overflow-hidden bg-muted h-28 sm:h-32 lg:h-40">
              <img
                src={movie.image || "/placeholder.svg"}
                alt={movie.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2 bg-purple-500 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs font-semibold">
                USKY
              </div>
              <button className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 bg-black/50 rounded p-1 sm:p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <Bookmark className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-white" />
              </button>
            </div>

            {/* Konten */}
            <div className="p-2 sm:p-3 lg:p-4">
              <h3 className="font-bold text-xs sm:text-sm mb-0.5 sm:mb-1 line-clamp-1">
                {movie.title}
              </h3>
              <p className="text-xs text-muted-foreground mb-1.5 sm:mb-2 lg:mb-3">
                {movie.category}
              </p>

              {/* Creator */}
              <div className="flex items-center gap-2 mb-1.5 sm:mb-2 lg:mb-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex-shrink-0" />
                <span className="text-xs text-muted-foreground truncate">{movie.creator}</span>
              </div>

              {/* Statistik */}
              <div className="space-y-1 sm:space-y-1.5 lg:space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{movie.views}</span>
                  <span className="text-green-500 flex items-center gap-0.5">
                    <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    {movie.growth}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{movie.maxViews}</span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-muted rounded-full h-1 sm:h-1.5 lg:h-2 overflow-hidden">
                  <div className="h-full bg-yellow-500" style={{ width: "60%" }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-4 sm:mt-6 lg:mt-8 text-xs sm:text-sm text-muted-foreground gap-3 sm:gap-4">
        <span className="hidden lg:block">0 of {totalMovies} row(s) selected.</span>

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
            >
              ‹
            </button>
            <button
              className="p-1 hover:bg-muted rounded text-xs sm:text-sm disabled:opacity-50"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
