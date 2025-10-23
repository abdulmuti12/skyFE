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
      <header className="bg-background border-b border-border sticky top-0 z-40">
        <div className="flex items-center justify-between p-3 lg:p-6 gap-2 lg:gap-4">
          {/* Left (Menu + Search Mobile) */}
          <div className="flex items-center gap-2">
            {/* Menu Button */}
            <button
              onClick={onMenuClick}
              className="p-2.5 hover:bg-muted rounded-xl transition-colors border border-border flex-shrink-0"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5 text-foreground" />
            </button>

            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 hover:bg-muted rounded-xl transition-colors border border-border flex-shrink-0 md:hidden"
              aria-label="Open search"
            >
              <Search className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Search Bar - Desktop */}
          <div className="flex-1 max-w-2xl hidden md:block">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-muted text-foreground placeholder-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary text-base"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 lg:gap-4 flex-shrink-0">
            <button className="px-4 py-2.5 bg-muted text-foreground rounded-full font-semibold hover:bg-muted/80 transition-colors text-sm md:text-base border border-border whitespace-nowrap">
              Become a Creator
            </button>

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2.5 rounded-lg hover:bg-muted transition-colors hidden md:block flex-shrink-0"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>

            {/* Sign In */}
         <Link
            href="/auth"
            className="px-4 py-2.5 bg-yellow-400 text-black rounded-full font-semibold hover:bg-yellow-500 transition-colors text-sm md:text-base whitespace-nowrap flex-shrink-0"
          >
            Sign In
          </Link>

          </div>
        </div>
      </header>

      {isSearchOpen && (
        <div className="bg-background border-b border-border md:hidden">
          <div className="p-4 flex items-center gap-3">
            <button
              onClick={() => {
                setIsSearchOpen(false)
                setSearchQuery("")
              }}
              className="p-2 hover:bg-muted rounded-lg transition-colors flex-shrink-0"
              aria-label="Close search"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted text-foreground placeholder-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
