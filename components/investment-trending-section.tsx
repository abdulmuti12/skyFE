"use client"

import { ChevronLeft, ChevronRight, TrendingUp, Users } from "lucide-react"
import { useState } from "react"

export function InvestmentTrendingSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const trendingProjects = [
    {
      id: 1,
      title: "Beyond the Horizon",
      category: "Adventure Film",
      creator: "cinemaxdev",
      raised: "$45.2K",
      goal: "$50K",
      investors: 127,
      image: "/01.jpg",
    },
    {
      id: 2,
      title: "Skyward Odyssey",
      category: "Sci-Fi Film",
      creator: "nova_studio",
      raised: "$38.7K",
      goal: "$50K",
      investors: 94,
      image: "/02.jpg",
    },
    {
      id: 3,
      title: "Mystic Valley",
      category: "Fantasy Film",
      creator: "dreamworks",
      raised: "$42.9K",
      goal: "$50K",
      investors: 108,
      image: "/03.jpg",
    },
    {
      id: 4,
      title: "Urban Legends",
      category: "Horror Film",
      creator: "darkframe",
      raised: "$35.5K",
      goal: "$50K",
      investors: 82,
      image: "/04.jpg",
    },
  ]

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? trendingProjects.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === trendingProjects.length - 1 ? 0 : prev + 1))
  }

  const currentProject = trendingProjects[currentIndex]
  const progressPercentage =
    (Number.parseFloat(currentProject.raised.replace(/[$K]/g, "")) /
      Number.parseFloat(currentProject.goal.replace(/[$K]/g, ""))) *
    100

  return (
    <section className="mb-6 md:mb-8 lg:mb-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 md:mb-4 lg:mb-6">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold flex items-center gap-2">
          Hot Investment Opportunities <span className="text-xl md:text-2xl">🔥</span>
        </h2>
        {/* Navigation Buttons (Mobile & Tablet) */}
        <div className="flex gap-2 lg:hidden">
          <button onClick={handlePrev} className="p-2 hover:bg-muted rounded-lg transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={handleNext} className="p-2 hover:bg-muted rounded-lg transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="relative">
        <div className="lg:grid lg:grid-cols-3 lg:gap-4">
          {/* Mobile & Tablet View: Single Card */}
          <div className="lg:hidden mb-4">
            <div className="group relative rounded-lg overflow-hidden bg-muted">
              <img
                src={currentProject.image || "/placeholder.svg"}
                alt={currentProject.title}
                className="w-full h-48 md:h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-between p-3 md:p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-1 bg-black/50 rounded-lg px-2 py-1">
                    <Users className="w-4 h-4 text-white" />
                    <span className="text-white text-xs">{currentProject.investors}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-bold text-base md:text-lg">{currentProject.title}</h3>
                  <p className="text-gray-300 text-xs md:text-sm">{currentProject.category}</p>
                </div>
              </div>
            </div>

            {/* Info below image */}
            <div className="mt-3 md:mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                <span className="text-xs md:text-sm text-muted-foreground">{currentProject.creator}</span>
              </div>
              <div className="flex items-center justify-between text-xs md:text-sm">
                <span className="text-green-500 font-semibold flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  Raised: {currentProject.raised}
                </span>
                <span className="text-muted-foreground">Goal: {currentProject.goal}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div className="h-full bg-yellow-500" style={{ width: `${progressPercentage}%` }} />
              </div>
            </div>
          </div>

          {/* Desktop View: Carousel with 3 visible cards */}
          <div className="hidden lg:contents">
            {[0, 1, 2].map((offset) => {
              const itemIndex = (currentIndex + offset) % trendingProjects.length
              const project = trendingProjects[itemIndex]
              const progress =
                (Number.parseFloat(project.raised.replace(/[$K]/g, "")) /
                  Number.parseFloat(project.goal.replace(/[$K]/g, ""))) *
                100

              return (
                <div key={`${project.id}-${offset}`} className="group relative rounded-lg overflow-hidden bg-muted">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:opacity-75 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
                    <div className="flex justify-end items-start">
                      <div className="flex items-center gap-1 bg-black/50 rounded-lg px-2 py-1">
                        <Users className="w-4 h-4 text-white" />
                        <span className="text-white text-xs">{project.investors}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-white font-bold">{project.title}</h3>
                      <p className="text-gray-300 text-sm">{project.category}</p>
                      <div className="mt-2 space-y-1">
                        <div className="flex justify-between text-xs text-white">
                          <span>{project.raised}</span>
                          <span>{project.goal}</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-1.5 overflow-hidden">
                          <div className="h-full bg-yellow-500" style={{ width: `${progress}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Badge and investors count */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 rounded-lg px-2 py-1">
                    <Users className="w-4 h-4 text-white" />
                    <span className="text-white text-xs">{project.investors}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="hidden lg:flex absolute -top-12 right-0 gap-2">
          <button
            onClick={handlePrev}
            className="p-3 bg-muted hover:bg-muted/80 rounded-xl transition-colors border border-border"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="p-3 bg-muted hover:bg-muted/80 rounded-xl transition-colors border border-border"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
