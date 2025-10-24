"use client"

import { useState } from "react"
import { CreatorSidebar } from "@/components/creator-sidebar"
import { CreatorHeader } from "@/components/creator-header"
import { CreateFilmForm } from "@/components/create-film-form"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function CreateFilmPage() {
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
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 mb-6">
              <Link
                href="/creator/film"
                className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="text-sm">Film</span>
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-sm font-medium">Create Film</span>
            </div>

            {/* Page Title */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Create Film</h1>
            </div>

            {/* Form */}
            <CreateFilmForm />
          </main>
        </div>
      </div>
    </div>
  )
}
