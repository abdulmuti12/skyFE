"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function CreatorProfilePage() {
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

    // Update initials based on display name
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
    // Add your save logic here
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 mb-8 text-foreground hover:text-muted-foreground transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </Link>

      <div className="max-w-2xl">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-8">Complete Your Profile</h1>

        {/* Avatar Section */}
        <div className="flex items-start gap-6 mb-8">
          <div className="flex-shrink-0">
            {avatar ? (
              <img
                src={avatar || "/placeholder.svg"}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover bg-muted"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                <span className="text-2xl font-bold text-muted-foreground">{initials}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="avatar-upload" className="cursor-pointer">
              <Button asChild variant="outline" className="cursor-pointer bg-transparent">
                <span>Change Image</span>
              </Button>
              <input
                id="avatar-upload"
                type="file"
                accept="image/jpeg,image/png"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            <Button variant="outline" onClick={handleRemoveImage} disabled={!avatar} className="w-full bg-transparent">
              Remove Image
            </Button>
            <p className="text-sm text-muted-foreground">Supported formats: JPG, or PNG. Max size 2MB.</p>
          </div>
        </div>

        {/* Form Fields */}
        <form className="space-y-6">
          {/* Username and Display Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-2">
                Username <span className="text-destructive">*</span>
              </label>
              <Input
                id="username"
                name="username"
                placeholder="username"
                value={formData.username}
                onChange={handleInputChange}
                className="bg-input border-border"
              />
            </div>
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium mb-2">
                Display Name <span className="text-destructive">*</span>
              </label>
              <Input
                id="displayName"
                name="displayName"
                placeholder="Display Name"
                value={formData.displayName}
                onChange={handleInputChange}
                className="bg-input border-border"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              Description <span className="text-destructive">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="saya suka makan mie ayam"
              value={formData.description}
              onChange={handleInputChange}
              rows={5}
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Social Media Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Social Media</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="instagram" className="block text-sm font-medium mb-2">
                  Instagram <span className="text-destructive">*</span>
                </label>
                <Input
                  id="instagram"
                  name="instagram"
                  placeholder="instagram.com/yourusername"
                  value={formData.instagram}
                  onChange={handleInputChange}
                  className="bg-input border-border"
                />
              </div>
              <div>
                <label htmlFor="facebook" className="block text-sm font-medium mb-2">
                  Facebook <span className="text-destructive">*</span>
                </label>
                <Input
                  id="facebook"
                  name="facebook"
                  placeholder="facebook.com/yourusername"
                  value={formData.facebook}
                  onChange={handleInputChange}
                  className="bg-input border-border"
                />
              </div>
              <div>
                <label htmlFor="tiktok" className="block text-sm font-medium mb-2">
                  TikTok <span className="text-destructive">*</span>
                </label>
                <Input
                  id="tiktok"
                  name="tiktok"
                  placeholder="tiktok.com/@yourusername"
                  value={formData.tiktok}
                  onChange={handleInputChange}
                  className="bg-input border-border"
                />
              </div>
              <div>
                <label htmlFor="twitter" className="block text-sm font-medium mb-2">
                  X <span className="text-destructive">*</span>
                </label>
                <Input
                  id="twitter"
                  name="twitter"
                  placeholder="x.com/yourusername"
                  value={formData.twitter}
                  onChange={handleInputChange}
                  className="bg-input border-border"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <Button onClick={handleSaveChanges} className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
