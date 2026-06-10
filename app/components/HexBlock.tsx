'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { MemoryBlock } from '../lib/content'

interface HexBlockProps {
  block: MemoryBlock
  isDecoded: boolean
  isActive: boolean
  onActivate: (id: string) => void
  onHover: (id: string) => void
}

const NOISE_CHARS = '0123456789ABCDEF :'
function noise(): string {
  return NOISE_CHARS[Math.floor(Math.random() * NOISE_CHARS.length)]
}

/** Scramble `from` → `to` across `frames` frames at `intervalMs` ms/frame */
function runScramble(
  from: string[],
  to: string[],
  frames: number,
  intervalMs: number,
  onFrame: (lines: string[]) => void,
  onDone: () => void,
): () => void {
  let frame = 0
  const id = setInterval(() => {
    frame++
    const progress = frame / frames

    const result = to.map((line, li) => {
      const src = from[li] ?? ''
      const maxLen = Math.max(line.length, src.length)
      return Array.from({ length: maxLen }, (_, ci) => {
        const revealAt = ci / (line.length || 1)
        if (revealAt < progress - 0.15) return line[ci] ?? ' '
        if (revealAt < progress + 0.05) return noise()
        return src[ci] ?? noise()
      }).join('')
    })

    onFrame(result)

    if (frame >= frames) {
      clearInterval(id)
      onDone()
    }
  }, intervalMs)
  return () => clearInterval(id)
}

export default function HexBlock({ block, isDecoded, isActive, onActivate, onHover }: HexBlockProps) {
  const [hovered, setHovered] = useState(false)
  const [animating, setAnimating] = useState(false)
  const [lines, setLines] = useState<string[]>([])
  const cleanupRef = useRef<(() => void) | null>(null)
  const prevDecoded = useRef(isDecoded)

  // ── Locked state display ────────────────────────────────────────────
  const lockedLines = [
    `${block.memAddr}  ${block.hexPreview.slice(0, 23)}`,
    `         ${block.hexPreview.slice(24)}`,
    `[${block.id}]`,
    `LABEL: ${block.label}`,
    `STATUS: ENCRYPTED — CLICK TO DECODE`,
  ]

  // ── Decoded state display ───────────────────────────────────────────
  const decodedLines = [
    `>> ${block.content.title}`,
    `   ${block.content.subtitle}`,
    `   ${'─'.repeat(Math.min(block.content.subtitle.length, 52))}`,
    ...block.content.lines,
    ...(block.content.links
      ? ['', ...block.content.links.map(l => `   ${l.label}`)]
      : []),
    '',
    `   [CLICK TO RE-ENCRYPT]`,
  ]

  // Init lines on mount
  useEffect(() => {
    setLines(isDecoded ? decodedLines : lockedLines)
    prevDecoded.current = isDecoded
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Animate when isDecoded flips
  useEffect(() => {
    if (prevDecoded.current === isDecoded) return
    prevDecoded.current = isDecoded

    cleanupRef.current?.()
    setAnimating(true)

    const from = isDecoded ? lockedLines : decodedLines
    const to   = isDecoded ? decodedLines : lockedLines

    cleanupRef.current = runScramble(from, to, 28, 35,
      (next) => setLines(next),
      () => {
        setLines(to)
        setAnimating(false)
      },
    )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDecoded])

  useEffect(() => () => { cleanupRef.current?.() }, [])

  const handleClick = useCallback(() => {
    if (!animating) onActivate(block.id)
  }, [animating, block.id, onActivate])

  const handleEnter = useCallback(() => {
    setHovered(true)
    onHover(block.id)
  }, [block.id, onHover])

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleEnter}
      onMouseLeave={() => setHovered(false)}
      className={[
        'relative p-3 font-mono text-xs leading-snug cursor-pointer',
        'border transition-all duration-200 overflow-hidden',
        isDecoded
          ? 'border-amber-500 bg-black bg-opacity-90'
          : 'border-amber-900 bg-black bg-opacity-70',
        hovered && !isDecoded  ? 'border-amber-600 shadow-[0_0_12px_rgba(255,176,0,0.3)]' : '',
        hovered && isDecoded   ? 'shadow-[0_0_18px_rgba(255,176,0,0.45)]' : '',
        isActive               ? 'ring-1 ring-amber-400' : '',
      ].filter(Boolean).join(' ')}
    >
      {/* Animated status dot */}
      <span
        className={[
          'absolute top-2 right-2 w-1.5 h-1.5 rounded-full',
          animating  ? 'bg-amber-300 animate-ping'  :
          isDecoded  ? 'bg-green-500'                :
                       'bg-red-900',
        ].join(' ')}
      />

      {/* Mem address badge */}
      <div className="text-amber-800 mb-1 text-xs">{block.memAddr} · {block.shortLabel}</div>

      {/* Main content — scramble or static */}
      <pre
        className={[
          'whitespace-pre-wrap break-all leading-relaxed',
          isDecoded ? 'text-amber-300' : 'text-amber-700',
          animating ? 'text-amber-500' : '',
        ].join(' ')}
      >
        {lines.join('\n')}
      </pre>

      {/* Clickable links when decoded */}
      {isDecoded && !animating && block.content.links && (
        <div className="mt-2 space-y-1 border-t border-amber-900 pt-2">
          {block.content.links.map(link => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="block text-xs text-amber-500 hover:text-amber-200 underline underline-offset-2 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
