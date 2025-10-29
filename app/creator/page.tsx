"use client"

import { useState } from "react"
import { CreatorSidebar } from "@/components/creator-sidebar"
import { CreatorHeader } from "@/components/creator-header"
import { DashboardStats } from "@/components/dashboard-stats"
import { FundingOverview } from "@/components/funding-overview"
import { LatestInvestors } from "@/components/latest-investors"

export default function CreatorDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex flex-col lg:flex-row">
        {/* Desktop Sidebar */}
        <CreatorSidebar isOpen={isDesktopSidebarOpen} />

        {/* Mobile Sidebar */}
        <CreatorSidebar isMobile isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Main content */}
        <div className={`flex-1 w-full transition-all duration-300 ${isDesktopSidebarOpen ? "" : "lg:ml-0"}`}>
          <CreatorHeader
            onMenuClick={() => setIsSidebarOpen(true)}
            onDesktopMenuClick={() => setIsDesktopSidebarOpen(!isDesktopSidebarOpen)}
          />

          <main className="p-3 md:p-4 lg:p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Dashboard</h1>
            </div>

            {/* Stats Grid */}
            <DashboardStats />

            {/* Charts and Investors Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
              {/* Funding Overview - Takes 2 columns on desktop */}
              <div className="lg:col-span-2">
                <FundingOverview />
              </div>

              {/* Latest Investors - Takes 1 column on desktop */}
              <div className="lg:col-span-1">
                <LatestInvestors />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
