'use client'

import { useState } from 'react'

interface NewTaskModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (title: string, description: string) => void
}

export function NewTaskModal({ isOpen, onClose, onSubmit }: NewTaskModalProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    onSubmit(title, description)
    setTitle('')
    setDescription('')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-[#111118] border border-[#2a2a35] rounded-2xl p-6 w-full max-w-lg shadow-2xl animate-slideIn">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">New Task</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-white p-2 rounded-lg hover:bg-[#2a2a35] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2">
              Task Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#1a1a24] border border-[#2a2a35] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#ff5a2d] focus:ring-1 focus:ring-[#ff5a2d] transition-all placeholder:text-gray-600"
              placeholder="What are you working on?"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2">
              Description <span className="text-gray-600">(optional)</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#1a1a24] border border-[#2a2a35] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#ff5a2d] focus:ring-1 focus:ring-[#ff5a2d] transition-all placeholder:text-gray-600 h-28 resize-none"
              placeholder="Add details..."
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 text-gray-400 hover:text-white bg-[#1a1a24] hover:bg-[#252532] border border-[#2a2a35] rounded-xl font-medium transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-[#ff5a2d] to-[#ff6b3d] hover:from-[#ff6b3d] hover:to-[#ff7c4d] text-white rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
