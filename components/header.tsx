"use client"

import { Search, Moon, Sun, Menu, X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

interface HeaderProps {
  isDark: boolean
  onToggleTheme: () => void
  onMenuClick?: () => void
}

export function Header({ isDark, onToggleTheme, onMenuClick }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <>
      <header className="bg-background border-b border-border sticky top-0 z-40 w-full">
        <div className="flex items-center justify-between px-3 md:px-6 py-3 md:py-4 gap-3 md:gap-6">
          {/* === Left Section === */}
          <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
            {/* Menu Button — hanya tampil di mobile */}
            <button
              onClick={onMenuClick}
              className="w-9 h-9 md:w-auto md:h-auto p-2 hover:bg-muted rounded-xl border border-border transition-colors flex-shrink-0 lg:hidden flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5 text-foreground" />
            </button>

            {/* Search (Desktop) */}
            <div className="hidden md:flex flex-1 min-w-[200px] max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full h-10 pl-10 pr-10 rounded-lg bg-muted text-foreground placeholder-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm md:text-base"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-muted-foreground/10 rounded-md transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                )}
              </div>
            </div>

            {/* Search Button (Mobile) */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-9 h-9 md:w-auto md:h-auto hover:bg-muted rounded-xl border border-border transition-colors flex-shrink-0 md:hidden flex items-center justify-center"
              aria-label="Open search"
            >
              <Search className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* === Right Section === */}
          <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
            {/* Become a Creator — tampil di semua ukuran */}
            <button
              className="inline-flex items-center justify-center md:px-4 py-2 bg-muted text-foreground rounded-lg font-medium hover:bg-muted/80 transition-colors border border-border text-xs md:text-sm whitespace-nowrap w-[220px] h-[36px] md:w-auto md:h-auto"
            >
              Become a Creator
            </button>

            {/* Theme Toggle — hanya tampil di desktop */}
            <button
              onClick={onToggleTheme}
              className="hidden md:inline-flex p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-slate-600" />
              )}
            </button>

            {/* Sign In */}
            <Link
              href="/auth"
              className="px-3 md:px-4 py-2 bg-yellow-400 text-black rounded-full font-semibold hover:bg-yellow-500 transition-colors text-xs md:text-sm whitespace-nowrap"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* === Mobile Search Overlay === */}
      {isSearchOpen && (
        <div className="bg-background border-b border-border md:hidden">
          <div className="p-3 flex items-center gap-3">
            <button
              onClick={() => {
                setIsSearchOpen(false)
                setSearchQuery("")
              }}
              className="w-9 h-9 flex items-center justify-center hover:bg-muted rounded-lg transition-colors"
              aria-label="Close search"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full pl-10 pr-8 py-2 rounded-lg bg-muted text-foreground placeholder-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-md hover:bg-muted-foreground/10"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
