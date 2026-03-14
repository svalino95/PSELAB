'use client'
import { useState, useMemo } from 'react'
import styles from './SpectrumViewer.module.css'

// ─── Constants ────────────────────────────────────────────────
const W_MIN  = 350
const W_MAX  = 850
const STEP   = 2
const N      = (W_MAX - W_MIN) / STEP + 1

const SVG_W  = 800
const SVG_H  = 220
const PL     = 44
const PR     = 15
const PT     = 14
const PB     = 28
const CW     = SVG_W - PL - PR
const CHSVG  = SVG_H - PT - PB

// ─── Channel definitions ──────────────────────────────────────
// sigma ≈ 6 → FWHM ≈ 14nm (máximo 15nm requerido) para todos los picos LED
// Canal blanco modela SPD real de LED 3500K:
//   - pump azul ~455nm (~85% del pico de fósforo)
//   - fósforo principal ~565nm
//   - cola roja cálida ~660nm (característica 3500K)
const CHANNELS = [
  {
    key: 'uv',
    label: 'UV',
    nm: '365/395 nm',
    color: '#9D00FF',
    track: 'rgba(157,0,255,0.9)',
    dotMu: 380,
    peaks: [
      { mu: 365, sigma: 6, rel: 1.0 },
      { mu: 395, sigma: 6, rel: 1.0 },
    ]
  },
  {
    key: 'blue',
    label: 'Azul',
    nm: '455 nm',
    color: '#0066FF',
    track: 'rgba(0,102,255,0.9)',
    dotMu: 455,
    peaks: [
      { mu: 415, sigma: 6, rel: 0.80 },
      { mu: 435, sigma: 6, rel: 1.0  },
      { mu: 455, sigma: 6, rel: 1.0  },
      { mu: 480, sigma: 6, rel: 0.93 },
    ]
  },
  {
    key: 'white',
    label: 'Blanca',
    nm: '3500K',
    color: '#EEEEEE',
    track: 'rgba(220,220,220,0.7)',
    dotMu: 520,
    // SPD real de LED blanco 3500K:
    // - pump azul 455nm (contribuye ~85% del pico normalizado)
    // - fósforo principal estrecho centrado en 565nm
    // - cola roja cálida extendida centrada en 660nm (da el carácter 3500K)
    peaks: [
      { mu: 455, sigma: 12, rel: 0.93 },
      { mu: 520, sigma:  6, rel: 1.12 },
      { mu: 565, sigma: 45, rel: 1.0  },
      { mu: 660, sigma: 65, rel: 0.45 },
    ]
  },
  {
    key: 'red',
    label: 'Rojo',
    nm: '660 nm',
    color: '#FF2200',
    track: 'rgba(255,34,0,0.9)',
    dotMu: 660,
    peaks: [
      { mu: 635, sigma: 6, rel: 0.90 },
      { mu: 660, sigma: 6, rel: 1.0  },
      { mu: 680, sigma: 6, rel: 0.85 },
    ]
  },
  {
    key: 'ir',
    label: 'Infrarrojo',
    nm: '730 nm',
    color: '#8B1400',
    track: 'rgba(139,20,0,0.95)',
    dotMu: 730,
    peaks: [
      { mu: 730, sigma: 8, rel: 1.0 },
    ]
  },
]

// ─── Wavelength → RGB ─────────────────────────────────────────
function wlToRGB(wl) {
  if (wl < 380) return [88, 0, 255]
  if (wl < 440) { const t = (wl-380)/60;  return [Math.round(88-88*t), 0, 255] }
  if (wl < 490) { const t = (wl-440)/50;  return [0, Math.round(255*t), 255] }
  if (wl < 510) { const t = (wl-490)/20;  return [0, 255, Math.round(255-255*t)] }
  if (wl < 580) { const t = (wl-510)/70;  return [Math.round(255*t), 255, 0] }
  if (wl < 645) { const t = (wl-580)/65;  return [255, Math.round(255-255*t), 0] }
  if (wl < 700) return [255, 0, 0]
  if (wl < 780) { const t = (wl-700)/80;  return [Math.round(255-190*t), 0, 0] }
  return [65, 0, 0]
}

const GRAD_STOPS = []
for (let wl = W_MIN; wl <= W_MAX; wl += 8) {
  const [r,g,b] = wlToRGB(wl)
  const pct = ((wl - W_MIN) / (W_MAX - W_MIN) * 100).toFixed(1)
  GRAD_STOPS.push({ pct, rgb: `rgb(${r},${g},${b})` })
}

