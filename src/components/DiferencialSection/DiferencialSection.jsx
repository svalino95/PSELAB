import { useReveal } from '../../hooks/useReveal'
import styles from './DiferencialSection.module.css'

const DesignIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </svg>
)

const CustomIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0 0 7.07"/>
  </svg>
)

const TestIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"/>
    <path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
    <path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"/>
    <path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"/>
    <path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"/>
    <path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/>
    <path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"/>
    <path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"/>
  </svg>
)

const SupportIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    <line x1="9" y1="10" x2="15" y2="10"/>
    <line x1="12" y1="7" x2="12" y2="13"/>
  </svg>
)

const diferenciales = [
  {
    Icon: DesignIcon,
    title: 'Diseño propio de principio a fin',
    desc: 'Desde el esquemático y layout PCB hasta el prototipo funcional y la producción en serie. Sin intermediarios.',
  },
  {
    Icon: CustomIcon,
    title: 'Desarrollo 100% a medida',
    desc: 'Cada proyecto parte de los requerimientos del cliente. No vendemos soluciones genéricas, sino hardware diseñado para tu aplicación.',
  },
  {
    Icon: TestIcon,
    title: 'Pruebas y validación exhaustiva',
    desc: 'Cada plaqueta pasa por ciclos de test eléctrico, funcional y de stress antes de la entrega.',
  },
  {
    Icon: SupportIcon,
    title: 'Soporte técnico post-entrega',
    desc: 'Acompañamiento en la integración del hardware, resolución de problemas y actualizaciones de firmware si el proyecto lo requiere.',
  },
]

function PCBDecoration() {
  return (
    <div className={styles.pcbDecor} aria-hidden="true">
      <div className={styles.pcbBoard}>
        <svg className={styles.pcbSvg} viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Traces */}
          <path d="M40 80 H120 V160 H200" stroke="rgba(0,212,255,0.25)" strokeWidth="2"/>
          <path d="M200 160 H280 V240" stroke="rgba(0,212,255,0.25)" strokeWidth="2"/>
          <path d="M80 240 H160 V280" stroke="rgba(0,255,136,0.2)" strokeWidth="2"/>
          <path d="M40 160 H80 V200 H40" stroke="rgba(0,212,255,0.15)" strokeWidth="1.5"/>
          <path d="M240 80 H280 V120" stroke="rgba(0,255,136,0.2)" strokeWidth="1.5"/>
          <path d="M160 40 V80 H200 V120" stroke="rgba(0,212,255,0.2)" strokeWidth="1.5"/>
          <path d="M120 240 V280 H200 V240" stroke="rgba(255,107,0,0.2)" strokeWidth="1.5"/>
          {/* Pads */}
          {[
            [120,160],[200,160],[80,240],[200,240],[160,80],[240,120],[280,240],[40,80]
          ].map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r="4" fill="rgba(0,212,255,0.4)" />
          ))}
          {/* Via holes */}
          {[[120,160],[200,80],[80,200]].map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r="3" stroke="rgba(0,212,255,0.5)" strokeWidth="1" fill="#0D1B0F"/>
          ))}
        </svg>

        {/* IC chips */}
        <div className={`${styles.chip} ${styles.chip1}`}>
          PS·ELAB
          <div className={styles.pulseDot} />
        </div>
        <div className={`${styles.chip} ${styles.chip2}`}>U1</div>
        <div className={`${styles.chip} ${styles.chip3}`}>U2</div>
        <div className={`${styles.chip} ${styles.chip4}`}>R1</div>
      </div>
      <div className={styles.glowRing} />
    </div>
  )
}

export default function DiferencialSection() {
  const { ref, visible } = useReveal()

  return (
    <section id="diferencial" className={styles.section} aria-labelledby="dif-heading">
      <div className={styles.inner}>
        <div ref={ref} className={`${styles.left} reveal ${visible ? 'visible' : ''}`}>
          <p style={{ color: 'var(--color-secondary)', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500, marginBottom: '0.5rem' }}>
            Nuestra propuesta
          </p>
          <h2 className="section-title" id="dif-heading">
            ¿Por qué <span>PS-ELAB</span>?
          </h2>
          <p className="section-subtitle">
            Trabajamos con la rigurosidad de la ingeniería electrónica profesional
            y la flexibilidad de un equipo enfocado en tu proyecto.
          </p>

          <div className={styles.items} role="list">
            {diferenciales.map((item, i) => (
              <div
                key={i}
                className={`${styles.item} reveal reveal-delay-${i + 1} ${visible ? 'visible' : ''}`}
                role="listitem"
              >
                <div className={styles.iconBox} aria-hidden="true">
                  <item.Icon />
                </div>
                <div className={styles.itemText}>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.right}>
          <PCBDecoration />
        </div>
      </div>
    </section>
  )
}
