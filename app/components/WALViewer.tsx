'use client'

import { useEffect, useRef, useState } from 'react'
import { walManager, WALEntry } from '../lib/wal'

const OP_COLOR: Record<string, string> = {
  INIT:       '#555555',
  CHECKPOINT: '#5A4800',
  HOVER:      '#5C3D00',
  BEGIN:      '#FFB000',
  WRITE:      '#FF8C00',
  COMMIT:     '#00CC33',
  ROLLBACK:   '#CC2222',
}

const OP_LABEL: Record<string, string> = {
  INIT:       'INIT      ',
  CHECKPOINT: 'CKPT      ',
  HOVER:      'SCAN      ',
  BEGIN:      'BEGIN     ',
  WRITE:      'WRITE     ',
  COMMIT:     'COMMIT    ',
  ROLLBACK:   'ROLLBACK  ',
}

interface WALViewerProps {
  onRollback: (lsnNum: number) => void
}

export default function WALViewer({ onRollback }: WALViewerProps) {
  const [entries, setEntries] = useState<WALEntry[]>([])
  const [highlighted, setHighlighted] = useState<string | null>(null)
  const endRef = useRef<HTMLDivElement>(null)
  const isRollbackable = (op: string) => op === 'COMMIT' || op === 'CHECKPOINT' || op === 'ROLLBACK'

  useEffect(() => {
    return walManager.subscribe(setEntries)
  }, [])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [entries.length])

  return (
    <div className="flex flex-col h-full bg-black border-l border-amber-950 select-none">
      {/* Header */}
      <div className="px-3 py-2 border-b border-amber-950 flex-shrink-0">
        <div className="text-amber-400 text-xs font-bold tracking-widest">WAL LOG STREAM</div>
        <div className="text-amber-800 text-xs mt-0.5">MVCC · CLICK LSN → ROLLBACK</div>
      </div>

      {/* Log entries */}
      <div className="flex-1 overflow-y-auto py-1 font-mono text-xs scrollbar-thin">
        {entries.map(entry => {
          const canRollback = isRollbackable(entry.operation)
          const isHigh = highlighted === entry.lsn
          const dimmed = entry.operation === 'HOVER' || entry.operation === 'INIT'

          return (
            <div
              key={entry.lsn}
              className={`px-2 py-0.5 leading-snug transition-colors duration-75 ${
                canRollback ? 'cursor-pointer' : 'cursor-default'
              } ${isHigh ? 'bg-amber-950' : 'hover:bg-amber-950 hover:bg-opacity-40'} ${
                dimmed ? 'opacity-25' : 'opacity-90'
              }`}
              onClick={() => canRollback && onRollback(entry.lsnNum)}
              onMouseEnter={() => canRollback && setHighlighted(entry.lsn)}
              onMouseLeave={() => setHighlighted(null)}
            >
              {/* LSN */}
              <span className="text-amber-800">[{entry.lsn}]</span>
              {' '}
              {/* Operation */}
              <span style={{ color: OP_COLOR[entry.operation] ?? '#FFB000' }}>
                {OP_LABEL[entry.operation] ?? entry.operation.padEnd(10)}
              </span>

              {/* Target + payload on sub-lines */}
              {entry.target && !dimmed && (
                <div className="ml-2 text-amber-700 opacity-70 truncate">
                  ↳ {entry.target}
                </div>
              )}
              {entry.payload && !dimmed && (
                <div className="ml-2 text-amber-900 truncate">
                  {entry.payload}
                </div>
              )}

              {/* Rollback hint */}
              {canRollback && isHigh && (
                <div className="ml-2 text-red-500 opacity-80 animate-pulse">
                  ⤺ ROLLBACK HERE
                </div>
              )}
            </div>
          )
        })}
        <div ref={endRef} />
      </div>

      {/* Footer stats */}
      <div className="px-3 py-2 border-t border-amber-950 flex-shrink-0 text-xs text-amber-800">
        <div className="flex justify-between">
          <span>ENTRIES: {entries.length}</span>
          <span>LSN: {entries.at(-1)?.lsn ?? '—'}</span>
        </div>
        <div className="mt-0.5 text-amber-900">ENGINE: WAL_v1.0 + MVCC</div>
      </div>
    </div>
  )
}