// ─── Gaussian ─────────────────────────────────────────────────
const gauss = (x, mu, sigma, amp) =>
  amp * Math.exp(-0.5 * ((x - mu) / sigma) ** 2)

// ─── Compute & normalize spectrum ────────────────────────────
// Normaliza para que el pico máximo siempre = 1.0 en el gráfico
function computePoints(vals) {
  const raw = new Array(N)
  for (let i = 0; i < N; i++) {
    const wl = W_MIN + i * STEP
    let y = 0
    CHANNELS.forEach(ch => {
      const v = vals[ch.key] / 100
      if (v > 0) {
        ch.peaks.forEach(pk => {
          y += gauss(wl, pk.mu, pk.sigma, v * pk.rel)
        })
      }
    })
    raw[i] = y
  }
  const maxVal = Math.max(...raw, 0.001)
  return { pts: raw.map(y => Math.min(y / maxVal, 1.0)), maxVal }
}

function toAreaPath(pts) {
  let d = `M ${PL} ${PT + CHSVG}`
  pts.forEach((y, i) => {
    const px = (PL + (i / (N - 1)) * CW).toFixed(1)
    const py = (PT + CHSVG - y * CHSVG).toFixed(1)
    d += ` L ${px} ${py}`
  })
  d += ` L ${(PL + CW).toFixed(1)} ${PT + CHSVG} Z`
  return d
}

