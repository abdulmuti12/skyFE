"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function WatchlistPage() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const shouldBeDark = savedTheme ? savedTheme === "dark" : prefersDark
    setIsDark(shouldBeDark)
    updateTheme(shouldBeDark)
  }, [])

  const updateTheme = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    localStorage.setItem("theme", dark ? "dark" : "light")
  }

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    updateTheme(newTheme)
  }

  if (!mounted) return null

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground">
        <div className="flex flex-col lg:flex-row">
          {/* Desktop Sidebar */}
          {isDesktopSidebarOpen && (
            <div className="hidden lg:block">
              <Sidebar />
            </div>
          )}

          <Sidebar isMobile isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

          {/* Main content */}
          <div className="flex-1 w-full">
            <Header
              isDark={isDark}
              onToggleTheme={toggleTheme}
              onMenuClick={() => setIsSidebarOpen(true)}
              onDesktopMenuClick={() => setIsDesktopSidebarOpen(!isDesktopSidebarOpen)}
            />

            <main className="min-h-[calc(100vh-64px)] flex flex-col">
              {/* Page Title - Top Left */}
              <div className="p-4 md:p-6 lg:p-8">
                <h1 className="text-xl md:text-2xl font-bold">Watchlist</h1>
              </div>

              {/* Empty State - Centered on mobile, upper-middle on desktop */}
              <div className="flex-1 flex items-center justify-center px-4 pb-16 lg:items-start lg:pt-16 lg:pb-0">
                <div className="text-center max-w-2xl mx-auto space-y-6 lg:space-y-4">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                    Sign In to Save Your Portfolio
                  </h2>
                  <p className="text-base md:text-lg lg:text-base text-muted-foreground leading-relaxed px-2 lg:px-0">
                    Log in to start curating films you love and keep track of upcoming investment opportunities.
                  </p>
                  <div className="pt-2 flex justify-center">
                    <Link href="/auth">
                      <Button className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black font-semibold px-8 py-3 lg:px-6 lg:py-2.5 rounded-lg text-base lg:text-sm">
                        Login to Continue
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}
