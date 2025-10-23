"use client"

import { ChevronLeft, ChevronRight, Bookmark, MessageCircle } from "lucide-react"
import { useState } from "react"

export function TrendingSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const trendingItems = [
    {
      id: 1,
      title: "Beyond the Horizon",
      category: "Adventure",
      creator: "cinemaxdev",
      marketCap: "$5.2K",
      comments: 12,
      image: "/latest-movie.png",
    },
    {
      id: 2,
      title: "Skyward Odyssey",
      category: "Sci-Fi",
      creator: "nova_studio",
      marketCap: "$4.7K",
      comments: 9,
      image: "/latest-movie.png",
    },
    {
      id: 3,
      title: "Mystic Valley",
      category: "Fantasy",
      creator: "dreamworks",
      marketCap: "$3.9K",
      comments: 15,
      image: "/latest-movie.png",
    },
  ]

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? trendingItems.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === trendingItems.length - 1 ? 0 : prev + 1))
  }

  const currentItem = trendingItems[currentIndex]

  return (
    <section className="mb-6 md:mb-8 lg:mb-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 md:mb-4 lg:mb-6">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold flex items-center gap-2">
          Now Trending <span className="text-xl md:text-2xl">🔥</span>
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
      <div className="lg:grid lg:grid-cols-3 lg:gap-4">
        {/* Mobile & Tablet View: Single Card */}
        <div className="lg:hidden mb-4">
          <div className="group relative rounded-lg overflow-hidden bg-muted">
            <img
              src={currentItem.image || "/placeholder.svg"}
              alt={currentItem.title}
              className="w-full h-48 md:h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-between p-3 md:p-4">
              <div className="flex justify-between items-start">
                <span className="bg-purple-500 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold">
                  USKY
                </span>
                <button className="p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-colors">
                  <Bookmark className="w-5 h-5 text-white" />
                </button>
              </div>
              <div>
                <h3 className="text-white font-bold text-base md:text-lg">{currentItem.title}</h3>
                <p className="text-gray-300 text-xs md:text-sm">{currentItem.category}</p>
              </div>
            </div>
          </div>

          {/* Info below image */}
          <div className="mt-3 md:mt-4 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
              <span className="text-xs md:text-sm text-muted-foreground">{currentItem.creator}</span>
            </div>
            <div className="flex items-center justify-between text-xs md:text-sm">
              <span className="text-green-500 font-semibold">Market Cap: {currentItem.marketCap}</span>
            </div>
            <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
              <MessageCircle className="w-4 h-4" />
              <span>{currentItem.comments} new comments</span>
            </div>
          </div>
        </div>

        {/* Desktop View: All cards displayed */}
        <div className="hidden lg:contents">
          {trendingItems.map((item) => (
            <div key={item.id} className="group relative rounded-lg overflow-hidden bg-muted">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                className="w-full h-48 object-cover group-hover:opacity-75 transition-opacity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
                <div className="flex justify-between items-start">
                  <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">USKY</span>
                  <button className="p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-colors">
                    <Bookmark className="w-5 h-5 text-white" />
                  </button>
                </div>
                <div>
                  <h3 className="text-white font-bold">{item.title}</h3>
                  <p className="text-gray-300 text-sm">{item.category}</p>
                </div>
              </div>
              {/* Badge and button */}
              <div className="absolute top-3 right-3 bg-black/50 rounded-lg p-2">
                <Bookmark className="w-5 h-5 text-white" />
              </div>
              <div className="absolute top-3 left-3 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                USKY
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
