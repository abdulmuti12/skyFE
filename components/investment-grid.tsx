"use client"

import { TrendingUp, Users, Clock } from "lucide-react"
import { useState } from "react"

export function InvestmentGrid() {
  const itemsPerPage = 8
  const totalProjects = 80
  const totalPages = Math.ceil(totalProjects / itemsPerPage)
  const [currentPage, setCurrentPage] = useState(1)

  // Simulasi data proyek investasi
  const projects = Array.from({ length: totalProjects }, (_, i) => ({
    id: i + 1,
    title: `Film Project ${i + 1}`,
    category: ["Adventure", "Sci-Fi", "Fantasy", "Horror", "Drama"][i % 5],
    creator: "cinemaxdev",
    raised: `${(Math.random() * 40 + 10).toFixed(1)}K`,
    goal: "50K",
    investors: Math.floor(Math.random() * 150 + 20),
    daysLeft: Math.floor(Math.random() * 30 + 1),
    image: "/latest-movie.png",
  }))

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProjects = projects.slice(startIndex, endIndex)

  return (
    <section>
      <h2 className="text-lg md:text-xl lg:text-2xl font-bold mb-3 md:mb-4 lg:mb-6">Available Investment Projects</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
        {currentProjects.map((project) => {
          const raisedNum = Number.parseFloat(project.raised.replace("K", ""))
          const goalNum = Number.parseFloat(project.goal.replace("K", ""))
          const progressPercentage = (raisedNum / goalNum) * 100

          return (
            <div
              key={project.id}
              className="group bg-card rounded-lg overflow-hidden border border-border hover:border-primary transition-colors cursor-pointer"
            >
              {/* Gambar */}
              <div className="relative overflow-hidden bg-muted h-28 sm:h-32 lg:h-40">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 bg-black/70 rounded px-1.5 py-0.5 flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                  <span className="text-white text-[10px] sm:text-xs">{project.daysLeft}d</span>
                </div>
              </div>

              {/* Konten */}
              <div className="p-2 sm:p-3 lg:p-4">
                <h3 className="font-bold text-xs sm:text-sm mb-0.5 sm:mb-1 line-clamp-1">{project.title}</h3>
                <p className="text-xs text-muted-foreground mb-1.5 sm:mb-2 lg:mb-3">{project.category}</p>

                {/* Creator */}
                <div className="flex items-center gap-2 mb-1.5 sm:mb-2 lg:mb-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex-shrink-0" />
                  <span className="text-xs text-muted-foreground truncate">{project.creator}</span>
                </div>

                {/* Statistik */}
                <div className="space-y-1 sm:space-y-1.5 lg:space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Raised</span>
                    <span className="text-green-500 font-semibold flex items-center gap-0.5">
                      <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" />${project.raised}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Goal: ${project.goal}</span>
                    <span className="text-muted-foreground flex items-center gap-0.5">
                      <Users className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      {project.investors}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-muted rounded-full h-1 sm:h-1.5 lg:h-2 overflow-hidden">
                    <div className="h-full bg-yellow-500" style={{ width: `${Math.min(progressPercentage, 100)}%` }} />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-4 sm:mt-6 lg:mt-8 text-xs sm:text-sm text-muted-foreground gap-3 sm:gap-4">
        <span className="hidden lg:block">0 of {totalProjects} row(s) selected.</span>

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
