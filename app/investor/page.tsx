"use client"

import { useState, useEffect } from "react"
import { InvestorSidebar } from "@/components/investor-sidebar"
import { Header } from "@/components/header-investor"
import { InvestmentTrendingSection } from "@/components/investment-trending-section"
import { InvestmentGrid } from "@/components/investment-grid"

export default function InvestorDashboard() {
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
        <div className="flex h-full">
          {isDesktopSidebarOpen && (
            <div className="hidden lg:block fixed inset-y-0 left-0 w-64">
              <InvestorSidebar />
            </div>
          )}

          <InvestorSidebar isMobile isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

          <div
            className={`flex-1 flex flex-col h-full overflow-hidden transition-all duration-300 ${isDesktopSidebarOpen ? "lg:ml-64" : "lg:ml-0"}`}
          >
            <Header
              isDark={isDark}
              onToggleTheme={toggleTheme}
              onMenuClick={() => setIsSidebarOpen(true)}
              onDesktopMenuClick={() => setIsDesktopSidebarOpen(!isDesktopSidebarOpen)}
            />

            <main className="flex-1 overflow-y-auto p-3 md:p-4 lg:p-6 pb-6">
              <InvestmentTrendingSection />
              <InvestmentGrid />
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}
