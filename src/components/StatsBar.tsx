'use client'

import { Task } from '@/types/task'

interface StatsBarProps {
  tasks: Task[]
  isConnected: boolean
}

export function StatsBar({ tasks, isConnected }: StatsBarProps) {
  const total = tasks.length
  const inProgress = tasks.filter(t => t.status === 'in_progress').length
  const completed = tasks.filter(t => t.status === 'completed').length
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0

  return (
    <div className="flex items-center gap-8 mb-6">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
        <span className="text-gray-400 text-sm">
          {isConnected ? 'Live' : 'Disconnected'}
        </span>
      </div>
      <div>
        <span className="text-2xl font-bold text-white">{total}</span>
        <span className="text-gray-500 ml-2">Total</span>
      </div>
      <div>
        <span className="text-2xl font-bold text-yellow-500">{inProgress}</span>
        <span className="text-gray-500 ml-2">In Progress</span>
      </div>
      <div>
        <span className="text-2xl font-bold text-green-500">{completionRate}%</span>
        <span className="text-gray-500 ml-2">Complete</span>
      </div>
    </div>
  )
}
