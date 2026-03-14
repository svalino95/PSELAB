'use client'
import { useReveal } from '../../hooks/useReveal'
import styles from './Proyectos.module.css'

function PCBSvg({ color, variant }) {
  const c = color || '#00C8FF'
  const base = 'rgba(0,200,255,0.06)'
  return (
    <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="400" height="240" fill="#0C1410"/>
      {Array.from({length:9}).map((_,i)  => <line key={`h${i}`} x1="0" y1={i*28} x2="400" y2={i*28} stroke={c} strokeWidth="0.5" opacity="0.05"/>)}
      {Array.from({length:15}).map((_,i) => <line key={`v${i}`} x1={i*28} y1="0" x2={i*28} y2="240" stroke={c} strokeWidth="0.5" opacity="0.05"/>)}
      {variant === 1 && <>
        <path d="M30 60 H130 V140 H260" stroke={c} strokeWidth="1.5" opacity="0.3"/>
        <path d="M260 140 H340 V200" stroke={c} strokeWidth="1.5" opacity="0.3"/>
        <path d="M70 200 H200 V230" stroke={c} strokeWidth="1.2" opacity="0.2"/>
        {[[130,60],[130,140],[260,140],[70,200]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="4" fill={c} opacity="0.5"/>)}
        <rect x="155" y="100" width="70" height="50" rx="3" stroke={c} strokeWidth="1.5" fill="rgba(0,0,0,0.5)" opacity="0.55"/>
        <rect x="45" y="42" width="40" height="28" rx="2" stroke={c} strokeWidth="1" fill="rgba(0,0,0,0.4)" opacity="0.4"/>
        <rect x="270" y="155" width="50" height="32" rx="2" stroke={c} strokeWidth="1" fill="rgba(0,0,0,0.4)" opacity="0.4"/>
      </>}
      {variant === 2 && <>
        <path d="M40 80 H160 V160 H300" stroke={c} strokeWidth="1.5" opacity="0.3"/>
        <path d="M160 80 V30 H320" stroke={c} strokeWidth="1.2" opacity="0.2"/>
        <path d="M300 160 V210 H80" stroke={c} strokeWidth="1.2" opacity="0.2"/>
        {[[160,80],[160,160],[300,160],[320,30]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="4" fill={c} opacity="0.5"/>)}
        <rect x="185" y="105" width="65" height="48" rx="3" stroke={c} strokeWidth="1.5" fill="rgba(0,0,0,0.5)" opacity="0.55"/>
        <rect x="55" y="55" width="38" height="26" rx="2" stroke={c} strokeWidth="1" fill="rgba(0,0,0,0.4)" opacity="0.4"/>
      </>}
      {variant === 3 && <>
        <path d="M50 50 H180 V120 H310" stroke={c} strokeWidth="1.5" opacity="0.3"/>
        <path d="M310 120 V180 H100" stroke={c} strokeWidth="1.2" opacity="0.2"/>
        <path d="M100 180 V220" stroke={c} strokeWidth="1.2" opacity="0.2"/>
        {[[180,50],[180,120],[310,120],[100,180]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="4" fill={c} opacity="0.5"/>)}
        <rect x="200" y="75" width="68" height="50" rx="3" stroke={c} strokeWidth="1.5" fill="rgba(0,0,0,0.5)" opacity="0.55"/>
        <rect x="60" y="35" width="36" height="24" rx="2" stroke={c} strokeWidth="1" fill="rgba(0,0,0,0.4)" opacity="0.4"/>
      </>}
      <text x="50%" y="92%" dominantBaseline="middle" textAnchor="middle" fontFamily="monospace" fontSize="7" fontWeight="700" letterSpacing="3" fill={c} opacity="0.35">PS·ELAB — PCB</text>
    </svg>
  )
}

const projects = [
  { id:1, title:'Driver LED Horticultura 12 Canales', category:'Iluminación',        desc:'Control PWM multi-canal con protocolo DMX512 para cultivo indoor de alta eficiencia.', tags:['LED','PWM','DMX512'], color:'#00E676', variant:1, featured:true },
  { id:2, title:'Módulo Relay 8 Canales RS485',     category:'Domótica',             desc:'Placa de 8 relés con comunicación Modbus RTU para automatización industrial.',          tags:['Relay','Modbus','RS485'], color:'#00C8FF', variant:2 },
  { id:3, title:'Shield ESP32 Multi-Sensor',         category:'Desarrollo Modular',   desc:'Expansión para ESP32 con ADC, I2C, SPI y protección de E/S.',                           tags:['ESP32','Shield','IoT'],  color:'#00C8FF', variant:3 },
  { id:4, title:'Controlador de Riego Automático',  category:'Domótica',             desc:'Sistema 6 zonas con sensores de humedad y conectividad WiFi.',                          tags:['WiFi','Sensores'],      color:'#FF6B00', variant:1 },
  { id:5, title:'Breakout STM32 Industrial',         category:'Desarrollo Modular',   desc:'Placa de desarrollo STM32 con conectores industriales y protección EMI.',               tags:['STM32','Industrial'],   color:'#00C8FF', variant:2 },
]

function Card({ p, delay }) {
  const { ref, visible } = useReveal()
  return (
    <article
      ref={ref}
      className={`${styles.card} ${p.featured ? styles.featured : ''} reveal reveal-delay-${delay} ${visible ? 'visible' : ''}`}
      aria-label={p.title}
    >
      <div className={styles.cardBg}><PCBSvg color={p.color} variant={p.variant} /></div>
      <div className={styles.overlay}>
        <span className={styles.cardCat}>{p.category}</span>
        <h3 className={styles.cardTitle}>{p.title}</h3>
        <p className={styles.cardDesc}>{p.desc}</p>
        <div className={styles.cardTags}>{p.tags.map(t=><span key={t} className={styles.tag}>{t}</span>)}</div>
      </div>
    </article>
  )
}

export default function Proyectos() {
  const { ref, visible } = useReveal()
  return (
    <section id="proyectos" className={styles.section} aria-labelledby="proy-h">
      <div className={styles.inner}>
        <div ref={ref} className={`${styles.header} reveal ${visible ? 'visible' : ''}`}>
          <div>
            <p className="section-label" style={{ color: 'var(--text-muted-dark)' }}>Trabajos realizados</p>
            <h2 className={styles.headline} id="proy-h">Galería de<br /><span>Proyectos</span></h2>
          </div>
          <p className={styles.headerRight}>
            Una selección de hardware que desarrollamos para nuestros clientes,
            desde prototipos hasta producción en serie.
          </p>
        </div>
        <div className={styles.grid}>
          {projects.map((p, i) => <Card key={p.id} p={p} delay={(i % 3) + 1} />)}
        </div>
      </div>
    </section>
  )
}
