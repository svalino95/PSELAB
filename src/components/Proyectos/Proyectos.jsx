import { useReveal } from '../../hooks/useReveal'
import styles from './Proyectos.module.css'

// Inline SVG PCB mockups as backgrounds
function PCBMockup({ color = '#00D4FF', variant = 1 }) {
  const c = color
  const traces = {
    1: (
      <>
        <line x1="20" y1="50" x2="100" y2="50" stroke={c} strokeWidth="2" opacity="0.4"/>
        <line x1="100" y1="50" x2="100" y2="120" stroke={c} strokeWidth="2" opacity="0.4"/>
        <line x1="100" y1="120" x2="280" y2="120" stroke={c} strokeWidth="2" opacity="0.4"/>
        <line x1="200" y1="20" x2="200" y2="80" stroke={c} strokeWidth="1.5" opacity="0.3"/>
        <line x1="200" y1="80" x2="360" y2="80" stroke={c} strokeWidth="1.5" opacity="0.3"/>
        <line x1="50" y1="150" x2="50" y2="200" stroke={c} strokeWidth="1.5" opacity="0.25"/>
        <line x1="50" y1="200" x2="320" y2="200" stroke={c} strokeWidth="1.5" opacity="0.25"/>
        <line x1="320" y1="200" x2="320" y2="100" stroke={c} strokeWidth="1.5" opacity="0.25"/>
        {[[100,50],[100,120],[280,120],[200,80],[50,200],[320,200]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="4" fill={c} opacity="0.5"/>
        ))}
        <rect x="140" y="90" width="80" height="60" rx="4" stroke={c} strokeWidth="1.5" fill="rgba(0,0,0,0.5)" opacity="0.6"/>
        <rect x="55" y="35" width="40" height="30" rx="2" stroke={c} strokeWidth="1" fill="rgba(0,0,0,0.5)" opacity="0.4"/>
        <rect x="250" y="140" width="50" height="35" rx="2" stroke={c} strokeWidth="1" fill="rgba(0,0,0,0.5)" opacity="0.4"/>
      </>
    ),
    2: (
      <>
        <line x1="30" y1="80" x2="150" y2="80" stroke={c} strokeWidth="2" opacity="0.4"/>
        <line x1="150" y1="80" x2="150" y2="160" stroke={c} strokeWidth="2" opacity="0.4"/>
        <line x1="150" y1="160" x2="350" y2="160" stroke={c} strokeWidth="2" opacity="0.4"/>
        <line x1="250" y1="40" x2="250" y2="160" stroke={c} strokeWidth="1.5" opacity="0.3"/>
        <line x1="80" y1="130" x2="80" y2="200" stroke={c} strokeWidth="1.5" opacity="0.25"/>
        {[[150,80],[150,160],[250,160],[80,200]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="4" fill={c} opacity="0.5"/>
        ))}
        <rect x="170" y="95" width="60" height="50" rx="3" stroke={c} strokeWidth="1.5" fill="rgba(0,0,0,0.5)" opacity="0.6"/>
        <rect x="40" y="55" width="36" height="28" rx="2" stroke={c} strokeWidth="1" fill="rgba(0,0,0,0.5)" opacity="0.4"/>
        <rect x="270" y="175" width="44" height="30" rx="2" stroke={c} strokeWidth="1" fill="rgba(0,0,0,0.5)" opacity="0.4"/>
      </>
    ),
    3: (
      <>
        <line x1="50" y1="60" x2="200" y2="60" stroke={c} strokeWidth="2" opacity="0.4"/>
        <line x1="200" y1="60" x2="200" y2="140" stroke={c} strokeWidth="2" opacity="0.4"/>
        <line x1="60" y1="140" x2="200" y2="140" stroke={c} strokeWidth="2" opacity="0.4"/>
        <line x1="300" y1="30" x2="300" y2="180" stroke={c} strokeWidth="1.5" opacity="0.3"/>
        <line x1="100" y1="180" x2="300" y2="180" stroke={c} strokeWidth="1.5" opacity="0.25"/>
        {[[200,60],[200,140],[60,140],[300,180],[100,180]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="4" fill={c} opacity="0.5"/>
        ))}
        <rect x="115" y="80" width="70" height="50" rx="3" stroke={c} strokeWidth="1.5" fill="rgba(0,0,0,0.5)" opacity="0.6"/>
        <rect x="55" y="35" width="35" height="25" rx="2" stroke={c} strokeWidth="1" fill="rgba(0,0,0,0.5)" opacity="0.4"/>
      </>
    ),
  }

  return (
    <svg
      className={styles.cardBgSvg}
      viewBox="0 0 400 240"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="400" height="240" fill="#0D1B0F"/>
      {/* Grid */}
      {Array.from({length:10}).map((_,i)=>(
        <line key={`h${i}`} x1="0" y1={i*27} x2="400" y2={i*27} stroke={c} strokeWidth="0.5" opacity="0.06"/>
      ))}
      {Array.from({length:15}).map((_,i)=>(
        <line key={`v${i}`} x1={i*28} y1="0" x2={i*28} y2="240" stroke={c} strokeWidth="0.5" opacity="0.06"/>
      ))}
      {traces[variant] || traces[1]}
    </svg>
  )
}

