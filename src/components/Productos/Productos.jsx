import { useReveal } from '../../hooks/useReveal'
import { SpectrumViewer } from './SpectrumViewer'
import styles from './Productos.module.css'

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

const products = [
  {
    id: 'ps-600',
    num: '01',
    name: ['PS-600', ' Full', ' Spectrum'],
    nameAccent: 1,
    tagline: 'Luminaria LED de espectro completo para cultivo intensivo',
    desc: 'Luminaria de 600 W con 5 canales de luz independientes: UV, Azul, Blanca, Roja e Infrarroja. Control individual por canal permite personalizar el espectro para cada etapa del cultivo.',
    specs: [
      { key: 'Potencia',      val: '600 W (ajustable)' },
      { key: 'Cobertura',     val: '1.2 × 1.2 m' },
      { key: 'Canales',       val: 'UV / Azul / Blanca / Roja / IR' },
      { key: 'Eficiencia',    val: '2.7 μmol/J' },
      { key: 'Alimentación',  val: '200–240 V AC' },
    ],
    defaultSpectrum: { uv: 20, blue: 70, white: 65, red: 50, ir: 20 },
    hint: 'Ajustá cada canal para explorar el espectro',
  },
  {
    id: 'ps-1200',
    num: '02',
    name: ['PS-1200', ' Bloom', ' Pro'],
    nameAccent: 1,
    tagline: 'Alta potencia con espectro optimizado para floración',
    desc: 'Luminaria de 1200 W diseñada para maximizar la producción en etapa de floración. El espectro rojo-IR refuerza la síntesis de antocianinas y terpenos, con dosis controlada de UV.',
    specs: [
      { key: 'Potencia',      val: '1200 W (ajustable)' },
      { key: 'Cobertura',     val: '1.5 × 1.5 m' },
      { key: 'Canales',       val: 'UV / Azul / Blanca / Roja / IR' },
      { key: 'Eficiencia',    val: '3.0 μmol/J' },
      { key: 'Alimentación',  val: '200–240 V AC' },
    ],
    defaultSpectrum: { uv: 15, blue: 30, white: 50, red: 100, ir: 75 },
    hint: 'Preset "Floración" para ver el espectro óptimo',
  },
  {
    id: 'ps-400-uv',
    num: '03',
    name: ['PS-400', ' UV+', ' Pro'],
    nameAccent: 1,
    tagline: 'Especializada en UV para producción de terpenos y resinas',
    desc: 'Luminaria de 400 W con énfasis en UV y azul profundo. Formulada para estimular la producción de terpenos, flavonoides y resinas en la última semana de floración.',
    specs: [
      { key: 'Potencia',      val: '400 W (ajustable)' },
      { key: 'Cobertura',     val: '0.8 × 0.8 m' },
      { key: 'Canales',       val: 'UV / Azul / Blanca / Roja / IR' },
      { key: 'Eficiencia',    val: '2.5 μmol/J' },
      { key: 'Alimentación',  val: '200–240 V AC' },
    ],
    defaultSpectrum: { uv: 75, blue: 90, white: 40, red: 20, ir: 10 },
    hint: 'Preset "Full" para ver el potencial máximo UV',
  },
]

function ProductRow({ product }) {
  const { ref, visible } = useReveal()

  return (
    <div
      ref={ref}
      className={`${styles.productRow} reveal ${visible ? 'visible' : ''}`}
    >
      {/* INFO */}
      <div className={styles.info}>
        <p className={styles.num}>{product.num} /</p>
        <h3 className={styles.productName}>
          {product.name.map((part, i) =>
            i === product.nameAccent ? <span key={i}>{part}</span> : part
          )}
        </h3>
        <p className={styles.tagline}>{product.tagline}</p>
        <p className={styles.desc}>{product.desc}</p>

        <div className={styles.specs}>
          {product.specs.map(s => (
            <div key={s.key} className={styles.specRow}>
              <span className={styles.specKey}>{s.key}</span>
              <span className={styles.specVal}>{s.val}</span>
            </div>
          ))}
        </div>

        <div className={styles.ctaRow}>
          <button
            className="btn-filled-cyan"
            onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Consultar precio <ArrowIcon />
          </button>
          <button
            className="btn-outline-dark"
            onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Solicitar datasheet
          </button>
        </div>
      </div>

      {/* VISUAL: interactive spectrum */}
      <div className={styles.visual}>
        <SpectrumViewer initialValues={product.defaultSpectrum} />
        <p className={styles.sliderHint}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          {product.hint}
        </p>
      </div>
    </div>
  )
}

export default function Productos() {
  const { ref: headerRef, visible: headerVisible } = useReveal()

  return (
    <section id="productos" className={styles.section} aria-labelledby="productos-h">
      <div
        ref={headerRef}
        className={`${styles.header} reveal ${headerVisible ? 'visible' : ''}`}
      >
        <p className="section-label">Línea de productos</p>
        <h2 className={styles.bigTitle} id="productos-h">PRODUCTOS</h2>
      </div>

      {products.map(p => (
        <ProductRow key={p.id} product={p} />
      ))}
    </section>
  )
}
