"use client"

import { useEffect, useRef } from "react"

interface TrailDot {
  x: number
  y: number
  alpha: number
  size: number
}

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -200, y: -200 })
  const trail = useRef<TrailDot[]>([])
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener("mousemove", onMove)

    const TRAIL_LENGTH = 28
    const BASE_SIZE = 12

    const render = () => {
      rafRef.current = requestAnimationFrame(render)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 先頭に現在のマウス位置を追加
      trail.current.unshift({
        x: mouse.current.x,
        y: mouse.current.y,
        alpha: 1,
        size: BASE_SIZE,
      })

      // 長さ制限
      if (trail.current.length > TRAIL_LENGTH) {
        trail.current = trail.current.slice(0, TRAIL_LENGTH)
      }

      // 描画
      trail.current.forEach((dot, i) => {
        const progress = i / TRAIL_LENGTH
        const alpha = (1 - progress) * 0.55
        const size = BASE_SIZE * (1 - progress * 0.7)

        // 外側グロー
        const glow = ctx.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, size * 3)
        glow.addColorStop(0, `rgba(70, 102, 255, ${alpha * 0.6})`)
        glow.addColorStop(0.4, `rgba(70, 102, 255, ${alpha * 0.2})`)
        glow.addColorStop(1, "rgba(70, 102, 255, 0)")
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, size * 3, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()

        // コア
        const core = ctx.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, size)
        core.addColorStop(0, `rgba(180, 200, 255, ${alpha})`)
        core.addColorStop(0.5, `rgba(70, 102, 255, ${alpha * 0.7})`)
        core.addColorStop(1, "rgba(70, 102, 255, 0)")
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2)
        ctx.fillStyle = core
        ctx.fill()
      })

      // カーソル本体リング
      if (trail.current.length > 0) {
        const head = trail.current[0]
        ctx.beginPath()
        ctx.arc(head.x, head.y, 4, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
        ctx.fill()
      }
    }

    render()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9998, mixBlendMode: "screen" }}
    />
  )
}
