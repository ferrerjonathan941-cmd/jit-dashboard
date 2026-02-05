'use client'

import { Task } from '@/types/task'

interface Props {
  task: Task
  onMove: () => void
  onDelete: () => void
}

export function TaskCard({ task, onMove, onDelete }: Props) {
  return (
    <div className="bg-[#1e1e28] rounded p-3 group">
      <p className="text-white text-sm mb-2">{task.title}</p>
      <div className="flex items-center justify-between">
        <button onClick={onMove} className="text-xs text-orange-400 hover:text-orange-300">Move →</button>
        <button onClick={onDelete} className="text-xs text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100">×</button>
      </div>
    </div>
  )
}
