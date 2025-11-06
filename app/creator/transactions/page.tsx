"use client"

import { useState } from "react"
import { CreatorSidebar } from "@/components/creator-sidebar"
import { CreatorHeader } from "@/components/creator-header"
import { TransactionsTable } from "@/components/transactions-table"
import { Button } from "@/components/ui/button"
import { TopUpModal } from "@/components/top-up-modal"
import { PaymentMethodModal } from "@/components/payment-method-modal"
import { CreditCardModal } from "@/components/credit-card-modal"
import { QrisModal } from "@/components/qris-modal"

export default function TransactionsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true)
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [isCreditCardModalOpen, setIsCreditCardModalOpen] = useState(false)
  const [isQrisModalOpen, setIsQrisModalOpen] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState("")

  const handleTopUpContinue = (amount: string) => {
    setSelectedAmount(amount)
    setIsPaymentModalOpen(true)
  }

  const handlePaymentBack = () => {
    setIsTopUpModalOpen(true)
  }

  const handlePaymentContinue = (method: string) => {
    if (method === "card") {
      setIsCreditCardModalOpen(true)
    } else if (method === "qris") {
      setIsQrisModalOpen(true)
    }
  }

  const handleCreditCardBack = () => {
    setIsPaymentModalOpen(true)
  }

  const handleQrisBack = () => {
    setIsPaymentModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex flex-col lg:flex-row">
        {/* Desktop Sidebar */}
        <CreatorSidebar isOpen={isDesktopSidebarOpen} />

        {/* Mobile Sidebar */}
        <CreatorSidebar isMobile isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Main content */}
        <div className={`flex-1 w-full transition-all duration-300 ${isDesktopSidebarOpen ? "lg:ml-0" : "lg:ml-0"}`}>
          <CreatorHeader
            onMenuClick={() => setIsSidebarOpen(true)}
            onDesktopMenuClick={() => setIsDesktopSidebarOpen(!isDesktopSidebarOpen)}
          />

          <main className="p-3 md:p-4 lg:p-6">
            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h1 className="text-2xl md:text-3xl font-bold">Transactions</h1>

              <Button
                onClick={() => setIsTopUpModalOpen(true)}
                className="w-full md:w-auto px-6 py-2 text-sm bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-300 transition-colors whitespace-nowrap"
              >
                Top Up USKY
              </Button>
            </div>

            {/* Transactions Table */}
            <TransactionsTable onTopUpClick={() => setIsTopUpModalOpen(true)} />
          </main>
        </div>
      </div>

      <TopUpModal open={isTopUpModalOpen} onOpenChange={setIsTopUpModalOpen} onContinue={handleTopUpContinue} />

      <PaymentMethodModal
        open={isPaymentModalOpen}
        onOpenChange={setIsPaymentModalOpen}
        amount={selectedAmount}
        onBack={handlePaymentBack}
        onContinue={handlePaymentContinue}
      />

      <CreditCardModal
        open={isCreditCardModalOpen}
        onOpenChange={setIsCreditCardModalOpen}
        amount={selectedAmount}
        onBack={handleCreditCardBack}
      />

      <QrisModal
        open={isQrisModalOpen}
        onOpenChange={setIsQrisModalOpen}
        amount={selectedAmount}
        onBack={handleQrisBack}
      />
    </div>
  )
}
