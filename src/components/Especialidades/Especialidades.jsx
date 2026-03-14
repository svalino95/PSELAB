'use client'
import { useState } from 'react'
import { useReveal } from '../../hooks/useReveal'
import styles from './Especialidades.module.css'

const HomeChipIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="4" y="4" width="16" height="16" rx="2"/>
    <rect x="9" y="9" width="6" height="6"/>
    <line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/>
    <line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/>
    <line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/>
    <line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>
  </svg>
)

const ModuleIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    <line x1="12" y1="2" x2="12" y2="22" strokeDasharray="3 2"/>
  </svg>
)

const LEDIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
)

const ArrowRight = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

const data = [
  {
    id: 'domotica', num: '01', Icon: HomeChipIcon,
    title: 'Domótica y Sistemas de Control',
    desc: 'Placas para automatización del hogar e industria, control de relés, sensores e integración con protocolos KNX, Modbus y sistemas custom.',
    tags: ['KNX', 'Modbus', 'RS485', 'IoT', 'Relés'],
    details: ['Controladores de relés 8/16/32 canales', 'Integración KNX, Modbus RTU/TCP y protocolos custom', 'Adquisición de sensores: temperatura, humedad, presencia', 'Interfaces HMI táctiles y paneles de control', 'Diseño para montaje en riel DIN'],
  },
  {
    id: 'modular', num: '02', Icon: ModuleIcon,
    title: 'Electrónica Modular para Desarrollo',
    desc: 'Hardware modular y shields para prototipado y producción. Compatible con Arduino, ESP32 y sistemas embebidos a medida.',
    tags: ['Arduino', 'ESP32', 'STM32', 'Shield', 'Breakout'],
    details: ['Shields y breakout boards para Arduino y ESP32', 'Módulos WiFi, BLE, LoRa, RS232/485', 'Placas de desarrollo con STM32, RP2040', 'Acondicionamiento de señales y sensores', 'De prototipo a producción en serie'],
  },
  {
    id: 'iluminacion', num: '03', Icon: LEDIcon,
    title: 'Iluminación — Ambiente y Horticultura',
    desc: 'Drivers y controladores LED de alta eficiencia para ambientes y cultivos. Control de espectro y ciclos automáticos.',
    tags: ['Driver LED', 'Full Spectrum', 'PWM', 'DALI', 'Cultivo'],
    details: ['Drivers LED de alta eficiencia (hasta 98%)', 'Control multi-canal RGB, RGBW, IR, UV', 'Ciclos circadianos y fotoperiodos programables', 'Interfaces DMX512, DALI y analógico 0-10V', 'Luminarias para horticultura indoor/greenhouse'],
  },
]

function Card({ item, delay }) {
  const [open, setOpen] = useState(false)
  const { ref, visible } = useReveal()

  return (
    <article ref={ref} className={`${styles.card} reveal reveal-delay-${delay} ${visible ? 'visible' : ''}`} aria-label={item.title}>
      <span className={styles.cardNum}>{item.num}</span>
      <div className={styles.iconWrapper} aria-hidden="true"><item.Icon /></div>
      <h3 className={styles.cardTitle}>{item.title}</h3>
      <p className={styles.cardDesc}>{item.desc}</p>
      <div className={styles.tags}>{item.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}</div>
      <button className={styles.toggle} onClick={() => setOpen(p => !p)} aria-expanded={open}>
        {open ? 'Cerrar' : 'Ver más'} <ArrowRight />
      </button>
      <div className={`${styles.expanded} ${open ? styles.open : ''}`}>
        <div className={styles.expandedInner}>
          <ul>{item.details.map((d, i) => <li key={i}>{d}</li>)}</ul>
        </div>
      </div>
    </article>
  )
}

export default function Especialidades() {
  const { ref, visible } = useReveal()
  return (
    <section id="especialidades" className={styles.section} aria-labelledby="esp-h">
      <div className={styles.inner}>
        <div ref={ref} className={`${styles.header} reveal ${visible ? 'visible' : ''}`}>
          <div className={styles.headerLeft}>
            <p className="section-label" style={{ color: 'var(--text-muted-light)' }}>Lo que hacemos</p>
            <h2 className={styles.headline} id="esp-h">Nuestras<br /><span>Especialidades</span></h2>
          </div>
          <p className={styles.headerRight}>
            Desarrollamos hardware electrónico a medida en tres verticales clave,
            desde la concepción del circuito hasta la producción en serie.
          </p>
        </div>
        <div className={styles.grid}>
          {data.map((item, i) => <Card key={item.id} item={item} delay={i + 1} />)}
        </div>
      </div>
    </section>
  )
}
