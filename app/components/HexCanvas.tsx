'use client'

import { useEffect, useRef } from 'react'

const FONT_SIZE = 11
const LINE_HEIGHT = 16
const COLS = 16

function rndByte(): string {
  return Math.floor(Math.random() * 256).toString(16).toUpperCase().padStart(2, '0')
}

function rndPrintable(): string {
  const c = Math.floor(Math.random() * 94) + 33
  return String.fromCharCode(c)
}

function buildRows(count: number): string[] {
  const out: string[] = []
  for (let i = 0; i < count; i++) {
    const addr = (i * COLS).toString(16).toUpperCase().padStart(8, '0')
    const group1 = Array.from({ length: 8 }, rndByte).join(' ')
    const group2 = Array.from({ length: 8 }, rndByte).join(' ')
    const ascii = Array.from({ length: COLS }, rndPrintable).join('')
    out.push(`${addr}  ${group1}  ${group2}  |${ascii}|`)
  }
  return out
}

export default function HexCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const ROW_COUNT = 300
    const rows = buildRows(ROW_COUNT)

    let offset = 0
    let animId: number

    function resize() {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    function draw() {
      if (!canvas || !ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.font = `${FONT_SIZE}px "JetBrains Mono", "Share Tech Mono", "Courier New", monospace`

      const startRow = Math.floor(offset / LINE_HEIGHT)
      const visibleRows = Math.ceil(canvas.height / LINE_HEIGHT) + 2

      for (let i = 0; i < visibleRows; i++) {
        const rowIdx = (startRow + i) % ROW_COUNT
        const y = i * LINE_HEIGHT - (offset % LINE_HEIGHT) + LINE_HEIGHT
        ctx.fillStyle = 'rgba(200, 169, 106, 0.055)'
        ctx.fillText(rows[rowIdx], 8, y)
      }

      offset += 0.2
      if (offset >= ROW_COUNT * LINE_HEIGHT) offset = 0

      animId = requestAnimationFrame(draw)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    draw()

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}
