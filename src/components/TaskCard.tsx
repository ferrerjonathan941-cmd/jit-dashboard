'use client'

import { Task, TaskStatus } from '@/types/task'

interface TaskCardProps {
  task: Task
  onStatusChange: (id: string, status: TaskStatus) => void
  onDelete: (id: string) => void
}

const statusFlow: Record<TaskStatus, { next: TaskStatus; label: string }> = {
  backlog: { next: 'in_progress', label: 'Start' },
  in_progress: { next: 'completed', label: 'Done' },
  completed: { next: 'backlog', label: 'Reopen' },
}

export function TaskCard({ task, onStatusChange, onDelete }: TaskCardProps) {
  const flow = statusFlow[task.status as TaskStatus]

  return (
    <div className="group bg-[#111118] hover:bg-[#1a1a24] border border-[#2a2a35] rounded-lg p-3 transition-all">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-medium text-white text-sm leading-snug flex-1">
          {task.title}
        </h3>
        <button
          onClick={() => onDelete(task.id)}
          className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 p-1 transition-opacity"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {task.description && (
        <p className="text-gray-400 text-xs mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between pt-2 border-t border-[#2a2a35]">
        <span className="text-gray-500 text-xs">
          {new Date(task.updatedAt).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
          })}
        </span>
        <button
          onClick={() => onStatusChange(task.id, flow.next)}
          className="text-xs font-medium text-gray-400 hover:text-white bg-[#2a2a35] hover:bg-[#3a3a45] px-2.5 py-1 rounded transition-colors"
        >
          {flow.label}
        </button>
      </div>
    </div>
  )
}
