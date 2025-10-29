"use client"

import { useState, useEffect } from "react"
import { InvestorSidebar } from "@/components/investor-sidebar"
import { Header } from "@/components/header"
import { WatchlistGrid } from "@/components/watchlist-grid"

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
      <div className="h-screen overflow-hidden bg-background text-foreground">
        {/* Desktop Sidebar - Fixed */}
        {isDesktopSidebarOpen && (
          <div className="hidden lg:block">
            <InvestorSidebar />
          </div>
        )}

        {/* Mobile Sidebar */}
        <InvestorSidebar isMobile isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <div className={`h-screen flex flex-col ${isDesktopSidebarOpen ? "lg:pl-64" : ""}`}>
          {/* Header - Fixed at top */}
          <div className="flex-shrink-0">
            <Header
              isDark={isDark}
              onToggleTheme={toggleTheme}
              onMenuClick={() => setIsSidebarOpen(true)}
              onDesktopMenuClick={() => setIsDesktopSidebarOpen(!isDesktopSidebarOpen)}
            />
          </div>

          <main className="flex-1 overflow-y-auto p-3 md:p-4 lg:p-6 pb-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Watchlist</h1>
            <WatchlistGrid />
          </main>
        </div>
      </div>
    </div>
  )
}
