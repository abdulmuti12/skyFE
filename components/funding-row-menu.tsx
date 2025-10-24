"use client"

interface FundingRowMenuProps {
  onClose: () => void
}

export function FundingRowMenu({ onClose }: FundingRowMenuProps) {
  return (
    <div className="absolute right-0 top-full mt-1 bg-muted border border-border rounded-lg shadow-lg z-10 min-w-48">
      <button
        onClick={onClose}
        className="w-full text-left px-4 py-2 text-sm hover:bg-muted-foreground/10 transition-colors first:rounded-t-lg"
      >
        See Funding Details
      </button>
      <button
        onClick={onClose}
        className="w-full text-left px-4 py-2 text-sm hover:bg-muted-foreground/10 transition-colors"
      >
        Withdraw Funds
      </button>
      <button
        onClick={onClose}
        className="w-full text-left px-4 py-2 text-sm hover:bg-muted-foreground/10 transition-colors last:rounded-b-lg"
      >
        Share Campaign
      </button>
    </div>
  )
}
