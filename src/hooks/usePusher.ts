'use client'

import { useEffect, useState } from 'react'
import Pusher from 'pusher-js'
import { Task } from '@/types/task'

interface UsePusherOptions {
  onTaskCreated?: (task: Task) => void
  onTaskUpdated?: (task: Task) => void
  onTaskDeleted?: (task: Task) => void
}

export function usePusher(options: UsePusherOptions) {
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!
    })

    const channel = pusher.subscribe('tasks')
    
    pusher.connection.bind('connected', () => {
      setIsConnected(true)
    })
    
    pusher.connection.bind('disconnected', () => {
      setIsConnected(false)
    })

    channel.bind('task-created', (task: Task) => {
      options.onTaskCreated?.(task)
    })
    
    channel.bind('task-updated', (task: Task) => {
      options.onTaskUpdated?.(task)
    })
    
    channel.bind('task-deleted', (task: Task) => {
      options.onTaskDeleted?.(task)
    })

    return () => {
      channel.unbind_all()
      channel.unsubscribe()
      pusher.disconnect()
    }
  }, [])

  return { isConnected }
}
