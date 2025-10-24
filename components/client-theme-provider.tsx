"use client"

import { ThemeProvider } from "@/components/theme-provider"
import type React from "react"

export function ClientThemeProvider({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>
}
