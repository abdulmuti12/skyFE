"use client"

import { useState } from "react"
import { Download, ChevronDown } from "lucide-react"

interface InvestorRecord {
  id: string
  investorName: string
  amount: string
  date: string
  paymentMethod: string
  status: "Completed"
}

const mockInvestors: InvestorRecord[] = [
  {
    id: "1",
    investorName: "Echoes of Tomorrow",
    amount: "28,900 USKY",
    date: "2020-05-01 06:05:46",
    paymentMethod: "USKY",
    status: "Completed",
  },
  {
    id: "2",
    investorName: "Dreambound",
    amount: "58,900 USKY",
    date: "2020-05-04 09:18:16",
    paymentMethod: "USKY",
    status: "Completed",
  },
  {
    id: "3",
    investorName: "Beyond the Horizon",
    amount: "51,420 USKY",
    date: "2020-05-03 08:14:01",
    paymentMethod: "USKY",
    status: "Completed",
  },
  {
    id: "4",
    investorName: "Neon Mirage",
    amount: "41,250 USKY",
    date: "2020-05-06 11:24:08",
    paymentMethod: "USKY",
    status: "Completed",
  },
  {
    id: "5",
    investorName: "Parallel Hearts",
    amount: "24,300 USKY",
    date: "2020-05-05 10:21:13",
    paymentMethod: "USKY",
    status: "Completed",
  },
  {
    id: "6",
    investorName: "Silent Verse",
    amount: "58,900 USKY",
    date: "2020-05-05 10:21:13",
    paymentMethod: "USKY",
    status: "Completed",
  },
  {
    id: "7",
    investorName: "Mirage Runner",
    amount: "36,250 USKY",
    date: "2020-05-02 07:10:15",
    paymentMethod: "USKY",
    status: "Completed",
  },
  {
    id: "8",
    investorName: "Moonlit Sonata",
    amount: "39,680 USKY",
    date: "2020-05-04 09:18:16",
    paymentMethod: "USKY",
    status: "Completed",
  },
  {
    id: "9",
    investorName: "Stardust Prophecy",
    amount: "63,200 USKY",
    date: "2020-05-06 11:24:08",
    paymentMethod: "USKY",
    status: "Completed",
  },
  {
    id: "10",
    investorName: "Crimson Shadows",
    amount: "51,420 USKY",
    date: "2020-05-04 09:18:16",
    paymentMethod: "USKY",
    status: "Completed",
  },
]

export function FundingDetailTable() {
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

  const totalPages = Math.ceil(mockInvestors.length / rowsPerPage)

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
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Funding Detail</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors">
          <Download className="w-4 h-4" />
          Export Data
        </button>
      </div>

      {mockInvestors.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 px-4">
          <h3 className="text-xl font-semibold mb-2">No Funding Yet</h3>
          <p className="text-sm text-muted-foreground text-center max-w-md">
            You haven't received any funding yet — once investors start contributing, all transactions will appear here.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto border border-border rounded-lg">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-3 text-left text-sm font-semibold">Investor Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Payment Method / Token</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockInvestors.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage).map((investor) => (
                  <tr key={investor.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 text-sm">{investor.investorName}</td>
                    <td className="px-4 py-3 text-sm">{investor.amount}</td>
                    <td className="px-4 py-3 text-sm">{investor.date}</td>
                    <td className="px-4 py-3 text-sm">{investor.paymentMethod}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span>{investor.status}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Table View with Accordion */}
          <div className="md:hidden divide-y divide-border border border-border rounded-lg overflow-hidden">
            <div className="px-4 py-3 bg-muted/30 flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground">Investor Name</span>
              <span className="text-xs font-semibold text-muted-foreground">Amount</span>
            </div>
            {mockInvestors.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage).map((investor) => {
              const isExpanded = expandedRows.has(investor.id)
              return (
                <div key={investor.id} className="border-b border-border last:border-b-0">
                  <div
                    className="px-4 py-3 flex items-center justify-between gap-3 hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => toggleRowExpansion(investor.id)}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <ChevronDown
                        className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">{investor.investorName}</p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground flex-shrink-0">{investor.amount}</span>
                  </div>

                  {isExpanded && (
                    <div className="px-4 pb-4 pt-2 bg-muted/20 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Date</span>
                        <span className="text-sm font-medium">{investor.date}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Payment Method</span>
                        <span className="text-sm font-medium">{investor.paymentMethod}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Status</span>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span className="text-sm font-medium">{investor.status}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 text-sm text-muted-foreground">
            <div>0 of 100 row(s) selected.</div>
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <span>Rows per page</span>
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value))
                  setCurrentPage(1)
                }}
                className="bg-muted border border-border rounded px-2 py-1 text-foreground"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span className="ml-4">
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex gap-1 ml-4">
                <button
                  className="p-1 hover:bg-muted rounded disabled:opacity-50"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(1)}
                >
                  ≪
                </button>
                <button
                  className="p-1 hover:bg-muted rounded disabled:opacity-50"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                >
                  ‹
                </button>
                <button
                  className="p-1 hover:bg-muted rounded disabled:opacity-50"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                >
                  ›
                </button>
                <button
                  className="p-1 hover:bg-muted rounded disabled:opacity-50"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(totalPages)}
                >
                  ≫
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
