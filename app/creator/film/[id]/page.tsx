"use client"

import { useState, useEffect } from "react"
import { CreatorSidebar } from "@/components/creator-sidebar"
import { CreatorHeader } from "@/components/creator-header"
import { ChevronLeft, TrendingUp, Bookmark, Globe, Facebook, Instagram, XIcon, Heart, ArrowUp, Plus, ChevronDown } from 'lucide-react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const CelebrationEmoji = ({ emoji, delay }: { emoji: string; delay: number }) => {
  return (
    <div
      className="absolute text-2xl animate-float pointer-events-none"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${delay}ms`,
        animationDuration: `${2000 + Math.random() * 1000}ms`,
      }}
    >
      {emoji}
    </div>
  )
}

export default function MovieDetailPage({ params }: { params: { id: string } }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("chip-in")
  const [chipInAmount, setChipInAmount] = useState("")
  const [commentTab, setCommentTab] = useState("cn")
  const [mounted, setMounted] = useState(false)
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true)
  const [commentInput, setCommentInput] = useState("")
  const [isFundingComplete, setIsFundingComplete] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const movie = {
    id: params.id,
    title: "Beyond the Horizon",
    category: "Adventure",
    director: "cinemaxdev",
    image: "/latest-movie.png",
    marketCap: "$5.1K",
    marketCapChange: 1.8,
    raised: 5200,
    goal: 50000,
    balance: 200,
    synopsis:
      "Lorem ipsum dolor sit amet consectetur. Augue fames accumsan amet maecenas ut. Mattis pellentesque ut neque nisi cras pulvinar consectetur venenatis. Feugiat arcu tempor sociis elit. Sit nulla venenatis venenatis. Lacus pellentesque. Sed turpis laoreet mi lectus diam. Sit nunc massa semper blandit fermentum. Sapien habitasse odio blandit diam. Mauris rhoncus proin tristique sit arcu.",
    directors: "Lorem ipsum dolor sit amet consectetur.",
    producers: "Lorem ipsum dolor sit amet consectetur.",
    keyCast: "Lorem ipsum dolor sit amet consectetur.",
    genres: "Lorem ipsum dolor sit amet consectetur.",
    releaseYear: "Lorem ipsum dolor sit amet consectetur.",
    runningTime: "Lorem ipsum dolor sit amet consectetur.",
    countryOfOrigin: "Lorem ipsum dolor sit amet consectetur.",
    countryOfFilming: "Lorem ipsum dolor sit amet consectetur.",
    language: "Lorem ipsum dolor sit amet consectetur.",
    filmColor: "Lorem ipsum dolor sit amet consectetur.",
  }

  const topHolders = [
    { rank: 1, name: "fredthegreat", amount: "12,234,000", avatar: "/placeholder.svg" },
    { rank: 2, name: "judithrodriguez", amount: "1,233,000", avatar: "/placeholder.svg" },
    { rank: 3, name: "alexbuckmaster", amount: "764,000", avatar: "/placeholder.svg" },
    { rank: 4, name: "rodgerstruck", amount: "554,000", avatar: "/placeholder.svg" },
    { rank: 5, name: "johndukes", amount: "543,000", avatar: "/placeholder.svg" },
  ]

  const latestInvestors = [
    { name: "fredthegreat", amount: "223", time: "2h", avatar: "/placeholder.svg" },
    { name: "johndukes", amount: "543", time: "2h", avatar: "/placeholder.svg" },
    { name: "judithrodriguez", amount: "1233", time: "2h", avatar: "/placeholder.svg" },
    { name: "rodgerstruck", amount: "554", time: "3h", avatar: "/placeholder.svg" },
    { name: "alexbuckmaster", amount: "764", time: "4h", avatar: "/placeholder.svg" },
    { name: "alexbuckmaster", amount: "764", time: "6h", avatar: "/placeholder.svg" },
  ]

  const topHoldersTotal = 12234000 + 1233000 + 764000 + 554000 + 543000
  const topHoldersWithPercentage = topHolders.map((holder) => {
    const numAmount = Number.parseInt(holder.amount.replace(/,/g, ""))
    const percentage = ((numAmount / topHoldersTotal) * 100).toFixed(2)
    return { ...holder, percentage }
  })

  const latestInvestorsTotal = 223 + 543 + 1233 + 554 + 764 + 764
  const latestInvestorsWithPercentage = latestInvestors.map((investor) => {
    const numAmount = Number.parseInt(investor.amount)
    const percentage = ((numAmount / latestInvestorsTotal) * 100).toFixed(2)
    return { ...investor, percentage }
  })

  const comments = [
    { id: 1, user: "fredthegreat", time: "2m", text: "Beyond the Horizon", likes: 0, avatar: "/placeholder.svg" },
    { id: 2, user: "fredthegreat", time: "2m", text: "Beyond the Horizon", likes: 1, avatar: "/placeholder.svg" },
    { id: 3, user: "fredthegreat", time: "2m", text: "Beyond the Horizon", likes: 0, avatar: "/placeholder.svg" },
    { id: 4, user: "fredthegreat", time: "2m", text: "Beyond the Horizon", likes: 1, avatar: "/placeholder.svg" },
    { id: 5, user: "fredthegreat", time: "2m", text: "Beyond the Horizon", likes: 0, avatar: "/placeholder.svg" },
    { id: 6, user: "fredthegreat", time: "2m", text: "Beyond the Horizon", likes: 1, avatar: "/placeholder.svg" },
  ]

  const progressPercentage = (movie.raised / movie.goal) * 100

  const handleChipIn = () => {
    console.log("[v0] Chip in amount:", chipInAmount)
    setIsFundingComplete(true)
    setShowCelebration(true)
    setTimeout(() => setShowCelebration(false), 3000)
  }

  const setPresetAmount = (amount: string) => {
    setChipInAmount(amount)
  }

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleAddComment = () => {
    if (commentInput.trim()) {
      console.log("[v0] Adding comment:", commentInput)
      setCommentInput("")
    }
  }

  if (!mounted) return null

  const celebrationEmojis = ["🥳", "🎉", "🎊", "🎉", "🥳", "🎊", "🎉", "🥳"]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-float {
          animation: float 2s ease-out forwards;
        }
      `}</style>

      <div className="flex h-screen overflow-hidden">
        {isDesktopSidebarOpen && (
          <div className="hidden lg:block fixed left-0 top-0 h-full z-30">
            <CreatorSidebar isOpen={isDesktopSidebarOpen} />
          </div>
        )}

        <CreatorSidebar isMobile isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <div className={`flex-1 flex flex-col min-w-0 ${isDesktopSidebarOpen ? "lg:ml-64" : ""}`}>
          <div className="sticky top-0 z-20 bg-background">
            <CreatorHeader
              onMenuClick={() => setIsSidebarOpen(true)}
              onDesktopMenuClick={() => setIsDesktopSidebarOpen(!isDesktopSidebarOpen)}
            />
          </div>

          <div className="flex flex-col lg:flex-row flex-1 min-w-0 overflow-y-auto">
            <div className="flex-1 min-w-0">
              <div className="p-4 lg:p-6 max-w-full">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Link href="/investor" className="hover:text-foreground flex items-center gap-1">
                    <ChevronLeft className="w-4 h-4" />
                    Film
                  </Link>
                  <span>›</span>
                  <span className="text-foreground">{movie.title}</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 mb-6">
                  <div className="relative w-full lg:w-1/2 h-48 lg:h-64 bg-black rounded-lg overflow-hidden flex-shrink-0">
                    <video
                      src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                      poster={movie.image || "/placeholder.svg"}
                      controls
                      className="w-full h-full object-cover"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h1 className="text-xl lg:text-2xl font-bold">{movie.title}</h1>
                      <Bookmark className="w-5 h-5 cursor-pointer hover:fill-current flex-shrink-0" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{movie.category}</p>

                    <div className="flex items-center gap-2 mb-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>CD</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{movie.director}</span>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <button className="p-2 bg-muted rounded-full hover:bg-muted/80">
                        <Globe className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-muted rounded-full hover:bg-muted/80">
                        <XIcon className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-muted rounded-full hover:bg-muted/80">
                        <Facebook className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-muted rounded-full hover:bg-muted/80">
                        <Instagram className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-muted-foreground mb-1">
                    Market Cap <span className="text-green-500">▲ {movie.marketCapChange}% 24hr</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-400">{movie.marketCap}</div>
                </div>

                <div className="mb-6 rounded-lg bg-muted/30 border border-border h-64 lg:h-96 flex items-center justify-center">
                  <p className="text-muted-foreground">Media content area</p>
                </div>

                <div className="lg:hidden mb-4">
                  <div className="flex gap-2 border-b border-border overflow-x-auto">
                    <button
                      onClick={() => setActiveTab("chip-in")}
                      className={`px-4 py-2 text-sm whitespace-nowrap ${
                        activeTab === "chip-in" ? "border-b-2 border-primary font-semibold" : "text-muted-foreground"
                      }`}
                    >
                      Chip In
                    </button>
                    <button
                      onClick={() => setActiveTab("top-investor")}
                      className={`px-4 py-2 text-sm whitespace-nowrap ${
                        activeTab === "top-investor"
                          ? "border-b-2 border-primary font-semibold"
                          : "text-muted-foreground"
                      }`}
                    >
                      Top Investor
                    </button>
                    <button
                      onClick={() => setActiveTab("description")}
                      className={`px-4 py-2 text-sm whitespace-nowrap ${
                        activeTab === "description"
                          ? "border-b-2 border-primary font-semibold"
                          : "text-muted-foreground"
                      }`}
                    >
                      Movie Description
                    </button>
                    <button
                      onClick={() => setActiveTab("comment")}
                      className={`px-4 py-2 text-sm whitespace-nowrap ${
                        activeTab === "comment" ? "border-b-2 border-primary font-semibold" : "text-muted-foreground"
                      }`}
                    >
                      Comment
                    </button>
                  </div>
                </div>

                <div className="lg:hidden max-w-full">
                  {activeTab === "chip-in" && (
                    <div className="space-y-4">
                      <div className="bg-card border border-border rounded-lg p-4 relative overflow-hidden">
                        {showCelebration && (
                          <>
                            {celebrationEmojis.map((emoji, index) => (
                              <CelebrationEmoji key={index} emoji={emoji} delay={index * 100} />
                            ))}
                          </>
                        )}
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold">{movie.title}</h3>
                          <span className="text-green-500 text-sm flex items-center gap-1">
                            <TrendingUp className="w-4 h-4" />
                            {movie.marketCapChange}%
                          </span>
                        </div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>{movie.raised.toLocaleString()}</span>
                          <span>{movie.goal.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden mb-3">
                          <div
                            className="h-full bg-yellow-500"
                            style={{ width: `${isFundingComplete ? 100 : progressPercentage}%` }}
                          />
                        </div>
                        {isFundingComplete && (
                          <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                            <div className="w-5 h-5 rounded-full border-2 border-foreground flex items-center justify-center flex-shrink-0 mt-0.5">
                              <div className="w-2 h-2 rounded-full bg-foreground" />
                            </div>
                            <p className="text-sm text-muted-foreground">
                              This film has reached its funding goal. Stay tuned for the next milestone!
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="bg-card border border-border rounded-lg p-4 relative overflow-hidden">
                        {showCelebration && (
                          <>
                            {celebrationEmojis.map((emoji, index) => (
                              <CelebrationEmoji key={`funding-${index}`} emoji={emoji} delay={index * 150} />
                            ))}
                          </>
                        )}
                        <h3 className="font-bold mb-4">Funding The Film</h3>
                        <div className="space-y-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Balance</span>
                            <span className="font-semibold">{movie.balance} USKY</span>
                          </div>
                          <div className="relative">
                            <Input
                              type="number"
                              value={chipInAmount}
                              onChange={(e) => setChipInAmount(e.target.value)}
                              placeholder="0.00"
                              className="pr-16"
                              disabled={isFundingComplete}
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                              USKY
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setPresetAmount("0")}
                              className="flex-1 flex items-center gap-2 md:bg-black md:text-white md:border-gray-700 md:hover:bg-gray-900 md:text-xs bg-transparent"
                              disabled={isFundingComplete}
                            >
                              Reset
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setPresetAmount("0.1")}
                               className="flex-1 flex items-center gap-2 md:bg-black md:text-white md:border-gray-700 md:hover:bg-gray-900 md:text-xs bg-transparent"
                              disabled={isFundingComplete}
                            >
                              0.1 USKY
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setPresetAmount("0.5")}
                              className="flex-1 flex items-center gap-2 md:bg-black md:text-white md:border-gray-700 md:hover:bg-gray-900 md:text-xs bg-transparent"

                              disabled={isFundingComplete}
                            >
                              0.5 USKY
                            </Button>
                            <Button
                              variant="outline"
                              className="flex-1 flex items-center gap-2 md:bg-black md:text-white md:border-gray-700 md:hover:bg-gray-900 md:text-xs bg-transparent"
                              onClick={() => setPresetAmount("1")}
                              disabled={isFundingComplete}
                            >
                              1 USKY
                            </Button>
                            <Button
                              variant="outline"
                              className="flex-1 flex items-center gap-2 md:bg-black md:text-white md:border-gray-700 md:hover:bg-gray-900 md:text-xs bg-transparent"
                              size="sm"
                              onClick={() => setPresetAmount(movie.balance.toString())}
                              disabled={isFundingComplete}
                            >
                              Max
                            </Button>
                          </div>
                          <Button
                            className={`w-full ${
                              isFundingComplete
                                ? "bg-muted text-muted-foreground cursor-not-allowed"
                                : "bg-yellow-500 hover:bg-yellow-600 text-black"
                            }`}
                            onClick={handleChipIn}
                            disabled={isFundingComplete}
                          >
                            {isFundingComplete ? "Funding Completed 🎉" : "Chip In"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "top-investor" && (
                    <div className="space-y-4">
                      <div className="bg-card border border-border rounded-lg p-4">
                        <h3 className="font-bold mb-4">Top Holders</h3>
                        <div className="space-y-3">
                          {topHoldersWithPercentage.map((holder) => (
                            <div key={holder.rank} className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-3 min-w-0 flex-1">
                                <Avatar className="w-10 h-10 flex-shrink-0">
                                  <AvatarImage src={holder.avatar || "/placeholder.svg"} />
                                  <AvatarFallback>#{holder.rank}</AvatarFallback>
                                </Avatar>
                                <div className="min-w-0">
                                  <div className="text-sm text-muted-foreground">#{holder.rank}</div>
                                  <div className="font-medium truncate">{holder.name}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <span className="font-semibold text-sm">{holder.percentage}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-card border border-border rounded-lg p-4">
                        <h3 className="font-bold mb-2">Latest Investors</h3>
                        <p className="text-sm text-muted-foreground mb-4">You made 265 sales this month.</p>
                        <div className="space-y-3">
                          {latestInvestorsWithPercentage.map((investor, idx) => (
                            <div key={idx} className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-3 min-w-0 flex-1">
                                <Avatar className="w-10 h-10 flex-shrink-0">
                                  <AvatarImage src={investor.avatar || "/placeholder.svg"} />
                                  <AvatarFallback>{investor.name[0]}</AvatarFallback>
                                </Avatar>
                                <div className="min-w-0">
                                  <div className="font-medium truncate">{investor.name}</div>
                                  <div className="text-sm text-muted-foreground">{investor.time}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <span className="font-semibold text-sm">{investor.percentage}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "description" && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-bold mb-2">Directors</h3>
                        <p className="text-sm text-muted-foreground">{movie.directors}</p>
                      </div>
                      <div>
                        <h3 className="font-bold mb-2">Key Cast</h3>
                        <p className="text-sm text-muted-foreground">{movie.keyCast}</p>
                      </div>
                      <div>
                        <h3 className="font-bold mb-2">Synopsis</h3>
                        <p className="text-sm text-muted-foreground break-words">{movie.synopsis}</p>
                      </div>
                      <div>
                        <h3 className="font-bold mb-2">Genres</h3>
                        <p className="text-sm text-muted-foreground">{movie.genres}</p>
                      </div>
                      <div>
                        <h3 className="font-bold mb-2">Release Year</h3>
                        <p className="text-sm text-muted-foreground">{movie.releaseYear}</p>
                      </div>
                      <div>
                        <h3 className="font-bold mb-2">Running Time</h3>
                        <p className="text-sm text-muted-foreground">{movie.runningTime}</p>
                      </div>
                      <div>
                        <h3 className="font-bold mb-2">Country of Origin</h3>
                        <p className="text-sm text-muted-foreground">{movie.countryOfOrigin}</p>
                      </div>
                      <div>
                        <h3 className="font-bold mb-2">Country of Filming</h3>
                        <p className="text-sm text-muted-foreground">{movie.countryOfFilming}</p>
                      </div>
                      <div>
                        <h3 className="font-bold mb-2">Language</h3>
                        <p className="text-sm text-muted-foreground">{movie.language}</p>
                      </div>
                      <div>
                        <h3 className="font-bold mb-2">Film Color</h3>
                        <p className="text-sm text-muted-foreground">{movie.filmColor}</p>
                      </div>
                    </div>
                  )}

                  {activeTab === "comment" && (
                    <div className="space-y-4">
                      <div className="bg-card border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4 border-b border-border">
                          <div className="flex gap-4">
                            <button
                              onClick={() => setCommentTab("cn")}
                              className={`pb-2 text-sm ${
                                commentTab === "cn"
                                  ? "border-b-2 border-primary font-semibold"
                                  : "text-muted-foreground"
                              }`}
                            >
                              CN
                            </button>
                            <div className="pb-2">
                              <Input
                                value={commentInput}
                                onChange={(e) => setCommentInput(e.target.value)}
                                placeholder="Write a comment..."
                                className="h-8 w-52"
                              />
                            </div>
                          </div>
                          <button className="flex items-center gap-1 text-sm">
                            <span>Newest</span>
                            <ChevronDown className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="space-y-4 mb-4">
                          {comments.map((comment) => (
                            <div key={comment.id} className="flex gap-3">
                              <Avatar className="w-10 h-10 flex-shrink-0">
                                <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                                <AvatarFallback>{comment.user[0]}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-semibold text-sm">{comment.user}</span>
                                  <span className="text-xs text-muted-foreground">{comment.time}</span>
                                </div>
                                <p className="text-sm mb-2">{comment.text}</p>
                                <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                                  <span>{comment.likes}</span>
                                  <Heart
                                    className={`w-4 h-4 ${comment.likes > 0 ? "fill-red-500 text-red-500" : ""}`}
                                  />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex gap-2 pt-4 border-t border-border">
                          <Button
                            variant="outline"
                            className="flex-1 flex items-center gap-2 bg-background text-foreground border-border"
                            onClick={handleScrollToTop}
                          >
                            <ArrowUp className="w-4 h-4" />
                            Scroll to Top
                          </Button>
                          <Button
                            className="flex-1 flex items-center gap-2 bg-background text-foreground border border-border hover:bg-muted"
                            onClick={handleAddComment}
                          >
                            <Plus className="w-4 h-4" />
                            Add Comment
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="hidden lg:block space-y-6">
                  <div>
                    <h3 className="font-bold mb-2">Directors</h3>
                    <p className="text-sm text-muted-foreground">{movie.directors}</p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Producers</h3>
                    <p className="text-sm text-muted-foreground">{movie.producers}</p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Key Cast</h3>
                    <p className="text-sm text-muted-foreground">{movie.keyCast}</p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Synopsis</h3>
                    <p className="text-sm text-muted-foreground">{movie.synopsis}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-bold mb-2">Genres</h3>
                      <p className="text-sm text-muted-foreground">{movie.genres}</p>
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Release Year</h3>
                      <p className="text-sm text-muted-foreground">{movie.releaseYear}</p>
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Running Time (in minutes)</h3>
                      <p className="text-sm text-muted-foreground">{movie.runningTime}</p>
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Country of Origin</h3>
                      <p className="text-sm text-muted-foreground">{movie.countryOfOrigin}</p>
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Country of Filming</h3>
                      <p className="text-sm text-muted-foreground">{movie.countryOfFilming}</p>
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Language</h3>
                      <p className="text-sm text-muted-foreground">{movie.language}</p>
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Film Color</h3>
                      <p className="text-sm text-muted-foreground">{movie.filmColor}</p>
                    </div>
                  </div>

                  <div className="border-t border-border pt-6">
                    <h3 className="font-bold mb-4">Comments</h3>
                    <div className="bg-card border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4 border-b border-border">
                        <div className="flex gap-4">
                          <button
                            onClick={() => setCommentTab("cn")}
                            className={`pb-2 text-sm ${
                              commentTab === "cn"
                                ? "border-b-2 border-primary font-semibold"
                                : "text-muted-foreground"
                            }`}
                          >
                            CN
                          </button>
                          <div className="pb-2">
                            <Input
                              value={commentInput}
                              onChange={(e) => setCommentInput(e.target.value)}
                              placeholder="Write a comment.."
                              className="h-8 w-88"
                            />
                          </div>
                        </div>
                        <button className="flex items-center gap-1 text-sm">
                          <span>Newest</span>
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-4 mb-4">
                        {comments.map((comment) => (
                          <div key={comment.id} className="flex gap-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{comment.user[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-sm">{comment.user}</span>
                                <span className="text-xs text-muted-foreground">{comment.time}</span>
                              </div>
                              <p className="text-sm mb-2">{comment.text}</p>
                              <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                                <span>{comment.likes}</span>
                                <Heart
                                  className={`w-4 h-4 ${comment.likes > 0 ? "fill-red-500 text-red-500" : ""}`}
                                />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-2 pt-4 border-t border-border">
                        <Button
                          variant="outline"
                          className="flex-1 flex items-center gap-2 bg-background text-foreground border-border"
                          onClick={handleScrollToTop}
                        >
                          <ArrowUp className="w-4 h-4" />
                          Scroll to Top
                        </Button>
                        <Button
                          className="flex-1 flex items-center gap-2 bg-background text-foreground border border-border hover:bg-muted"
                          onClick={handleAddComment}
                        >
                          <Plus className="w-4 h-4" />
                          Add Comment
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block w-96 flex-shrink-0 border-l border-border p-6">
              <div className="mb-6 relative">
                {showCelebration && (
                  <>
                    {celebrationEmojis.map((emoji, index) => (
                      <CelebrationEmoji key={`desktop-top-${index}`} emoji={emoji} delay={index * 100} />
                    ))}
                  </>
                )}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold">{movie.title}</h3>
                  <Bookmark className="w-5 h-5 cursor-pointer hover:fill-current" />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-green-500 text-sm flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    {movie.marketCapChange}%
                  </span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span>{movie.raised.toLocaleString()}</span>
                  <span>{movie.goal.toLocaleString()}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden mb-3">
                  <div
                    className="h-full bg-yellow-500"
                    style={{ width: `${isFundingComplete ? 100 : progressPercentage}%` }}
                  />
                </div>
                {isFundingComplete && (
                  <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                    <div className="w-5 h-5 rounded-full border-2 border-foreground flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      This film has reached its funding goal. Stay tuned for the next milestone!
                    </p>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <h3 className="font-bold mb-4">Funding The Film</h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Balance</span>
                    <span className="font-semibold">{movie.balance} USKY</span>
                  </div>
                  <div className="relative">
                    <Input
                      type="number"
                      value={chipInAmount}
                      onChange={(e) => setChipInAmount(e.target.value)}
                      placeholder="0.00"
                      className="pr-16"
                      disabled={isFundingComplete}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                      USKY
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPresetAmount("0")}
                      disabled={isFundingComplete}
                  className="flex-1 flex items-center gap-2 bg-black text-white border-gray-700 hover:bg-gray-900 text-xs"
                    >
                      Reset
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPresetAmount("0.1")}
                      disabled={isFundingComplete}
                   className="flex-1 flex items-center gap-2 bg-black text-white border-gray-700 hover:bg-gray-900 text-xs"
                    >
                      0.1 USKY
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPresetAmount("0.5")}
                      disabled={isFundingComplete}
                     className="flex-1 flex items-center gap-2 bg-black text-white border-gray-700 hover:bg-gray-900 text-xs"
                    >
                      0.5 USKY
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 flex items-center gap-2 bg-black text-white border-gray-700 hover:bg-gray-900 text-xs"
                      onClick={() => setPresetAmount("1")}
                      disabled={isFundingComplete}
                    >
                      1 USKY
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 flex items-center gap-2 bg-black text-white border-gray-700 hover:bg-gray-900 text-xs"
                      size="sm"
                      onClick={() => setPresetAmount(movie.balance.toString())}
                      disabled={isFundingComplete}
                    >
                      Max
                    </Button>
                  </div>
                  <Button
                    className={`w-full ${
                      isFundingComplete
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : "bg-yellow-500 hover:bg-yellow-600 text-black"
                    }`}
                    onClick={handleChipIn}
                    disabled={isFundingComplete}
                  >
                    {isFundingComplete ? "Funding Completed 🎉" : "Chip In"}
                  </Button>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-bold mb-4">Top Holders</h3>
                <div className="space-y-3">
                  {topHoldersWithPercentage.map((holder) => (
                    <div key={holder.rank} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={holder.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{holder.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-xs text-muted-foreground">#{holder.rank}</div>
                          <div className="font-medium text-sm">{holder.name}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">{holder.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-2">Latest Investors</h3>
                <p className="text-sm text-muted-foreground mb-4">You made 265 sales this month.</p>
                <div className="space-y-3">
                  {latestInvestorsWithPercentage.map((investor, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={investor.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{investor.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-sm">{investor.name}</div>
                          <div className="text-xs text-muted-foreground">{investor.time}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">{investor.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
