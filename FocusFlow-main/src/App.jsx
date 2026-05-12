import React, { useState, useCallback, useEffect } from 'react'
import Header        from './components/Header'
import StatsRow      from './components/StatsRow'
import ProgressBar   from './components/ProgressBar'
import FocusTimer    from './components/FocusTimer'
import AddTaskForm   from './components/AddTaskForm'
import TaskList      from './components/TaskList'
import CompleteModal from './components/CompleteModal'
import Toast, { useToast } from './components/Toast'
import { useLocalStorage }  from './hooks/useLocalStorage'
import { useFocusTimer }    from './hooks/useFocusTimer'

const SEED_TASKS = () => {
  const fmt = d => d.toISOString().slice(0, 10)
  const today     = new Date()
  const tomorrow  = new Date(today); tomorrow.setDate(today.getDate() + 1)
  const yesterday = new Date(today); yesterday.setDate(today.getDate() - 1)
  return [
    { id: 1, name: 'Review project brief',   priority: 'high',   deadline: fmt(yesterday), time: '', done: false },
    { id: 2, name: 'Write introduction',     priority: 'medium', deadline: fmt(tomorrow),  time: '', done: false },
    { id: 3, name: 'Reply to team messages', priority: 'low',    deadline: '',             time: '', done: true  },
  ]
}

export default function App() {
  const [tasks,     setTasks]     = useLocalStorage('focusflow_tasks',  SEED_TASKS())
  const [nextId,    setNextId]    = useLocalStorage('focusflow_nextid', 4)
  const [points,    setPoints]    = useLocalStorage('focusflow_points', 0)
  const [darkMode,  setDarkMode]  = useLocalStorage('focusflow_dark',   false)
  const [showModal, setShowModal] = useState(false)

  const { message, visible, showToast } = useToast()

  // Apply dark mode to <html> 
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  // Focus timer - off when countdown hits 0
  const { focusTaskId, display, pct, start, stop, isActive } = useFocusTimer(() => {
    setShowModal(true)
  })

  // Reset everything
  function handleReset() {
    setTasks([])
    setNextId(1)
    setPoints(0)
    if (isActive) stop()
    showToast('Everything wiped. Fresh start! 🧹')
  }

  // Task actions
  function handleAdd({ name, priority, deadline, time }) {
    setTasks(prev => [...prev, { id: nextId, name, priority, deadline, time, done: false }])
    setNextId(n => n + 1)
    showToast('Task added!')
  }

  const handleDone = useCallback((id, fromFocus = false) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: true } : t))
    setPoints(p => p + 10)
    if (fromFocus) stop()
    showToast('+10 points! Keep going 🔥')
  }, [stop])

  function handleDelete(id) {
    if (focusTaskId === id) stop()
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  function handleFocus(id) {
    if (isActive) return
    start(id)
    const task = tasks.find(t => t.id === id)
    showToast(`Focus started — 25 minutes on: ${task?.name}`)
  }

  // Modal responses
  function handleModalYes() {
    setShowModal(false)
    if (focusTaskId) handleDone(focusTaskId, true)
  }

  function handleModalNo() {
    setShowModal(false)
    stop()
  }

  const focusTask = tasks.find(t => t.id === focusTaskId)

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Header
        points={points}
        darkMode={darkMode}
        onToggleDark={() => setDarkMode(d => !d)}
        onReset={handleReset}
      />
      <StatsRow tasks={tasks} points={points} />
      <ProgressBar tasks={tasks} />

      {isActive && (
        <FocusTimer
          taskName={focusTask?.name ?? ''}
          display={display}
          pct={pct}
          onStop={stop}
          onDone={() => focusTaskId && handleDone(focusTaskId, true)}
        />
      )}

      <AddTaskForm onAdd={handleAdd} />

      <TaskList
        tasks={tasks}
        focusTaskId={focusTaskId}
        onFocus={handleFocus}
        onDone={id => handleDone(id)}
        onDelete={handleDelete}
      />

      {showModal && (
        <CompleteModal
          taskName={focusTask?.name}
          onYes={handleModalYes}
          onNo={handleModalNo}
        />
      )}

      <Toast message={message} visible={visible} />
    </div>
  )
}