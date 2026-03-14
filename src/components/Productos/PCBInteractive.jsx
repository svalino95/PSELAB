'use client'
import { useState } from 'react'
import styles from './PCBInteractive.module.css'

// ═══════════════════════════════════════════════════════════════
// 1. DRIVER LED 12CH
// ═══════════════════════════════════════════════════════════════

const DL_PADS = [
  { x: 50,  y: 85  }, { x: 50,  y: 150 }, { x: 50,  y: 215 }, // left
  { x: 120, y: 22  }, { x: 200, y: 22  }, { x: 280, y: 22  }, // top
  { x: 350, y: 85  }, { x: 350, y: 150 }, { x: 350, y: 215 }, // right
  { x: 120, y: 278 }, { x: 200, y: 278 }, { x: 280, y: 278 }, // bottom
]

function DriverLEDSVG({ channels }) {
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <filter id="dl-chip">
          <feGaussianBlur stdDeviation="2.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        {channels.map((v, i) => v > 0 && (
          <filter key={i} id={`dl-pad-${i}`}>
            <feGaussianBlur stdDeviation={1.5 + v * 0.07} result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        ))}
        {/* Grid pattern */}
        <pattern id="dl-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(204,0,255,0.05)" strokeWidth="0.5"/>
        </pattern>
      </defs>

      {/* Board */}
      <rect x="60" y="36" width="280" height="228" rx="5" fill="#1B3D1F" stroke="#2A5A2E" strokeWidth="1.5"/>
      <rect x="60" y="36" width="280" height="228" rx="5" fill="url(#dl-grid)"/>
      <rect x="60" y="36" width="280" height="228" rx="5" fill="none" stroke="rgba(204,0,255,0.1)" strokeWidth="1"/>

      {/* Mounting holes */}
      {[[70,46],[330,46],[70,254],[330,254]].map(([cx,cy],i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="5.5" fill="#0A1A0A" stroke="#2A5A2E" strokeWidth="1"/>
          <circle cx={cx} cy={cy} r="2.5" fill="none" stroke="#3A6A3E" strokeWidth="0.7"/>
        </g>
      ))}

      {/* MCU */}
      <rect x="148" y="108" width="104" height="84" rx="3" fill="#080814" stroke="rgba(204,0,255,0.55)" strokeWidth="1.5" filter="url(#dl-chip)"/>
      {[0,1,2,3,4,5].map(i => <line key={i} x1={158+i*15} y1={108} x2={158+i*15} y2={100} stroke="rgba(204,0,255,0.35)" strokeWidth="0.9"/>)}
      {[0,1,2,3,4,5].map(i => <line key={i} x1={158+i*15} y1={192} x2={158+i*15} y2={200} stroke="rgba(204,0,255,0.35)" strokeWidth="0.9"/>)}
      {[0,1,2].map(i => <line key={i} x1={148} y1={120+i*22} x2={140} y2={120+i*22} stroke="rgba(204,0,255,0.35)" strokeWidth="0.9"/>)}
      {[0,1,2].map(i => <line key={i} x1={252} y1={120+i*22} x2={260} y2={120+i*22} stroke="rgba(204,0,255,0.35)" strokeWidth="0.9"/>)}
      <text x="200" y="146" textAnchor="middle" fill="#CC00FF" fontSize="9" fontFamily="monospace" fontWeight="bold" filter="url(#dl-chip)">STM32</text>
      <text x="200" y="158" textAnchor="middle" fill="rgba(204,0,255,0.55)" fontSize="6.5" fontFamily="monospace">F405RGT6</text>

      {/* PWM driver */}
      <rect x="82" y="112" width="48" height="28" rx="2" fill="#0A0A1A" stroke="rgba(204,0,255,0.28)" strokeWidth="1"/>
      <text x="106" y="129" textAnchor="middle" fill="rgba(204,0,255,0.5)" fontSize="5.5" fontFamily="monospace">TLC5947</text>

      {/* LED output pads + active traces */}
      {DL_PADS.map((pos, i) => {
        const pct = (channels[i] ?? 0) / 100
        return (
          <g key={i}>
            {pct > 0 && (
              <line
                x1={200} y1={150}
                x2={pos.x} y2={pos.y}
                stroke={`rgba(204,0,255,${pct * 0.4})`}
                strokeWidth="1"
                strokeDasharray="3 4"
              />
            )}
            <circle
              cx={pos.x} cy={pos.y} r="14"
              fill={pct > 0 ? `rgba(204,0,255,${0.07 + pct * 0.22})` : 'rgba(27,61,31,0.5)'}
              stroke={pct > 0 ? `rgba(204,0,255,${0.3 + pct * 0.6})` : 'rgba(204,0,255,0.15)'}
              strokeWidth="1.5"
              filter={pct > 0 ? `url(#dl-pad-${i})` : undefined}
            />
            <circle
              cx={pos.x} cy={pos.y} r="5"
              fill={pct > 0 ? `rgba(230,120,255,${pct})` : '#0A1A0A'}
              stroke={pct > 0 ? 'rgba(255,255,255,0.8)' : '#2A5A2E'}
              strokeWidth="0.8"
            />
            <text x={pos.x} y={pos.y + 24} textAnchor="middle" fill="rgba(255,255,255,0.22)" fontSize="5.5" fontFamily="monospace">
              {`CH${String(i+1).padStart(2,'0')}`}
            </text>
          </g>
        )
      })}

      <text x="200" y="293" textAnchor="middle" fill="rgba(204,0,255,0.22)" fontSize="5.5" fontFamily="monospace" fontWeight="bold">
        PS·ELAB — DRIVER LED 12CH v2.1
      </text>
    </svg>
  )
}

