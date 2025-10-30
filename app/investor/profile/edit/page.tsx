"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { InvestorSidebar } from "@/components/investor-sidebar"
import { Header } from "@/components/header-investor"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { X, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function EditProfilePage() {
  const router = useRouter()
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true)
  const [isWalletConnected, setIsWalletConnected] = useState(true)
  const [formData, setFormData] = useState({
    username: "username",
    displayName: "Display Name",
    description: "saya suka makan mie ayam",
    instagram: "instagram.com/yourusername",
    facebook: "facebook.com/yourusername",
    tiktok: "tiktok.com/@yourusername",
    x: "x.com/yourusername",
  })

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    router.push("/investor/profile")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleConnectWallet = () => {
    // Handle wallet connection
    setIsWalletConnected(true)
  }

  const handleDisconnectWallet = () => {
    // Handle wallet disconnection
    setIsWalletConnected(false)
  }

  if (!mounted) return null

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="h-screen overflow-hidden bg-background text-foreground">
        <div className="flex h-full">
          {isDesktopSidebarOpen && (
            <div className="hidden lg:block fixed inset-y-0 left-0 w-56">
              <InvestorSidebar />
            </div>
          )}

          <InvestorSidebar isMobile isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

          <div
            className={`flex-1 flex flex-col h-full overflow-hidden transition-all duration-300 ${isDesktopSidebarOpen ? "lg:ml-56" : "lg:ml-0"}`}
          >
            <Header
              isDark={isDark}
              onToggleTheme={toggleTheme}
              onMenuClick={() => setIsSidebarOpen(true)}
              onDesktopMenuClick={() => setIsDesktopSidebarOpen(!isDesktopSidebarOpen)}
            />

            <main className="flex-1 overflow-y-auto">
              <div className="max-w-6xl p-4 md:p-6 lg:p-8 lg:pl-12 lg:pr-16">
                {/* Breadcrumb Navigation */}
                <div className="flex items-center gap-2 text-sm mb-6 text-muted-foreground">
                  <Link href="/investor/profile" className="hover:text-foreground transition-colors">
                    Profile
                  </Link>
                  <ChevronRight className="w-4 h-4" />
                  <span className="text-foreground">Edit Your Profile</span>
                </div>

                {/* Page Title */}
                <h1 className="text-2xl md:text-3xl font-bold mb-8">Edit Your Profile</h1>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Avatar Section */}
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <Avatar className="h-20 w-20 md:h-24 md:w-24">
                      <AvatarFallback className="text-2xl bg-muted">CN</AvatarFallback>
                    </Avatar>

                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <Button
                          type="button"
                          className="bg-white hover:bg-gray-100 text-black border border-gray-200 rounded-full px-6 py-2 font-medium transition-colors"
                        >
                          Change Image
                        </Button>
                        <Button
                          type="button"
                          className="bg-black hover:bg-gray-900 text-white rounded-full px-6 py-2 font-medium transition-colors"
                        >
                          Remove Image
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">Supported formats: JPG, or PNG. Max size 2MB.</p>
                    </div>
                  </div>

                  {/* Form Fields - Two Column Layout on Desktop */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Username */}
                    <div className="space-y-2">
                      <Label htmlFor="username">
                        Username <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="bg-background border-border"
                        required
                      />
                    </div>

                    {/* Display Name */}
                    <div className="space-y-2">
                      <Label htmlFor="displayName">
                        Display Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="displayName"
                        name="displayName"
                        value={formData.displayName}
                        onChange={handleChange}
                        className="bg-background border-border"
                        required
                      />
                    </div>
                  </div>

                  {/* Description and Wallet - Two Column Layout on Desktop */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Description */}
                    <div className="space-y-2">
                      <Label htmlFor="description">
                        Description <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="bg-background border-border min-h-[120px] resize-none"
                        required
                      />
                    </div>

                    {/* Wallet Address */}
                    <div className="space-y-2">
                      <Label>Wallet Address</Label>
                      {isWalletConnected ? (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-muted border border-border rounded-lg">
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 bg-orange-500 rounded flex items-center justify-center text-xs">
                                🦊
                              </div>
                              <span className="font-mono text-sm">0xE3...B7A6</span>
                            </div>
                            <button type="button" className="p-1 hover:bg-background rounded transition-colors">
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="text-center text-sm text-muted-foreground">OR</div>

                          <button
                            type="button"
                            className="w-full bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg py-3 font-medium transition-colors"
                            onClick={handleDisconnectWallet}
                          >
                            Disconnect Wallet
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="w-full bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg py-3 font-medium transition-colors"
                          onClick={handleConnectWallet}
                        >
                          Connect Wallet
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Social Media Section */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Social Media</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Instagram */}
                      <div className="space-y-2">
                        <Label htmlFor="instagram">
                          Instagram <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="instagram"
                          name="instagram"
                          value={formData.instagram}
                          onChange={handleChange}
                          className="bg-background border-border"
                          required
                        />
                      </div>

                      {/* Facebook */}
                      <div className="space-y-2">
                        <Label htmlFor="facebook">
                          Facebook <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="facebook"
                          name="facebook"
                          value={formData.facebook}
                          onChange={handleChange}
                          className="bg-background border-border"
                          required
                        />
                      </div>

                      {/* TikTok */}
                      <div className="space-y-2">
                        <Label htmlFor="tiktok">
                          TikTok <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="tiktok"
                          name="tiktok"
                          value={formData.tiktok}
                          onChange={handleChange}
                          className="bg-background border-border"
                          required
                        />
                      </div>

                      {/* X (Twitter) */}
                      <div className="space-y-2">
                        <Label htmlFor="x">
                          X <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="x"
                          name="x"
                          value={formData.x}
                          onChange={handleChange}
                          className="bg-background border-border"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      type="submit"
                      className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold rounded-full px-8 py-2 transition-colors"
                    >
                      Save Changes
                    </Button>
                    <Button
                      type="button"
                      onClick={() => router.push("/investor/profile")}
                      className="bg-transparent hover:bg-muted text-foreground border border-border font-semibold rounded-full px-8 py-2 transition-colors"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}
