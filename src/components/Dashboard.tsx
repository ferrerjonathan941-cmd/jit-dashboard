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
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Jit Dashboard</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <span>+</span> New Task
          </button>
        </div>

        <StatsBar tasks={tasks} isConnected={isConnected} />

        <div className="flex gap-6">
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

      <NewTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTask}
      />
    </div>
  )
}
