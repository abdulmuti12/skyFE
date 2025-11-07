"use client"

import { useState } from "react"
import { Download, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronDown, Plus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import transactionsData from "@/data/transactions_data.json"

type TransactionType = "Top Up" | "Funding"
type TransactionStatus = "Completed" | "Pending" | "Failed"

interface Transaction {
  id: string
  date: string
  type: TransactionType
  description: string
  amount: number
  status: TransactionStatus
}

const mockTransactions: Transaction[] = transactionsData as Transaction[]

export function TransactionsTable() {
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

  const totalPages = Math.ceil(mockTransactions.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const currentTransactions = mockTransactions.slice(startIndex, endIndex)

  const getStatusColor = (status: TransactionStatus) => {
    switch (status) {
      case "Completed":
        return "text-green-500"
      case "Pending":
        return "text-yellow-500"
      case "Failed":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  const getStatusDot = (status: TransactionStatus) => {
    switch (status) {
      case "Completed":
        return "bg-green-500"
      case "Pending":
        return "bg-yellow-500"
      case "Failed":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const toggleRowExpansion = (id: string) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedRows(newExpanded)
  }

  const hasNoTransactions = mockTransactions.length === 0

  return (
    <div className="space-y-4">
      {/* Filters and Download Button */}
      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div className="flex flex-col sm:flex-row gap-3">
          <Select defaultValue="all-dates">
            <SelectTrigger className="w-full sm:w-[180px] bg-zinc-100 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-white">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-dates">Date Range</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all-types">
            <SelectTrigger className="w-full sm:w-[180px] bg-zinc-100 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-white">
              <SelectValue placeholder="Transaction Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-types">Transaction Type</SelectItem>
              <SelectItem value="top-up">Top Up</SelectItem>
              <SelectItem value="funding">Funding</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {!hasNoTransactions && (
          <Button
            variant="outline"
            className="w-full md:w-auto bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-white rounded-lg px-4 py-2"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
        )}
      </div>

      {hasNoTransactions ? (
        <div className="flex flex-col items-center justify-center py-16 md:py-24 px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 text-center">No Transactions Yet</h2>
          <p className="text-gray-400 text-center mb-8 max-w-md text-sm md:text-base">
            Your transaction history will appear here once you start funding or top up your USKY balance.
          </p>
          <Button className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold rounded-full px-6 py-2.5 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Top Up USKY
          </Button>
        </div>
      ) : (
        <>
          {/* Table Container */}
          <div className="rounded-lg border border-border overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-semibold">Transaction ID</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold">Date</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold">Type</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold">Description</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold">Amount</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {currentTransactions.map((transaction, index) => (
                    <tr key={index} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 text-sm">{transaction.id}</td>
                      <td className="px-4 py-3 text-sm">{transaction.date}</td>
                      <td className="px-4 py-3 text-sm">{transaction.type}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{transaction.description}</td>
                      <td className="px-4 py-3 text-sm">{transaction.amount}</td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${getStatusDot(transaction.status)}`} />
                          <span className={getStatusColor(transaction.status)}>{transaction.status}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden">
              <div className="divide-y divide-border">
                {currentTransactions.map((transaction) => {
                  const isExpanded = expandedRows.has(transaction.id)
                  return (
                    <div key={transaction.id} className="border-b border-border last:border-b-0">
                      <div
                        className="px-4 py-3 flex items-center justify-between gap-3 hover:bg-muted/50 transition-colors cursor-pointer"
                        onClick={() => toggleRowExpansion(transaction.id)}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <ChevronDown
                            className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium truncate">{transaction.id}</p>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground flex-shrink-0">{transaction.date}</span>
                      </div>

                      {isExpanded && (
                        <div className="px-4 pb-4 pt-2 bg-muted/20 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">Type</span>
                            <span className="text-sm font-medium">{transaction.type}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">Description</span>
                            <span className="text-sm font-medium text-right">{transaction.description}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">Amount</span>
                            <span className="text-sm font-medium">{transaction.amount}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">Status</span>
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${getStatusDot(transaction.status)}`} />
                              <span className={getStatusColor(transaction.status)}>{transaction.status}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground hidden md:inline">Rows per page:</span>
              <Select value={rowsPerPage.toString()} onValueChange={(value) => setRowsPerPage(Number(value))}>
                <SelectTrigger className="w-[70px] bg-muted border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground hidden md:inline">
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 bg-transparent"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 bg-transparent"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 bg-transparent"
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 bg-transparent"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
