export type TaskStatus = 'backlog' | 'in_progress' | 'completed'

export interface Task {
  id: string
  title: string
  description: string | null
  status: TaskStatus
  createdAt: Date
  updatedAt: Date
}
