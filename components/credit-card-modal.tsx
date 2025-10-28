"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, CreditCard } from "lucide-react"

interface CreditCardModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  amount: string
  onBack: () => void
}

export function CreditCardModal({ open, onOpenChange, amount, onBack }: CreditCardModalProps) {
  const [cardNumber, setCardNumber] = useState("")
  const [mmyy, setMmyy] = useState("")
  const [cvv, setCvv] = useState("")
  const [cardOwner, setCardOwner] = useState("")
  const [selectedMethod, setSelectedMethod] = useState<"card" | "qris">("card")

  const handleContinue = () => {
    console.log("Processing payment with card:", { cardNumber, mmyy, cvv, cardOwner })
    // Handle payment processing here
    onOpenChange(false)
  }

  const handleBack = () => {
    onOpenChange(false)
    onBack()
  }

  const isFormValid = cardNumber && mmyy && cvv && cardOwner

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-zinc-900 border-zinc-800 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none z-10"
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
          <div className="bg-zinc-800 rounded-lg p-4">
            <p className="text-sm text-zinc-400 mb-1">Your Payment</p>
            <p className="text-2xl font-semibold">{amount}</p>
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={() => setSelectedMethod("card")}
            className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all ${
              selectedMethod === "card"
                ? "border-white bg-zinc-800"
                : "border-zinc-700 bg-zinc-800/50 hover:border-zinc-600"
            }`}
          >
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5" />
              <span className="text-sm font-medium">Credit/Debit Card</span>
            </div>
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedMethod === "card" ? "border-white" : "border-zinc-600"
              }`}
            >
              {selectedMethod === "card" && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
            </div>
          </button>

          {selectedMethod === "card" && (
            <div className="mt-4 space-y-4">
              <div>
                <Label htmlFor="cardNumber" className="text-sm text-zinc-300 mb-2 block">
                  Card Number
                </Label>
                <Input
                  id="cardNumber"
                  type="text"
                  placeholder="Enter your card number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                  maxLength={19}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="mmyy" className="text-sm text-zinc-300 mb-2 block">
                    MM/YY
                  </Label>
                  <Input
                    id="mmyy"
                    type="text"
                    placeholder="MM/YY"
                    value={mmyy}
                    onChange={(e) => setMmyy(e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                    maxLength={5}
                  />
                </div>
                <div>
                  <Label htmlFor="cvv" className="text-sm text-zinc-300 mb-2 block">
                    CVC/CVV
                  </Label>
                  <Input
                    id="cvv"
                    type="text"
                    placeholder="Enter CVC/CVV"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                    maxLength={4}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="cardOwner" className="text-sm text-zinc-300 mb-2 block">
                  Card Owner Name
                </Label>
                <Input
                  id="cardOwner"
                  type="text"
                  placeholder="Enter name as shown on card"
                  value={cardOwner}
                  onChange={(e) => setCardOwner(e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                />
              </div>
            </div>
          )}
        </div>

        <div className="mt-4">
          <button
            onClick={() => setSelectedMethod("qris")}
            className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all ${
              selectedMethod === "qris"
                ? "border-white bg-zinc-800"
                : "border-zinc-700 bg-zinc-800/50 hover:border-zinc-600"
            }`}
          >
            <div className="flex items-center gap-3">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
              </svg>
              <span className="text-sm font-medium">QRIS</span>
            </div>
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedMethod === "qris" ? "border-white" : "border-zinc-600"
              }`}
            >
              {selectedMethod === "qris" && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
            </div>
          </button>
        </div>

        <div className="flex gap-3 mt-6">
          <Button
            onClick={handleBack}
            variant="outline"
            className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700"
          >
            Back
          </Button>
          <Button
            onClick={handleContinue}
            disabled={selectedMethod === "card" && !isFormValid}
            className="flex-1 bg-zinc-600 hover:bg-zinc-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
