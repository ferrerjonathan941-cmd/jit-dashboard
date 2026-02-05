'use client'

import { Task, TaskStatus } from '@/types/task'
import { TaskCard } from './TaskCard'

interface TaskColumnProps {
  title: string
  status: TaskStatus
  tasks: Task[]
  onStatusChange: (id: string, status: TaskStatus) => void
  onDelete: (id: string) => void
  color: string
}

const statusConfig = {
  backlog: { 
    label: 'Backlog', 
    dot: 'bg-gray-500',
    bg: 'bg-gray-500/10',
    border: 'border-gray-500/20'
  },
  in_progress: { 
    label: 'In Progress', 
    dot: 'bg-yellow-500',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20'
  },
  completed: { 
    label: 'Completed', 
    dot: 'bg-green-500',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20'
  }
}

export function TaskColumn({ title, status, tasks, onStatusChange, onDelete }: TaskColumnProps) {
  const filteredTasks = tasks.filter(task => task.status === status)
  const config = statusConfig[status]

  return (
    <div className="flex flex-col min-h-[500px]">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${config.dot} ring-2 ring-offset-2 ring-offset-[#0a0a0f] ring-${config.dot.replace('bg-', '')}/50`} />
          <h2 className="font-semibold text-white text-lg">{title}</h2>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.border} border`}>
            {filteredTasks.length}
          </span>
        </div>
      </div>

      {/* Task List */}
      <div className={`flex-1 rounded-xl p-4 min-h-[400px] ${config.bg} border ${config.border}`}>
        {filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-gray-500">
            <svg className="w-12 h-12 mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-sm">No tasks</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusChange={onStatusChange}
                onDelete={onDelete}
                delay={index * 0.05}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
