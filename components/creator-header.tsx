"use client"

import { Menu, Settings, LogOut, Sun, Moon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"
import Link from "next/link"

interface CreatorHeaderProps {
  onMenuClick?: () => void
  onDesktopMenuClick?: () => void
}

export function CreatorHeader({ onMenuClick, onDesktopMenuClick }: CreatorHeaderProps) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="bg-background border-b border-border sticky top-0 z-40 w-full">
      <div className="relative flex items-center justify-between px-3 md:px-6 py-3 md:py-4 gap-4">
        {/* === Left Section (Mobile + Desktop) === */}
        <div className="flex items-center gap-4">
          {/* Menu Button - Mobile only */}
          <button
            onClick={onMenuClick}
            className="w-9 h-9 md:w-auto md:h-auto p-2 hover:bg-muted rounded-lg border border-border transition-colors flex items-center justify-center lg:hidden"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Title with Burger Button (Desktop only) */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onDesktopMenuClick}
              className="hidden lg:flex p-2 hover:bg-muted rounded-lg border border-border transition-colors"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-sm md:text-xl font-semibold">Creator Playground</h1>
          </div>
        </div>

        {/* === Mobile Center Title === */}
        <h1
          className="
            absolute left-1/2 -translate-x-1/2 
            text-sm font-semibold md:hidden 
            text-center w-[230px] h-[36px] flex items-center justify-center
          "
        >
          Creator Playground
        </h1>

        {/* === Right Section === */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle - Desktop only */}
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-muted rounded-lg border border-border transition-colors hidden lg:block"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          {/* Balance (Desktop only) */}
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-muted rounded-lg border border-border">
            <span className="text-sm text-muted-foreground">Balance:</span>
            <span className="font-semibold">200 USKY</span>
            <button className="ml-2 p-1 hover:bg-background rounded transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </button>
          </div>

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
  )
}
