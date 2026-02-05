'use client'

import { useState, useEffect, useCallback } from 'react'
import { Task, TaskStatus } from '@/types/task'
import { usePusher } from '@/hooks/usePusher'
import { TaskColumn } from './TaskColumn'
import { StatsBar } from './StatsBar'
import { NewTaskModal } from './NewTaskModal'

export function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('/api/tasks')
      .then(res => res.json())
      .then(data => {
        setTasks(data)
        setIsLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch tasks:', err)
        setIsLoading(false)
      })
  }, [])

  const { isConnected } = usePusher({
    onTaskCreated: (task) => {
      setTasks(prev => [task, ...prev])
    },
    onTaskUpdated: (task) => {
      setTasks(prev => prev.map(t => t.id === task.id ? task : t))
    },
    onTaskDeleted: (task) => {
      setTasks(prev => prev.filter(t => t.id !== task.id))
    }
  })

  const handleCreateTask = useCallback(async (title: string, description: string) => {
    try {
      await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description })
      })
    } catch (error) {
      console.error('Failed to create task:', error)
    }
  }, [])

  const handleStatusChange = useCallback(async (id: string, status: TaskStatus) => {
    try {
      await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
    } catch (error) {
      console.error('Failed to update task:', error)
    }
  }, [])

  const handleDelete = useCallback(async (id: string) => {
    try {
      await fetch(`/api/tasks/${id}`, { method: 'DELETE' })
    } catch (error) {
      console.error('Failed to delete task:', error)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-400">
          <div className="w-5 h-5 border-2 border-[#ff5a2d] border-t-transparent rounded-full animate-spin" />
          Loading Mission Control...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <header className="border-b border-[#2a2a35] bg-[#0a0a0f]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#ff5a2d] to-[#ff8c5a] bg-clip-text text-transparent">
                Mission Control
              </h1>
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                isConnected 
                  ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                  : 'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}>
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
                {isConnected ? 'LIVE' : 'OFFLINE'}
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-[#ff5a2d] to-[#ff6b3d] hover:from-[#ff6b3d] hover:to-[#ff7c4d] text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all hover:shadow-lg hover:shadow-orange-500/20"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Task
            </button>
          </div>
        </div>
      </header>

      {/* Stats */}
      <StatsBar tasks={tasks} />

      {/* Board */}
      <div className="max-w-7xl mx-auto px-6 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TaskColumn
            title="Backlog"
            status="backlog"
            tasks={tasks}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
            color="bg-gray-500"
          />
          <TaskColumn
            title="In Progress"
            status="in_progress"
            tasks={tasks}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
            color="bg-yellow-500"
          />
          <TaskColumn
            title="Completed"
            status="completed"
            tasks={tasks}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
            color="bg-green-500"
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
