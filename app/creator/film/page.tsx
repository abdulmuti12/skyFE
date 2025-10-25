"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { CreatorSidebar } from "@/components/creator-sidebar"
import { CreatorHeader } from "@/components/creator-header"
import { FilmTable } from "@/components/film-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function FilmPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    if (typeof document === "undefined") return

    const updateDarkMode = () => {
      const isDark = document.documentElement.classList.contains("dark")
      setIsDarkMode(isDark)
    }

    updateDarkMode() // set awal
    const observer = new MutationObserver(updateDarkMode)
    observer.observe(document.documentElement, { attributes: true })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar untuk desktop */}
        <CreatorSidebar />

        {/* Sidebar untuk mobile */}
        <CreatorSidebar
          isMobile
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Konten utama */}
        <div className="flex-1 w-full">
          <CreatorHeader onMenuClick={() => setIsSidebarOpen(true)} />

          <main className="p-3 md:p-4 lg:p-6">
            {/* Header dengan judul & tombol */}
            <div className="flex items-center justify-between mb-6 gap-4">
              <h1 className="text-2xl md:text-3xl font-bold">Film</h1>

              <Link href="/creator/film/create">
                <Button className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold rounded-full px-6 py-2 gap-2 flex-shrink-0 transition-colors">
                  <Plus className="w-5 h-5" />
                  <span className="hidden sm:inline">Create Film</span>
                  <span className="sm:hidden">Create</span>
                </Button>
              </Link>
            </div>

            {/* Table film */}
            <FilmTable isDarkMode={isDarkMode} />
          </main>
        </div>
      </div>
    </div>
  )
}
