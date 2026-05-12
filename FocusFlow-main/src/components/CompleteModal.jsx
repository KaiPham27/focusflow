import React from 'react'

export default function CompleteModal({ taskName, onYes, onNo }) {
  return (
    <div className="fixed inset-0 bg-black/35 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-7 max-w-sm w-[90%] text-center animate-popin">
        <i className="ti ti-trophy text-4xl text-brand-500 block mb-3" />
        <div className="text-lg font-semibold mb-1.5">Focus session done!</div>
        <div className="text-sm text-gray-400 mb-6">
          Did you finish{taskName ? ` "${taskName}"` : ' the task'}?
        </div>
        <div className="flex gap-2 justify-center">
          <button
            onClick={onNo}
            className="px-5 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Not yet
          </button>
          <button
            onClick={onYes}
            className="px-5 py-2 text-sm bg-brand-500 text-white rounded-lg hover:bg-brand-700 transition-colors"
          >
            Yes, mark done ✓
          </button>
        </div>
      </div>
    </div>
  )
}
