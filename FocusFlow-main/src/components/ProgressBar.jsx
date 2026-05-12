import React from 'react'

export default function ProgressBar({ tasks }) {
  const done  = tasks.filter(t => t.done).length
  const total = tasks.length
  const pct   = total > 0 ? Math.round((done / total) * 100) : 0

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl px-5 py-4 mb-5">
      <div className="flex justify-between items-center mb-2.5">
        <span className="text-sm text-gray-400">Daily progress</span>
        <span className="text-sm font-medium">{done} / {total} tasks</span>
      </div>
      <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-brand-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
