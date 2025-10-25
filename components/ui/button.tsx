import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline"
}

export function Button({ className, variant = "default", ...props }: ButtonProps) {
  const base =
    variant === "outline"
      ? "border bg-transparent hover:bg-gray-800"
      : "bg-yellow-400 hover:bg-yellow-300"

  return (
    <button
      className={cn(
        "rounded-lg font-medium transition-all duration-200 flex items-center justify-center",
        base,
        className
      )}
      {...props}
    />
  )
}
