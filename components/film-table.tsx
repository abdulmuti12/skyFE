"use client"

import { useState } from "react"
import { MoreVertical, CheckCircle2, Clock, ChevronDown, Plus } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import filmsData from "@/data/film-table.json"
import Link from "next/link"

interface Film {
  id: string
  title: string
  category: string
  status: "Funding" | "Completed"
  releaseYear: number
  runningTime: string
}

export function FilmTable() {
  const itemsPerPage = 10
  const totalPages = Math.ceil(filmsData.length / itemsPerPage)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

  if (filmsData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">No Films Added Yet</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          Start your first film project and begin your funding journey today.
        </p>
        <Link href="/creator/film/create">
          <Button className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold rounded-full px-6 py-3 gap-2 transition-colors">
            <Plus className="w-5 h-5" />
            Create Film
          </Button>
        </Link>
      </div>
    )
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentFilms = filmsData.slice(startIndex, endIndex)

  const toggleRowSelection = (id: string) => {
    const newSelected = new Set(selectedRows)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedRows(newSelected)
  }

  const toggleAllSelection = () => {
    if (selectedRows.size === currentFilms.length) {
      setSelectedRows(new Set())
    } else {
      setSelectedRows(new Set(currentFilms.map((f) => f.id)))
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

  const StatusBadge = ({ status }: { status: "Funding" | "Completed" }) => {
    if (status === "Completed") {
      return (
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-green-500" />
          <span className="text-sm font-medium text-green-500">Completed</span>
        </div>
      )
    }
    return (
      <div className="flex items-center gap-1.5">
        <Clock className="w-4 h-4 text-blue-500" />
        <span className="text-sm font-medium text-blue-500">Funding</span>
      </div>
    )
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border hover:bg-transparent">
              <TableHead className="text-foreground font-semibold">Title</TableHead>
              <TableHead className="text-foreground font-semibold">Category</TableHead>
              <TableHead className="text-foreground font-semibold">Status</TableHead>
              <TableHead className="text-foreground font-semibold">Release Year</TableHead>
              <TableHead className="text-foreground font-semibold">Running Time</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentFilms.map((film) => (
              <TableRow key={film.id} className="border-b border-border hover:bg-muted/50">
                <TableCell className="font-medium">{film.title}</TableCell>
                <TableCell className="text-muted-foreground">{film.category}</TableCell>
                <TableCell>
                  <StatusBadge status={film.status} />
                </TableCell>
                <TableCell className="text-muted-foreground">{film.releaseYear}</TableCell>
                <TableCell className="text-muted-foreground">{film.runningTime}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="sm"
                        className="h-10 w-10 p-0 bg-transparent hover:bg-muted/50 border-none shadow-none focus:ring-0 focus:outline-none"
                      >
                        <MoreVertical className="w-5 h-5 text-foreground" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem>View Movie Details</DropdownMenuItem>
                      <DropdownMenuItem>View Funding Details</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Withdraw Funds</DropdownMenuItem>
                      <DropdownMenuItem>Share Campaign</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Edit Film Info</DropdownMenuItem>
                      <DropdownMenuItem variant="destructive">Delete Film</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Table */}
      <div className="md:hidden">
        <div className="divide-y divide-border">
          <div className="px-4 py-3 bg-muted/30 flex items-center gap-3">
            <span className="text-xs font-semibold text-muted-foreground flex-1">Title</span>
            <span className="text-xs font-semibold text-muted-foreground mr-12">Category</span>
          </div>
          {currentFilms.map((film) => {
            const isExpanded = expandedRows.has(film.id)
            return (
              <div key={film.id} className="border-b border-border last:border-b-0">
                <div
                  className="px-4 py-3 flex items-center justify-between gap-3 hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => toggleRowExpansion(film.id)}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <ChevronDown
                      className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{film.title}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground flex-shrink-0 mr-2">{film.category}</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="sm"
                        className="h-10 w-10 p-0 bg-transparent hover:bg-muted/50 border-none shadow-none focus:ring-0 focus:outline-none"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="w-5 h-5 text-white" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem>View Movie Details</DropdownMenuItem>
                      <DropdownMenuItem>View Funding Details</DropdownMenuItem>
                      <DropdownMenuItem>Withdraw Funds</DropdownMenuItem>
                      <DropdownMenuItem>Share Campaign</DropdownMenuItem>
                      <DropdownMenuItem>Edit Film Info</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive focus:text-destructive">
                        Delete Film
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {isExpanded && (
                  <div className="px-4 pb-4 pt-2 bg-muted/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Status</span>
                      <StatusBadge status={film.status} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Release Year</span>
                      <span className="text-sm font-medium">{film.releaseYear}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Running Time</span>
                      <span className="text-sm font-medium">{film.runningTime}</span>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 border-t border-border text-xs sm:text-sm text-muted-foreground gap-3 sm:gap-4">
        <span className="hidden lg:block">
          {selectedRows.size} of {filmsData.length} row(s) selected.
        </span>

        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 flex-wrap justify-center sm:justify-start">
          <span className="hidden lg:block">Rows per page</span>
          <select
            className="bg-muted border border-border rounded px-2 py-1 text-foreground text-xs sm:text-sm"
            value={itemsPerPage}
            disabled
          >
            <option>{itemsPerPage}</option>
          </select>

          <span className="text-xs sm:text-sm">
            Page {currentPage} of {totalPages}
          </span>

          <div className="flex gap-1 sm:gap-2">
            <button
              className="p-1 hover:bg-muted rounded text-xs sm:text-sm disabled:opacity-50 transition-colors"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              ‹
            </button>
            <button
              className="p-1 hover:bg-muted rounded text-xs sm:text-sm disabled:opacity-50 transition-colors"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
