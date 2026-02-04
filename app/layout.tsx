import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ClientThemeProvider } from "@/components/client-theme-provider"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
}

export const metadata: Metadata = {
  metadataBase: new URL("https://skylo.id"),
  title: "SKYLO | Create & Share AI Videos on Web3",
  description: "Join SKYLO — the platform where anyone can create, share, and trade AI videos on Web3",
  keywords: [
    "AI video", "Web3", "tokenized content", "blockchain video", 
    "Skylo", "create AI videos", "share", "watch", "engage", "crypto", "NFT video"
  ],
  authors: [{ name: "SKYLO" }],
  generator: "App",
  
  other: {
    "google_font_api": "AIzaSyBG58yNdAjc20_8jAvLNSVi9E4Xhwjau_k",
  },

  icons: {
    icon: [
      {
        url: "/assets/logo/logos.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/assets/logo/logos.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    shortcut: "/assets/logo/logos.png",
    apple: {
      url: "/assets/logo/logos.png",
      sizes: "180x180",
      type: "image/png",
    },
  },
  openGraph: {
    title: "Create & Share AI Videos on Web3",
    description: "SKYLO empowers users to make AI videos within a Web3 ecosystem, simplifying content creation and decentralized engagement",
    url: "https://skylo.id",
    siteName: "skylo",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/assets/logo/logos.png",
        width: 750,
        height: 500,
        alt: "SKYLO Logo",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@skylo",
    title: "Create & Share AI Videos on Web3",
    description: "SKYLO empowers users to make AI videos within a Web3 ecosystem, simplifying content creation and decentralized engagement",
    images: ["/assets/logo/logos.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <ClientThemeProvider>{children}</ClientThemeProvider>
      </body>
    </html>
  )
}