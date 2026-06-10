'use client'

import { useEffect, useRef } from 'react'

const FONT_SIZE = 11
const LINE_HEIGHT = 16
const COLS = 16 // bytes per row

function rndByte(): string {
  return Math.floor(Math.random() * 256).toString(16).toUpperCase().padStart(2, '0')
}

function rndPrintable(): string {
  const c = Math.floor(Math.random() * 94) + 33
  return String.fromCharCode(c)
}

// Pre-generate stable hex rows so they don't flicker every frame
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
    // Occasional rows flash to a brighter value
    const flashRows = new Set<number>()

    let offset = 0
    let animId: number

    function resize() {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    function draw() {
      if (!canvas || !ctx) return

      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.font = `${FONT_SIZE}px "Share Tech Mono", "Courier New", monospace`

      const startRow = Math.floor(offset / LINE_HEIGHT)
      const visibleRows = Math.ceil(canvas.height / LINE_HEIGHT) + 2

      for (let i = 0; i < visibleRows; i++) {
        const rowIdx = (startRow + i) % ROW_COUNT
        const y = i * LINE_HEIGHT - (offset % LINE_HEIGHT) + LINE_HEIGHT

        const isFlash = flashRows.has(rowIdx)
        const alpha = isFlash ? 0.55 : 0.08 + Math.random() * 0.12
        ctx.fillStyle = `rgba(255,176,0,${alpha})`
        ctx.fillText(rows[rowIdx], 6, y)
      }

      // Random row brightness spikes
      if (Math.random() < 0.03) {
        const pick = Math.floor(Math.random() * ROW_COUNT)
        flashRows.add(pick)
        setTimeout(() => flashRows.delete(pick), 80 + Math.random() * 120)
      }

      // CRT scanline bars
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.fillStyle = 'rgba(0,0,0,0.35)'
        ctx.fillRect(0, y, canvas.width, 1)
      }

      // Subtle vignette
      const vg = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, canvas.height * 0.3,
        canvas.width / 2, canvas.height / 2, canvas.height * 0.85,
      )
      vg.addColorStop(0, 'rgba(0,0,0,0)')
      vg.addColorStop(1, 'rgba(0,0,0,0.55)')
      ctx.fillStyle = vg
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      offset += 0.4
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
      className="absolute inset-0 w-full h-full"
    />
  )
}
