import React, { useState } from 'react'
import { getLevel } from '../utils/helpers'

export default function Header({ points, darkMode, onToggleDark, onReset }) {
  const [confirm, setConfirm] = useState(false)
  const lv = getLevel(points)

  function handleReset() {
    if (!confirm) {
      setConfirm(true)
      setTimeout(() => setConfirm(false), 3000)
    } else {
      onReset()
      setConfirm(false)
    }
  }

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center">
          <i className="ti ti-bolt text-xl text-brand-50" />
        </div>
        <div>
          <div className="text-lg font-semibold tracking-tight">FocusFlow</div>
          <div className="text-xs text-gray-400">Your productivity, leveled up</div>
        </div>
      </div>

      <div className="flex items-center gap-2">

        {/* Reset button */}
        <button
          onClick={handleReset}
          title="Reset everything"
          className={[
            'text-xs px-3 py-1.5 rounded-lg border transition-all font-medium',
            confirm
              ? 'bg-red-500 text-white border-red-500 animate-pulse'
              : 'border-gray-200 dark:border-gray-700 text-gray-400 hover:bg-red-50 hover:text-red-500 hover:border-red-300',
          ].join(' ')}
        >
          {confirm ? '⚠️ Sure? Click again' : '🗑️ Reset'}
        </button>

        {/* Dark mode toggle */}
        <button
          onClick={onToggleDark}
          title="Toggle dark mode"
          className="w-9 h-9 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
        >
          <i className={`ti ${darkMode ? 'ti-sun' : 'ti-moon'} text-base`} />
        </button>

        {/* Level badge */}
        <div className="text-sm font-medium text-brand-500 bg-brand-50 dark:bg-brand-900 dark:text-brand-100 px-4 py-1.5 rounded-full transition-all">
          Lv {lv.num} · {lv.label}
        </div>

      </div>
    </div>
  )
}