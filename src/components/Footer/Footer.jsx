import styles from './Footer.module.css'

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const navSections = [
  { label: 'Inicio', id: 'hero' },
  { label: 'Especialidades', id: 'especialidades' },
  { label: 'Proyectos', id: 'proyectos' },
  { label: 'Contacto', id: 'contacto' },
]

const especialidades = [
  { label: 'Domótica y Control', id: 'especialidades' },
  { label: 'Electrónica Modular', id: 'especialidades' },
  { label: 'Iluminación LED', id: 'especialidades' },
]

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        {/* BRAND */}
        <div className={styles.brand}>
          <button
            className={styles.logo}
            onClick={() => scrollTo('hero')}
            aria-label="PS-ELAB — inicio"
          >
            PS<span className={styles.logoDot}>·</span>ELAB
          </button>
          <p className={styles.tagline}>
            PS-ELAB — Electronic Labs · Argentina<br />
            Diseño y fabricación de plaquetas electrónicas a medida.
          </p>
          <div className={styles.socialRow}>
            <a
              href="https://www.instagram.com/ps_elab/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="PS-ELAB en Instagram"
            >
              <InstagramIcon />
            </a>
          </div>
        </div>

        {/* NAV COL */}
        <nav className={styles.navCol} aria-label="Navegación del footer">
          <p className={styles.colTitle}>Navegación</p>
          <div className={styles.colLinks}>
            {navSections.map(({ label, id }) => (
              <button
                key={id}
                className={styles.colLink}
                onClick={() => scrollTo(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </nav>

        {/* ESPECIALIDADES COL */}
        <nav className={styles.navCol} aria-label="Especialidades">
          <p className={styles.colTitle}>Especialidades</p>
          <div className={styles.colLinks}>
            {especialidades.map(({ label, id }) => (
              <button
                key={label}
                className={styles.colLink}
                onClick={() => scrollTo(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* BOTTOM BAR */}
      <div className={styles.bottom}>
        <p className={styles.copyright}>
          © 2025 PS-ELAB. Todos los derechos reservados.
        </p>
        <p className={styles.madeBadge}>
          Hecho con <span>♥</span> en Argentina
        </p>
      </div>
    </footer>
  )
}
