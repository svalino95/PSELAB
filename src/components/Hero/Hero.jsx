import { useEffect, useRef } from 'react'
import styles from './Hero.module.css'

function PCBCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)

    const W = () => canvas.width
    const H = () => canvas.height

    const nodes = []
    const rebuild = () => {
      nodes.length = 0
      const n = Math.floor((W() * H()) / 12000)
      for (let i = 0; i < n; i++) {
        nodes.push({
          x: Math.random() * W(), y: Math.random() * H(),
          connections: [],
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.008 + Math.random() * 0.015,
        })
      }
      nodes.forEach((node, i) => {
        const near = nodes
          .map((n, j) => ({ n, j, d: Math.hypot(n.x - node.x, n.y - node.y) }))
          .filter(({ d, j }) => j !== i && d < 200)
          .sort((a, b) => a.d - b.d).slice(0, 2)
        node.connections = near.map(({ j }) => j)
      })
    }
    rebuild()
    window.addEventListener('resize', rebuild)

    const pulses = []
    const addPulse = () => {
      const s = nodes[Math.floor(Math.random() * nodes.length)]
      if (s?.connections.length)
        pulses.push({ from: nodes.indexOf(s), to: s.connections[0], progress: 0, speed: 0.003 + Math.random() * 0.005 })
    }

    let frame = 0
    const draw = () => {
      ctx.clearRect(0, 0, W(), H())
      if (frame % 35 === 0 && pulses.length < 15) addPulse()
      frame++

      // Traces
      nodes.forEach(node => {
        node.connections.forEach(ti => {
          const t = nodes[ti]
          ctx.beginPath(); ctx.moveTo(node.x, node.y)
          ctx.lineTo(t.x, node.y); ctx.lineTo(t.x, t.y)
          ctx.strokeStyle = 'rgba(0,200,255,0.14)'; ctx.lineWidth = 1; ctx.stroke()
        })
      })

      // Pads
      nodes.forEach(node => {
        node.pulse += node.pulseSpeed
        const a = 0.25 + 0.2 * Math.sin(node.pulse)
        ctx.beginPath(); ctx.arc(node.x, node.y, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,200,255,${a})`; ctx.fill()
      })

      // Travelling pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i]; p.progress += p.speed
        if (p.progress >= 1) { pulses.splice(i, 1); continue }
        const from = nodes[p.from], to = nodes[p.to]
        if (!from || !to) { pulses.splice(i, 1); continue }
        const dh = Math.abs(to.x - from.x), dv = Math.abs(to.y - from.y), total = dh + dv
        const t = p.progress; let px, py
        if (total === 0) { px = from.x; py = from.y }
        else {
          const r = dh / total
          if (t < r) { px = from.x + (to.x - from.x) * (t / r); py = from.y }
          else       { px = to.x; py = from.y + (to.y - from.y) * ((t - r) / (1 - r)) }
        }
        ctx.beginPath(); ctx.arc(px, py, 3.5, 0, Math.PI * 2)
        ctx.fillStyle = '#00C8FF'; ctx.shadowColor = '#00C8FF'; ctx.shadowBlur = 10
        ctx.fill(); ctx.shadowBlur = 0
      }
    }

    const id = setInterval(draw, 1000 / 30)
    return () => { clearInterval(id); window.removeEventListener('resize', resize); window.removeEventListener('resize', rebuild) }
  }, [])

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
}

export default function Hero() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" className={styles.hero}>
      {/* ── LIGHT TOP ── */}
      <div className={styles.top}>
        <div className={styles.topInner}>
          <p className={styles.eyebrow}>PS-ELAB — Electronic Labs · Argentina</p>

          <h1 className={styles.headline}>
            Diseñamos<br />
            <span className={styles.headlineCyan}>Plaquetas</span><br />
            Electrónicas
          </h1>

          <div className={styles.sub}>
            <p className={styles.subText}>
              Desarrollo de hardware electrónico a medida para domótica,
              iluminación y sistemas embebidos. Desde el esquemático hasta
              la producción en serie.
            </p>
            <div className={styles.ctaGroup}>
              <button className="btn btn-filled-dark" onClick={() => scrollTo('especialidades')}>
                Ver Especialidades
              </button>
              <button className="btn btn-outline-dark" onClick={() => scrollTo('contacto')}>
                Consultanos
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── DARK STRIP: canvas ── */}
      <div className={styles.dark}>
        <PCBCanvas />
        <div className={styles.darkOverlay} aria-hidden="true" />

        <div className={styles.statsBar} aria-label="Datos de PS-ELAB">
          <div className={styles.stat}>
            <span className={styles.statNum}>+50</span>
            <span className={styles.statLabel}>Proyectos entregados</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>3</span>
            <span className={styles.statLabel}>Especialidades</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>&lt;24 hs</span>
            <span className={styles.statLabel}>Tiempo de respuesta</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>100%</span>
            <span className={styles.statLabel}>Diseño propio</span>
          </div>
        </div>
      </div>
    </section>
  )
}
