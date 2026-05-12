export const LEVELS = [
  [0,   'Newcomer'],
  [30,  'Task Starter'],
  [80,  'Grinder'],
  [160, 'Focus Pro'],
  [300, 'Deep Worker'],
  [500, 'Flow Master'],
]

export function getLevel(points) {
  let best = LEVELS[0]; let idx = 0
  LEVELS.forEach(([threshold, label], i) => {
    if (points >= threshold) { best = [threshold, label]; idx = i }
  })
  return { num: idx + 1, label: best[1] }
}

export function deadlineStatus(task) {
  if (!task.deadline || task.done) return null
  const today = new Date(); today.setHours(0,0,0,0)
  const due   = new Date(task.deadline + 'T00:00:00')
  const diff  = Math.round((due - today) / 86400000)
  if (diff < 0)   return { type: 'overdue', label: `Overdue by ${Math.abs(diff)}d` }
  if (diff === 0) return { type: 'soon',    label: 'Due today' }
  if (diff === 1) return { type: 'soon',    label: 'Due tomorrow' }
  return { type: 'ok', label: `Due ${task.deadline}` }
}

export const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 }

export function sortTasks(tasks) {
  return [...tasks].sort((a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1
    return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
  })
}

export function filterTasks(tasks, filter) {
  return tasks.filter(task => {

    if (filter === 'all') return true
    if (filter === 'active') return !task.done
    if (filter === 'done') return task.done

    if (filter === 'overdue') {

      if (!task.deadline || !task.time || task.done)
        return false

      const taskDateTime = new Date(
        `${task.deadline}T${task.time}`
      )

      return taskDateTime < new Date()
    }

    return true
  })
}
