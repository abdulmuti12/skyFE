"use client"

import { Facebook, Linkedin, Twitter, MessageCircle, Link2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"

interface ShareCampaignModalProps {
  isOpen: boolean
  onClose: () => void
  campaignTitle?: string
  campaignUrl?: string
}

export function ShareCampaignModal({ isOpen, onClose, campaignTitle, campaignUrl }: ShareCampaignModalProps) {
  const [copySuccess, setCopySuccess] = useState(false)

  const shareUrl = campaignUrl || (typeof window !== "undefined" ? window.location.href : "")
  const shareText = `Check out this campaign: ${campaignTitle || "Film Campaign"}`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handleShare = (platform: string) => {
    let url = ""
    switch (platform) {
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
        break
      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
        break
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
        break
      case "whatsapp":
        url = `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`
        break
    }
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Share Campaign</DialogTitle>
          <p className="text-muted-foreground text-center mt-2">Spread the word about this Share Campaign</p>
        </DialogHeader>

        <div className="grid grid-cols-5 gap-4 mt-6 mb-4">
          <button
            onClick={() => handleShare("facebook")}
            className="flex flex-col items-center gap-2 group"
            aria-label="Share on Facebook"
          >
            <div className="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center group-hover:bg-zinc-800 transition-colors">
              <Facebook className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs text-muted-foreground">Facebook</span>
          </button>

          <button
            onClick={() => handleShare("linkedin")}
            className="flex flex-col items-center gap-2 group"
            aria-label="Share on LinkedIn"
          >
            <div className="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center group-hover:bg-zinc-800 transition-colors">
              <Linkedin className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs text-muted-foreground">LinkedIn</span>
          </button>

          <button
            onClick={() => handleShare("twitter")}
            className="flex flex-col items-center gap-2 group"
            aria-label="Share on Twitter/X"
          >
            <div className="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center group-hover:bg-zinc-800 transition-colors">
              <Twitter className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs text-muted-foreground">Twitter/X</span>
          </button>

          <button
            onClick={() => handleShare("whatsapp")}
            className="flex flex-col items-center gap-2 group"
            aria-label="Share on WhatsApp"
          >
            <div className="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center group-hover:bg-zinc-800 transition-colors">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs text-muted-foreground">WhatsApp</span>
          </button>

          <button onClick={handleCopyLink} className="flex flex-col items-center gap-2 group" aria-label="Copy Link">
            <div className="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center group-hover:bg-zinc-800 transition-colors">
              <Link2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs text-muted-foreground">{copySuccess ? "Copied!" : "Copy Link"}</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
