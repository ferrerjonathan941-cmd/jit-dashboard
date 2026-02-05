'use client'

import { Task } from '@/types/task'

interface StatsBarProps {
  tasks: Task[]
}

export function StatsBar({ tasks }: StatsBarProps) {
  const total = tasks.length
  const inProgress = tasks.filter(t => t.status === 'in_progress').length
  const completed = tasks.filter(t => t.status === 'completed').length
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0

  const stats = [
    { label: 'Total', value: total, color: 'text-white' },
    { label: 'Active', value: inProgress, color: 'text-yellow-400' },
    { label: 'Done', value: completed, color: 'text-green-400' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
      <div className="flex flex-wrap items-center gap-4 sm:gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-2">
            <span className={`text-xl sm:text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </span>
            <span className="text-gray-500 text-xs sm:text-sm">
              {stat.label}
            </span>
          </div>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <div className="w-20 sm:w-24 h-2 bg-[#2a2a35] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#ff5a2d] rounded-full transition-all"
              style={{ width: `${completionRate}%` }}
            />
          </div>
          <span className="text-gray-400 text-xs sm:text-sm">{completionRate}%</span>
        </div>
      </div>
    </div>
  )
}
