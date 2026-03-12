import { useEffect, useRef } from 'react'
import styles from './Hero.module.css'

function PCBCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // PCB trace nodes
    const nodes = []
    const numNodes = Math.floor((canvas.width * canvas.height) / 18000)

    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        connections: [],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.02,
      })
    }

    // Build connections (Manhattan-style PCB traces)
    nodes.forEach((node, i) => {
      const nearby = nodes
        .map((n, j) => ({ n, j, dist: Math.hypot(n.x - node.x, n.y - node.y) }))
        .filter(({ dist, j }) => j !== i && dist < 180)
        .sort((a, b) => a.dist - b.dist)
        .slice(0, 2)
      node.connections = nearby.map(({ j }) => j)
    })

    // Travelling pulses on traces
    const pulses = []
    const addPulse = () => {
      const startNode = nodes[Math.floor(Math.random() * nodes.length)]
      if (startNode.connections.length > 0) {
        pulses.push({
          from: nodes.indexOf(startNode),
          to: startNode.connections[Math.floor(Math.random() * startNode.connections.length)],
          progress: 0,
          speed: 0.004 + Math.random() * 0.006,
          color: Math.random() > 0.5 ? '#00D4FF' : '#00FF88',
        })
      }
    }

    let frame = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (frame % 40 === 0 && pulses.length < 12) addPulse()
      frame++

      // Draw traces
      nodes.forEach(node => {
        node.connections.forEach(targetIdx => {
          const target = nodes[targetIdx]
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          // Manhattan routing: go horizontal then vertical
          ctx.lineTo(target.x, node.y)
          ctx.lineTo(target.x, target.y)
          ctx.strokeStyle = 'rgba(0, 212, 255, 0.12)'
          ctx.lineWidth = 1
          ctx.stroke()
        })
      })

      // Draw nodes (pads)
      nodes.forEach(node => {
        node.pulse += node.pulseSpeed
        const alpha = 0.3 + 0.2 * Math.sin(node.pulse)
        ctx.beginPath()
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 212, 255, ${alpha})`
        ctx.fill()
      })

      // Draw travelling pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i]
        p.progress += p.speed
        if (p.progress >= 1) { pulses.splice(i, 1); continue }

        const from = nodes[p.from]
        const to = nodes[p.to]
        // Manhattan path
        const midX = to.x
        const midY = from.y
        const totalDist = Math.abs(to.x - from.x) + Math.abs(to.y - from.y)
        const firstSegDist = Math.abs(to.x - from.x)
        const t = p.progress
        let px, py
        if (totalDist === 0) { px = from.x; py = from.y }
        else {
          const ratio = firstSegDist / totalDist
          if (t < ratio) {
            const localT = ratio === 0 ? 0 : t / ratio
            px = from.x + (midX - from.x) * localT
            py = from.y
          } else {
            const localT = ratio === 1 ? 0 : (t - ratio) / (1 - ratio)
            px = midX
            py = midY + (to.y - midY) * localT
          }
        }

        ctx.beginPath()
        ctx.arc(px, py, 3, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.shadowColor = p.color
        ctx.shadowBlur = 8
        ctx.fill()
        ctx.shadowBlur = 0
      }
    }

    const id = setInterval(draw, 1000 / 30)
    return () => {
      clearInterval(id)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
}

export default function Hero() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className={styles.hero}>
      <PCBCanvas />
      <div className={styles.gridOverlay} aria-hidden="true" />
      <div className={styles.vignette} aria-hidden="true" />

      <div className={styles.content}>
        <p className={styles.eyebrow}>PS-ELAB — Electronic Labs · Argentina</p>

        <h1 className={styles.headline}>
          Ingeniería<br />
          <span className={styles.headlineAccent}>Electrónica</span><br />
          a Medida
        </h1>

        <p className={styles.subheadline}>
          Diseño y fabricación de plaquetas electrónicas para domótica,
          iluminación y desarrollo modular. Desde el esquemático hasta
          la producción.
        </p>

        <div className={styles.ctaGroup}>
          <button
            className="btn-primary"
            onClick={() => scrollTo('especialidades')}
            aria-label="Ver nuestras especialidades"
          >
            Ver Especialidades
          </button>
          <button
            className="btn-secondary"
            onClick={() => scrollTo('contacto')}
            aria-label="Contactar a PS-ELAB"
          >
            Contactanos
          </button>
        </div>

        <div className={styles.stats} aria-label="Estadísticas de PS-ELAB">
          <div className={styles.stat}>
            <span className={styles.statNumber}>+50</span>
            <span className={styles.statLabel}>Proyectos entregados</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>3</span>
            <span className={styles.statLabel}>Especialidades</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>{'<24h'}</span>
            <span className={styles.statLabel}>Tiempo de respuesta</span>
          </div>
        </div>
      </div>

      <div className={styles.scrollIndicator} aria-hidden="true">
        <div className={styles.scrollLine} />
        <span>scroll</span>
      </div>
    </section>
  )
}
