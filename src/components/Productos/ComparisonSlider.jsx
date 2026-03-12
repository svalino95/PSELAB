import { useState, useRef, useCallback, useEffect } from 'react'
import styles from './ComparisonSlider.module.css'

const UpDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="17 11 12 6 7 11"/>
    <polyline points="17 18 12 13 7 18"/>
  </svg>
)

/**
 * ComparisonSlider
 * Drag the horizontal bar up/down to reveal two visual states.
 * topContent   = what shows at the TOP (when bar is pulled down) — e.g. "ON / Powered"
 * bottomContent = what shows at the BOTTOM (when bar is pulled up) — e.g. "OFF / Bare PCB"
 * topLabel     = pill label shown on top half
 * bottomLabel  = pill label shown on bottom half
 */
export default function ComparisonSlider({ topContent, bottomContent, topLabel = 'ENCENDIDA', bottomLabel = 'APAGADA', initialPos = 50 }) {
  const [pos, setPos]       = useState(initialPos) // 0–100 from top
  const [isDragging, setIsDragging] = useState(false)
  const containerRef        = useRef(null)

  const updatePos = useCallback((clientY) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const pct = Math.max(5, Math.min(95, ((clientY - rect.top) / rect.height) * 100))
    setPos(pct)
  }, [])

  // Start drag from handle or anywhere on the container
  const onHandleDown = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
    updatePos(e.touches?.[0]?.clientY ?? e.clientY)
  }

  // Click on the container to jump the handle
  const onContainerClick = (e) => {
    if (!isDragging) updatePos(e.clientY)
  }

  useEffect(() => {
    if (!isDragging) return

    const onMove = (e) => {
      e.preventDefault()
      updatePos(e.touches?.[0]?.clientY ?? e.clientY)
    }
    const onUp = () => setIsDragging(false)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchmove', onMove, { passive: false })
    window.addEventListener('touchend', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onUp)
    }
  }, [isDragging, updatePos])

  return (
    <div
      ref={containerRef}
      className={styles.container}
      style={{ cursor: isDragging ? 'ns-resize' : 'default' }}
      onClick={onContainerClick}
      aria-label="Comparador interactivo: arrastrá la barra para ver los dos estados"
      role="slider"
      aria-valuenow={Math.round(pos)}
      aria-valuemin={5}
      aria-valuemax={95}
    >
      {/* ── BOTTOM LAYER: always fully visible ── */}
      <div className={styles.layerBottom} aria-hidden="true">
        {bottomContent}
      </div>

      {/* ── TOP LAYER: clipped to show only top `pos`% ── */}
      <div
        className={styles.layerTop}
        style={{ clipPath: `inset(0 0 ${100 - pos}% 0)` }}
        aria-hidden="true"
      >
        {topContent}
      </div>

      {/* Labels */}
      <div className={styles.labelTop} style={{ opacity: pos > 18 ? 1 : 0 }}>
        {topLabel}
      </div>
      <div className={styles.labelBottom} style={{ opacity: pos < 82 ? 1 : 0 }}>
        {bottomLabel}
      </div>

      {/* ── DRAG HANDLE ── */}
      <div
        className={styles.handle}
        style={{ top: `${pos}%` }}
        onMouseDown={onHandleDown}
        onTouchStart={onHandleDown}
        aria-hidden="true"
      >
        <div className={styles.handleLine} />
        <div className={styles.handleKnob}>
          <UpDownIcon />
        </div>
      </div>

      {/* Hint */}
      <div className={styles.dragHint} aria-hidden="true">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7-7 7 7"/></svg>
        Arrastrá
      </div>
    </div>
  )
}
