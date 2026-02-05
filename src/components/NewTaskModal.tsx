'use client'

import { useState } from 'react'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSubmit: (title: string, description: string) => void
}

export function NewTaskModal({ isOpen, onClose, onSubmit }: Props) {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    onSubmit(title, desc)
    setTitle('')
    setDesc('')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-white mb-4">New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full bg-gray-800 rounded-lg px-3 py-2 text-white border border-gray-700 focus:border-orange-500 outline-none"
              placeholder="What needs to be done?"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Description (optional)</label>
            <textarea
              value={desc}
              onChange={e => setDesc(e.target.value)}
              className="w-full bg-gray-800 rounded-lg px-3 py-2 text-white border border-gray-700 focus:border-orange-500 outline-none resize-none"
              rows={3}
              placeholder="Add details..."
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white py-2 rounded-lg font-medium"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
