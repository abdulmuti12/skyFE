"use client"

import { Home, Bookmark, Grid3x3, User, Rocket, X, CreditCard } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface InvestorSidebarProps {
  isMobile?: boolean
  isOpen?: boolean
  onClose?: () => void
}

export function InvestorSidebar({ isMobile = false, isOpen = false, onClose }: InvestorSidebarProps) {
  const pathname = usePathname()

  const menuItems = [
    { icon: Rocket, label: "Sky Launch", href: "#" },
    { icon: Home, label: "Home", href: "/investor" },
    { icon: Bookmark, label: "Watchlist", href: "/investor/watchlist" },
    { icon: Grid3x3, label: "Portfolio", href: "/investor/portfolio" },
    { icon: CreditCard, label: "Transactions", href: "/investor/transactions" },
    { icon: User, label: "Profile", href: "#" },
  ]

  const isActive = (href: string) => {
    if (href === "#") return false
    if (href === "/investor") {
      return pathname === "/investor"
    }
    return pathname.startsWith(href)
  }

  if (isMobile) {
    return (
      <>
        {/* Overlay */}
        {isOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={onClose} />}

        {/* Slide-out sidebar */}
        <aside
          className={`fixed left-0 top-0 h-screen w-56 bg-sidebar text-sidebar-foreground border-r border-sidebar-border p-6 flex flex-col z-50 transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden`}
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

          <nav className="space-y-4 flex-1">
            {menuItems.slice(1).map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
                onClick={onClose}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>
      </>
    )
  }

  return (
    <aside className="w-56 bg-sidebar text-sidebar-foreground border-r border-sidebar-border h-screen fixed left-0 top-0 z-30 p-6 flex flex-col">
      <div className="flex items-center gap-2 mb-8">
        <Rocket className="w-6 h-6" />
        <span className="font-bold text-lg">Sky Launch</span>
      </div>

      <nav className="space-y-4 flex-1">
        {menuItems.slice(1).map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              isActive(item.href)
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            }`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
