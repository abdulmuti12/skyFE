"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { TrendingSection } from "@/components/trending-section"
import { MovieGrid } from "@/components/movie-grid"

export default function Home() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

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
          <div className="hidden lg:block">
            <Sidebar />
          </div>

          <Sidebar isMobile isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

          {/* Main content */}
          <div className="flex-1 w-full">
            <Header isDark={isDark} onToggleTheme={toggleTheme} onMenuClick={() => setIsSidebarOpen(true)} />

            <main className="p-3 md:p-4 lg:p-6 pb-6">
              <TrendingSection />
              <MovieGrid />
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}
