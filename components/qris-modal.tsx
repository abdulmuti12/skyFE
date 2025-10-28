"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface QrisModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  amount: string
  onBack: () => void
}

export function QrisModal({ open, onOpenChange, amount, onBack }: QrisModalProps) {
  // const [autoRefresh, setAutoRefresh] = useState(true)

  const handleBack = () => {
    onOpenChange(false)
    onBack()
  }

  const handleSaveQRCode = () => {
    // In a real implementation, this would download the QR code image
    console.log("[v0] Saving QR code...")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] bg-zinc-900 border-zinc-800 text-white max-h-[90vh] overflow-y-auto">
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
          <div className="bg-zinc-800 rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-sm text-zinc-400">Your Payment</p>
                <p className="text-2xl font-semibold mt-1">{amount}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-2 border-t border-zinc-700">
              <div>
                <p className="text-xs text-zinc-400">Account Info</p>
                <p className="text-sm">usky@mail.com</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-zinc-400">Merchant</p>
                <p className="text-sm">PT Mars Media</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-zinc-400">Payment Method</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-medium">QRIS</span>
                  <div className="bg-white px-2 py-0.5 rounded">
                    <span className="text-xs font-bold text-black">QRIS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-center text-sm font-medium mb-4">Scan QRIS Code</h3>

          <div className="bg-white p-4 rounded-lg mx-auto w-fit">
            <img src="/qr-code-for-qris-payment.jpg" alt="QRIS QR Code" className="w-48 h-48" />
          </div>

          <Button
            onClick={handleSaveQRCode}
            variant="outline"
            className="w-full mt-4 bg-zinc-700 hover:bg-zinc-600 text-white border-zinc-600"
          >
            Save QRIS Code
          </Button>

          <p className="text-xs text-center text-zinc-400 mt-4 px-2">
            Scan this QRIS code or save it and upload it to your e-wallet or mobile banking app.
          </p>
        </div>

        {/* <div className="flex items-start gap-2 mt-4 p-3 rounded-lg bg-zinc-800/50">
          <Checkbox
            id="auto-refresh"
            checked={autoRefresh}
            onCheckedChange={(checked) => setAutoRefresh(checked as boolean)}
            className="mt-0.5 border-zinc-600 data-[state=checked]:bg-white data-[state=checked]:text-black"
          />
          <label htmlFor="auto-refresh" className="text-xs text-zinc-300 leading-tight cursor-pointer">
            This page will refresh once your payment is complete
          </label>
        </div> */}
      </DialogContent>
    </Dialog>
  )
}
