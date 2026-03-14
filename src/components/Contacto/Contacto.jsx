'use client'
import { useState } from 'react'
import { useReveal } from '../../hooks/useReveal'
import styles from './Contacto.module.css'

const MailIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
)
const IgIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)
const ClockIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
)
const SendIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
)
const CheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const INIT = { nombre:'', email:'', asunto:'', mensaje:'' }

export default function Contacto() {
  const { ref, visible } = useReveal()
  const [form, setForm] = useState(INIT)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const validate = () => {
    const e = {}
    if (!form.nombre.trim()) e.nombre = 'Requerido'
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email inválido'
    if (!form.asunto) e.asunto = 'Seleccioná un asunto'
    if (form.mensaje.trim().length < 10) e.mensaje = 'Mínimo 10 caracteres'
    return e
  }

  const onChange = e => {
    const { name, value } = e.target
    setForm(p => ({ ...p, [name]: value }))
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }))
  }

  const onSubmit = async e => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setStatus('loading')
    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setForm(INIT)
      setTimeout(() => setStatus('idle'), 5000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <section id="contacto" className={styles.section} aria-labelledby="contact-h">
      <div className={styles.inner}>
        {/* LEFT */}
        <div ref={ref} className={`reveal ${visible ? 'visible' : ''}`}>
          <p className="section-label" style={{ color: 'var(--color-cyan)', opacity: 1 }}>Hablemos</p>
          <h2 className={styles.headline} id="contact-h">
            Tu próximo<br /><span>Proyecto</span>
          </h2>
          <p className={styles.leftDesc}>
            Contanos tu idea o requerimiento y te respondemos
            con una propuesta técnica personalizada.
          </p>

          <div className={styles.infoList}>
            <div className={styles.infoItem}>
              <div className={styles.infoIcon} aria-hidden="true"><MailIcon /></div>
              <div className={styles.infoText}>
                <strong>Email</strong>
                <a href="mailto:contacto@ps-elab.com">contacto@ps-elab.com</a>
              </div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoIcon} aria-hidden="true"><IgIcon /></div>
              <div className={styles.infoText}>
                <strong>Instagram</strong>
                <a href="https://www.instagram.com/ps_elab/" target="_blank" rel="noopener noreferrer">@ps_elab</a>
              </div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoIcon} aria-hidden="true"><ClockIcon /></div>
              <div className={styles.infoText}>
                <strong>Respuesta</strong>
                <span>Menos de 24 horas hábiles</span>
              </div>
            </div>
          </div>

          <a href="https://www.instagram.com/ps_elab/" target="_blank" rel="noopener noreferrer" className={styles.igBtn} aria-label="Instagram de PS-ELAB">
            <IgIcon /> Seguinos en Instagram
          </a>
        </div>

        {/* RIGHT: FORM */}
        <div className={`${styles.formWrap} reveal reveal-delay-2 ${visible ? 'visible' : ''}`}>
          <form className={styles.form} onSubmit={onSubmit} noValidate aria-label="Formulario de contacto">
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="nombre">Nombre</label>
                <input id="nombre" name="nombre" type="text" className={styles.input} placeholder="Tu nombre" value={form.nombre} onChange={onChange} aria-required="true"/>
                {errors.nombre && <span className={styles.errMsg} role="alert">{errors.nombre}</span>}
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="email">Email</label>
                <input id="email" name="email" type="email" className={styles.input} placeholder="tu@email.com" value={form.email} onChange={onChange} aria-required="true"/>
                {errors.email && <span className={styles.errMsg} role="alert">{errors.email}</span>}
              </div>
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="asunto">Asunto</label>
              <select id="asunto" name="asunto" className={styles.select} value={form.asunto} onChange={onChange} aria-required="true">
                <option value="">Seleccioná...</option>
                {['Consulta comercial','Presupuesto','Soporte técnico','Otro'].map(a=><option key={a} value={a}>{a}</option>)}
              </select>
              {errors.asunto && <span className={styles.errMsg} role="alert">{errors.asunto}</span>}
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="mensaje">Mensaje</label>
              <textarea id="mensaje" name="mensaje" className={styles.textarea} placeholder="Contanos en qué consiste tu proyecto..." value={form.mensaje} onChange={onChange} aria-required="true"/>
              {errors.mensaje && <span className={styles.errMsg} role="alert">{errors.mensaje}</span>}
            </div>
            <button
              type="submit"
              className={`${styles.submitBtn} ${status === 'success' ? styles.success : ''}`}
              disabled={status === 'loading'}
              aria-live="polite"
            >
              {status === 'idle'    && <><SendIcon />  Enviar mensaje</>}
              {status === 'loading' && <><div className={styles.spinner}/> Enviando...</>}
              {status === 'success' && <><CheckIcon /> Mensaje enviado</>}
              {status === 'error'   && <>✕ Error al enviar — intentá de nuevo</>}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
