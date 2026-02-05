'use client'

import { Task, TaskStatus } from '@/types/task'
import { TaskCard } from './TaskCard'

interface TaskColumnProps {
  title: string
  status: TaskStatus
  tasks: Task[]
  onStatusChange: (id: string, status: TaskStatus) => void
  onDelete: (id: string) => void
}

const columnConfig = {
  backlog: { 
    label: 'Backlog', 
    color: 'bg-gray-500',
    bg: 'bg-[#1a1a24]',
  },
  in_progress: { 
    label: 'In Progress', 
    color: 'bg-yellow-500',
    bg: 'bg-[#1a1a24]',
  },
  completed: { 
    label: 'Completed', 
    color: 'bg-green-500',
    bg: 'bg-[#1a1a24]',
  }
}

export function TaskColumn({ title, status, tasks, onStatusChange, onDelete }: TaskColumnProps) {
  const filteredTasks = tasks.filter(task => task.status === status)
  const config = columnConfig[status]

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${config.color}`} />
          <h2 className="font-semibold text-white text-sm sm:text-base">{title}</h2>
          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#2a2a35] text-gray-400">
            {filteredTasks.length}
          </span>
        </div>
      </div>

      <div className={`flex-1 rounded-xl p-3 min-h-[200px] sm:min-h-[300px] ${config.bg} border border-[#2a2a35]`}>
        {filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 sm:h-40 text-gray-500">
            <svg className="w-8 h-8 mb-2 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-xs sm:text-sm">No tasks</p>
          </div>
        ) : (
          <div className="space-y-2 sm:space-y-3">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusChange={onStatusChange}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
