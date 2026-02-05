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

const columnColors: Record<TaskStatus, string> = {
  backlog: 'bg-gray-500',
  in_progress: 'bg-yellow-500',
  completed: 'bg-green-500'
}

export function TaskColumn({ title, status, tasks, onStatusChange, onDelete }: TaskColumnProps) {
  const filteredTasks = tasks.filter(task => task.status === status)

  return (
    <div className="flex-1 min-w-[300px]">
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-3 h-3 rounded-full ${columnColors[status]}`} />
        <h2 className="font-semibold text-white">{title}</h2>
        <span className="text-gray-500 text-sm">{filteredTasks.length}</span>
      </div>
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <p className="text-gray-600 text-sm italic">No tasks</p>
        ) : (
          filteredTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  )
}
