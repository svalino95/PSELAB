'use client'
import styles from './Footer.module.css'

const IgIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)

const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

const navLinks  = [
  { label: 'Inicio',         id: 'hero' },
  { label: 'Especialidades', id: 'especialidades' },
  { label: 'Proyectos',      id: 'proyectos' },
  { label: 'Contacto',       id: 'contacto' },
]

const espLinks = [
  'Domótica y Control',
  'Electrónica Modular',
  'Iluminación LED',
]

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.navSection}>
        {/* Big nav links */}
        <div className={styles.bigLinks}>
          {navLinks.map(({ label, id }) => (
            <button key={id} className={styles.bigLink} onClick={() => scrollTo(id)}>
              {label}
            </button>
          ))}
        </div>

        {/* Especialidades col */}
        <nav aria-label="Especialidades">
          <p className={styles.colTitle}>Especialidades</p>
          <div className={styles.colLinks}>
            {espLinks.map(l => (
              <button key={l} className={styles.colLink} onClick={() => scrollTo('especialidades')}>{l}</button>
            ))}
          </div>
        </nav>

        {/* Brand col */}
        <div className={styles.brand}>
          <button className={styles.logoBtn} onClick={() => scrollTo('hero')} aria-label="PS-ELAB inicio">
            PS<span className={styles.logoDot}>·</span>ELAB
          </button>
          <p className={styles.tagline}>
            Electronic Labs · Argentina<br />
            Hardware electrónico a medida.
          </p>
          <div className={styles.social}>
            <a
              href="https://www.instagram.com/ps_elab/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="PS-ELAB en Instagram"
            >
              <IgIcon />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copy}>© 2025 PS-ELAB. Todos los derechos reservados.</p>
        <p className={styles.made}>Hecho con <span>♥</span> en Argentina</p>
      </div>
    </footer>
  )
}
