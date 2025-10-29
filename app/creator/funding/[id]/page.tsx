"use client"

import { useState } from "react"
import { CreatorSidebar } from "@/components/creator-sidebar"
import { CreatorHeader } from "@/components/creator-header"
import { FundingDetailCard } from "@/components/funding-detail-card"
import { FundingDetailTable } from "@/components/funding-detail-table"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function FundingDetailPage() {
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
            {/* Breadcrumb */}
            <div className="mb-6">
              <Link
                href="/creator/funding"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Funding</span>
                <span>›</span>
                <span className="text-foreground">Funding Detail</span>
              </Link>
            </div>

            {/* Funding Detail Card */}
            <FundingDetailCard />

            {/* Funding Detail Table */}
            <FundingDetailTable />
          </main>
        </div>
      </div>
    </div>
  )
}
