import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)

const navItems = [
  { label: 'Inicio',         section: 'hero' },
  { label: 'Especialidades', section: 'especialidades' },
  { label: 'Proyectos',      section: 'proyectos' },
  { label: 'Contacto',       section: 'contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [active,   setActive]     = useState('hero')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30)
      for (const item of [...navItems].reverse()) {
        const el = document.getElementById(item.section)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(item.section); break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <nav
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
        role="navigation"
        aria-label="Navegación principal"
      >
        <div className={styles.inner}>
          <button className={styles.logo} onClick={() => scrollTo('hero')} aria-label="PS-ELAB inicio">
            PS<span className={styles.logoDot}>·</span>ELAB
          </button>

          <div className={styles.links} role="menubar">
            {navItems.map(item => (
              <button
                key={item.section}
                className={`${styles.navLink} ${active === item.section ? styles.active : ''}`}
                onClick={() => scrollTo(item.section)}
                role="menuitem"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className={styles.actions}>
            <a
              href="https://www.instagram.com/ps_elab/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.igLink}
              aria-label="PS-ELAB en Instagram"
            >
              <InstagramIcon />
            </a>
            <button className={styles.ctaBtn} onClick={() => scrollTo('contacto')}>
              Consultar
            </button>
            <button
              className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
              onClick={() => setMenuOpen(p => !p)}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`} role="menu">
        {navItems.map(item => (
          <button key={item.section} className={styles.mobileLink} onClick={() => scrollTo(item.section)} role="menuitem">
            {item.label}
          </button>
        ))}
        <div className={styles.mobileActions}>
          <a href="https://www.instagram.com/ps_elab/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <InstagramIcon />
          </a>
        </div>
      </div>
    </>
  )
}
