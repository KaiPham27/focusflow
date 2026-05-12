import React, { useState } from 'react'

export default function AddTaskForm({ onAdd }) {
  const [name, setName] = useState('')
  const [priority, setPriority] = useState('')
  const [deadline, setDeadline] = useState('')
  const [time, setTime] = useState('')
  const [errors, setErrors] = useState({})
  const [aiLoading, setAiLoading] = useState(false)
  const [aiSuggestion, setAiSuggestion] = useState(null)

  // ─ Validation ─
  function validate() {
    const newErrors = {}

    if (!name.trim())
      newErrors.name = 'Please enter a task name.'

    if (!priority)
      newErrors.priority =
        "Bro really submitted without picking a priority 💀 pick one!"

    if (!deadline) {
      newErrors.deadline =
        "You forgot the date! When is this due? 📅"
    } else {
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const picked = new Date(deadline + 'T00:00:00')

      if (picked < today)
        newErrors.deadline =
          "That date already passed 💀 pick a future date!"
    }

    if (!time) {
      newErrors.time =
        "What time is it due? Don't leave me guessing ⏰"
    } else if (deadline) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const picked = new Date(deadline + 'T00:00:00')
      const isToday = picked.getTime() === today.getTime()

      if (isToday) {
        const [h, m] = time.split(':')

        const now = new Date()

        const pickedTime = new Date()
        pickedTime.setHours(parseInt(h), parseInt(m), 0, 0)

        if (pickedTime < now)
          newErrors.time =
            "That time already passed today ⏰ pick a future time!"
      }
    }

    return newErrors
  }

  // ─ Submit ─
  function handleSubmit(e) {
    e.preventDefault()

    const found = validate()

    setErrors(found)

    if (Object.keys(found).length > 0) return

    onAdd({
      name: name.trim(),
      priority,
      deadline,
      time,
    })

    setName('')
    setPriority('')
    setDeadline('')
    setTime('')
    setErrors({})
    setAiSuggestion(null)
  }

  // ─ AI Suggestion ─
  async function handleAISuggest() {
    if (!name.trim()) {
      setErrors(p => ({
        ...p,
        name: 'Please enter a task name first so AI can suggest.',
      }))
      return
    }

    setAiLoading(true)
    setAiSuggestion(null)

    try {
      const today = new Date().toISOString().slice(0, 10)

      const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyB26ksLaFbSz4064kyB4E6PelxYz50hmDU',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `
Today is ${today}.

The user task is:
"${name}"

Analyze this task and suggest:

1. Priority level (high, medium, low)
2. A deadline date (YYYY-MM-DD)
3. A time (HH:MM 24hr)
4. A short funny reason

Respond ONLY as JSON.

Example:
{
  "priority":"high",
  "deadline":"2026-05-10",
  "time":"14:00",
  "reason":"Your future self will panic if this gets delayed 💀"
}
`,
                  },
                ],
              },
            ],
          }),
        }
      )

      const data = await response.json()
      console.log(data)
      console.log(text)
      console.log(clean)
      console.log(data)

      const text =
        data.candidates?.[0]?.content?.parts?.[0]?.text || ''

      const clean = text
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim()

      let parsed

      try {
        parsed = JSON.parse(clean)
      } catch {
        throw new Error('Invalid AI response')
      }

      const allowed = ['high', 'medium', 'low']

      if (!allowed.includes(parsed.priority)) {
        parsed.priority = 'medium'
      }

      setAiSuggestion(parsed)

    } catch (err) {
      console.error(err)

      setAiSuggestion({
        error: "AI couldn't think right now 😵 try again!",
      })
    }

    setAiLoading(false)
  }

  // ─ Apply AI Suggestion ─
  function applyAISuggestion() {
    if (!aiSuggestion || aiSuggestion.error) return

    setPriority(aiSuggestion.priority)
    setDeadline(aiSuggestion.deadline)
    setTime(aiSuggestion.time)

    setErrors({})
    setAiSuggestion(null)
  }

  const inputCls = hasError =>
    [
      'text-sm px-3 py-2 rounded-lg outline-none transition-all',
      'bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100',
      hasError
        ? 'border border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-400/20'
        : 'border border-gray-200 dark:border-gray-700 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20',
    ].join(' ')

  const PRIORITY_EMOJI = {
    high: '🔴',
    medium: '🟡',
    low: '🟢',
  }

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-4 mb-5">

      {/* Header */}
      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
        New task
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3"
      >

        {/* Task Name */}
        <div className="flex flex-col gap-1">

          <div className="flex gap-2">

            <input
              type="text"
              value={name}
              onChange={e => {
                setName(e.target.value)
                setErrors(p => ({ ...p, name: '' }))
                setAiSuggestion(null)
              }}
              placeholder="What do you need to do?"
              maxLength={80}
              className={`${inputCls(errors.name)} flex-1`}
            />

            <button
              type="button"
              onClick={handleAISuggest}
              disabled={aiLoading || !name.trim()}
              className="flex items-center gap-1.5 px-3 py-2 text-sm bg-brand-50 dark:bg-brand-900/40 text-brand-500 border border-brand-200 dark:border-brand-800 rounded-lg hover:bg-brand-100 active:scale-95 transition-all font-medium whitespace-nowrap disabled:opacity-50"
            >
              {aiLoading ? (
                <>
                  <i className="ti ti-loader-2 animate-spin" />
                  Thinking...
                </>
              ) : (
                <>
                  <i className="ti ti-sparkles" />
                  AI Suggest
                </>
              )}
            </button>

          </div>

          {errors.name && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <i className="ti ti-alert-circle text-[12px]" />
              {errors.name}
            </p>
          )}

        </div>

        {/* AI Suggestion Card */}
        {aiSuggestion && !aiSuggestion.error && (
          <div className="bg-brand-50 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-800 rounded-lg p-3 flex flex-col gap-2 animate-fadein">

            <div className="text-xs font-semibold text-brand-500 uppercase tracking-wider">
              ✨ AI Suggestion
            </div>

            <div className="flex items-center gap-3 flex-wrap text-sm">

              <span>
                {PRIORITY_EMOJI[aiSuggestion.priority]}{' '}
                <strong>{aiSuggestion.priority}</strong> priority
              </span>

              <span>
                📅 {aiSuggestion.deadline}
              </span>

              <span>
                ⏰ {(() => {
                  const [h, m] = aiSuggestion.time.split(':')
                  const hour = parseInt(h)

                  const ampm = hour >= 12 ? 'PM' : 'AM'
                  const h12 = hour % 12 || 12

                  return `${h12}:${m} ${ampm}`
                })()}
              </span>

            </div>

            <div className="text-xs text-gray-500 italic">
              "{aiSuggestion.reason}"
            </div>

            <div className="flex gap-2">

              <button
                type="button"
                onClick={applyAISuggestion}
                className="text-xs px-3 py-1.5 bg-brand-500 text-white rounded-lg hover:bg-brand-700 transition-all font-medium"
              >
                ✅ Apply suggestion
              </button>

              <button
                type="button"
                onClick={() => setAiSuggestion(null)}
                className="text-xs px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                Dismiss
              </button>

            </div>

          </div>
        )}

        {/* AI Error */}
        {aiSuggestion?.error && (
          <p className="text-xs text-red-500 flex items-center gap-1">
            <i className="ti ti-alert-circle text-[12px]" />
            {aiSuggestion.error}
          </p>
        )}

        {/* Priority */}
        <div className="flex flex-col gap-1">

          <select
            value={priority}
            onChange={e => {
              setPriority(e.target.value)
              setErrors(p => ({ ...p, priority: '' }))
            }}
            className={`${inputCls(errors.priority)} w-full cursor-pointer`}
          >
            <option value="" disabled hidden>
              ⚪ Pick one... or regret it later
            </option>

            <option value="high">
              🔴 High - your future self is begging you
            </option>

            <option value="medium">
              🟡 Medium - not on fire yet, but getting warm
            </option>

            <option value="low">
              🟢 Low - maybe someday, probably never
            </option>

          </select>

          {errors.priority && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <i className="ti ti-alert-circle text-[12px]" />
              {errors.priority}
            </p>
          )}

        </div>

        {/* Date + Time */}
        <div className="flex gap-2">

          <div className="flex flex-col gap-1 flex-1">

            <input
              type="date"
              value={deadline}
              onChange={e => {
                setDeadline(e.target.value)
                setErrors(p => ({
                  ...p,
                  deadline: '',
                  time: '',
                }))
              }}
              className={`${inputCls(errors.deadline)} w-full`}
              style={{ colorScheme: 'light dark' }}
            />

            {errors.deadline && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <i className="ti ti-alert-circle text-[12px]" />
                {errors.deadline}
              </p>
            )}

          </div>

          <div className="flex flex-col gap-1">

            <input
              type="time"
              value={time}
              onChange={e => {
                setTime(e.target.value)
                setErrors(p => ({ ...p, time: '' }))
              }}
              className={`${inputCls(errors.time)} w-32`}
              style={{ colorScheme: 'light dark' }}
            />

            {errors.time && (
              <p className="text-xs text-red-500 flex items-center gap-1 w-32">
                <i className="ti ti-alert-circle text-[12px]" />
                {errors.time}
              </p>
            )}

          </div>

        </div>

        {/* Submit */}
        <button
          type="submit"
          className="flex items-center justify-center gap-1.5 px-4 py-2 text-sm bg-brand-500 text-white rounded-lg hover:bg-brand-700 active:scale-95 transition-all font-medium"
        >
          <i className="ti ti-plus" />
          Add task
        </button>

      </form>

    </div>
  )
}