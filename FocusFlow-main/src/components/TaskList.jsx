import React, { useState } from 'react'
import TaskItem from './TaskItem'
import { sortTasks, filterTasks } from '../utils/helpers'

const FILTERS = [
  { key: 'all',     label: 'All' },
  { key: 'active',  label: 'Active' },
  { key: 'done',    label: 'Done' },
  { key: 'overdue', label: 'Overdue' },
]

export default function TaskList({ tasks, focusTaskId, onFocus, onDone, onDelete }) {
  const [filter, setFilter] = useState('all')

  const active  = tasks.filter(t => !t.done).length
  const visible = sortTasks(filterTasks(tasks, filter))

  return (
    <div>
      {/* handle section header */}
      <div className="flex items-center justify-between mb-3">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Tasks {active > 0 ? `(${active} remaining)` : ''}
        </div>
        <div className="flex gap-1.5">
          {FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={[
                'text-xs px-3 py-1 rounded-full border transition-all',
                filter === f.key
                  ? 'bg-brand-500 text-white border-brand-500'
                  : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:border-gray-400',
              ].join(' ')}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Task items */}
      <div className="flex flex-col gap-2">
        {visible.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-sm">
            <i className="ti ti-clipboard text-3xl block mb-2 opacity-40" />
            No tasks here. Add one above!
          </div>
        ) : (
          visible.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              isFocusing={focusTaskId !== null && task.id !== focusTaskId}
              onFocus={onFocus}
              onDone={onDone}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  )
}
