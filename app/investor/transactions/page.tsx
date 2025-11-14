"use client"

import { useState, useEffect } from "react"
import { InvestorSidebar } from "@/components/investor-sidebar"
import { Header } from "@/components/header-investor"
import { TransactionsTable } from "@/components/transactions-table-investor"
import { Button } from "@/components/ui/button"
import { TopUpModal } from "@/components/top-up-modal"
import { PaymentMethodModal } from "@/components/payment-method-modal"
import { CreditCardModal } from "@/components/credit-card-modal"
import { QrisModal } from "@/components/qris-modal"
import transactionsData from "@/data/transactions_data.json"

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * TransactionsPage
 *
 * A page for creators to view their transactions.
 *
 * This page renders a table of transactions, and also allows creators to top up their account.
 *
 * The page also includes a sidebar for navigation.
 *
 * @param {boolean} isDark - Whether the page is in dark mode.
 * @param {boolean} mounted - Whether the page has finished mounting.
 * @param {boolean} isSidebarOpen - Whether the sidebar is open.
 * @param {boolean} isDesktopSidebarOpen - Whether the desktop sidebar is open.
 * @param {boolean} isTopUpModalOpen - Whether the top up modal is open.
 * @param {boolean} isPaymentModalOpen - Whether the payment method modal is open.
 * @param {boolean} isCreditCardModalOpen - Whether the credit card modal is open.
 * @param {boolean} isQrisModalOpen - Whether the QRIS modal is open.
 * @param {string} selectedAmount - The amount selected for topping up.
 * @return {JSX.Element} The rendered page.
 */
/*******  29a6a200-bd08-4881-9b30-ce3d0b9ec295  *******/export default function TransactionsPage() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true)
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [isCreditCardModalOpen, setIsCreditCardModalOpen] = useState(false)
  const [isQrisModalOpen, setIsQrisModalOpen] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState("")

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const shouldBeDark = savedTheme ? savedTheme === "dark" : prefersDark
    setIsDark(shouldBeDark)
    updateTheme(shouldBeDark)
  }, [])

  const updateTheme = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    localStorage.setItem("theme", dark ? "dark" : "light")
  }

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    updateTheme(newTheme)
  }

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

  const hasTransactions = transactionsData && transactionsData.length > 0

  if (!mounted) return null

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="h-screen overflow-hidden bg-background text-foreground">
        {/* Desktop Sidebar - Fixed */}
        {isDesktopSidebarOpen && (
          <div className="hidden lg:block">
            <InvestorSidebar />
          </div>
        )}

        {/* Mobile Sidebar */}
        <InvestorSidebar isMobile isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <div className={`h-screen flex flex-col ${isDesktopSidebarOpen ? "lg:pl-64" : ""}`}>
          {/* Header - Fixed at top */}
          <div className="flex-shrink-0">
            <Header
              isDark={isDark}
              onToggleTheme={toggleTheme}
              onMenuClick={() => setIsSidebarOpen(true)}
              onDesktopMenuClick={() => setIsDesktopSidebarOpen(!isDesktopSidebarOpen)}
            />
          </div>

          <main className="flex-1 overflow-y-auto p-3 md:p-4 lg:p-6 pb-6">
            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h1 className="text-2xl md:text-3xl font-bold">Transactions</h1>

              {hasTransactions && (
                <Button
                  onClick={() => setIsTopUpModalOpen(true)}
                  className="w-full md:w-auto px-6 py-2 text-sm bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-300 transition-colors whitespace-nowrap"
                >
                  Top Up USKY
                </Button>
              )}
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