export function DriverLEDController() {
  const [channels, setChannels] = useState(Array(12).fill(0))
  const activeCount = channels.filter(v => v > 0).length
  const totalPower  = Math.round(channels.reduce((s, v) => s + (v / 100) * 72, 0))

  const setChannel = (i, val) => setChannels(prev => { const n = [...prev]; n[i] = +val; return n })
  const setAll     = v => setChannels(Array(12).fill(v))

  return (
    <div className={styles.viewer}>
      <div className={styles.svgWrap}><DriverLEDSVG channels={channels}/></div>

      <div className={styles.statsBar}>
        <div className={styles.stat}>
          <span className={styles.statVal}>{activeCount}<span className={styles.statSub}>/12</span></span>
          <span className={styles.statLabel}>Canales activos</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statVal}>{totalPower}<span className={styles.statSub}>W</span></span>
          <span className={styles.statLabel}>Potencia estimada</span>
        </div>
        <div className={styles.presets}>
          <button className={styles.presetBtn} onClick={() => setAll(0)}>OFF</button>
          <button className={styles.presetBtn} onClick={() => setAll(50)}>50%</button>
          <button className={styles.presetBtn} onClick={() => setAll(100)}>MAX</button>
        </div>
      </div>

      <div className={styles.channelGrid}>
        {channels.map((val, i) => (
          <div key={i} className={styles.channelSlider}>
            <div className={styles.chHeader}>
              <span className={styles.chName}>{`CH${String(i+1).padStart(2,'0')}`}</span>
              <span className={styles.chVal}>{val}%</span>
            </div>
            <input
              type="range" min={0} max={100} value={val}
              className={styles.slider}
              style={{'--p': `${val}%`}}
              onChange={e => setChannel(i, e.target.value)}
              aria-label={`Canal ${i+1} PWM`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// 2. RELAY BOARD 8CH
// ═══════════════════════════════════════════════════════════════

const RLY_POS = [
  { x: 60,  y: 80  }, { x: 140, y: 80  }, { x: 220, y: 80  }, { x: 300, y: 80  },
  { x: 60,  y: 200 }, { x: 140, y: 200 }, { x: 220, y: 200 }, { x: 300, y: 200 },
]

function RelayBoardSVG({ relays }) {
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <filter id="rly-glow">
          <feGaussianBlur stdDeviation="3.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="rly-soft">
          <feGaussianBlur stdDeviation="1.8" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <pattern id="rly-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(204,0,255,0.04)" strokeWidth="0.5"/>
        </pattern>
      </defs>

      {/* Board */}
      <rect x="20" y="20" width="360" height="260" rx="5" fill="#1B3D1F" stroke="#2A5A2E" strokeWidth="1.5"/>
      <rect x="20" y="20" width="360" height="260" rx="5" fill="url(#rly-grid)"/>
      <rect x="20" y="20" width="360" height="260" rx="5" fill="none" stroke="rgba(204,0,255,0.08)" strokeWidth="1"/>

      {/* Mounting holes */}
      {[[30,30],[370,30],[30,270],[370,270]].map(([cx,cy],i) => (
        <circle key={i} cx={cx} cy={cy} r="5" fill="#0A1A0A" stroke="#2A5A2E" strokeWidth="1"/>
      ))}

      {/* RS485 chip */}
      <rect x="340" y="110" width="30" height="60" rx="2" fill="#0A0A1A" stroke="rgba(204,0,255,0.35)" strokeWidth="1" filter="url(#rly-soft)"/>
      <text x="355" y="143" textAnchor="middle" fill="rgba(204,0,255,0.65)" fontSize="6" fontFamily="monospace" transform="rotate(90 355 143)">MAX485</text>

      {/* Optocoupler bank */}
      <rect x="340" y="80" width="30" height="22" rx="2" fill="#0A0A1A" stroke="rgba(204,0,255,0.2)" strokeWidth="1"/>
      <text x="355" y="93" textAnchor="middle" fill="rgba(204,0,255,0.4)" fontSize="5" fontFamily="monospace">PC817</text>

      {/* Bus rails */}
      <line x1="38" y1="140" x2="335" y2="140" stroke="rgba(184,115,51,0.35)" strokeWidth="1.5" strokeDasharray="6 3"/>
      <line x1="38" y1="145" x2="335" y2="145" stroke="rgba(184,115,51,0.25)" strokeWidth="1" strokeDasharray="6 3"/>

      {/* Relay modules */}
      {RLY_POS.map((pos, i) => {
        const on = relays[i]
        return (
          <g key={i}>
            {/* Relay body */}
            <rect
              x={pos.x - 30} y={pos.y - 38}
              width="60" height="76" rx="3"
              fill={on ? 'rgba(204,0,255,0.07)' : '#0A140A'}
              stroke={on ? 'rgba(204,0,255,0.65)' : 'rgba(204,0,255,0.18)'}
              strokeWidth="1.2"
              filter={on ? 'url(#rly-soft)' : undefined}
            />
            {/* Coil label */}
            <rect x={pos.x-22} y={pos.y-30} width="44" height="18" rx="1"
              fill={on ? 'rgba(204,0,255,0.15)' : 'rgba(0,0,0,0.35)'}
              stroke={on ? 'rgba(204,0,255,0.4)' : 'rgba(255,255,255,0.07)'}
              strokeWidth="0.7"
            />
            <text x={pos.x} y={pos.y-18} textAnchor="middle" fill={on ? 'rgba(204,0,255,0.8)' : 'rgba(255,255,255,0.15)'} fontSize="6" fontFamily="monospace">COIL</text>
            {/* Contact indicator */}
            <circle
              cx={pos.x} cy={pos.y+14} r="10"
              fill={on ? 'rgba(204,0,255,0.75)' : '#0A0A0A'}
              stroke={on ? '#fff' : 'rgba(255,255,255,0.12)'}
              strokeWidth="1"
              filter={on ? 'url(#rly-glow)' : undefined}
            />
            {on && <circle cx={pos.x} cy={pos.y+14} r="4" fill="rgba(255,255,255,0.9)"/>}
            {/* Label */}
            <text x={pos.x} y={pos.y+36} textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="6" fontFamily="monospace">
              {`RLY${String(i+1).padStart(2,'0')}`}
            </text>
          </g>
        )
      })}

      {/* Status LED strip */}
      {relays.map((on, i) => (
        <circle key={i}
          cx={38 + i * 40} cy={278} r="4.5"
          fill={on ? '#CC00FF' : '#0A0A0A'}
          stroke={on ? 'rgba(255,255,255,0.5)' : '#333'}
          strokeWidth="0.8"
          filter={on ? 'url(#rly-glow)' : undefined}
        />
      ))}

      <text x="200" y="293" textAnchor="middle" fill="rgba(204,0,255,0.22)" fontSize="5.5" fontFamily="monospace" fontWeight="bold">
        PS·ELAB — RELAY 8CH RS485 v1.3
      </text>
    </svg>
  )
}

export function RelayBoardController() {
  const [relays, setRelays] = useState(Array(8).fill(false))
  const activeCount = relays.filter(Boolean).length

  const toggle = i => setRelays(prev => { const n = [...prev]; n[i] = !n[i]; return n })
  const setAll = v => setRelays(Array(8).fill(v))

  return (
    <div className={styles.viewer}>
      <div className={styles.svgWrap}><RelayBoardSVG relays={relays}/></div>

      <div className={styles.statsBar}>
        <div className={styles.stat}>
          <span className={styles.statVal}>{activeCount}<span className={styles.statSub}>/8</span></span>
          <span className={styles.statLabel}>Relés activos</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statVal} style={{ color: activeCount > 0 ? 'var(--color-cyan)' : 'rgba(255,255,255,0.3)', fontSize: '0.9rem' }}>
            {activeCount > 0 ? 'OPERATIVO' : 'INACTIVO'}
          </span>
          <span className={styles.statLabel}>Estado del sistema</span>
        </div>
        <div className={styles.presets}>
          <button className={styles.presetBtn} onClick={() => setAll(false)}>TODO OFF</button>
          <button className={styles.presetBtn} onClick={() => setAll(true)}>TODO ON</button>
        </div>
      </div>

      <div className={styles.relayGrid}>
        {relays.map((on, i) => (
          <button
            key={i}
            className={`${styles.relayToggle} ${on ? styles.relayOn : ''}`}
            onClick={() => toggle(i)}
            aria-label={`Relé ${i+1}`}
            aria-pressed={on}
          >
            <span className={styles.relayDot}/>
            <span className={styles.relayLabel}>{`RLY${String(i+1).padStart(2,'0')}`}</span>
            <span className={styles.relayState}>{on ? 'ON' : 'OFF'}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// 3. ESP32 IoT SHIELD
// ═══════════════════════════════════════════════════════════════

function ESP32ShieldSVG({ features, analogIn }) {
  const { wifi, bt, can, rs485 } = features
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <filter id="esp-glow">
          <feGaussianBlur stdDeviation="3.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="esp-soft">
          <feGaussianBlur stdDeviation="1.8" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <pattern id="esp-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(204,0,255,0.04)" strokeWidth="0.5"/>
        </pattern>
      </defs>

      {/* Board */}
      <rect x="15" y="15" width="370" height="270" rx="5" fill="#1B3D1F" stroke="#2A5A2E" strokeWidth="1.5"/>
      <rect x="15" y="15" width="370" height="270" rx="5" fill="url(#esp-grid)"/>
      <rect x="15" y="15" width="370" height="270" rx="5" fill="none" stroke="rgba(204,0,255,0.07)" strokeWidth="1"/>

      {/* Mounting holes */}
      {[[25,25],[375,25],[25,275],[375,275]].map(([cx,cy],i) => (
        <circle key={i} cx={cx} cy={cy} r="5" fill="#0A1A0A" stroke="#2A5A2E" strokeWidth="1"/>
      ))}

      {/* ESP32 module */}
      <rect x="125" y="80" width="150" height="100" rx="4" fill="#0A120A" stroke="rgba(204,0,255,0.5)" strokeWidth="1.5" filter="url(#esp-soft)"/>
      {/* Antenna */}
      <rect x="183" y="58" width="34" height="24" rx="2" fill="#0A0A0A" stroke="rgba(204,0,255,0.4)" strokeWidth="1"/>
      <line x1="200" y1="58" x2="200" y2="42" stroke="rgba(204,0,255,0.55)" strokeWidth="1.5" strokeDasharray="3 2"/>
      {/* ESP32 label */}
      <text x="200" y="128" textAnchor="middle" fill="#CC00FF" fontSize="11" fontFamily="monospace" fontWeight="bold" filter="url(#esp-soft)">ESP32</text>
      <text x="200" y="142" textAnchor="middle" fill="rgba(204,0,255,0.55)" fontSize="6.5" fontFamily="monospace">WROOM-32U</text>
      {/* GPIO pins */}
      {Array.from({length:8},(_,i) => <line key={i} x1={135+i*16} y1={80} x2={135+i*16} y2={72} stroke="rgba(204,0,255,0.25)" strokeWidth="0.8"/>)}
      {Array.from({length:8},(_,i) => <line key={i} x1={135+i*16} y1={180} x2={135+i*16} y2={188} stroke="rgba(204,0,255,0.25)" strokeWidth="0.8"/>)}

      {/* WiFi arcs */}
      {[14,21,28].map((r, i) => (
        <path key={i}
          d={`M ${56-r} 55 A ${r} ${r} 0 0 1 ${56+r} 55`}
          fill="none"
          stroke={wifi ? `rgba(204,0,255,${0.25+i*0.25})` : 'rgba(255,255,255,0.08)'}
          strokeWidth="2.5" strokeLinecap="round"
          filter={wifi && i===2 ? 'url(#esp-glow)' : undefined}
        />
      ))}
      <circle cx="56" cy="62" r="3.5" fill={wifi ? '#CC00FF' : '#1A1A1A'} filter={wifi ? 'url(#esp-glow)' : undefined}/>
      <text x="56" y="85" textAnchor="middle" fill={wifi ? 'rgba(204,0,255,0.8)' : 'rgba(255,255,255,0.18)'} fontSize="7" fontFamily="monospace">WiFi</text>

      {/* Bluetooth icon */}
      <text x="106" y="58" textAnchor="middle" fill={bt ? '#CC00FF' : 'rgba(255,255,255,0.15)'} fontSize="18" fontFamily="monospace" fontWeight="bold" filter={bt ? 'url(#esp-glow)' : undefined}>ʙ</text>
      <text x="106" y="82" textAnchor="middle" fill={bt ? 'rgba(204,0,255,0.8)' : 'rgba(255,255,255,0.18)'} fontSize="7" fontFamily="monospace">BT</text>

      {/* CAN chip */}
      <rect x="300" y="75" width="55" height="32" rx="2" fill="#0A0A1A"
        stroke={can ? 'rgba(204,0,255,0.55)' : 'rgba(255,255,255,0.08)'}
        strokeWidth="1" filter={can ? 'url(#esp-soft)' : undefined}
      />
      <text x="327" y="93" textAnchor="middle" fill={can ? 'rgba(204,0,255,0.85)' : 'rgba(255,255,255,0.18)'} fontSize="6" fontFamily="monospace">MCP2515</text>
      <text x="327" y="122" textAnchor="middle" fill={can ? 'rgba(204,0,255,0.7)' : 'rgba(255,255,255,0.18)'} fontSize="7.5" fontFamily="monospace">CAN</text>

      {/* RS485 chip */}
      <rect x="300" y="140" width="55" height="32" rx="2" fill="#0A0A1A"
        stroke={rs485 ? 'rgba(204,0,255,0.55)' : 'rgba(255,255,255,0.08)'}
        strokeWidth="1" filter={rs485 ? 'url(#esp-soft)' : undefined}
      />
      <text x="327" y="158" textAnchor="middle" fill={rs485 ? 'rgba(204,0,255,0.85)' : 'rgba(255,255,255,0.18)'} fontSize="6" fontFamily="monospace">MAX485</text>
      <text x="327" y="187" textAnchor="middle" fill={rs485 ? 'rgba(204,0,255,0.7)' : 'rgba(255,255,255,0.18)'} fontSize="7" fontFamily="monospace">RS-485</text>

      {/* Analog input terminals — 4 blocks with fill level */}
      {analogIn.map((val, i) => {
        const pct = val / 100
        const bx = 32 + i * 58
        return (
          <g key={i}>
            <rect x={bx} y={202} width="46" height="52" rx="2"
              fill={pct > 0 ? 'rgba(204,0,255,0.06)' : 'rgba(10,20,10,0.7)'}
              stroke={pct > 0 ? `rgba(204,0,255,${0.3 + pct * 0.5})` : 'rgba(255,255,255,0.09)'}
              strokeWidth="1"
              filter={pct > 0 ? 'url(#esp-soft)' : undefined}
            />
            {/* Level fill */}
            {pct > 0 && (
              <rect
                x={bx+2} y={202 + 50 - (46 * pct)} width="42" height={46 * pct} rx="1"
                fill={`rgba(204,0,255,${pct * 0.28})`}
              />
            )}
            {/* Value */}
            <text x={bx+23} y={218} textAnchor="middle" fill={pct > 0 ? 'rgba(204,0,255,0.8)' : 'rgba(255,255,255,0.2)'} fontSize="7" fontFamily="monospace" fontWeight="bold">
              {(pct * 10).toFixed(1)}V
            </text>
            <text x={bx+23} y={263} textAnchor="middle" fill="rgba(255,255,255,0.22)" fontSize="5.5" fontFamily="monospace">AI{i+1}</text>
          </g>
        )
      })}

      <text x="200" y="293" textAnchor="middle" fill="rgba(204,0,255,0.22)" fontSize="5.5" fontFamily="monospace" fontWeight="bold">
        PS·ELAB — ESP32 INDUSTRIAL SHIELD v3.0
      </text>
    </svg>
  )
}

export function ESP32ShieldController() {
  const [features, setFeatures] = useState({ wifi: false, bt: false, can: false, rs485: false })
  const [analogIn, setAnalogIn] = useState([0, 0, 0, 0])
  const activeFeatures = Object.values(features).filter(Boolean).length

  const toggleFeature = key => setFeatures(prev => ({ ...prev, [key]: !prev[key] }))
  const setAnalog = (i, val) => setAnalogIn(prev => { const n = [...prev]; n[i] = +val; return n })

  return (
    <div className={styles.viewer}>
      <div className={styles.svgWrap}><ESP32ShieldSVG features={features} analogIn={analogIn}/></div>

      <div className={styles.statsBar}>
        <div className={styles.stat}>
          <span className={styles.statVal}>{activeFeatures}<span className={styles.statSub}>/4</span></span>
          <span className={styles.statLabel}>Interfaces activas</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statVal} style={{ color: activeFeatures > 0 ? 'var(--color-cyan)' : 'rgba(255,255,255,0.3)', fontSize: '0.9rem' }}>
            {activeFeatures > 0 ? 'CONECTADO' : 'IDLE'}
          </span>
          <span className={styles.statLabel}>Estado</span>
        </div>
      </div>

      <div className={styles.esp32Controls}>
        <div className={styles.featureToggles}>
          <p className={styles.controlLabel}>Interfaces de comunicación</p>
          {[['wifi','WiFi 802.11 b/g/n'],['bt','Bluetooth 4.2 + BLE'],['can','CAN Bus 2.0B'],['rs485','RS-485 Modbus']].map(([key, label]) => (
            <button
              key={key}
              className={`${styles.featureToggle} ${features[key] ? styles.featureOn : ''}`}
              onClick={() => toggleFeature(key)}
              aria-pressed={features[key]}
            >
              <span className={styles.featureDot}/>
              {label}
            </button>
          ))}
        </div>

        <div className={styles.analogControls}>
          <p className={styles.controlLabel}>Entradas analógicas (0–10 V)</p>
          {analogIn.map((val, i) => (
            <div key={i} className={styles.channelSlider}>
              <div className={styles.chHeader}>
                <span className={styles.chName}>AI{i+1}</span>
                <span className={styles.chVal}>{(val / 10).toFixed(1)} V</span>
              </div>
              <input
                type="range" min={0} max={100} value={val}
                className={styles.slider}
                style={{'--p': `${val}%`}}
                onChange={e => setAnalog(i, e.target.value)}
                aria-label={`Entrada analógica ${i+1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
