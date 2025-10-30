"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Header } from "@/components/header-investor"
import { InvestorSidebar } from "@/components/investor-sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Instagram, Facebook } from "lucide-react"
import { Copy } from "lucide-react"

export default function InvestorProfilePage() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const shouldBeDark = savedTheme ? savedTheme === "dark" : prefersDark
    setIsDark(shouldBeDark)
    updateTheme(shouldBeDark)
  }, [])

  const updateTheme = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    localStorage.setItem("theme", dark ? "dark" : "light")
  }

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    updateTheme(newTheme)
  }

  const balances = [
    { name: "Solana", amount: "0.0203", value: "$2", icon: "https://cryptologos.cc/logos/solana-sol-logo.png" },
    { name: "USKY", amount: "320.55", value: "$424.30", icon: "⚡" },
  ]

  const notifications = [
    {
      id: 1,
      type: "funding",
      user: "JohnDukes",
      action: 'just funded "Beyond the Horizon" with',
      amount: "$500.00",
      time: "2h",
    },
    {
      id: 2,
      type: "comment",
      user: "JudithRodriguez",
      action: 'commented on "Crimson Shadows"',
      message: "Can't wait to see this one relea...",
      time: "4h",
    },
    {
      id: 3,
      type: "withdrawal",
      user: "Your withdrawal request of",
      amount: "$340.00",
      action: "has been successfully processed.",
      time: "2d",
    },
    {
      id: 4,
      type: "funding",
      user: "JohnDukes",
      action: 'just funded "Beyond the Horizon" with',
      amount: "$500.00",
      time: "2h",
    },
    {
      id: 5,
      type: "comment",
      user: "JudithRodriguez",
      action: 'commented on "Crimson Shadows"',
      message: "Can't wait to see this one relea...",
      time: "4h",
    },
    {
      id: 6,
      type: "withdrawal",
      user: "Your withdrawal request of",
      amount: "$340.00",
      action: "has been successfully processed.",
      time: "2d",
    },
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  if (!mounted) return null

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="h-screen overflow-hidden bg-background text-foreground">
        {isDesktopSidebarOpen && (
          <div className="hidden lg:block">
            <InvestorSidebar />
          </div>
        )}

        {/* Mobile Sidebar */}
        <InvestorSidebar isMobile isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <div className={`h-screen flex flex-col ${isDesktopSidebarOpen ? "lg:pl-64" : ""}`}>
          {/* Header - Fixed at top */}
          <div className="flex-shrink-0">
            <Header
              isDark={isDark}
              onToggleTheme={toggleTheme}
              onMenuClick={() => setIsSidebarOpen(true)}
              onDesktopMenuClick={() => setIsDesktopSidebarOpen(!isDesktopSidebarOpen)}
            />
          </div>

          <main className="flex-1 overflow-y-auto">
            <div className="flex items-start gap-6 p-4 md:p-6 max-w-[1600px] mx-auto">
              {/* Main Content */}
              <div className="flex-1 space-y-6">
                <h1 className="text-2xl font-bold">Profile</h1>

                {/* Profile Card */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex flex-col md:flex-row md:items-start gap-4 mb-6">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=fredthegreat" />
                      <AvatarFallback>FG</AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <h2 className="text-xl font-bold">Freddie The Great</h2>
                      <p className="text-muted-foreground">@username</p>
                    </div>

                    <Link href="/investor/profile/edit">
                      <Button className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold rounded-full px-6 py-2 transition-colors">
                        Edit Profile
                      </Button>
                    </Link>
                  </div>

                  <p className="text-muted-foreground mb-4">"Be a Hero"</p>

                  {/* Social Links */}
                  <div className="flex gap-3 mb-6">
                    <button className="w-10 h-10 bg-muted hover:bg-muted/80 rounded-lg flex items-center justify-center transition-colors">
                      <Instagram className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 bg-muted hover:bg-muted/80 rounded-lg flex items-center justify-center transition-colors">
                      <Facebook className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 bg-muted hover:bg-muted/80 rounded-lg flex items-center justify-center transition-colors">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                      </svg>
                    </button>
                    <button className="w-10 h-10 bg-muted hover:bg-muted/80 rounded-lg flex items-center justify-center transition-colors">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </button>
                  </div>

                  {/* Wallet Address */}
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center text-xs">🦊</div>
                      <span className="font-mono text-sm">0xE3...B7A6</span>
                      <button
                        onClick={() => copyToClipboard("0xE3...B7A6")}
                        className="p-1 hover:bg-background rounded transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <button className="text-sm hover:text-muted-foreground transition-colors">Disconnect Wallet</button>
                  </div>
                </div>

                {/* Balance Section */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4">Balance</h3>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-muted-foreground pb-2 border-b border-border">
                      <span>Coins</span>
                      <span>Amount</span>
                    </div>

                    {balances.map((balance) => (
                      <div key={balance.name} className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-3">
                          {balance.icon.startsWith("http") ? (
                            <img
                              src={balance.icon || "/placeholder.svg"}
                              alt={balance.name}
                              className="w-6 h-6 rounded-full"
                            />
                          ) : (
                            <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-sm">
                              {balance.icon}
                            </div>
                          )}
                          <div>
                            <div className="font-medium">{balance.name}</div>
                            <div className="text-sm text-muted-foreground">{balance.amount}</div>
                          </div>
                        </div>
                        <div className="font-semibold">{balance.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Notifications Sidebar - Desktop Only */}
              <div className="hidden xl:flex w-80 self-stretch">
                <div className="bg-card border border-border rounded-xl p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold mb-4">Notifications</h3>

                  <div className="space-y-4 flex-1 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="flex gap-3">
                        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                          {notification.type === "funding" && (
                            <div className="w-6 h-6 bg-background rounded-full flex items-center justify-center">
                              <span className="text-xs">👤</span>
                            </div>
                          )}
                          {notification.type === "comment" && (
                            <div className="w-6 h-6 bg-background rounded-lg flex items-center justify-center">
                              <span className="text-xs">💬</span>
                            </div>
                          )}
                          {notification.type === "withdrawal" && (
                            <div className="w-6 h-6 bg-background rounded-lg flex items-center justify-center">
                              <span className="text-xs">💰</span>
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-sm">
                            <span className="font-semibold">{notification.user}</span> {notification.action}{" "}
                            {notification.amount && (
                              <span className="text-blue-500 font-semibold">{notification.amount}</span>
                            )}
                          </p>
                          {notification.message && (
                            <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                          )}
                        </div>

                        <span className="text-xs text-muted-foreground flex-shrink-0">{notification.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Notifications Section - Mobile Only */}
            <div className="xl:hidden px-4 pb-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Notifications</h3>

                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="flex gap-3">
                      <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                        {notification.type === "funding" && (
                          <div className="w-6 h-6 bg-background rounded-full flex items-center justify-center">
                            <span className="text-xs">👤</span>
                          </div>
                        )}
                        {notification.type === "comment" && (
                          <div className="w-6 h-6 bg-background rounded-lg flex items-center justify-center">
                            <span className="text-xs">💬</span>
                          </div>
                        )}
                        {notification.type === "withdrawal" && (
                          <div className="w-6 h-6 bg-background rounded-lg flex items-center justify-center">
                            <span className="text-xs">💰</span>
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm">
                          <span className="font-semibold">{notification.user}</span> {notification.action}{" "}
                          {notification.amount && (
                            <span className="text-blue-500 font-semibold">{notification.amount}</span>
                          )}
                        </p>
                        {notification.message && (
                          <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                        )}
                      </div>

                      <span className="text-xs text-muted-foreground flex-shrink-0">{notification.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
