"use client"

import { useState } from "react"
import { Download, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronDown } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

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

const mockTransactions: Transaction[] = [
  {
    id: "0xF9C2D7A4B1E8C5F...",
    date: "2020-05-01 06:05:46",
    type: "Top Up",
    description: "Top up via QRIS",
    amount: 540,
    status: "Pending",
  },
  {
    id: "0xA8D1E4F3B7C5A9E...",
    date: "2020-05-04 09:18:16",
    type: "Top Up",
    description: "Top up via Credit/Debit Card",
    amount: 423,
    status: "Failed",
  },
  {
    id: "0xA4B9C7D1EBF3A2...",
    date: "2020-05-03 08:14:01",
    type: "Top Up",
    description: "Top up via Credit/Debit Card",
    amount: 952,
    status: "Completed",
  },
  {
    id: "0xB5E1F9A3C4D7E2A...",
    date: "2020-05-02 07:10:15",
    type: "Funding",
    description: "Funding received from @firstname to @layc...",
    amount: 453,
    status: "Completed",
  },
  {
    id: "0xE2B8A5F3D6C1E7B...",
    date: "2020-05-04 09:18:16",
    type: "Funding",
    description: "Funding received from @firstname to @layc...",
    amount: 563,
    status: "Failed",
  },
  {
    id: "0xD1F8C9B3E2A5D7B...",
    date: "2020-05-05 10:21:13",
    type: "Top Up",
    description: "Top up via Credit/Debit Card",
    amount: 429,
    status: "Failed",
  },
  {
    id: "0xD4F1B7C8A2E5D9B...",
    date: "2020-05-06 11:24:08",
    type: "Funding",
    description: "Funding received from @firstname to @layc...",
    amount: 426,
    status: "Completed",
  },
  {
    id: "0xC1A7B4E9D5F0C6...",
    date: "2020-05-03 08:14:01",
    type: "Funding",
    description: "Funding received from @firstname to @layc...",
    amount: 740,
    status: "Failed",
  },
  {
    id: "0xC7A9B1E8D3F2A5...",
    date: "2020-05-05 10:21:13",
    type: "Top Up",
    description: "Top up via QRIS",
    amount: 195,
    status: "Completed",
  },
  {
    id: "0xB9E3C6A5D1F8E2...",
    date: "2020-05-01 06:05:46",
    type: "Funding",
    description: "Funding received from @firstname to @layc...",
    amount: 536,
    status: "Completed",
  },
]

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

        <Button
          variant="outline"
          className="w-full md:w-auto bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-white rounded-lg px-4 py-2"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Report
        </Button>
      </div>

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
            <div className="px-4 py-3 bg-muted/30 flex items-center gap-3">
              <span className="text-xs font-semibold text-muted-foreground flex-1">Transaction ID</span>
              <span className="text-xs font-semibold text-muted-foreground">Date</span>
            </div>
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
    </div>
  )
}
