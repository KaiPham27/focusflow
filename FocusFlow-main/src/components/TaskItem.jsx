import React from 'react'
import { deadlineStatus } from '../utils/helpers'

const PRIORITY_BORDER = {
  high:   'border-l-red-500',
  medium: 'border-l-amber-400',
  low:    'border-l-green-500',
}

const PRIORITY_BADGE = {
  high:   'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300',
  medium: 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300',
  low:    'bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300',
}

const PRIORITY_LABEL = { high: 'High', medium: 'Medium', low: 'Low' }

function formatTime(time) {
  const [h, m] = time.split(':')
  const hour = parseInt(h)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const h12  = hour % 12 || 12
  return `${h12}:${m} ${ampm}`
}

export default function TaskItem({ task, isFocusing, onFocus, onDone, onDelete }) {
  const status    = deadlineStatus(task)
  const isOverdue = status?.type === 'overdue' && !task.done

  return (
    <div className={[
      'flex items-start gap-3 px-4 py-3 rounded-xl border-l-[3px] transition-all animate-fadein',
      'bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800',
      PRIORITY_BORDER[task.priority],
      task.done    ? 'opacity-50' : '',
      isFocusing   ? 'opacity-30 pointer-events-none' : '',
      isOverdue    ? '!bg-red-50 dark:!bg-red-950/30 !border-red-200 dark:!border-red-900' : '',
    ].filter(Boolean).join(' ')}>

      {/* Main */}
      <div className="flex-1 min-w-0">
        <div className={`text-sm font-medium mb-1 break-words ${task.done ? 'line-through text-gray-400' : ''}`}>
          {task.name}
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">

          {/* Priority */}
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${PRIORITY_BADGE[task.priority]}`}>
            {PRIORITY_LABEL[task.priority]}
          </span>

          {/* Deadline */}
          {status && (
            <span className={[
              'text-xs px-2 py-0.5 rounded-full flex items-center gap-1',
              status.type === 'overdue' ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300' :
              status.type === 'soon'    ? 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300' :
                                         'bg-gray-100 dark:bg-gray-800 text-gray-500',
            ].join(' ')}>
              <i className="ti ti-calendar text-[11px]" />
              {status.label}
            </span>
          )}

          {/* Time */}
          {task.time && !task.done && (
            <span className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1 bg-gray-100 dark:bg-gray-800 text-gray-500">
              <i className="ti ti-clock text-[11px]" />
              {formatTime(task.time)}
            </span>
          )}

        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-1.5 shrink-0">
        {!task.done && (
          <>
            <button
              onClick={() => onFocus(task.id)}
              title="Start focus session"
              className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:bg-brand-50 hover:text-brand-500 hover:border-brand-400 transition-all"
            >
              <i className="ti ti-player-play text-sm" />
            </button>
            <button
              onClick={() => onDone(task.id)}
              title="Mark done"
              className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:bg-green-50 hover:text-green-600 hover:border-green-400 transition-all"
            >
              <i className="ti ti-check text-sm" />
            </button>
          </>
        )}
        <button
          onClick={() => onDelete(task.id)}
          title="Delete task"
          className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 hover:border-red-400 transition-all"
        >
          <i className="ti ti-trash text-sm" />
        </button>
      </div>
    </div>
  )
}