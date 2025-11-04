"use client"

import { useState } from "react"
import { TrendingUp } from "lucide-react"

export function PortfolioDetailChart() {
  const [timeframe, setTimeframe] = useState("1h")

  const timeframes = ["1m", "5m", "15m", "1h", "4h", "1d"]

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6">
      {/* Market Cap Info */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground mb-1">Market Cap</p>
        <div className="flex items-center gap-2">
          <span className="text-2xl md:text-3xl font-bold">$5.1K</span>
          <span className="flex items-center gap-1 text-green-500 text-sm font-semibold">
            <TrendingUp className="w-4 h-4" />
            8% 24hr
          </span>
        </div>
      </div>

      {/* Chart Controls */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        {/* Timeframe Buttons */}
        <div className="flex gap-1 bg-muted rounded-lg p-1">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 text-xs md:text-sm rounded transition-colors ${
                timeframe === tf
                  ? "bg-background text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        {/* Chart Type Icons */}
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-muted rounded transition-colors" title="Indicators">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </button>
          <button className="p-2 hover:bg-muted rounded transition-colors" title="Compare">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </button>
          <button className="p-2 hover:bg-muted rounded transition-colors" title="Settings">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Trading Info */}
      <div className="flex items-center gap-4 mb-4 text-xs md:text-sm flex-wrap">
        <div>
          <span className="text-muted-foreground">BTCUSDT</span>
          <span className="ml-2">1h</span>
        </div>
        <div>
          <span className="text-muted-foreground">Unfavap</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">O</span>
          <span className="text-green-500">0.0463</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">H</span>
          <span className="text-red-500">0.04987</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">L</span>
          <span className="text-yellow-500">0.0005</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">C</span>
          <span className="text-blue-500">0.0463</span>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="relative bg-muted/30 rounded-lg overflow-hidden" style={{ height: "300px" }}>
        {/* Candlestick Chart Placeholder */}
        <svg className="w-full h-full" viewBox="0 0 800 300" preserveAspectRatio="none">
          {/* Grid Lines */}
          <g stroke="currentColor" strokeWidth="0.5" opacity="0.1">
            {[0, 60, 120, 180, 240, 300].map((y) => (
              <line key={y} x1="0" y1={y} x2="800" y2={y} />
            ))}
          </g>

          {/* Candlesticks */}
          {/* Green candles */}
          <rect x="50" y="180" width="15" height="60" fill="#22c55e" />
          <line x1="57.5" y1="160" x2="57.5" y2="240" stroke="#22c55e" strokeWidth="2" />

          <rect x="100" y="140" width="15" height="80" fill="#22c55e" />
          <line x1="107.5" y1="120" x2="107.5" y2="220" stroke="#22c55e" strokeWidth="2" />

          <rect x="150" y="160" width="15" height="50" fill="#22c55e" />
          <line x1="157.5" y1="140" x2="157.5" y2="210" stroke="#22c55e" strokeWidth="2" />

          {/* Red candles */}
          <rect x="200" y="120" width="15" height="70" fill="#ef4444" />
          <line x1="207.5" y1="100" x2="207.5" y2="190" stroke="#ef4444" strokeWidth="2" />

          <rect x="250" y="140" width="15" height="60" fill="#ef4444" />
          <line x1="257.5" y1="120" x2="257.5" y2="200" stroke="#ef4444" strokeWidth="2" />

          {/* More green candles */}
          <rect x="300" y="170" width="15" height="50" fill="#22c55e" />
          <line x1="307.5" y1="150" x2="307.5" y2="220" stroke="#22c55e" strokeWidth="2" />

          <rect x="350" y="140" width="15" height="70" fill="#22c55e" />
          <line x1="357.5" y1="120" x2="357.5" y2="210" stroke="#22c55e" strokeWidth="2" />

          <rect x="400" y="120" width="15" height="80" fill="#22c55e" />
          <line x1="407.5" y1="100" x2="407.5" y2="200" stroke="#22c55e" strokeWidth="2" />

          {/* More red candles */}
          <rect x="450" y="100" width="15" height="90" fill="#ef4444" />
          <line x1="457.5" y1="80" x2="457.5" y2="190" stroke="#ef4444" strokeWidth="2" />

          <rect x="500" y="120" width="15" height="70" fill="#ef4444" />
          <line x1="507.5" y1="100" x2="507.5" y2="190" stroke="#ef4444" strokeWidth="2" />

          {/* Final green candles */}
          <rect x="550" y="140" width="15" height="60" fill="#22c55e" />
          <line x1="557.5" y1="120" x2="557.5" y2="200" stroke="#22c55e" strokeWidth="2" />

          <rect x="600" y="160" width="15" height="50" fill="#22c55e" />
          <line x1="607.5" y1="140" x2="607.5" y2="210" stroke="#22c55e" strokeWidth="2" />

          <rect x="650" y="150" width="15" height="60" fill="#22c55e" />
          <line x1="657.5" y1="130" x2="657.5" y2="210" stroke="#22c55e" strokeWidth="2" />

          <rect x="700" y="140" width="15" height="70" fill="#22c55e" />
          <line x1="707.5" y1="120" x2="707.5" y2="210" stroke="#22c55e" strokeWidth="2" />

          <rect x="750" y="130" width="15" height="80" fill="#22c55e" />
          <line x1="757.5" y1="110" x2="757.5" y2="210" stroke="#22c55e" strokeWidth="2" />
        </svg>

        {/* Time Labels */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-between px-4 text-xs text-muted-foreground">
          <span>09:00</span>
          <span>11:00</span>
          <span>13:00</span>
          <span>15:00</span>
          <span>17:00</span>
        </div>
      </div>

      {/* Volume Info */}
      <div className="mt-4 text-xs text-muted-foreground">
        <span>Volume 0.23M</span>
      </div>
    </div>
  )
}
