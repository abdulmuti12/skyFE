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
      image: "/adventure-movie-poster.png",
    },
    {
      id: 2,
      title: "Beyond the Horizon",
      category: "Adventure",
      creator: "cinemaxdev",
      marketCap: "$5.2K",
      comments: 12,
      image: "/adventure-movie-poster.png",
    },
    {
      id: 3,
      title: "Beyond the Horizon",
      category: "Adventure",
      creator: "cinemaxdev",
      marketCap: "$5.2K",
      comments: 12,
      image: "/adventure-movie-poster.png",
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
    <section className="mb-8 lg:mb-12">
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <h2 className="text-xl lg:text-2xl font-bold flex items-center gap-2">
          Now Trending <span className="text-2xl">🔥</span>
        </h2>
        <div className="flex gap-2 lg:hidden">
          <button onClick={handlePrev} className="p-2 hover:bg-muted rounded-lg transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={handleNext} className="p-2 hover:bg-muted rounded-lg transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-4">
        {/* Mobile: Single featured card */}
        <div className="lg:hidden mb-4">
          <div className="group relative rounded-lg overflow-hidden bg-muted">
            <img
              src={currentItem.image || "/placeholder.svg"}
              alt={currentItem.title}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-between p-4">
              <div className="flex justify-between items-start">
                <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">USKY</span>
                <button className="p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-colors">
                  <Bookmark className="w-5 h-5 text-white" />
                </button>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">{currentItem.title}</h3>
                <p className="text-gray-300 text-sm">{currentItem.category}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
              <span className="text-sm text-muted-foreground">{currentItem.creator}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-500 font-semibold">Market Cap: {currentItem.marketCap}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MessageCircle className="w-4 h-4" />
              <span>{currentItem.comments} new comments</span>
            </div>
          </div>
        </div>

        {/* Desktop: Grid of all trending items */}
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
