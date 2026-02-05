'use client'

import { Task, TaskStatus } from '@/types/task'

interface TaskCardProps {
  task: Task
  onStatusChange: (id: string, status: TaskStatus) => void
  onDelete: (id: string) => void
}

const statusColors: Record<TaskStatus, string> = {
  backlog: 'border-l-gray-500',
  in_progress: 'border-l-yellow-500',
  completed: 'border-l-green-500'
}

export function TaskCard({ task, onStatusChange, onDelete }: TaskCardProps) {
  const nextStatus: Record<TaskStatus, TaskStatus> = {
    backlog: 'in_progress',
    in_progress: 'completed',
    completed: 'backlog'
  }

  return (
    <div className={`bg-gray-800 rounded-lg p-4 border-l-4 ${statusColors[task.status as TaskStatus]}`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-white">{task.title}</h3>
        <button
          onClick={() => onDelete(task.id)}
          className="text-gray-500 hover:text-red-400 text-sm"
        >
          ✕
        </button>
      </div>
      {task.description && (
        <p className="text-gray-400 text-sm mb-3">{task.description}</p>
      )}
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">
          {new Date(task.updatedAt).toLocaleDateString()}
        </span>
        <button
          onClick={() => onStatusChange(task.id, nextStatus[task.status as TaskStatus])}
          className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-gray-300"
        >
          Move →
        </button>
      </div>
    </div>
  )
}
