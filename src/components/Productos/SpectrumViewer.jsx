'use client'
import { useState, useMemo } from 'react'
import styles from './SpectrumViewer.module.css'

// ─── Constants ────────────────────────────────────────────────
const W_MIN  = 380
const W_MAX  = 780
const STEP   = 2
const N      = (W_MAX - W_MIN) / STEP + 1   // 201 sample points

const SVG_W  = 800
const SVG_H  = 220
const PL     = 44   // pad left
const PR     = 15   // pad right
const PT     = 14   // pad top
const PB     = 28   // pad bottom
const CW     = SVG_W - PL - PR
const CHSVG  = SVG_H - PT - PB

// ─── Channel definitions ──────────────────────────────────────
const CHANNELS = [
  { key: 'uv',   label: 'UV',         nm: '395 nm', mu: 395, sigma: 12, color: '#9D00FF', track: 'rgba(157,0,255,0.9)'   },
  { key: 'blue', label: 'Azul',       nm: '460 nm', mu: 460, sigma: 18, color: '#0088FF', track: 'rgba(0,136,255,0.9)'   },
  { key: 'white',label: 'Blanca',     nm: '550 nm', mu: 550, sigma: 90, color: '#EEEEEE', track: 'rgba(220,220,220,0.7)' },
  { key: 'red',  label: 'Rojo',       nm: '660 nm', mu: 660, sigma: 16, color: '#FF2200', track: 'rgba(255,34,0,0.9)'    },
  { key: 'ir',   label: 'Infrarrojo', nm: '740 nm', mu: 740, sigma: 12, color: '#8B1400', track: 'rgba(139,20,0,0.95)'   },
]

// ─── Wavelength → RGB (for spectrum gradient) ─────────────────
function wlToRGB(wl) {
  if (wl < 380) return [88, 0, 255]
  if (wl < 440) { const t = (wl-380)/60;  return [Math.round(88-88*t), 0, 255] }
  if (wl < 490) { const t = (wl-440)/50;  return [0, Math.round(255*t), 255] }
  if (wl < 510) { const t = (wl-490)/20;  return [0, 255, Math.round(255-255*t)] }
  if (wl < 580) { const t = (wl-510)/70;  return [Math.round(255*t), 255, 0] }
  if (wl < 645) { const t = (wl-580)/65;  return [255, Math.round(255-255*t), 0] }
  if (wl < 700) return [255, 0, 0]
  if (wl < 750) { const t = (wl-700)/50;  return [Math.round(255-190*t), 0, 0] }
  return [65, 0, 0]
}

// Pre-compute gradient stops every 8 nm
const GRAD_STOPS = []
for (let wl = W_MIN; wl <= W_MAX; wl += 8) {
  const [r,g,b] = wlToRGB(wl)
  const pct = ((wl - W_MIN) / (W_MAX - W_MIN) * 100).toFixed(1)
  GRAD_STOPS.push({ pct, rgb: `rgb(${r},${g},${b})` })
}

// ─── Gaussian ─────────────────────────────────────────────────
const gauss = (x, mu, sigma, amp) =>
  amp * Math.exp(-0.5 * ((x - mu) / sigma) ** 2)

function computePoints(vals) {
  const pts = []
  for (let i = 0; i < N; i++) {
    const wl = W_MIN + i * STEP
    let y = 0
    CHANNELS.forEach(ch => {
      const v = vals[ch.key] / 100
      if (v > 0) {
        const amp = ch.key === 'white' ? v * 0.58 : v
        y += gauss(wl, ch.mu, ch.sigma, amp)
      }
    })
    pts.push(Math.min(y, 1.15))
  }
  return pts
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
  const pts      = useMemo(() => computePoints(values), [values])
  const areaPath = useMemo(() => toAreaPath(pts), [pts])

  const gridWls = [400, 430, 480, 530, 580, 630, 680, 730, 780]

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

        {/* Soft glow — wide blur for outer halo */}
        <filter id="sv-glow-halo" x="-20%" y="-40%" width="140%" height="180%">
          <feGaussianBlur stdDeviation="10" result="blur"/>
          <feMerge><feMergeNode in="blur"/></feMerge>
        </filter>

        {/* Crisp glow on top of fill */}
        <filter id="sv-glow-crisp" x="-5%" y="-20%" width="110%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* Clip to chart area */}
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

      {/* Horizontal grid + Y axis labels */}
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

      {/* Halo glow layer */}
      <g clipPath="url(#sv-clip)">
        <path d={areaPath} fill="url(#sv-wl-grad)"
          filter="url(#sv-glow-halo)" opacity="0.45"/>
      </g>

      {/* Main spectrum fill with crisp glow */}
      <g clipPath="url(#sv-clip)">
        <path d={areaPath} fill="url(#sv-wl-grad)"
          filter="url(#sv-glow-crisp)" opacity="0.88"/>
      </g>

      {/* Baseline */}
      <line x1={PL} y1={PT + CHSVG} x2={PL + CW} y2={PT + CHSVG}
        stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>

      {/* Channel peak dots */}
      {CHANNELS.map(ch => {
        const v = values[ch.key]
        if (v < 4) return null
        const amp  = ch.key === 'white' ? (v/100)*0.58 : v/100
        const xPos = PL + ((ch.mu - W_MIN) / (W_MAX - W_MIN)) * CW
        const yPos = PT + CHSVG - Math.min(amp, 1.15) * CHSVG
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
const PRESETS = [
  { label: 'OFF',        vals: { uv:0,  blue:0,  white:0,  red:0,   ir:0  } },
  { label: 'Vegetativo', vals: { uv:20, blue:80, white:70, red:30,  ir:10 } },
  { label: 'Floración',  vals: { uv:15, blue:30, white:50, red:100, ir:70 } },
  { label: 'Full',       vals: { uv:70, blue:90, white:80, red:90,  ir:60 } },
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

  const set     = (key, v)  => setValues(prev => ({ ...prev, [key]: +v }))
  const applyPreset = vals  => setValues({ ...ZERO, ...vals })

  return (
    <div className={styles.viewer}>
      {/* Spectrum graph */}
      <div className={styles.graphWrap}>
        <SpectrumSVG values={values} />
      </div>

      {/* Stats bar */}
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

      {/* Channel sliders */}
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
