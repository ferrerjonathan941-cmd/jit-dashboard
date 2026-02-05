'use client'

import { Task, TaskStatus } from '@/types/task'

interface TaskCardProps {
  task: Task
  onStatusChange: (id: string, status: TaskStatus) => void
  onDelete: (id: string) => void
  delay?: number
}

const statusConfig = {
  backlog: { 
    dot: 'bg-gray-500',
    next: 'in_progress' as TaskStatus,
    nextLabel: 'Start →'
  },
  in_progress: { 
    dot: 'bg-yellow-500',
    next: 'completed' as TaskStatus,
    nextLabel: 'Complete →'
  },
  completed: { 
    dot: 'bg-green-500',
    next: 'backlog' as TaskStatus,
    nextLabel: 'Reopen →'
  }
}

export function TaskCard({ task, onStatusChange, onDelete, delay = 0 }: TaskCardProps) {
  const config = statusConfig[task.status as TaskStatus]

  return (
    <div 
      className="group bg-[#1a1a24] hover:bg-[#252532] border border-[#2a2a35] hover:border-[#3a3a45] rounded-xl p-4 transition-all duration-200 animate-fadeIn hover:shadow-lg hover:shadow-black/20"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className={`w-2 h-2 rounded-full ${config.dot} mt-2 flex-shrink-0`} />
          <h3 className="font-medium text-white leading-tight line-clamp-2">
            {task.title}
          </h3>
        </div>
        <button
          onClick={() => onDelete(task.id)}
          className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 p-1 rounded transition-all flex-shrink-0"
          title="Delete task"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-gray-400 text-sm mb-4 line-clamp-2 pl-5">
          {task.description}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-[#2a2a35]">
        <span className="text-gray-500 text-xs">
          {new Date(task.updatedAt).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
          })}
        </span>
        <button
          onClick={() => onStatusChange(task.id, config.next)}
          className="text-xs font-medium text-gray-400 hover:text-white bg-[#2a2a35] hover:bg-[#3a3a45] px-3 py-1.5 rounded-lg transition-colors"
        >
          {config.nextLabel}
        </button>
      </div>
    </div>
  )
}
