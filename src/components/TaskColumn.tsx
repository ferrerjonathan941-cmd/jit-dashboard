interface Task {
  id: string
  title: string
  description: string | null
  status: string
  createdAt: string
}

interface Props {
  title: string
  status: string
  tasks: Task[]
  onUpdate: (id: string, status: string) => void
  onDelete: (id: string) => void
}

export function TaskColumn({ title, status, tasks, onUpdate, onDelete }: Props) {
  const filtered = tasks.filter(t => t.status === status)

  const nextStatus = status === 'backlog' ? 'in_progress'
    : status === 'in_progress' ? 'completed'
    : 'backlog'

  const nextLabel = status === 'backlog' ? 'Start →'
    : status === 'in_progress' ? 'Done →'
    : 'Redo →'

  return (
    <div className="bg-gray-900/50 rounded-xl p-3">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-medium">{title}</h3>
        <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">{filtered.length}</span>
      </div>

      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="text-center py-8 text-gray-600 text-sm">No tasks</div>
        ) : (
          filtered.map(task => (
            <div key={task.id} className="bg-gray-800 rounded-lg p-3 group">
              <div className="flex items-start justify-between gap-2">
                <p className="text-white text-sm flex-1">{task.title}</p>
                <button
                  onClick={() => onDelete(task.id)}
                  className="text-gray-600 hover:text-red-400 text-xs opacity-0 group-hover:opacity-100"
                >
                  ×
                </button>
              </div>
              {task.description && (
                <p className="text-gray-500 text-xs mt-1">{task.description}</p>
              )}
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-700">
                <span className="text-xs text-gray-600">
                  {new Date(task.updatedAt).toLocaleDateString()}
                </span>
                <button
                  onClick={() => onUpdate(task.id, nextStatus)}
                  className="text-xs text-orange-500 hover:text-orange-400"
                >
                  {nextLabel}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
