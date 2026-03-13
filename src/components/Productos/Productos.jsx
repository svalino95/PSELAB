import { useReveal } from '../../hooks/useReveal'
import { DriverLEDController, RelayBoardController, ESP32ShieldController } from './PCBInteractive'
import styles from './Productos.module.css'

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

const products = [
  {
    id: 'driver-led',
    num: '01',
    name: ['Driver', ' LED', ' 12CH'],
    nameAccent: 1,
    tagline: 'Control PWM de 12 canales independientes',
    desc: 'Controlador PWM de 12 canales con aislación óptica por canal, comunicación RS-485 y protocolo DMX512. Ideal para instalaciones de iluminación profesional, escenarios y arquitectura.',
    specs: [
      { key: 'Canales',       val: '12 × PWM independiente' },
      { key: 'Protocolo',     val: 'DMX512 / RS-485' },
      { key: 'Frecuencia',    val: '1 kHz – 20 kHz' },
      { key: 'Corriente max', val: '3 A por canal' },
      { key: 'Tensión',       val: '12 V – 48 V DC' },
    ],
    Controller: DriverLEDController,
    hint: 'Mové los sliders para activar cada canal',
  },
  {
    id: 'relay-board',
    num: '02',
    name: ['Relay', ' Board', ' 8CH'],
    nameAccent: 1,
    tagline: 'Módulo de relés con control remoto RS-485',
    desc: 'Placa de 8 relés de estado sólido con aislación galvánica, watchdog de hardware y comunicación RS-485 a 1 Mbps. Diseñada para automatización industrial y domótica de alta confiabilidad.',
    specs: [
      { key: 'Canales',       val: '8 × relé SPDT' },
      { key: 'Protocolo',     val: 'Modbus RTU / RS-485' },
      { key: 'Corriente max', val: '10 A por canal' },
      { key: 'Tensión carga', val: 'hasta 250 V AC' },
      { key: 'Aislación',     val: 'Óptica + galvánica' },
    ],
    Controller: RelayBoardController,
    hint: 'Tocá cada relé para activarlo o desactivarlo',
  },
  {
    id: 'esp32-shield',
    num: '03',
    name: ['ESP32', ' IoT', ' Shield'],
    nameAccent: 1,
    tagline: 'Shield de expansión para ESP32 con conectividad total',
    desc: 'Shield de expansión para módulos ESP32 con entradas analógicas protegidas, salidas a relé, bus CAN, RS-485 y conectores industriales M12. Pensada para equipos IoT embebidos de producción.',
    specs: [
      { key: 'Base',          val: 'ESP32 / ESP32-S3' },
      { key: 'Conectividad',  val: 'WiFi + BT + CAN + RS-485' },
      { key: 'Entradas',      val: '4 × AI protegidas 0–10V' },
      { key: 'Alimentación',  val: '9 V – 36 V DC' },
      { key: 'Conector',      val: 'Industrial M12 A-code' },
    ],
    Controller: ESP32ShieldController,
    hint: 'Activá interfaces y simulá entradas analógicas',
  },
]

function ProductRow({ product }) {
  const { ref, visible } = useReveal()
  const { Controller } = product

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

      {/* VISUAL: interactive controller */}
      <div className={styles.visual}>
        <Controller />
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