const proyectos = [
  {
    id: 1,
    title: 'Driver LED Horticultura 12 Canales',
    category: 'Iluminación',
    desc: 'Driver multi-canal para cultivo indoor con control PWM independiente por espectro y protocolo DMX512.',
    tags: ['LED', 'PWM', 'DMX512', 'Full Spectrum'],
    color: '#00FF88',
    variant: 1,
    featured: true,
  },
  {
    id: 2,
    title: 'Módulo Relay 8 Canales RS485',
    category: 'Domótica',
    desc: 'Placa de 8 relés con comunicación Modbus RTU para automatización industrial.',
    tags: ['Relay', 'RS485', 'Modbus'],
    color: '#00D4FF',
    variant: 2,
  },
  {
    id: 3,
    title: 'Shield ESP32 Multi-Sensor',
    category: 'Desarrollo Modular',
    desc: 'Shield de expansión para ESP32 con ADC, I2C, SPI y protección de E/S.',
    tags: ['ESP32', 'Shield', 'IoT'],
    color: '#00D4FF',
    variant: 3,
  },
  {
    id: 4,
    title: 'Controlador de Riego Automático',
    category: 'Domótica',
    desc: 'Sistema de riego inteligente con 6 zonas, sensor de humedad y conectividad WiFi.',
    tags: ['WiFi', 'Sensores', 'Control'],
    color: '#FF6B00',
    variant: 1,
  },
  {
    id: 5,
    title: 'Breakout STM32 Industrial',
    category: 'Desarrollo Modular',
    desc: 'Placa de desarrollo STM32 con conectores industriales y protección contra ruido.',
    tags: ['STM32', 'Industrial', 'DIN'],
    color: '#00D4FF',
    variant: 2,
  },
]

function ProjectCard({ proyecto, delay }) {
  const { ref, visible } = useReveal()
  return (
    <article
      ref={ref}
      className={`${styles.card} ${proyecto.featured ? styles.cardFeatured : ''} reveal reveal-delay-${delay} ${visible ? 'visible' : ''}`}
      aria-label={proyecto.title}
    >
      <div className={styles.cardBg}>
        <PCBMockup color={proyecto.color} variant={proyecto.variant} />
        <span className={styles.cardBgLabel}>PS·ELAB — PCB</span>
      </div>

      <div className={styles.overlay}>
        <span className={styles.cardCategory}>{proyecto.category}</span>
        <h3 className={styles.cardTitle}>{proyecto.title}</h3>
        <p className={styles.cardDesc}>{proyecto.desc}</p>
        <div className={styles.cardMeta} aria-label="Tecnologías del proyecto">
          {proyecto.tags.map(tag => (
            <span key={tag} className={styles.metaTag}>{tag}</span>
          ))}
        </div>
      </div>
    </article>
  )
}

export default function Proyectos() {
  return (
    <section id="proyectos" className={styles.section} aria-labelledby="proy-heading">
      <div className={styles.header}>
        <p style={{ color: 'var(--color-accent)', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500, marginBottom: '0.5rem' }}>
          Trabajos realizados
        </p>
        <h2 className="section-title" id="proy-heading">
          Galería de <span>Proyectos</span>
        </h2>
        <p className="section-subtitle">
          Una selección de los proyectos que desarrollamos para nuestros clientes,
          desde prototipos hasta producción en serie.
        </p>
      </div>

      <div className={styles.grid} role="list">
        {proyectos.map((p, i) => (
          <ProjectCard key={p.id} proyecto={p} delay={(i % 3) + 1} />
        ))}
      </div>
    </section>
  )
}
