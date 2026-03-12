import { useReveal } from '../../hooks/useReveal'
import styles from './DiferencialSection.module.css'

const icons = {
  design: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  ),
  custom: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
    </svg>
  ),
  test: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v11m0 0-4 5h14l-4-5M9 14h6"/>
    </svg>
  ),
  support: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
}

const items = [
  { icon: 'design', title: 'Diseño propio de principio a fin', desc: 'Esquemático → layout PCB → prototipo → producción. Sin intermediarios, con control total del proceso.' },
  { icon: 'custom', title: 'Desarrollo 100% a medida', desc: 'Cada proyecto parte de tus requerimientos. No hay soluciones genéricas, solo hardware diseñado para tu aplicación.' },
  { icon: 'test',   title: 'Pruebas y validación exhaustiva', desc: 'Cada plaqueta pasa por test eléctrico, funcional y de stress antes de la entrega.' },
  { icon: 'support',title: 'Soporte técnico post-entrega', desc: 'Acompañamiento en la integración, resolución de problemas y actualizaciones de firmware.' },
]

export default function DiferencialSection() {
  const { ref, visible } = useReveal()

  return (
    <section id="diferencial" className={styles.section} aria-labelledby="dif-h">
      <div ref={ref} className={`${styles.inner} reveal ${visible ? 'visible' : ''}`}>
        <div className={styles.headRow}>
          <p className="section-label" style={{ color: 'var(--color-cyan)', opacity: 1 }}>Nuestra propuesta</p>
          <h2 className={styles.headline} id="dif-h">
            ¿Por qué<br /><span>PS-ELAB</span>?
          </h2>
          <p className={styles.headSub}>
            Trabajamos con la rigurosidad de la ingeniería electrónica profesional
            y la flexibilidad de un equipo enfocado 100% en tu proyecto.
          </p>
        </div>

        <div className={styles.body} role="list">
          {items.map((item, i) => (
            <div
              key={i}
              className={`${styles.item} reveal reveal-delay-${i + 1} ${visible ? 'visible' : ''}`}
              role="listitem"
            >
              <div className={styles.itemIcon} aria-hidden="true">{icons[item.icon]}</div>
              <div className={styles.itemText}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.ctaRow}>
          <button className="btn btn-filled-cyan" onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}>
            Consultanos
          </button>
          <span className={styles.ctaNote}>Respondemos en menos de 24 hs</span>
        </div>
      </div>
    </section>
  )
}
