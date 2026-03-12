import { useState } from 'react'
import { useReveal } from '../../hooks/useReveal'
import styles from './Especialidades.module.css'

// ---- ICONS ----
const HomeChipIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
    <circle cx="12" cy="7" r="1" fill="currentColor"/>
    <line x1="7" y1="14" x2="9" y2="14"/>
    <line x1="15" y1="14" x2="17" y2="14"/>
  </svg>
)

const ModuleIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="7" width="20" height="14" rx="2"/>
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
    <line x1="12" y1="12" x2="12" y2="16"/>
    <line x1="10" y1="14" x2="14" y2="14"/>
    <circle cx="7" cy="12" r="1" fill="currentColor"/>
    <circle cx="17" cy="12" r="1" fill="currentColor"/>
  </svg>
)

const LEDPlantIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="8" r="3"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="13" x2="12" y2="15"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    <line x1="1" y1="8" x2="3" y2="8"/>
    <line x1="21" y1="8" x2="23" y2="8"/>
    <path d="M12 15c0 3.31-2.69 6-6 6"/>
    <path d="M12 15c0 3.31 2.69 6 6 6"/>
    <line x1="12" y1="21" x2="12" y2="15"/>
  </svg>
)

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
)

const especialidades = [
  {
    id: 'domotica',
    Icon: HomeChipIcon,
    title: 'Domótica y Sistemas de Control',
    desc: 'Placas para automatización del hogar e industria, control de relés, sensores, integración con sistemas KNX, Modbus o protocolos custom.',
    tags: ['KNX', 'Modbus', 'RS485', 'IoT', 'Relés'],
    details: [
      'Controladores de relés multichannel (8, 16, 32 canales)',
      'Integración con protocolos KNX, Modbus RTU/TCP y custom',
      'Placas de adquisición de sensores: temperatura, humedad, presencia',
      'Interfaces de usuario táctiles y paneles de control',
      'Diseño para montaje en riel DIN',
    ],
  },
  {
    id: 'modular',
    Icon: ModuleIcon,
    title: 'Electrónica Modular para Desarrollo',
    desc: 'Hardware modular y shields para prototipado y producción. Compatible con plataformas Arduino, ESP32 y sistemas embebidos a medida.',
    tags: ['Arduino', 'ESP32', 'STM32', 'Shield', 'Breakout'],
    details: [
      'Shields y breakout boards para Arduino y ESP32',
      'Módulos de comunicación: WiFi, BLE, LoRa, RS232/485',
      'Placas de desarrollo embebido con STM32, RP2040',
      'Conversión de señales y acondicionamiento de sensores',
      'Diseño desde prototipo hasta producción en serie',
    ],
  },
  {
    id: 'iluminacion',
    Icon: LEDPlantIcon,
    title: 'Iluminación — Ambiente y Horticultura',
    desc: 'Drivers y controladores LED de alta eficiencia para iluminación de ambientes y cultivos. Control de espectro y ciclos automáticos.',
    tags: ['Driver LED', 'Full Spectrum', 'PWM', 'DALI', 'Cultivo'],
    details: [
      'Drivers LED de alta eficiencia (hasta 98% rendimiento)',
      'Control de espectro multi-canal (RGB, RGBW, IR, UV)',
      'Programación de ciclos circadianos y fotoperiodos',
      'Interfaz DMX512, DALI y control analógico 0-10V',
      'Placas para luminarias de horticultura indoor/greenhouse',
    ],
  },
]

function EspecialidadCard({ data, delay }) {
  const [expanded, setExpanded] = useState(false)
  const { ref, visible } = useReveal()

  return (
    <article
      ref={ref}
      className={`${styles.card} reveal ${visible ? 'visible' : ''} reveal-delay-${delay}`}
      aria-label={data.title}
    >
      <div className={styles.iconWrapper} aria-hidden="true">
        <data.Icon />
      </div>

      <h3 className={styles.cardTitle}>{data.title}</h3>
      <p className={styles.cardDesc}>{data.desc}</p>

      <div className={styles.cardTags} aria-label="Tecnologías">
        {data.tags.map(tag => (
          <span key={tag} className={styles.tag}>{tag}</span>
        ))}
      </div>

      <button
        className={styles.cardLink}
        onClick={() => setExpanded(prev => !prev)}
        aria-expanded={expanded}
        aria-controls={`expand-${data.id}`}
      >
        {expanded ? 'Ver menos' : 'Ver más'}
        <ArrowRight />
      </button>

      <div
        id={`expand-${data.id}`}
        className={`${styles.expandedContent} ${expanded ? styles.open : ''}`}
        role="region"
        aria-label={`Detalles de ${data.title}`}
      >
        <div className={styles.expandedInner}>
          <ul>
            {data.details.map((d, i) => <li key={i}>{d}</li>)}
          </ul>
        </div>
      </div>
    </article>
  )
}

export default function Especialidades() {
  return (
    <section id="especialidades" className={styles.section} aria-labelledby="esp-heading">
      <div className={styles.header}>
        <p className="section-subtitle" style={{ marginBottom: '0.5rem', color: 'var(--color-primary)', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500 }}>
          Lo que hacemos
        </p>
        <h2 className="section-title" id="esp-heading">
          Nuestras <span>Especialidades</span>
        </h2>
        <p className="section-subtitle">
          Desarrollamos hardware electrónico a medida en tres verticales clave,
          desde el concepto hasta la producción en serie.
        </p>
      </div>

      <div className={styles.grid} role="list">
        {especialidades.map((esp, i) => (
          <EspecialidadCard key={esp.id} data={esp} delay={i + 1} />
        ))}
      </div>
    </section>
  )
}
