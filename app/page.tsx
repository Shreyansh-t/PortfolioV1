'use client'

import { useCallback, useEffect, useState } from 'react'
import HexCanvas from './components/HexCanvas'
import HexBlock from './components/HexBlock'
import WALViewer from './components/WALViewer'
import { walManager, UISnapshot } from './lib/wal'
import { MEMORY_BLOCKS } from './lib/content'

const INITIAL_SNAPSHOT: UISnapshot = {
  lsnNum: 0,
  decodedBlocks: [],
  activeBlockId: null,
}

export default function Home() {
  const [snapshot, setSnapshot] = useState<UISnapshot>(INITIAL_SNAPSHOT)
  const [pid, setPid] = useState('')
  const [now, setNow] = useState('')

  useEffect(() => {
    setPid(Math.random().toString(16).slice(2, 10).toUpperCase())
    setNow(new Date().toISOString())
  }, [])

  const handleActivate = useCallback((blockId: string) => {
    const block = MEMORY_BLOCKS.find(b => b.id === blockId)
    if (!block) return
    setSnapshot(prev => walManager.executeTransaction(blockId, block.label, prev))
  }, [])

  const handleHover = useCallback((blockId: string) => {
    walManager.logHover(blockId)
  }, [])

  const handleRollback = useCallback((lsnNum: number) => {
    setSnapshot(prev => walManager.executeRollback(lsnNum, prev))
  }, [])

  const col0 = MEMORY_BLOCKS.filter(b => b.gridCol === 0)
  const col1 = MEMORY_BLOCKS.filter(b => b.gridCol === 1)
  // Interleave into pairs for 2-col grid
  const pairs: [typeof MEMORY_BLOCKS[0], typeof MEMORY_BLOCKS[0] | undefined][] = col0.map(
    (b, i) => [b, col1[i]]
  )

  return (
    <div className="fixed inset-0 flex bg-black overflow-hidden" style={{ fontFamily: '"Share Tech Mono", "Courier New", monospace' }}>
      {/* ── Left panel: hex canvas + interactive blocks ── */}
      <div className="relative flex-1 min-w-0 overflow-hidden flex flex-col">

        {/* Background scrolling hex dump */}
        <HexCanvas />

        {/* Top header bar */}
        <div className="relative z-10 flex-shrink-0 flex items-center justify-between px-4 py-2 bg-black bg-opacity-85 border-b border-amber-950">
          <div className="flex items-center gap-4">
            <span className="text-amber-400 font-bold text-sm tracking-widest">CORE_DUMP</span>
            <span className="text-amber-800 text-xs hidden sm:inline">PID:{pid}</span>
            <span className="text-amber-900 text-xs hidden md:inline">{now}</span>
          </div>
          <div className="text-amber-700 text-xs tracking-wide">
            SHREYANSH TEHANGURIA · MEMORY MAP · WAL+MVCC
          </div>
        </div>

        {/* Instruction banner */}
        <div className="relative z-10 flex-shrink-0 px-4 py-1.5 bg-black bg-opacity-70 border-b border-amber-950">
          <p className="text-amber-800 text-xs">
            ▸ CLICK any memory block to BEGIN TRANSACTION + DECODE · Use WAL log on right to ROLLBACK
          </p>
        </div>

        {/* Memory block grid — scrollable */}
        <div className="relative z-10 flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {pairs.map(([left, right], i) => (
              <div key={i} className="contents">
                <HexBlock
                  block={left}
                  isDecoded={snapshot.decodedBlocks.includes(left.id)}
                  isActive={snapshot.activeBlockId === left.id}
                  onActivate={handleActivate}
                  onHover={handleHover}
                />
                {right && (
                  <HexBlock
                    block={right}
                    isDecoded={snapshot.decodedBlocks.includes(right.id)}
                    isActive={snapshot.activeBlockId === right.id}
                    onActivate={handleActivate}
                    onHover={handleHover}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom status bar */}
        <div className="relative z-10 flex-shrink-0 flex items-center gap-6 px-4 py-1.5 bg-black bg-opacity-85 border-t border-amber-950 text-xs text-amber-800">
          <span>DECODED: {snapshot.decodedBlocks.length}/{MEMORY_BLOCKS.length}</span>
          <span>ACTIVE: {snapshot.activeBlockId ?? 'NONE'}</span>
          <span className="hidden sm:inline">ENGINE: WAL_STATE_MACHINE_v1.0</span>
        </div>
      </div>

      {/* ── Right panel: WAL log viewer (20% / fixed width) ── */}
      <div className="w-56 lg:w-64 flex-shrink-0 overflow-hidden">
        <WALViewer onRollback={handleRollback} />
      </div>
    </div>
  )
}
