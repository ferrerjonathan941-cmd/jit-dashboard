'use client'

import { useState, useEffect, useCallback } from 'react'
import { Task, TaskStatus } from '@/types/task'
import { TaskColumn } from './TaskColumn'

export function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [showInput, setShowInput] = useState(false)

  useEffect(() => {
    fetch('/api/tasks')
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        setTasks(Array.isArray(data) ? data : [])
        setIsLoading(false)
      })
      .catch(() => {
        setError('Failed to load')
        setIsLoading(false)
      })
  }, [])

  const createTask = useCallback(async () => {
    if (!newTaskTitle.trim()) return
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTaskTitle, description: '' })
    })
    if (res.ok) {
      const task = await res.json()
      setTasks(prev => [task, ...prev])
      setNewTaskTitle('')
      setShowInput(false)
    }
  }, [newTaskTitle])

  const updateStatus = useCallback(async (id: string, status: TaskStatus) => {
    const res = await fetch(`/api/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    })
    if (res.ok) {
      const updated = await res.json()
      setTasks(prev => prev.map(t => t.id === id ? updated : t))
    }
  }, [])

  const deleteTask = useCallback(async (id: string) => {
    await fetch(`/api/tasks/${id}`, { method: 'DELETE' })
    setTasks(prev => prev.filter(t => t.id !== id))
  }, [])

  if (isLoading) return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
      <span className="text-white">Loading...</span>
    </div>
  )

  if (error) return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
      <span className="text-red-400">{error}</span>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <header className="p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">Mission Control</h1>
        {!showInput ? (
          <button onClick={() => setShowInput(true)} className="bg-orange-500 text-white px-3 py-1 rounded">+ New</button>
        ) : (
          <div className="flex gap-2">
            <input value={newTaskTitle} onChange={e => setNewTaskTitle(e.target.value)} placeholder="Task" className="bg-gray-800 text-white px-2 py-1 rounded" />
            <button onClick={createTask} className="bg-green-500 text-white px-3 py-1 rounded">Add</button>
            <button onClick={() => setShowInput(false)} className="text-gray-400">×</button>
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <TaskColumn title="Backlog" status="backlog" tasks={tasks} onStatusChange={updateStatus} onDelete={deleteTask} />
        <TaskColumn title="In Progress" status="in_progress" tasks={tasks} onStatusChange={updateStatus} onDelete={deleteTask} />
        <TaskColumn title="Completed" status="completed" tasks={tasks} onStatusChange={updateStatus} onDelete={deleteTask} />
      </div>
    </div>
  )
}
