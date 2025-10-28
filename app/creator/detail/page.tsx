"use client"

import type React from "react"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function CreatorDetailPage() {
  const [formData, setFormData] = useState({
    username: "",
    displayName: "",
    description: "",
    instagram: "",
    facebook: "",
    tiktok: "",
    twitter: "",
  })

  const [avatar, setAvatar] = useState<string | null>(null)
  const [initials, setInitials] = useState("CN")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (name === "displayName") {
      const names = value.split(" ")
      const newInitials = names
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
      if (newInitials) setInitials(newInitials)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setAvatar(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setAvatar(null)
  }

  const handleSaveChanges = () => {
    console.log("Saving profile:", { ...formData, avatar })
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Back Button Container */}
      <div className="bg-background border-b border-border">
        <div className="p-4 md:p-8 max-w-6xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 pb-12 pt-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Complete Your Profile</h1>

          {/* Avatar Section */}
          <div className="flex flex-col sm:flex-row items-start gap-6 mb-12">
            <div className="flex-shrink-0">
              {avatar ? (
                <img
                  src={avatar || "/placeholder.svg"}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover bg-muted border-2 border-border"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center border-2 border-border">
                  <span className="text-2xl font-bold">{initials}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex flex-row gap-3">
                {/* Change Image Button */}
                <label htmlFor="avatar-upload" className="cursor-pointer">
                  <div className="px-5 py-2.5 bg-white dark:bg-zinc-100 text-black rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-200 transition-colors border border-border">
                    Change Image
                  </div>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                {/* Remove Image Button */}
                <button
                  type="button"
                  className="px-5 py-2.5 bg-zinc-900 dark:bg-zinc-800 text-white rounded-full hover:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors disabled:opacity-50 border border-border"
                  onClick={handleRemoveImage}
                  disabled={!avatar}
                >
                  Remove Image
                </button>
              </div>

              <p className="text-sm text-muted-foreground">Supported formats: JPG, or PNG. Max size 2MB.</p>
            </div>
          </div>

          {/* Form Fields */}
          <form className="space-y-8">
            {/* Username and Display Name - 2 columns on desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium mb-2">
                  Username <span className="text-white-500">*</span>
                </label>
                <Input
                  id="username"
                  name="username"
                  placeholder="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="bg-background border-border"
                />
              </div>
              <div>
                <label htmlFor="displayName" className="block text-sm font-medium mb-2">
                  Display Name <span className="text-white-500">*</span>
                </label>
                <Input
                  id="displayName"
                  name="displayName"
                  placeholder="Display Name"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  className="bg-background border-border"
                />
              </div>
            </div>

            {/* Description - Matches username width (single column on desktop) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-2">
                  Description <span className="text-white-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="saya suka makan mie ayam"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* Social Media Section */}
            <div>
              <h2 className="text-xl font-semibold mb-6">Social Media</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="instagram" className="block text-sm font-medium mb-2">
                    Instagram <span className="text-white-500">*</span>
                  </label>
                  <Input
                    id="instagram"
                    name="instagram"
                    placeholder="instagram.com/yourusername"
                    value={formData.instagram}
                    onChange={handleInputChange}
                    className="bg-background border-border"
                  />
                </div>
                <div>
                  <label htmlFor="facebook" className="block text-sm font-medium mb-2">
                    Facebook <span className="text-white-500">*</span>
                  </label>
                  <Input
                    id="facebook"
                    name="facebook"
                    placeholder="facebook.com/yourusername"
                    value={formData.facebook}
                    onChange={handleInputChange}
                    className="bg-background border-border"
                  />
                </div>
                <div>
                  <label htmlFor="tiktok" className="block text-sm font-medium mb-2">
                    TikTok <span className="text-white-500">*</span>
                  </label>
                  <Input
                    id="tiktok"
                    name="tiktok"
                    placeholder="tiktok.com/@yourusername"
                    value={formData.tiktok}
                    onChange={handleInputChange}
                    className="bg-background border-border"
                  />
                </div>
                <div>
                  <label htmlFor="twitter" className="block text-sm font-medium mb-2">
                    X <span className="text-white-500">*</span>
                  </label>
                  <Input
                    id="twitter"
                    name="twitter"
                    placeholder="x.com/yourusername"
                    value={formData.twitter}
                    onChange={handleInputChange}
                    className="bg-background border-border"
                  />
                </div>
              </div>
            </div>

            {/* Save Changes Button */}
            <div className="pt-4">
              <Button
                type="button"
                onClick={handleSaveChanges}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2.5 px-8 text-base rounded-lg transition-colors"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
