import { useState } from 'react'
import { useReveal } from '../../hooks/useReveal'
import styles from './Contacto.module.css'

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
)

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)

const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
)

const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
)

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const ASUNTOS = [
  'Consulta comercial',
  'Presupuesto',
  'Soporte técnico',
  'Otro',
]

const INITIAL = { nombre: '', email: '', asunto: '', mensaje: '' }

export default function Contacto() {
  const { ref, visible } = useReveal()
  const [form, setForm] = useState(INITIAL)
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.nombre.trim()) e.nombre = 'Requerido'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email inválido'
    if (!form.asunto) e.asunto = 'Seleccioná un asunto'
    if (!form.mensaje.trim() || form.mensaje.length < 10) e.mensaje = 'Mínimo 10 caracteres'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setStatus('loading')
    // Simulate network request
    await new Promise(r => setTimeout(r, 1500))
    setStatus('success')
    setForm(INITIAL)
    setTimeout(() => setStatus('idle'), 5000)
  }

  return (
    <section id="contacto" className={styles.section} aria-labelledby="contact-heading">
      <div className={styles.inner}>
        {/* LEFT */}
        <div ref={ref} className={`${styles.left} reveal ${visible ? 'visible' : ''}`}>
          <div className={styles.badge}>Respondemos en menos de 24 hs</div>
          <h2 className="section-title" id="contact-heading">
            Hablemos de tu <span>Proyecto</span>
          </h2>
          <p className="section-subtitle">
            Contanos tu idea o requerimiento y te respondemos con
            una propuesta técnica personalizada.
          </p>

          <div className={styles.infoItems}>
            <div className={styles.infoItem}>
              <div className={styles.infoIcon} aria-hidden="true"><MailIcon /></div>
              <div className={styles.infoText}>
                <strong>Email</strong>
                <a href="mailto:contacto@ps-elab.com">contacto@ps-elab.com</a>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon} aria-hidden="true"><InstagramIcon /></div>
              <div className={styles.infoText}>
                <strong>Instagram</strong>
                <a href="https://www.instagram.com/ps_elab/" target="_blank" rel="noopener noreferrer">
                  @ps_elab
                </a>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon} aria-hidden="true"><ClockIcon /></div>
              <div className={styles.infoText}>
                <strong>Tiempo de respuesta</strong>
                <span>Menos de 24 horas hábiles</span>
              </div>
            </div>
          </div>

          <a
            href="https://www.instagram.com/ps_elab/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.igButton}
            aria-label="Seguir PS-ELAB en Instagram"
          >
            <InstagramIcon />
            Seguinos en Instagram
          </a>
        </div>

        {/* RIGHT: FORM */}
        <div className={`${styles.formCard} reveal reveal-delay-2 ${visible ? 'visible' : ''}`}>
          <form
            className={styles.form}
            onSubmit={handleSubmit}
            noValidate
            aria-label="Formulario de contacto PS-ELAB"
          >
            <div className={styles.formRow}>
              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="nombre">Nombre</label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  className={styles.input}
                  placeholder="Tu nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={!!errors.nombre}
                  aria-describedby={errors.nombre ? 'err-nombre' : undefined}
                />
                {errors.nombre && <span id="err-nombre" style={{ fontSize: '0.75rem', color: '#EF4444' }} role="alert">{errors.nombre}</span>}
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={styles.input}
                  placeholder="tu@email.com"
                  value={form.email}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'err-email' : undefined}
                />
                {errors.email && <span id="err-email" style={{ fontSize: '0.75rem', color: '#EF4444' }} role="alert">{errors.email}</span>}
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="asunto">Asunto</label>
              <select
                id="asunto"
                name="asunto"
                className={styles.select}
                value={form.asunto}
                onChange={handleChange}
                aria-required="true"
                aria-invalid={!!errors.asunto}
              >
                <option value="">Seleccioná un asunto...</option>
                {ASUNTOS.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
              {errors.asunto && <span style={{ fontSize: '0.75rem', color: '#EF4444' }} role="alert">{errors.asunto}</span>}
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="mensaje">Mensaje</label>
              <textarea
                id="mensaje"
                name="mensaje"
                className={styles.textarea}
                placeholder="Contanos en qué consiste tu proyecto o consulta..."
                value={form.mensaje}
                onChange={handleChange}
                aria-required="true"
                aria-invalid={!!errors.mensaje}
                aria-describedby={errors.mensaje ? 'err-mensaje' : undefined}
              />
              {errors.mensaje && <span id="err-mensaje" style={{ fontSize: '0.75rem', color: '#EF4444' }} role="alert">{errors.mensaje}</span>}
            </div>

            <button
              type="submit"
              className={`${styles.submitBtn} ${status === 'loading' ? styles.loading : ''} ${status === 'success' ? styles.success : ''}`}
              disabled={status === 'loading'}
              aria-live="polite"
            >
              {status === 'idle' && <><SendIcon /> Enviar mensaje</>}
              {status === 'loading' && <><div className={styles.spinner} /> Enviando...</>}
              {status === 'success' && <><CheckIcon /> Mensaje enviado</>}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
