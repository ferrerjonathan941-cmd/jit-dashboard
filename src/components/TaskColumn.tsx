'use client'

import { Task, TaskStatus } from '@/types/task'
import { TaskCard } from './TaskCard'

interface Props {
  title: string
  status: TaskStatus
  tasks: Task[]
  onStatusChange: (id: string, status: TaskStatus) => void
  onDelete: (id: string) => void
}

const nextStatus: Record<TaskStatus, TaskStatus> = {
  backlog: 'in_progress',
  in_progress: 'completed',
  completed: 'backlog'
}

export function TaskColumn({ title, status, tasks, onStatusChange, onDelete }: Props) {
  const filtered = tasks.filter(t => t.status === status)

  return (
    <div className="bg-[#15151c] rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-white font-medium">{title}</h2>
        <span className="text-gray-400 text-sm">{filtered.length}</span>
      </div>
      <div className="space-y-2">
        {filtered.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onMove={() => onStatusChange(task.id, nextStatus[status])}
            onDelete={() => onDelete(task.id)}
          />
        ))}
        {filtered.length === 0 && <p className="text-gray-600 text-sm text-center py-4">No tasks</p>}
      </div>
    </div>
  )
}
