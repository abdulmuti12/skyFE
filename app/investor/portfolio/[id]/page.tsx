"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { InvestorSidebar } from "@/components/investor-sidebar"
import { Header } from "@/components/header-investor"
import { PortfolioDetailChart } from "@/components/portfolio-detail-chart"
import { LatestInvestorsTable } from "@/components/latest-investors-table"

export default function PortfolioDetailPage() {
  const params = useParams()
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
            <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Portfolio</h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="bg-card border border-border rounded-lg p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm md:text-base mb-2">Total Invested</p>
                    <p className="text-xl md:text-2xl lg:text-3xl font-bold">12,540.23 USKY</p>
                  </div>
                  <div className="text-muted-foreground text-lg md:text-xl">$</div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm md:text-base mb-2">Total Investment Value</p>
                    <p className="text-xl md:text-2xl lg:text-3xl font-bold">$523,987.40</p>
                  </div>
                  <div className="text-muted-foreground text-lg md:text-xl">$</div>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
              {/* Chart Section - Takes 2 columns on xl screens */}
              <div className="xl:col-span-2">
                <PortfolioDetailChart />
              </div>

              {/* Latest Investors Section - Takes 1 column on xl screens */}
              <div className="xl:col-span-1">
                <LatestInvestorsTable />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
