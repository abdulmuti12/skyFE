"use client"

import { useState } from "react"
import { MoreVertical, CheckCircle2, Clock } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

interface Film {
  id: string
  title: string
  category: string
  status: "Funding" | "Completed"
  releaseYear: number
  runningTime: string
}

const filmsData: Film[] = [
  {
    id: "1",
    title: "Echoes of Tomorrow",
    category: "Horror",
    status: "Funding",
    releaseYear: 1964,
    runningTime: "180 min",
  },
  {
    id: "2",
    title: "Dreambound",
    category: "Fantasy",
    status: "Completed",
    releaseYear: 2003,
    runningTime: "200 min",
  },
  {
    id: "3",
    title: "Beyond the Horizon",
    category: "Fantasy",
    status: "Completed",
    releaseYear: 2020,
    runningTime: "120 min",
  },
  {
    id: "4",
    title: "Neon Mirage",
    category: "Adventure",
    status: "Funding",
    releaseYear: 2016,
    runningTime: "180 min",
  },
  {
    id: "5",
    title: "Parallel Hearts",
    category: "Drama",
    status: "Funding",
    releaseYear: 2020,
    runningTime: "240 min",
  },
  {
    id: "6",
    title: "Silent Verse",
    category: "Drama",
    status: "Completed",
    releaseYear: 2011,
    runningTime: "60 min",
  },
  {
    id: "7",
    title: "Mirage Runner",
    category: "Sci-Fi",
    status: "Funding",
    releaseYear: 2019,
    runningTime: "180 min",
  },
  {
    id: "8",
    title: "Moonlit Sonata",
    category: "Horror",
    status: "Completed",
    releaseYear: 2019,
    runningTime: "120 min",
  },
  {
    id: "9",
    title: "Stardust Prophecy",
    category: "Romance",
    status: "Completed",
    releaseYear: 2008,
    runningTime: "200 min",
  },
  {
    id: "10",
    title: "Crimson Shadows",
    category: "Romance",
    status: "Funding",
    releaseYear: 2020,
    runningTime: "200 min",
  },
]

export function FilmTable() {
  const itemsPerPage = 10
  const totalPages = Math.ceil(filmsData.length / itemsPerPage)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())

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
                        variant="ghost"
                        size="sm"
                        className="h-10 w-10 p-0 bg-[#FFC107] hover:bg-[#FFD54F] rounded-full flex items-center justify-center"
                      >
                        <MoreVertical className="w-5 h-5" style={{ color: "white", stroke: "white" }} />
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
            <input
              type="checkbox"
              checked={selectedRows.size === currentFilms.length && currentFilms.length > 0}
              onChange={toggleAllSelection}
              className="rounded border-border cursor-pointer"
            />
            <span className="text-xs font-semibold text-muted-foreground flex-1">Title</span>
            <span className="text-xs font-semibold text-muted-foreground">Category</span>
          </div>
          {currentFilms.map((film) => (
            <div
              key={film.id}
              className="px-4 py-3 flex items-center justify-between gap-3 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <input
                  type="checkbox"
                  checked={selectedRows.has(film.id)}
                  onChange={() => toggleRowSelection(film.id)}
                  className="rounded border-border cursor-pointer flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{film.title}</p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground flex-shrink-0">{film.category}</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-10 w-10 p-0 bg-[#FFC107] hover:bg-[#FFD54F] rounded-full flex items-center justify-center !text-white flex-shrink-0"
                  >
                    <MoreVertical className="w-5 h-5 !text-white" />
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
            </div>
          ))}
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
