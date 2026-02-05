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
    { label: 'Total Tasks', value: total, color: 'text-white', subtext: 'active' },
    { label: 'In Progress', value: inProgress, color: 'text-yellow-400', subtext: 'working' },
    { label: 'Completed', value: completed, color: 'text-green-400', subtext: 'done' },
    { label: 'Progress', value: `${completionRate}%`, color: 'text-[#ff5a2d]', subtext: completionRate >= 75 ? 'excellent' : completionRate >= 50 ? 'good' : 'getting there' }
  ]

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div 
            key={stat.label}
            className="bg-[#111118] border border-[#2a2a35] rounded-xl p-5 hover:border-[#3a3a45] transition-all group"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-2">
              {stat.label}
            </p>
            <div className="flex items-end justify-between">
              <span className={`text-3xl font-bold ${stat.color}`}>
                {stat.value}
              </span>
              <span className="text-gray-600 text-xs group-hover:text-gray-500 transition-colors">
                {stat.subtext}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