// ─── SVG ──────────────────────────────────────────────────────
function SpectrumSVG({ values }) {
  const { pts, maxVal } = useMemo(() => computePoints(values), [values])
  const areaPath        = useMemo(() => toAreaPath(pts), [pts])

  const gridWls = [350, 406, 462, 518, 575, 631, 687, 743, 800, 850]

  return (
    <svg
      viewBox={`0 0 ${SVG_W} ${SVG_H}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sv-wl-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          {GRAD_STOPS.map((s, i) => (
            <stop key={i} offset={`${s.pct}%`} stopColor={s.rgb} />
          ))}
        </linearGradient>

        <filter id="sv-glow-halo" x="-20%" y="-40%" width="140%" height="180%">
          <feGaussianBlur stdDeviation="10" result="blur"/>
          <feMerge><feMergeNode in="blur"/></feMerge>
        </filter>

        <filter id="sv-glow-crisp" x="-5%" y="-20%" width="110%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        <clipPath id="sv-clip">
          <rect x={PL} y={PT} width={CW} height={CHSVG}/>
        </clipPath>
      </defs>

      {/* Background */}
      <rect width={SVG_W} height={SVG_H} fill="#060808"/>

      {/* Vertical grid + wavelength labels */}
      {gridWls.map(wl => {
        const x = (PL + ((wl - W_MIN) / (W_MAX - W_MIN)) * CW).toFixed(1)
        return (
          <g key={wl}>
            <line x1={x} y1={PT} x2={x} y2={PT + CHSVG}
              stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
            <text x={x} y={PT + CHSVG + 18}
              textAnchor="middle" fill="rgba(255,255,255,0.3)"
              fontSize="11" fontFamily="monospace">{wl}</text>
          </g>
        )
      })}

      {/* Horizontal grid + Y labels */}
      {[0.25, 0.5, 0.75, 1.0].map(v => {
        const y = (PT + CHSVG - v * CHSVG).toFixed(1)
        return (
          <g key={v}>
            <line x1={PL} y1={y} x2={PL + CW} y2={y}
              stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
            <text x={PL - 7} y={+y + 4}
              textAnchor="end" fill="rgba(255,255,255,0.2)"
              fontSize="10" fontFamily="monospace">{v}</text>
          </g>
        )
      })}

      {/* Halo glow */}
      <g clipPath="url(#sv-clip)">
        <path d={areaPath} fill="url(#sv-wl-grad)"
          filter="url(#sv-glow-halo)" opacity="0.45"/>
      </g>

      {/* Main fill */}
      <g clipPath="url(#sv-clip)">
        <path d={areaPath} fill="url(#sv-wl-grad)"
          filter="url(#sv-glow-crisp)" opacity="0.88"/>
      </g>

      {/* Baseline */}
      <line x1={PL} y1={PT + CHSVG} x2={PL + CW} y2={PT + CHSVG}
        stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>

      {/* Channel peak dots (posición normalizada) */}
      {CHANNELS.map(ch => {
        const v = values[ch.key]
        if (v < 4) return null
        const maxRel  = Math.max(...ch.peaks.map(p => p.rel))
        const dotPeak = ch.peaks.find(p => p.rel === maxRel)
        const amp     = ((v / 100) * maxRel) / maxVal
        const xPos    = PL + ((dotPeak.mu - W_MIN) / (W_MAX - W_MIN)) * CW
        const yPos    = PT + CHSVG - Math.min(amp, 1.0) * CHSVG
        return (
          <g key={ch.key}>
            <circle cx={xPos} cy={yPos} r="4" fill={ch.color} opacity="0.95"/>
            <line x1={xPos} y1={yPos + 5} x2={xPos} y2={PT + CHSVG}
              stroke={ch.color} strokeWidth="0.5" opacity="0.2" strokeDasharray="3 4"/>
          </g>
        )
      })}

      {/* μmol label */}
      <text x={SVG_W / 2} y={SVG_H - 2}
        textAnchor="middle" fill="rgba(255,255,255,0.18)"
        fontSize="10" fontFamily="monospace">μmol/s/nm</text>
    </svg>
  )
}

// ─── Presets ──────────────────────────────────────────────────
// Floración: rojo 660nm = pico máximo del espectro
// Azul 455nm ≈ 5% menor que rojo (tras normalización)
// UV ≈ 50% del pico azul
const PRESETS = [
  { label: 'OFF',        vals: { uv: 0,  blue: 0,   white: 0,  red: 0,   ir: 0  } },
  { label: 'Vegetativo', vals: { uv: 30, blue: 100, white: 70, red: 35,  ir: 10 } },
  { label: 'Floración',  vals: { uv: 48, blue: 93,  white: 45, red: 100, ir: 35 } },
  { label: 'Full',       vals: { uv: 65, blue: 93,  white: 75, red: 100, ir: 55 } },
]

const ZERO = { uv: 0, blue: 0, white: 0, red: 0, ir: 0 }

// ─── Exported component ───────────────────────────────────────
export function SpectrumViewer({ initialValues = ZERO }) {
  const [values, setValues] = useState({ ...ZERO, ...initialValues })

  const totalPower = Math.round(
    values.uv * 0.8 + values.blue * 1.5 +
    values.white * 4.0 + values.red * 2.5 + values.ir * 1.2
  )
  const activeCount = Object.values(values).filter(v => v > 0).length

  const set         = (key, v) => setValues(prev => ({ ...prev, [key]: +v }))
  const applyPreset = vals     => setValues({ ...ZERO, ...vals })

  return (
    <div className={styles.viewer}>
      <div className={styles.graphWrap}>
        <SpectrumSVG values={values} />
      </div>

      <div className={styles.statsBar}>
        <div className={styles.stat}>
          <span className={styles.statVal}>
            {totalPower}<span className={styles.statSub}>W</span>
          </span>
          <span className={styles.statLabel}>Potencia de luz</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statVal}>
            {activeCount}<span className={styles.statSub}>/5</span>
          </span>
          <span className={styles.statLabel}>Canales activos</span>
        </div>
        <div className={styles.presets}>
          {PRESETS.map(p => (
            <button
              key={p.label}
              className={styles.presetBtn}
              onClick={() => applyPreset(p.vals)}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.sliderPanel}>
        {CHANNELS.map(ch => (
          <div key={ch.key} className={styles.channelRow}>
            <div className={styles.chMeta}>
              <span
                className={styles.chDot}
                style={{
                  background: ch.color,
                  boxShadow: values[ch.key] > 0 ? `0 0 8px ${ch.color}` : 'none',
                }}
              />
              <span className={styles.chLabel}>{ch.label}</span>
              <span className={styles.chNm}>{ch.nm}</span>
            </div>

            <input
              type="range"
              min={0} max={100}
              value={values[ch.key]}
              className={styles.slider}
              style={{ '--p': `${values[ch.key]}%`, '--c': ch.track }}
              onChange={e => set(ch.key, e.target.value)}
              aria-label={`${ch.label} ${ch.nm} intensidad`}
            />

            <span className={styles.chPct}>{values[ch.key]}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
