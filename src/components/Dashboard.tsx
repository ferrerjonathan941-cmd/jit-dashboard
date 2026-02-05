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
      .then(r => r.ok ? r.json() : [])
      .then(data => {
        setTasks(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const inProgress = tasks.filter(t => t.status === 'in_progress')
  const completed = tasks.filter(t => t.status === 'completed')
  const queue = tasks.filter(t => t.status === 'backlog')

  if (!loading && tasks.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <span className="text-gray-400">No tasks found</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-6">
      <header className="max-w-6xl mx-auto mb-10">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
          Jit Mission Control
        </h1>
        <p className="text-gray-400 mt-2">What I&apos;m building, shipping, and queuing</p>
      </header>

      <main className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Column title="🔥 Currently Building" tasks={inProgress} accent="orange" />
          <Column title="✅ Just Shipped" tasks={completed} accent="green" />
          <Column title="📋 In Queue" tasks={queue} accent="blue" />
        </div>
      </main>

      <footer className="max-w-6xl mx-auto mt-12 text-center text-gray-500 text-sm">
        Live dashboard • Updates in real-time
      </footer>
    </div>
  )
}

function Column({ title, tasks, accent }: { title: string; tasks: Task[]; accent: 'orange' | 'green' | 'blue' }) {
  const accents = {
    orange: 'border-orange-500/30 bg-orange-500/10 hover:border-orange-500/50',
    green: 'border-green-500/30 bg-green-500/10 hover:border-green-500/50',
    blue: 'border-blue-500/30 bg-blue-500/10 hover:border-blue-500/50'
  }

  const dotColors = {
    orange: 'bg-orange-500',
    green: 'bg-green-500',
    blue: 'bg-blue-500'
  }

  return (
    <section className={`rounded-2xl border p-5 transition-colors ${accents[accent]}`}>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-semibold flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${dotColors[accent]}`} />
          {title}
        </h2>
        <span className="text-sm text-gray-400 bg-white/5 px-2 py-1 rounded-full">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p className="text-sm">Empty for now</p>
          </div>
        ) : (
          tasks.map(task => (
            <article 
              key={task.id} 
              className="bg-black/30 rounded-xl p-4 hover:bg-black/40 transition-colors cursor-pointer group"
            >
              <h3 className="font-medium text-white text-sm mb-1 group-hover:text-orange-300 transition-colors">
                {task.title}
              </h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                {task.description}
              </p>
            </article>
          ))
        )}
      </div>
    </section>
  )
}
