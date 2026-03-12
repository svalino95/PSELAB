import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)

const navItems = [
  { label: 'Inicio', section: 'hero' },
  { label: 'Especialidades', section: 'especialidades' },
  { label: 'Proyectos', section: 'proyectos' },
  { label: 'Contacto', section: 'contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      // Track active section
      const sections = navItems.map(item => item.section)
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`} role="navigation" aria-label="Navegación principal">
        <div className={styles.inner}>
          {/* Logo */}
          <button
            className={styles.logo}
            onClick={() => scrollTo('hero')}
            aria-label="PS-ELAB inicio"
          >
            <span>PS<span className={styles.logoDot}>·</span>ELAB</span>
            <span className={styles.logoBadge}>Electronic Labs</span>
          </button>

          {/* Desktop nav */}
          <div className={styles.navLinks} role="menubar">
            {navItems.map(item => (
              <button
                key={item.section}
                className={`${styles.navLink} ${activeSection === item.section ? styles.active : ''}`}
                onClick={() => scrollTo(item.section)}
                role="menuitem"
              >
                {item.label}
              </button>
            ))}
            <a
              href="https://www.instagram.com/ps_elab/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.igLink}
              aria-label="PS-ELAB en Instagram"
            >
              <InstagramIcon />
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`} role="menu">
        {navItems.map(item => (
          <button
            key={item.section}
            className={styles.mobileNavLink}
            onClick={() => scrollTo(item.section)}
            role="menuitem"
          >
            {item.label}
          </button>
        ))}
        <div className={styles.mobileIgRow}>
          <a
            href="https://www.instagram.com/ps_elab/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Seguinos en Instagram"
          >
            <InstagramIcon />
            @ps_elab
          </a>
        </div>
      </div>
    </>
  )
}
