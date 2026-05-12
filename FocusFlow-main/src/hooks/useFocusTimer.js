import { useState, useEffect, useRef, useCallback } from 'react'

const FOCUS_SECONDS = 25 * 60

export function useFocusTimer(onComplete) {
  const [focusTaskId, setFocusTaskId] = useState(null)
  const [seconds, setSeconds] = useState(FOCUS_SECONDS)
  const intervalRef = useRef(null)

  const clear = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = null
  }

  const start = useCallback((id) => {
    if (focusTaskId !== null) return
    setFocusTaskId(id)
    setSeconds(FOCUS_SECONDS)
  }, [focusTaskId])

  const stop = useCallback(() => {
    clear()
    setFocusTaskId(null)
    setSeconds(FOCUS_SECONDS)
  }, [])

  useEffect(() => {
    if (focusTaskId === null) return
    intervalRef.current = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) {
          clear()
          onComplete()
          return 0
        }
        return s - 1
      })
    }, 1000)
    return clear
  }, [focusTaskId])

  const minutes = Math.floor(seconds / 60)
  const secs    = seconds % 60
  const display = `${String(minutes).padStart(2,'0')}:${String(secs).padStart(2,'0')}`
  const pct     = Math.round((seconds / FOCUS_SECONDS) * 100)

  return { focusTaskId, display, pct, start, stop, isActive: focusTaskId !== null }
}
