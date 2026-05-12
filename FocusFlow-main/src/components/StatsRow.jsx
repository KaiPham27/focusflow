import React from 'react'

function StatCard({ label, value, colorClass }) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-3">
      <div className="text-xs text-gray-400 mb-0.5">{label}</div>
      <div className={`text-2xl font-semibold ${colorClass}`}>{value}</div>
    </div>
  )
}

export default function StatsRow({ tasks, points }) {
  const done = tasks.filter(t => t.done).length
  const left = tasks.filter(t => !t.done).length

  return (
    <div className="grid grid-cols-3 gap-2.5 mb-5">
      <StatCard label="Completed today" value={done} colorClass="text-brand-500" />
      <StatCard label="Remaining"       value={left} colorClass="text-amber-600" />
      <StatCard label="Points earned"   value={points} colorClass="text-green-700" />
    </div>
  )
}
