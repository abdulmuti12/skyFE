"use client"

import { useState } from "react"
import { CreatorSidebar } from "@/components/creator-sidebar"
import { CreatorHeader } from "@/components/creator-header"
import { TransactionsTable } from "@/components/transactions-table"
import { Button } from "@/components/ui/button"

export default function TransactionsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex flex-col lg:flex-row">
        {/* Desktop Sidebar */}
        <CreatorSidebar />

        {/* Mobile Sidebar */}
        <CreatorSidebar isMobile isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Main content */}
        <div className="flex-1 w-full">
          <CreatorHeader onMenuClick={() => setIsSidebarOpen(true)} />

          <main className="p-3 md:p-4 lg:p-6">
            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h1 className="text-2xl md:text-3xl font-bold">Transactions</h1>

              <Button className="w-full md:w-auto px-6 py-2 text-sm bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-300 transition-colors whitespace-nowrap">
                Top Up USKY
              </Button>
            </div>

            {/* Transactions Table */}
            <TransactionsTable />
          </main>
        </div>
      </div>
    </div>
  )
}
