"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
// Asumsi komponen Button dan Input diimpor dari shadcn/ui atau sejenisnya
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function ProfileCreatorDesignPage() {
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
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      
      {/* Container untuk Back Button */}
      <div className="bg-[#0A0A0A]">
        <div className="p-3 md:p-8 max-w-6xl mx-auto">
          {/* Tombol Back: Disesuaikan agar tetap terlihat di latar belakang gelap */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-white">Complete Your Profile</h1>

          {/* Avatar Section */}
          <div className="flex flex-col sm:flex-row items-start gap-6 mb-12">
            <div className="flex-shrink-0">
              {avatar ? (
                <img
                  src={avatar || "/placeholder.svg"}
                  alt="Profile"
                  // Avatar: Latar belakang dan border disesuaikan
                  className="w-24 h-24 rounded-full object-cover bg-gray-800 border-2 border-gray-700"
                />
              ) : (
                // Avatar Inisial: Latar belakang gelap, inisial putih
                <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center border-2 border-gray-700">
                  <span className="text-2xl font-bold text-white">{initials}</span>
                </div>
              )}
            </div>

        <div className="flex flex-col gap-3">
       <div className="flex flex-row gap-3">
{/* Tombol Change Image */}
<label htmlFor="avatar-upload" className="cursor-pointer">
<button
type="button"
className="px-5 py-2.5 bg-[#f2f2f2] text-black rounded-full hover:bg-[#e6e6e6] transition-colors border-none"
>
Change Image
</button>
<input
id="avatar-upload"
type="file"
accept="image/jpeg,image/png"
onChange={handleImageChange}
className="hidden"
/>
</label>


{/* Tombol Remove Image */}
<button
type="button"
className="px-5 py-2.5 bg-black text-white rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50 border-none"
onClick={handleRemoveImage}
disabled={!avatar}
>
Remove Image
</button>
</div>

        {/* Teks pendukung */}
        <p className="text-sm text-gray-400">Supported formats: JPG, or PNG. Max size 2MB.</p>
        </div>
            </div>

          {/* Form Fields */}
          <form className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium mb-2 text-white">
                  Username <span className="text-white-500">*</span>
                </label>
                <Input
                  id="username"
                  name="username"
                  placeholder="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  // Input: Latar belakang gelap, teks putih, border abu-abu
                  className="bg-black text-white border-gray-700 placeholder:text-gray-500"
                />
              </div>
              <div>
                <label htmlFor="displayName" className="block text-sm font-medium mb-2 text-white">
                  Display Name <span className="text-white-500">*</span>
                </label>
                <Input
                  id="displayName"
                  name="displayName"
                  placeholder="Display Name"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  // Input: Latar belakang gelap, teks putih, border abu-abu
                  className="bg-black text-white border-gray-700 placeholder:text-gray-500"
                />
              </div>
            </div>

        
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
               
                 <label htmlFor="displayName" className="block text-sm font-medium mb-2 text-white">
                  Description <span className="text-white-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                className="w-full px-2 py-2 bg-black border border-gray-700 rounded-md text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"

                />
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold mb-6 text-white">Social Media</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="instagram" className="block text-sm font-medium mb-2 text-white">
                    Instagram <span className="text-white-500">*</span>
                  </label>
                  <Input
                    id="instagram"
                    name="instagram"
                    placeholder="instagram.com/yourusername"
                    value={formData.instagram}
                    onChange={handleInputChange}
                    // Input: Latar belakang gelap, teks putih, border abu-abu
                    className="bg-black text-white border-gray-700 placeholder:text-gray-500"
                  />
                </div>
                <div>
                  <label htmlFor="facebook" className="block text-sm font-medium mb-2 text-white">
                    Facebook <span className="text-white-500">*</span>
                  </label>
                  <Input
                    id="facebook"
                    name="facebook"
                    placeholder="facebook.com/yourusername"
                    value={formData.facebook}
                    onChange={handleInputChange}
                    // Input: Latar belakang gelap, teks putih, border abu-abu
                    className="bg-black text-white border-gray-700 placeholder:text-gray-500"
                  />
                </div>
                <div>
                  <label htmlFor="tiktok" className="block text-sm font-medium mb-2 text-white">
                    TikTok <span className="text-white-500">*</span>
                  </label>
                  <Input
                    id="tiktok"
                    name="tiktok"
                    placeholder="tiktok.com/@yourusername"
                    value={formData.tiktok}
                    onChange={handleInputChange}
                    // Input: Latar belakang gelap, teks putih, border abu-abu
                    className="bg-black text-white border-gray-700 placeholder:text-gray-500"
                  />
                </div>
                <div>
                  <label htmlFor="twitter" className="block text-sm font-medium mb-2 text-white">
                    X <span className="text-white-500">*</span>
                  </label>
                  <Input
                    id="twitter"
                    name="twitter"
                    placeholder="x.com/yourusername"
                    value={formData.twitter}
                    onChange={handleInputChange}
                    // Input: Latar belakang gelap, teks putih, border abu-abu
                    className="bg-black text-white border-gray-700 placeholder:text-gray-500"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button
                onClick={handleSaveChanges}
                // Tombol Save Changes: Tetap kuning sesuai permintaan, tetapi di-adjust agar presisi
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 text-lg rounded-lg transition-colors px-6"
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
