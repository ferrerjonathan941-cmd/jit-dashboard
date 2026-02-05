'use client'

import { useState, useEffect } from 'react'
import { Task } from '@/types/task'
import { TaskColumn } from './TaskColumn'
import { NewTaskModal } from './NewTaskModal'

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    fetch('/api/tasks')
      .then(r => r.json())
      .then(data => {
        setTasks(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => {
        setTasks([])
        setLoading(false)
      })

    const interval = setInterval(() => {
      fetch('/api/tasks')
        .then(r => r.json())
        .then(data => setTasks(Array.isArray(data) ? data : []))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const createTask = async (title: string, desc: string) => {
    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description: desc })
    })
    const updated = await fetch('/api/tasks').then(r => r.json())
    setTasks(Array.isArray(updated) ? updated : [])
  }

  const updateTask = async (id: string, status: string) => {
    await fetch(`/api/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    })
    const updated = await fetch('/api/tasks').then(r => r.json())
    setTasks(Array.isArray(updated) ? updated : [])
  }

  const deleteTask = async (id: string) => {
    await fetch(`/api/tasks/${id}`, { method: 'DELETE' })
    const updated = await fetch('/api/tasks').then(r => r.json())
    setTasks(Array.isArray(updated) ? updated : [])
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-orange-500 text-lg">Loading...</div>
      </div>
    )
  }

  const total = tasks.length
  const inProgress = tasks.filter(t => t.status === 'in_progress').length
  const done = tasks.filter(t => t.status === 'completed').length

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0f]/95 backdrop-blur border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold text-white">Mission Control</h1>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium text-sm md:text-base"
          >
            + New Task
          </button>
        </div>
      </header>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-4 gap-2 md:gap-4 mb-6">
          <div className="bg-gray-900 rounded-lg p-3 text-center">
            <div className="text-xl md:text-2xl font-bold text-white">{total}</div>
            <div className="text-xs text-gray-500">Total</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-3 text-center">
            <div className="text-xl md:text-2xl font-bold text-yellow-500">{inProgress}</div>
            <div className="text-xs text-gray-500">Active</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-3 text-center">
            <div className="text-xl md:text-2xl font-bold text-green-500">{done}</div>
            <div className="text-xs text-gray-500">Done</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-3 text-center">
            <div className="text-xl md:text-2xl font-bold text-orange-500">
              {total ? Math.round((done / total) * 100) : 0}%
            </div>
            <div className="text-xs text-gray-500">Progress</div>
          </div>
        </div>

        {/* Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TaskColumn
            title="Backlog"
            status="backlog"
            tasks={tasks}
            onUpdate={updateTask}
            onDelete={deleteTask}
          />
          <TaskColumn
            title="In Progress"
            status="in_progress"
            tasks={tasks}
            onUpdate={updateTask}
            onDelete={deleteTask}
          />
          <TaskColumn
            title="Completed"
            status="completed"
            tasks={tasks}
            onUpdate={updateTask}
            onDelete={deleteTask}
          />
        </div>
      </div>

      <NewTaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={createTask}
      />
    </div>
  )
}
