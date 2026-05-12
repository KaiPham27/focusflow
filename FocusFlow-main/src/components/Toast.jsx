import React, { useEffect, useState } from 'react'

export function useToast() {
  const [message, setMessage] = useState('')
  const [visible, setVisible] = useState(false)

  function showToast(msg) {
    setMessage(msg)
    setVisible(true)
  }

  useEffect(() => {
    if (!visible) return
    const t = setTimeout(() => setVisible(false), 2500)
    return () => clearTimeout(t)
  }, [visible, message])

  return { message, visible, showToast }
}

export default function Toast({ message, visible }) {
  return (
    <div className={[
      'fixed bottom-8 left-1/2 -translate-x-1/2 z-50',
      'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900',
      'text-sm font-medium px-5 py-2.5 rounded-full shadow-lg',
      'transition-opacity duration-300 pointer-events-none',
      visible ? 'opacity-100' : 'opacity-0',
    ].join(' ')}>
      {message}
    </div>
  )
}
