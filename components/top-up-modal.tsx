"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface TopUpModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onContinue: (amount: string) => void
}

const topUpAmounts = [
  { usky: 100, idr: "Rp100,000" },
  { usky: 200, idr: "Rp200,000" },
  { usky: 300, idr: "Rp300,000" },
  { usky: 400, idr: "Rp400,000" },
  { usky: 500, idr: "Rp500,000" },
  { usky: 1000, idr: "Rp1,000,000" },
]

export function TopUpModal({ open, onOpenChange, onContinue }: TopUpModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const currentBalance = 200

  const handleContinue = () => {
    if (selectedAmount) {
      const amount = topUpAmounts.find((a) => a.usky === selectedAmount)
      if (amount) {
        onOpenChange(false)
        onContinue(amount.idr)
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader>
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
          <DialogTitle className="text-xl font-semibold">Top-up USKY</DialogTitle>
          <p className="text-sm text-zinc-400 mt-2">
            Top-up USKY allows users to add USKY tokens to their balance quickly and easily.
          </p>
        </DialogHeader>

        <div className="mt-4">
          <p className="text-sm text-zinc-300">
            Saldo: <span className="font-semibold">{currentBalance} USKY</span>
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
          {topUpAmounts.map((amount) => (
            <button
              key={amount.usky}
              onClick={() => setSelectedAmount(amount.usky)}
              className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
                selectedAmount === amount.usky
                  ? "border-white bg-zinc-800"
                  : "border-zinc-700 bg-zinc-800 hover:border-zinc-600"
              }`}
            >
              <span className="text-lg font-semibold">{amount.usky} USKY</span>
              <span className="text-xs text-zinc-400 mt-1">{amount.idr}</span>
            </button>
          ))}
        </div>

        <div className="flex justify-end mt-6">
          <Button
            onClick={handleContinue}
            disabled={!selectedAmount}
            className="bg-white hover:bg-zinc-100 text-black px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
          >
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
