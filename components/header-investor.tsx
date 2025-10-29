"use client"

import { Search, Moon, Sun, Menu, X, Settings, LogOut } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface HeaderProps {
  isDark: boolean
  onToggleTheme: () => void
  onMenuClick?: () => void
  onDesktopMenuClick?: () => void
}

export function Header({ isDark, onToggleTheme, onMenuClick, onDesktopMenuClick }: HeaderProps) {
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
              <div className="relative w-full flex items-center gap-2">
                <button
                  onClick={onDesktopMenuClick}
                  className="hidden lg:flex w-10 h-10 items-center justify-center hover:bg-muted rounded-lg border border-border transition-colors flex-shrink-0"
                  aria-label="Toggle sidebar"
                >
                  <Menu className="w-5 h-5 text-foreground" />
                </button>

                <div className="relative flex-1">
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
            {/* Theme Toggle — hanya tampil di desktop */}
            <button
              onClick={onToggleTheme}
              className="hidden md:inline-flex p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>

            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="
                    flex items-center justify-center gap-3 
                    w-9 h-9 md:w-auto md:h-auto 
                    hover:bg-muted rounded-lg transition-colors
                  "
                >
                  <Avatar className="h-9 w-9 md:h-8 md:w-8">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=fredthegreat" alt="User" />
                    <AvatarFallback>FG</AvatarFallback>
                  </Avatar>
                  <div className="hidden md:flex flex-col items-start">
                    <span className="text-sm font-medium">fredthegreat</span>
                    <span className="text-xs text-muted-foreground">fred@gmail.com</span>
                  </div>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">fredthegreat</p>
                  <p className="text-xs text-muted-foreground">fred@gmail.com</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/auth" className="flex items-center w-full">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
