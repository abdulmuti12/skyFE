"use client"

import { useState } from "react"
import { CreatorSidebar } from "@/components/creator-sidebar"
import { CreatorHeader } from "@/components/creator-header"
import { FundingTable } from "@/components/funding-table"
import { Button } from "@/components/ui/button"

export default function FundingPage() {
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
        <div className={`flex-1 w-full transition-all duration-300 ${isDesktopSidebarOpen ? "lg:ml-0" : "lg:ml-0"}`}>
          <CreatorHeader
            onMenuClick={() => setIsSidebarOpen(true)}
            onDesktopMenuClick={() => setIsDesktopSidebarOpen(!isDesktopSidebarOpen)}
          />

          <main className="p-3 md:p-4 lg:p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Funding</h1>
            </div>

            <div className="flex flex-row gap-2 md:gap-3 mb-6 justify-end items-center flex-wrap">
              <Button
                variant="outline"
                className="px-3 md:px-6 py-1.5 md:py-2 text-xs md:text-sm bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-colors whitespace-nowrap"
              >
                Request Withdrawal
              </Button>

              <Button className="px-3 md:px-6 py-1.5 md:py-2 text-xs md:text-sm bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-300 transition-colors whitespace-nowrap">
                + Create New Campaign
              </Button>
            </div>

            {/* Funding Table */}
            <FundingTable />
          </main>
        </div>
      </div>
    </div>
  )
}
