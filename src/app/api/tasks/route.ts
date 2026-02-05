import { NextRequest, NextResponse } from 'next/server'

// Jit's Mission Control - Static data for now, can make dynamic later
const jitsTasks = {
  in_progress: [
    {
      id: 'jit-001',
      title: 'JitOS Operating System',
      description: 'Building personal OS to make me 100x more effective',
      status: 'in_progress',
      createdAt: '2026-02-05T09:00:00Z',
      updatedAt: '2026-02-05T17:15:00Z'
    },
    {
      id: 'jit-002',
      title: 'Mission Control Dashboard',
      description: 'Public-facing dashboard showing all my work',
      status: 'in_progress',
      createdAt: '2026-02-05T17:10:00Z',
      updatedAt: '2026-02-05T17:16:00Z'
    }
  ],
  completed: [
    {
      id: 'jit-003',
      title: 'Vercel Dashboard Deploy',
      description: 'Got dashboard live with database and API',
      status: 'completed',
      createdAt: '2026-02-05T02:00:00Z',
      updatedAt: '2026-02-05T03:00:00Z'
    },
    {
      id: 'jit-004',
      title: 'JitOS Core System',
      description: 'Decision logs, knowledge base, patterns, scripts',
      status: 'completed',
      createdAt: '2026-02-05T09:00:00Z',
      updatedAt: '2026-02-05T09:30:00Z'
    }
  ],
  queue: [
    {
      id: 'jit-005',
      title: 'Next.js Expert Skill',
      description: 'Complete comprehensive Next.js skill for JitOS',
      status: 'backlog',
      createdAt: '2026-02-05T17:20:00Z',
      updatedAt: '2026-02-05T17:20:00Z'
    },
    {
      id: 'jit-006',
      title: 'Auto-Documentation System',
      description: 'Auto-update docs when patterns change',
      status: 'backlog',
      createdAt: '2026-02-05T17:25:00Z',
      updatedAt: '2026-02-05T17:25:00Z'
    }
  ]
}

export async function GET() {
  const allTasks = [
    ...jitsTasks.in_progress,
    ...jitsTasks.completed,
    ...jitsTasks.queue
  ]
  return NextResponse.json(allTasks)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  // In real version, this would add to queue
  return NextResponse.json({ 
    id: `jit-${Date.now()}`,
    ...body,
    status: 'backlog',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }, { status: 201 })
}
