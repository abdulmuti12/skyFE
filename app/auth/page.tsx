"use client"

import { ArrowLeft, Wallet } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row">
      {/* ================= LEFT SIDE (IMAGE AREA) ================= */}
      <div
        className="relative w-full h-[120px] lg:w-1/2 lg:h-auto bg-cover bg-center"
        style={{ backgroundImage: "url(/cinema-equipment.jpeg)" }}
      >
        {/* Overlay Gelap */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Logo di kiri atas */}
        <div className="absolute top-3 left-4 flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Sky Launch Logo"
            width={120}
            height={40}
            className="object-contain"
            priority
          />
        </div>

        {/* Judul "Sky Launch" (hanya tampil di mobile) */}
        <div className="absolute bottom-3 left-4 lg:hidden">
          <h1 className="text-2xl font-bold text-white">Sky Launch</h1>
        </div>
      </div>

      {/* ================= RIGHT SIDE (AUTH CONTENT) ================= */}
      <div className="relative flex-1 flex flex-col items-center justify-center p-6 lg:p-12">
        {/* Tombol Back */}
        <div className="absolute top-6 left-6 lg:top-8 lg:left-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
        </div>

        <div className="w-full max-w-md space-y-8 mt-12 lg:mt-0">
          {/* Section Welcome */}
          <div className="space-y-3 text-center">
            <h1 className="text-3xl lg:text-4xl font-bold text-white">
              Welcome Back to Sky Launch
            </h1>
            <p className="text-gray-400 text-base">
              Log in to continue your cinematic journey.
            </p>
          </div>

          {/* Tombol Login */}
          <div className="space-y-3">
            <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 text-lg rounded-lg transition-colors flex items-center justify-center gap-2">
              <span className="bg-white rounded-full p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="24px"
                  height="24px"
                >
                  <path
                    fill="#4285F4"
                    d="M24 9.5c3.1 0 5.9 1.1 8.1 3.1l6-6C34.5 3 29.5 1 24 1 14.7 1 6.9 6.8 3.3 14.7l7 5.4C12.1 13.5 17.5 9.5 24 9.5z"
                  />
                  <path
                    fill="#34A853"
                    d="M46.1 24.5c0-1.5-.1-3-.4-4.5H24v9h12.6c-.5 2.8-2 5.2-4.3 6.8l6.7 5.2c3.9-3.6 6.1-8.9 6.1-16.5z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.3 28.4c-.7-2-.9-4.2-.5-6.4l-7-5.4C1.7 20.7 1 22.8 1 25c0 4.7 1.7 9 4.6 12.4l7-5.4c-1.1-1.7-1.9-3.6-2.3-5.6z"
                  />
                  <path
                    fill="#EA4335"
                    d="M24 47c5.5 0 10.2-1.8 13.6-5l-6.7-5.2c-1.9 1.3-4.3 2-6.9 2-6.5 0-11.9-4.4-13.8-10.4l-7 5.4C6.9 41.2 14.7 47 24 47z"
                  />
                </svg>
              </span>
              <span>Login as Creator</span>
            </Button>

            <p className="text-center text-gray-500 text-sm">
              Access your dashboard and manage your film campaigns.
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-700"></div>
            <span className="text-gray-500 text-xs uppercase tracking-wider">
              Or continue with
            </span>
            <div className="flex-1 h-px bg-gray-700"></div>
          </div>

          {/* Tombol Wallet */}
          <Button
            variant="outline"
            className="w-full border-gray-600 hover:border-gray-400 text-white hover:bg-gray-900 py-2 text-lg rounded-lg transition-colors bg-transparent"
          >
            <Wallet className="w-5 h-5 mr-2" />
            Connect Wallet
          </Button>

          {/* Link Investor */}
          <div className="text-center">
            <p className="text-gray-400">
              Want to invest?{" "}
              <Link
                href="#"
                className="text-yellow-400 hover:text-yellow-300 underline transition-colors"
              >
                Login as an Investor
              </Link>
            </p>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-gray-500">
            <p>
              By clicking continue, you agree to our{" "}
              <Link
                href="#"
                className="text-gray-400 hover:text-gray-300 underline"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="#"
                className="text-gray-400 hover:text-gray-300 underline"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
