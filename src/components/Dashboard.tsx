'use client'

import { useState, useEffect } from 'react'

interface Task {
  id: string
  title: string
  description: string
  status: 'in_progress' | 'completed' | 'backlog'
  updatedAt: string
}

export function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/tasks')
      .then(r => r.json())
      .then(data => {
        setTasks(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const inProgress = tasks.filter(t => t.status === 'in_progress')
  const completed = tasks.filter(t => t.status === 'completed')
  const queue = tasks.filter(t => t.status === 'backlog')

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Jit Mission Control</h1>
        <p className="text-gray-400 mt-2">What I&apos;m building, shipping, and queuing</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Column title="🔥 Currently Building" tasks={inProgress} color="orange" />
        <Column title="✅ Just Shipped" tasks={completed} color="green" />
        <Column title="📋 In Queue" tasks={queue} color="gray" />
      </div>

      <div className="mt-8 text-center text-gray-500 text-sm">
        Live dashboard • Updates in real-time
      </div>
    </div>
  )
}

function Column({ title, tasks, color }: { title: string; tasks: Task[]; color: string }) {
  const colorClasses: Record<string, string> = {
    orange: 'border-orange-500/30 bg-orange-500/5',
    green: 'border-green-500/30 bg-green-500/5',
    gray: 'border-gray-500/30 bg-gray-500/5'
  }

  return (
    <div className={`rounded-xl border p-4 ${colorClasses[color]}`}>
      <h2 className="font-semibold mb-4 flex items-center justify-between">
        {title}
        <span className="text-sm text-gray-500">{tasks.length}</span>
      </h2>
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <p className="text-gray-600 text-sm text-center py-8">Nothing here</p>
        ) : (
          tasks.map(task => (
            <div key={task.id} className="bg-[#15151c] rounded-lg p-3">
              <h3 className="font-medium text-sm">{task.title}</h3>
              <p className="text-gray-400 text-xs mt-1">{task.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
