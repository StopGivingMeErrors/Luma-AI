import { useEffect, useRef, useState } from 'react'

function LiquidBlob({ animate }: { animate: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
      <div
        className={`absolute h-[72%] w-[72%] rounded-full bg-accent/20 blur-3xl ${animate ? 'blob-morph' : ''}`}
      />
      <div
        className={`absolute h-[58%] w-[58%] translate-x-[8%] -translate-y-[6%] rounded-full bg-warn/10 blur-2xl ${animate ? 'blob-morph-slow' : ''}`}
      />
      <div
        className={`absolute h-[42%] w-[42%] -translate-x-[10%] translate-y-[12%] rounded-full bg-accent-dim/50 blur-xl ${animate ? 'blob-morph' : ''}`}
      />
      {animate && (
        <style>{`
          @keyframes blobMorph {
            0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: scale(1) rotate(0deg); }
            33% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; transform: scale(1.05) rotate(3deg); }
            66% { border-radius: 50% 50% 40% 60% / 40% 60% 50% 50%; transform: scale(0.97) rotate(-2deg); }
          }
          .blob-morph { animation: blobMorph 12s ease-in-out infinite; }
          .blob-morph-slow { animation: blobMorph 18s ease-in-out infinite reverse; }
        `}</style>
      )}
    </div>
  )
}

/** ASCII sphere — light ink on dark canvas */
export function AnimatedBlob({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef(0)
  const [animate, setAnimate] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setAnimate(!mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const chars = '·∘○◦∙•░▒▓'
    let time = 0
    let dpr = 1

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      canvas.width = Math.max(1, Math.floor(rect.width * dpr))
      canvas.height = Math.max(1, Math.floor(rect.height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const drawFrame = (t: number) => {
      const rect = canvas.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      ctx.clearRect(0, 0, w, h)

      const centerX = w / 2
      const centerY = h / 2
      const radius = Math.min(w, h) * 0.42

      ctx.font = '11px ui-monospace, SFMono-Regular, Menlo, monospace'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      const points: { x: number; y: number; z: number; char: string }[] = []

      for (let phi = 0; phi < Math.PI * 2; phi += 0.18) {
        for (let theta = 0; theta < Math.PI; theta += 0.18) {
          const x = Math.sin(theta) * Math.cos(phi + t * 0.45)
          const y = Math.sin(theta) * Math.sin(phi + t * 0.45)
          const z = Math.cos(theta)

          const rotY = t * 0.28
          const newX = x * Math.cos(rotY) - z * Math.sin(rotY)
          const newZ = x * Math.sin(rotY) + z * Math.cos(rotY)

          const rotX = t * 0.18
          const newY = y * Math.cos(rotX) - newZ * Math.sin(rotX)
          const finalZ = y * Math.sin(rotX) + newZ * Math.cos(rotX)

          const depth = (finalZ + 1) / 2
          const charIndex = Math.floor(depth * (chars.length - 1))

          points.push({
            x: centerX + newX * radius,
            y: centerY + newY * radius,
            z: finalZ,
            char: chars[charIndex],
          })
        }
      }

      points.sort((a, b) => a.z - b.z)

      for (const point of points) {
        const depthT = (point.z + 1) / 2
        const alpha = 0.18 + depthT * 0.7
        ctx.fillStyle = `rgba(180, 255, 220, ${alpha})`
        ctx.fillText(point.char, point.x, point.y)
      }
    }

    resize()
    window.addEventListener('resize', resize)

    if (!animate) {
      drawFrame(0.8)
      return () => window.removeEventListener('resize', resize)
    }

    const render = () => {
      drawFrame(time)
      time += 0.016
      frameRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(frameRef.current)
    }
  }, [animate])

  return (
    <div className={`relative ${className}`}>
      <LiquidBlob animate={animate} />
      <canvas
        ref={canvasRef}
        className="relative z-10 h-full w-full"
        style={{ display: 'block' }}
        aria-hidden
      />
    </div>
  )
}
