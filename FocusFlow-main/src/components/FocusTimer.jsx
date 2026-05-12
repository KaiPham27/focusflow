import React from 'react'

export default function FocusTimer({ taskName, display, pct, onStop, onDone }) {
  return (
    <div className="bg-brand-50 dark:bg-brand-900/30 border-2 border-brand-500 rounded-xl p-5 mb-5 animate-slidedown">
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-brand-500 text-brand-50 text-xs font-semibold px-3 py-1 rounded-full tracking-wide">
          ⚡ FOCUS MODE
        </span>
        <span className="text-sm font-medium text-brand-700 dark:text-brand-100 truncate">{taskName}</span>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="text-4xl font-bold text-brand-500 tabular-nums tracking-tight min-w-[100px]">
          {display}
        </div>
        <div className="flex-1 h-1.5 bg-brand-200 dark:bg-brand-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-500 rounded-full transition-all duration-1000 linear"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onStop}
          className="flex items-center gap-1.5 px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <i className="ti ti-player-stop" /> Stop
        </button>
        <button
          onClick={onDone}
          className="flex items-center gap-1.5 px-4 py-2 text-sm bg-brand-500 text-white rounded-lg hover:bg-brand-700 transition-colors"
        >
          <i className="ti ti-check" /> Mark complete
        </button>
      </div>
    </div>
  )
}
