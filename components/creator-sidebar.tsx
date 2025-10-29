"use client"

import { LayoutDashboard, Film, CreditCard, User, X, Rocket } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

function DollarFlowerIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Flower/gear border */}
      <path
        d="M12 2C12 2 13 4 13 6C15 6 17 5 17 5C17 5 16 7 16 9C18 9 20 8 20 8C20 8 19 10 19 12C21 12 23 11 23 11C23 11 22 13 22 15C24 15 26 14 26 14C26 14 25 16 25 18C23 18 21 17 21 17C21 17 20 19 20 21C18 21 16 20 16 20C16 20 15 22 15 24C13 24 11 23 11 23C11 23 10 21 10 19C8 19 6 20 6 20C6 20 7 18 7 16C5 16 3 17 3 17C3 17 4 15 4 13C2 13 0 14 0 14C0 14 1 12 1 10C-1 10 -3 11 -3 11C-3 11 -2 9 -2 7C0 7 2 8 2 8C2 8 3 6 3 4C5 4 7 5 7 5C7 5 8 3 8 1C10 1 12 2 12 2Z"
        fill="currentColor"
        opacity="0.2"
      />
      {/* Outer decorative circle */}
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" />
      {/* Inner circle background */}
      <circle cx="12" cy="12" r="7" fill="currentColor" opacity="0.15" />
      {/* Dollar sign */}
      <path
        d="M13.5 8.5H10.5C9.67157 8.5 9 9.17157 9 10C9 10.8284 9.67157 11.5 10.5 11.5H13.5C14.3284 11.5 15 12.1716 15 13C15 13.8284 14.3284 14.5 13.5 14.5H10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 7V8.5M12 14.5V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

interface CreatorSidebarProps {
  isMobile?: boolean
  isOpen?: boolean
  onClose?: () => void
}

export function CreatorSidebar({ isMobile = false, isOpen = false, onClose }: CreatorSidebarProps) {
  const pathname = usePathname()

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/creator" },
    { icon: Film, label: "Film", href: "/creator/film" },
    { icon: DollarFlowerIcon, label: "Funding", href: "/creator/funding" },
    { icon: CreditCard, label: "Transactions", href: "/creator/transactions" },
    { icon: User, label: "Profile", href: "/creator/profile" },
  ]

  const isActive = (href: string) => {
    if (href === "/creator") {
      return pathname === "/creator"
    }
    return pathname?.startsWith(href)
  }

  const sidebarContent = (
    <>
      <div className="flex items-center gap-2 mb-8">
        <Rocket className="w-6 h-6" />
        <span className="font-bold text-lg">Sky Launch</span>
      </div>

      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => {
          const active = isActive(item.href)
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                active
                  ? "bg-zinc-800 dark:bg-white/10 text-white dark:text-white"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
              onClick={isMobile ? onClose : undefined}
            >
              {typeof item.icon === "function" ? <item.icon size={20} /> : <item.icon size={20} />}
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </>
  )

  if (isMobile) {
    return (
      <>
        {/* Overlay */}
        {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}

        {/* Slide-out sidebar */}
        <aside
          className={`fixed left-0 top-0 h-screen w-56 bg-sidebar text-sidebar-foreground border-r border-sidebar-border p-6 flex flex-col z-50 transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } lg:hidden`}
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Rocket className="w-6 h-6" />
              <span className="font-bold text-lg">Sky Launch</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-sidebar-accent rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-2 flex-1">
            {menuItems.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    active
                      ? "bg-zinc-800 dark:bg-white/10 text-white dark:text-white"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                  onClick={onClose}
                >
                  {typeof item.icon === "function" ? <item.icon size={20} /> : <item.icon size={20} />}
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </aside>
      </>
    )
  }

  return (
    <aside
      className={`hidden lg:flex w-56 bg-sidebar text-sidebar-foreground border-r border-sidebar-border h-screen sticky top-0 p-6 flex-col transition-all duration-300 ${
        !isOpen ? "lg:hidden" : ""
      }`}
    >
      {sidebarContent}
    </aside>
  )
}
