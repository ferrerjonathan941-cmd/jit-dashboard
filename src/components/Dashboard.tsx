'use client'

import { useState, useEffect, useCallback } from 'react'
import { Task, TaskStatus } from '@/types/task'
import { TaskColumn } from './TaskColumn'
import { StatsBar } from './StatsBar'
import { NewTaskModal } from './NewTaskModal'

export function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/tasks')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch')
        return res.json()
      })
      .then(data => {
        setTasks(Array.isArray(data) ? data : [])
        setIsLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch tasks:', err)
        setError(err.message)
        setIsLoading(false)
      })
  }, [])

  const handleCreateTask = useCallback(async (title: string, description: string) => {
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description })
      })
      if (!res.ok) throw new Error('Failed to create')
      const task = await res.json()
      setTasks(prev => [task, ...prev])
    } catch (error) {
      console.error('Failed to create task:', error)
    }
  }, [])

  const handleStatusChange = useCallback(async (id: string, status: TaskStatus) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      if (!res.ok) throw new Error('Failed to update')
      const updated = await res.json()
      setTasks(prev => prev.map(t => t.id === id ? updated : t))
    } catch (error) {
      console.error('Failed to update task:', error)
    }
  }, [])

  const handleDelete = useCallback(async (id: string) => {
    try {
      await fetch(`/api/tasks/${id}`, { method: 'DELETE' })
      setTasks(prev => prev.filter(t => t.id !== id))
    } catch (error) {
      console.error('Failed to delete task:', error)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-3 border-[#ff5a2d] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Loading Mission Control...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-2">Error loading dashboard</p>
          <p className="text-gray-500 text-sm">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-[#ff5a2d] text-white rounded-lg text-sm hover:bg-[#ff6b3d]"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <header className="border-b border-[#2a2a35] bg-[#0a0a0f] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              Mission Control
            </h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#ff5a2d] hover:bg-[#ff6b3d] text-white px-3 sm:px-5 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors text-sm sm:text-base whitespace-nowrap"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="hidden sm:inline">New Task</span>
              <span className="sm:hidden">New</span>
            </button>
          </div>
        </div>
      </header>

      {/* Stats */}
      <StatsBar tasks={tasks} />

      {/* Board */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <TaskColumn
            title="Backlog"
            status="backlog"
            tasks={tasks}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
          />
          <TaskColumn
            title="In Progress"
            status="in_progress"
            tasks={tasks}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
          />
          <TaskColumn
            title="Completed"
            status="completed"
            tasks={tasks}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {/* Modal */}
      <NewTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTask}
      />
    </div>
  )
}
