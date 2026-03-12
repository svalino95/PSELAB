/**
 * PCBVisualization.jsx
 * SVG-based PCB renders for 3 PS-ELAB products.
 * Each product has an OFF state (green board) and ON state (dark + glow).
 */

/* ─── Shared filter definitions ─── */
const Defs = ({ id }) => (
  <defs>
    <filter id={`glow-${id}`} x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id={`glow-strong-${id}`} x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="5" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id={`glow-soft-${id}`} x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <pattern id={`pcb-grid-${id}`} width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,180,0,0.12)" strokeWidth="0.5"/>
    </pattern>
    <pattern id={`pcb-grid-on-${id}`} width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(204,0,255,0.06)" strokeWidth="0.5"/>
    </pattern>
  </defs>
)

/* ─────────────────────────────────────────────────────
   PRODUCT 1: Driver LED 12 Canales
   Size: 400x300
   OFF: green PCB, 12 channel outputs, 2 inductors, MCU, connectors
   ON:  dark bg, glowing traces, lit LED outputs
───────────────────────────────────────────────────── */
export function DriverLED_OFF() {
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
      <Defs id="d1off"/>
      {/* Board */}
      <rect width="400" height="300" fill="#1B3D1F"/>
      <rect width="400" height="300" fill="url(#pcb-grid-d1off)"/>
      <rect x="8" y="8" width="384" height="284" fill="none" stroke="#2D6B34" strokeWidth="2"/>
      {/* Mounting holes */}
      {[[20,20],[380,20],[20,280],[380,280]].map(([x,y],i)=>(
        <g key={i}><circle cx={x} cy={y} r="6" fill="#1B3D1F" stroke="#B87333" strokeWidth="1.5"/>
        <circle cx={x} cy={y} r="2" fill="#B87333"/></g>
      ))}
      {/* Main copper traces */}
      <g stroke="#B87333" strokeWidth="2" fill="none" opacity="0.7">
        <line x1="40" y1="240" x2="360" y2="240"/>
        <line x1="40" y1="255" x2="360" y2="255"/>
        <line x1="40" y1="60" x2="360" y2="60"/>
        <line x1="200" y1="60" x2="200" y2="240"/>
        <path d="M 60 60 L 60 100 L 340 100 L 340 60"/>
        <path d="M 60 240 L 60 200 L 340 200 L 340 240"/>
      </g>
      {/* Power input connector */}
      <rect x="30" y="125" width="30" height="50" rx="3" fill="#2A2A2A" stroke="#B87333" strokeWidth="1"/>
      <rect x="34" y="130" width="8" height="8" rx="1" fill="#555"/>
      <rect x="34" y="142" width="8" height="8" rx="1" fill="#555"/>
      <rect x="34" y="154" width="8" height="8" rx="1" fill="#555"/>
      <rect x="46" y="130" width="8" height="8" rx="1" fill="#555"/>
      <rect x="46" y="142" width="8" height="8" rx="1" fill="#555"/>
      <rect x="46" y="154" width="8" height="8" rx="1" fill="#555"/>
      <text x="33" y="185" fill="rgba(255,255,255,0.5)" fontSize="6" fontFamily="monospace">J1-PWR</text>

      {/* MCU chip center */}
      <rect x="155" y="120" width="90" height="60" rx="3" fill="#1A1A1A" stroke="#B87333" strokeWidth="1.2"/>
      {[0,1,2,3,4,5].map(i=>(<line key={i} x1={155} y1={130+i*8} x2={148} y2={130+i*8} stroke="#B87333" strokeWidth="1"/>))}
      {[0,1,2,3,4,5].map(i=>(<line key={i} x1={245} y1={130+i*8} x2={252} y2={130+i*8} stroke="#B87333" strokeWidth="1"/>))}
      {[0,1,2,3].map(i=>(<line key={i} x1={165+i*16} y1={120} x2={165+i*16} y2={113} stroke="#B87333" strokeWidth="1"/>))}
      {[0,1,2,3].map(i=>(<line key={i} x1={165+i*16} y1={180} x2={165+i*16} y2={187} stroke="#B87333" strokeWidth="1"/>))}
      <text x="178" y="148" fill="rgba(255,255,255,0.6)" fontSize="8" fontFamily="monospace" fontWeight="bold">STM32</text>
      <text x="174" y="158" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace">F405RGT</text>

      {/* 2 Inductors */}
      {[105, 270].map((x,i)=>(
        <g key={i}>
          <rect x={x-18} y="120" width="36" height="36" rx="18" fill="#2C2C1A" stroke="#B87333" strokeWidth="1.2"/>
          <circle cx={x} cy="138" r="10" fill="#3A3A00" stroke="#B87333" strokeWidth="1"/>
          <circle cx={x} cy="138" r="4" fill="#B87333" opacity="0.8"/>
          <text x={x-8} y="169" fill="rgba(255,255,255,0.5)" fontSize="5.5" fontFamily="monospace">{i===0?'L1 47µH':'L2 47µH'}</text>
        </g>
      ))}

      {/* 12 LED output channels — 6 on top, 6 on bottom */}
      {Array.from({length:6}).map((_,i)=>(
        <g key={i}>
          {/* Top row */}
          <rect x={40+i*52} y="70" width="38" height="18" rx="2" fill="#222" stroke="#B87333" strokeWidth="1"/>
          <circle cx={40+i*52+10} cy="79" r="3" fill="#333" stroke="#B87333" strokeWidth="0.8"/>
          <circle cx={40+i*52+28} cy="79" r="3" fill="#333" stroke="#B87333" strokeWidth="0.8"/>
          <text x={40+i*52+8} y="96" fill="rgba(255,255,255,0.45)" fontSize="5.5" fontFamily="monospace">CH{i+1}</text>
          {/* Bottom row */}
          <rect x={40+i*52} y="212" width="38" height="18" rx="2" fill="#222" stroke="#B87333" strokeWidth="1"/>
          <circle cx={40+i*52+10} cy="221" r="3" fill="#333" stroke="#B87333" strokeWidth="0.8"/>
          <circle cx={40+i*52+28} cy="221" r="3" fill="#333" stroke="#B87333" strokeWidth="0.8"/>
          <text x={40+i*52+6} y="236" fill="rgba(255,255,255,0.45)" fontSize="5.5" fontFamily="monospace">CH{i+7}</text>
        </g>
      ))}

      {/* Capacitors */}
      {[80,160,240,320].map((x,i)=>(
        <g key={i}>
          <ellipse cx={x} cy="150" rx="6" ry="8" fill="#1A1A3A" stroke="#B87333" strokeWidth="1"/>
          <line x1={x} y1="144" x2={x} y2="140" stroke="#B87333" strokeWidth="1"/>
          <line x1={x} y1="156" x2={x} y2="160" stroke="#B87333" strokeWidth="1"/>
        </g>
      ))}

      {/* Silk screen labels */}
      <text x="170" y="275" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace" fontWeight="bold">PS·ELAB — DRIVER LED 12CH v2.1</text>
    </svg>
  )
}

export function DriverLED_ON() {
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
      <Defs id="d1on"/>
      {/* Dark board */}
      <rect width="400" height="300" fill="#060808"/>
      <rect width="400" height="300" fill="url(#pcb-grid-on-d1on)"/>
      <rect x="8" y="8" width="384" height="284" fill="none" stroke="rgba(204,0,255,0.2)" strokeWidth="1"/>
      {/* Glowing mounting holes */}
      {[[20,20],[380,20],[20,280],[380,280]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="5" fill="none" stroke="rgba(204,0,255,0.5)" strokeWidth="1.5" filter="url(#glow-soft-d1on)"/>
      ))}
      {/* Glowing main power traces */}
      <g filter="url(#glow-d1on)" stroke="#CC00FF" strokeWidth="2" fill="none" opacity="0.8">
        <line x1="40" y1="240" x2="360" y2="240"/>
        <line x1="40" y1="255" x2="360" y2="255" stroke="rgba(255,100,0,0.8)"/>
        <line x1="40" y1="60" x2="360" y2="60"/>
        <line x1="200" y1="60" x2="200" y2="240"/>
        <path d="M 60 60 L 60 100 L 340 100 L 340 60"/>
        <path d="M 60 240 L 60 200 L 340 200 L 340 240"/>
      </g>
      {/* MCU - glowing */}
      <rect x="155" y="120" width="90" height="60" rx="3" fill="#0A0A1A" stroke="rgba(204,0,255,0.6)" strokeWidth="1.5" filter="url(#glow-soft-d1on)"/>
      {[0,1,2,3,4,5].map(i=>(<line key={i} x1={155} y1={130+i*8} x2={148} y2={130+i*8} stroke="rgba(204,0,255,0.5)" strokeWidth="1"/>))}
      {[0,1,2,3,4,5].map(i=>(<line key={i} x1={245} y1={130+i*8} x2={252} y2={130+i*8} stroke="rgba(204,0,255,0.5)" strokeWidth="1"/>))}
      {[0,1,2,3].map(i=>(<line key={i} x1={165+i*16} y1={120} x2={165+i*16} y2={113} stroke="rgba(204,0,255,0.5)" strokeWidth="1"/>))}
      {[0,1,2,3].map(i=>(<line key={i} x1={165+i*16} y1={180} x2={165+i*16} y2={187} stroke="rgba(204,0,255,0.5)" strokeWidth="1"/>))}
      <text x="174" y="148" fill="#CC00FF" fontSize="8" fontFamily="monospace" fontWeight="bold" filter="url(#glow-soft-d1on)">STM32</text>
      <text x="171" y="158" fill="rgba(204,0,255,0.7)" fontSize="6" fontFamily="monospace">F405RGT</text>

      {/* Power connector — red LED indicator */}
      <rect x="30" y="125" width="30" height="50" rx="3" fill="#0A0A0A" stroke="rgba(255,80,80,0.6)" strokeWidth="1"/>
      <circle cx="56" cy="131" r="3" fill="#FF3333" filter="url(#glow-strong-d1on)" opacity="0.9"/>

      {/* Inductors — warm glow from current */}
      {[105, 270].map((x,i)=>(
        <g key={i}>
          <circle cx={x} cy="138" r="18" fill="rgba(255,150,0,0.05)" filter="url(#glow-d1on)"/>
          <rect x={x-18} y="120" width="36" height="36" rx="18" fill="rgba(20,18,0,0.9)" stroke="rgba(255,150,0,0.5)" strokeWidth="1.5"/>
          <circle cx={x} cy="138" r="10" fill="rgba(40,30,0,0.9)" stroke="rgba(255,150,0,0.7)" strokeWidth="1.5" filter="url(#glow-soft-d1on)"/>
          <circle cx={x} cy="138" r="4" fill="rgba(255,180,0,0.8)" filter="url(#glow-d1on)"/>
        </g>
      ))}

      {/* 12 LED channel outputs — lit up with different colors */}
      {Array.from({length:6}).map((_,i)=>{
        const colors = ['#00FF88','#00E0FF','#AAFF00','#FF6B00','#FF00AA','#00CCFF']
        const c = colors[i]
        return (
          <g key={i}>
            {/* Top channels */}
            <rect x={40+i*52} y="70" width="38" height="18" rx="2" fill="#0A0A0A" stroke={`${c}88`} strokeWidth="1"/>
            <circle cx={40+i*52+10} cy="79" r="4" fill={c} filter="url(#glow-strong-d1on)" opacity="0.9"/>
            <circle cx={40+i*52+28} cy="79" r="4" fill={c} filter="url(#glow-strong-d1on)" opacity="0.9"/>
            <text x={40+i*52+8} y="96" fill={c} fontSize="5.5" fontFamily="monospace" opacity="0.7">CH{i+1}</text>
            {/* Bottom channels */}
            <rect x={40+i*52} y="212" width="38" height="18" rx="2" fill="#0A0A0A" stroke={`${c}88`} strokeWidth="1"/>
            <circle cx={40+i*52+10} cy="221" r="4" fill={c} filter="url(#glow-strong-d1on)" opacity="0.9"/>
            <circle cx={40+i*52+28} cy="221" r="4" fill={c} filter="url(#glow-strong-d1on)" opacity="0.9"/>
            <text x={40+i*52+6} y="236" fill={c} fontSize="5.5" fontFamily="monospace" opacity="0.7">CH{i+7}</text>
          </g>
        )
      })}

      {/* Capacitors — charged glow */}
      {[80,160,240,320].map((x,i)=>(
        <ellipse key={i} cx={x} cy="150" rx="6" ry="8" fill="rgba(50,0,100,0.5)" stroke="rgba(204,0,255,0.6)" strokeWidth="1" filter="url(#glow-soft-d1on)"/>
      ))}

      <text x="170" y="275" fill="rgba(204,0,255,0.5)" fontSize="7" fontFamily="monospace" fontWeight="bold">PS·ELAB — DRIVER LED 12CH v2.1</text>
    </svg>
  )
}

/* ─────────────────────────────────────────────────────
   PRODUCT 2: Módulo Relay 8 Canales RS485
   OFF: green PCB, 8 relay modules in 2 rows of 4
   ON:  dark bg, relay coil LEDs lit
───────────────────────────────────────────────────── */
export function RelayBoard_OFF() {
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
      <Defs id="r2off"/>
      <rect width="400" height="300" fill="#1B3D1F"/>
      <rect width="400" height="300" fill="url(#pcb-grid-r2off)"/>
      <rect x="8" y="8" width="384" height="284" fill="none" stroke="#2D6B34" strokeWidth="2"/>
      {[[20,20],[380,20],[20,280],[380,280]].map(([x,y],i)=>(
        <g key={i}><circle cx={x} cy={y} r="6" fill="#1B3D1F" stroke="#B87333" strokeWidth="1.5"/><circle cx={x} cy={y} r="2" fill="#B87333"/></g>
      ))}
      {/* RS485 transceiver chip */}
      <rect x="160" y="130" width="80" height="40" rx="2" fill="#1A1A1A" stroke="#B87333" strokeWidth="1.2"/>
      {[0,1,2,3].map(i=>(<line key={i} x1={160} y1={138+i*8} x2={153} y2={138+i*8} stroke="#B87333" strokeWidth="1"/>))}
      {[0,1,2,3].map(i=>(<line key={i} x1={240} y1={138+i*8} x2={247} y2={138+i*8} stroke="#B87333" strokeWidth="1"/>))}
      <text x="168" y="148" fill="rgba(255,255,255,0.6)" fontSize="7" fontFamily="monospace" fontWeight="bold">MAX485</text>
      <text x="172" y="158" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace">RS485</text>
      {/* RS485 screw terminal */}
      <rect x="340" y="120" width="40" height="60" rx="2" fill="#2A2A2A" stroke="#B87333" strokeWidth="1"/>
      {[0,1,2,3,4].map(i=>(<rect key={i} x={344} y={124+i*11} width="10" height="9" rx="1" fill="#555"/>))}
      <text x="342" y="190" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace">RS485+</text>
      {/* 8 Relay modules — 2 rows of 4 */}
      {Array.from({length:4}).map((_,i)=>(
        <g key={i}>
          {/* Top row */}
          <rect x={34+i*84} y="40" width="60" height="60" rx="3" fill="#2B2B00" stroke="#B87333" strokeWidth="1.2"/>
          <rect x={40+i*84} y="48" width="48" height="36" rx="2" fill="#3A3A10" stroke="#B87333" strokeWidth="0.8"/>
          <circle cx={64+i*84} cy="66" r="8" fill="#2A2A00" stroke="#B87333" strokeWidth="1"/>
          <line x1={34+i*84} y1="90" x2={34+i*84-8} y2="90" stroke="#B87333" strokeWidth="1.5"/>
          <line x1={34+i*84} y1="82" x2={34+i*84-8} y2="82" stroke="#B87333" strokeWidth="1.5"/>
          <line x1={94+i*84} y1="90" x2={94+i*84+8} y2="90" stroke="#B87333" strokeWidth="1.5"/>
          <text x={52+i*84} y="112" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace">RLY{i+1}</text>
          {/* Bottom row */}
          <rect x={34+i*84} y="195" width="60" height="60" rx="3" fill="#2B2B00" stroke="#B87333" strokeWidth="1.2"/>
          <rect x={40+i*84} y="203" width="48" height="36" rx="2" fill="#3A3A10" stroke="#B87333" strokeWidth="0.8"/>
          <circle cx={64+i*84} cy="221" r="8" fill="#2A2A00" stroke="#B87333" strokeWidth="1"/>
          <text x={52+i*84} y="264" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace">RLY{i+5}</text>
        </g>
      ))}
      {/* Status LED row */}
      {Array.from({length:8}).map((_,i)=>(<circle key={i} cx={40+i*40} cy="160" r="4" fill="#222" stroke="#B87333" strokeWidth="0.8"/>))}
      <text x="145" y="177" fill="rgba(255,255,255,0.3)" fontSize="6" fontFamily="monospace">STATUS LEDS</text>
      <text x="145" y="285" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace" fontWeight="bold">PS·ELAB — RELAY 8CH RS485 v1.3</text>
    </svg>
  )
}

export function RelayBoard_ON() {
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
      <Defs id="r2on"/>
      <rect width="400" height="300" fill="#060808"/>
      <rect width="400" height="300" fill="url(#pcb-grid-on-r2on)"/>
      <rect x="8" y="8" width="384" height="284" fill="none" stroke="rgba(204,0,255,0.2)" strokeWidth="1"/>
      {/* MAX485 glowing */}
      <rect x="160" y="130" width="80" height="40" rx="2" fill="#0A0A1A" stroke="rgba(204,0,255,0.5)" strokeWidth="1.2" filter="url(#glow-soft-r2on)"/>
      {[0,1,2,3].map(i=>(<line key={i} x1={160} y1={138+i*8} x2={153} y2={138+i*8} stroke="rgba(204,0,255,0.5)" strokeWidth="1"/>))}
      {[0,1,2,3].map(i=>(<line key={i} x1={240} y1={138+i*8} x2={247} y2={138+i*8} stroke="rgba(204,0,255,0.5)" strokeWidth="1"/>))}
      <text x="168" y="148" fill="#CC00FF" fontSize="7" fontFamily="monospace" fontWeight="bold" filter="url(#glow-soft-r2on)">MAX485</text>
      {/* RS485 terminal glowing */}
      <rect x="340" y="120" width="40" height="60" rx="2" fill="#0A0A0A" stroke="rgba(204,0,255,0.4)" strokeWidth="1"/>
      {/* 8 Relay modules — activated */}
      {Array.from({length:4}).map((_,i)=>([
        {y:40, ridx:i+1, active: i%2===0},
        {y:195, ridx:i+5, active: i%2!==0}
      ]).map(({y, ridx, active})=>(
        <g key={`${i}-${y}`}>
          <rect x={34+i*84} y={y} width="60" height="60" rx="3" fill={active?"rgba(255,150,0,0.08)":"#0A0A0A"} stroke={active?"rgba(255,150,0,0.6)":"rgba(204,0,255,0.2)"} strokeWidth="1.2" filter={active?"url(#glow-soft-r2on)":"none"}/>
          <circle cx={64+i*84} cy={y+26} r="8" fill={active?"rgba(255,120,0,0.3)":"#0A0A0A"} stroke={active?"rgba(255,150,0,0.8)":"rgba(204,0,255,0.3)"} strokeWidth="1.2" filter={active?"url(#glow-d1on)":"none"}/>
          {/* Coil indication */}
          <text x={52+i*84} y={y+67} fill={active?"rgba(255,150,0,0.7)":"rgba(204,0,255,0.4)"} fontSize="6" fontFamily="monospace">RLY{ridx}</text>
        </g>
      )))}
      {/* Status LEDs — some green, some amber */}
      {Array.from({length:8}).map((_,i)=>(
        <circle key={i} cx={40+i*40} cy="160" r="4"
          fill={i<5 ? '#00FF88' : '#FF8800'}
          filter="url(#glow-strong-r2on)"
          opacity="0.9"/>
      ))}
      <text x="145" y="285" fill="rgba(204,0,255,0.5)" fontSize="7" fontFamily="monospace" fontWeight="bold">PS·ELAB — RELAY 8CH RS485 v1.3</text>
    </svg>
  )
}

/* ─────────────────────────────────────────────────────
   PRODUCT 3: Shield ESP32 Industrial
   OFF: green PCB, ESP32 module, headers, connectors
   ON:  dark bg, WiFi indicator, RGB LEDs, traces glow
───────────────────────────────────────────────────── */
export function ESP32Shield_OFF() {
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
      <Defs id="e3off"/>
      <rect width="400" height="300" fill="#1B3D1F"/>
      <rect width="400" height="300" fill="url(#pcb-grid-e3off)"/>
      <rect x="8" y="8" width="384" height="284" fill="none" stroke="#2D6B34" strokeWidth="2"/>
      {[[20,20],[380,20],[20,280],[380,280]].map(([x,y],i)=>(
        <g key={i}><circle cx={x} cy={y} r="6" fill="#1B3D1F" stroke="#B87333" strokeWidth="1.5"/><circle cx={x} cy={y} r="2" fill="#B87333"/></g>
      ))}
      {/* ESP32 module */}
      <rect x="130" y="90" width="140" height="80" rx="4" fill="#0E1A0E" stroke="#B87333" strokeWidth="1.5"/>
      <rect x="136" y="98" width="128" height="64" rx="3" fill="#1A2A1A" stroke="#2D6B34" strokeWidth="0.8"/>
      {/* Antenna trace */}
      <path d="M 258 98 L 275 98 L 275 82 L 265 82 L 265 90 L 255 90 L 255 84 L 268 84" stroke="#B87333" strokeWidth="1" fill="none"/>
      <text x="163" y="128" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="monospace" fontWeight="bold">ESP32</text>
      <text x="162" y="140" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace">WROOM-32U</text>
      {/* Header pins — left & right */}
      {Array.from({length:10}).map((_,i)=>(
        <g key={i}>
          <rect x="42" y={55+i*20} width="10" height="10" rx="1" fill="#2A2A2A" stroke="#B87333" strokeWidth="0.8"/>
          <rect x="350" y={55+i*20} width="10" height="10" rx="1" fill="#2A2A2A" stroke="#B87333" strokeWidth="0.8"/>
        </g>
      ))}
      {/* USB connector */}
      <rect x="175" y="35" width="50" height="30" rx="3" fill="#2A2A2A" stroke="#B87333" strokeWidth="1.2"/>
      <rect x="185" y="40" width="30" height="18" rx="1" fill="#444"/>
      <text x="181" y="75" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace">USB-C</text>
      {/* Power connector */}
      <rect x="30" y="100" width="35" height="50" rx="2" fill="#2A2A2A" stroke="#B87333" strokeWidth="1"/>
      {[0,1,2,3].map(i=>(<rect key={i} x={34} y={104+i*11} width="9" height="9" rx="1" fill="#555"/>))}
      <text x="32" y="158" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace">VIN/GND</text>
      {/* I2C/SPI grove connectors */}
      {[210, 260, 310].map((x,i)=>(
        <g key={i}>
          <rect x={x} y="215" width="40" height="30" rx="2" fill="#1A1A3A" stroke="#B87333" strokeWidth="1"/>
          <text x={x+5} y="234" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace">{['I2C','SPI','UART'][i]}</text>
        </g>
      ))}
      {/* Status LEDs */}
      <circle cx="340" cy="90" r="4" fill="#222" stroke="#B87333" strokeWidth="0.8"/>
      <circle cx="355" cy="90" r="4" fill="#222" stroke="#B87333" strokeWidth="0.8"/>
      <text x="335" y="103" fill="rgba(255,255,255,0.4)" fontSize="5" fontFamily="monospace">PWR/IO</text>
      {/* Reset button */}
      <rect x="340" y="200" width="20" height="20" rx="3" fill="#333" stroke="#B87333" strokeWidth="1"/>
      <circle cx="350" cy="210" r="5" fill="#555"/>
      <text x="337" y="228" fill="rgba(255,255,255,0.4)" fontSize="5" fontFamily="monospace">RESET</text>
      {/* Traces */}
      <g stroke="#B87333" strokeWidth="1" fill="none" opacity="0.5">
        <path d="M 52 60 L 130 60 L 130 90"/><path d="M 360 80 L 270 80 L 270 90"/>
        <line x1="200" y1="35" x2="200" y2="90"/><line x1="200" y1="170" x2="200" y2="215"/>
      </g>
      <text x="130" y="285" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace" fontWeight="bold">PS·ELAB — ESP32 INDUSTRIAL SHIELD v3.0</text>
    </svg>
  )
}

export function ESP32Shield_ON() {
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
      <Defs id="e3on"/>
      <rect width="400" height="300" fill="#060808"/>
      <rect width="400" height="300" fill="url(#pcb-grid-on-e3on)"/>
      <rect x="8" y="8" width="384" height="284" fill="none" stroke="rgba(204,0,255,0.2)" strokeWidth="1"/>
      {/* ESP32 module glowing */}
      <rect x="130" y="90" width="140" height="80" rx="4" fill="#0A120A" stroke="rgba(204,0,255,0.5)" strokeWidth="1.5" filter="url(#glow-soft-e3on)"/>
      {/* WiFi symbol glow */}
      <path d="M 258 98 L 275 98 L 275 82 L 265 82 L 265 90 L 255 90 L 255 84 L 268 84" stroke="rgba(204,0,255,0.7)" strokeWidth="1.5" fill="none" filter="url(#glow-soft-e3on)"/>
      <text x="163" y="128" fill="#CC00FF" fontSize="9" fontFamily="monospace" fontWeight="bold" filter="url(#glow-soft-e3on)">ESP32</text>
      <text x="162" y="140" fill="rgba(204,0,255,0.6)" fontSize="6" fontFamily="monospace">WROOM-32U</text>
      {/* Headers */}
      {Array.from({length:10}).map((_,i)=>(
        <g key={i}>
          <rect x="42" y={55+i*20} width="10" height="10" rx="1" fill="rgba(50,0,100,0.5)" stroke="rgba(204,0,255,0.4)" strokeWidth="0.8"/>
          <rect x="350" y={55+i*20} width="10" height="10" rx="1" fill="rgba(50,0,100,0.5)" stroke="rgba(204,0,255,0.4)" strokeWidth="0.8"/>
        </g>
      ))}
      {/* USB-C glowing */}
      <rect x="175" y="35" width="50" height="30" rx="3" fill="#0A0A1A" stroke="rgba(204,0,255,0.5)" strokeWidth="1.2" filter="url(#glow-soft-e3on)"/>
      {/* Power LED RED */}
      <circle cx="340" cy="90" r="5" fill="#FF3333" filter="url(#glow-strong-e3on)" opacity="0.95"/>
      {/* IO LED Blue/green */}
      <circle cx="355" cy="90" r="5" fill="#00FF88" filter="url(#glow-strong-e3on)" opacity="0.95"/>
      {/* Glowing traces */}
      <g stroke="rgba(204,0,255,0.6)" strokeWidth="1.2" fill="none" filter="url(#glow-soft-e3on)">
        <path d="M 52 60 L 130 60 L 130 90"/>
        <path d="M 360 80 L 270 80 L 270 90"/>
        <line x1="200" y1="35" x2="200" y2="90"/>
        <line x1="200" y1="170" x2="200" y2="215"/>
      </g>
      {/* Grove connectors glowing */}
      {[210, 260, 310].map((x,i)=>(
        <rect key={i} x={x} y="215" width="40" height="30" rx="2" fill="rgba(20,0,50,0.5)" stroke="rgba(204,0,255,0.4)" strokeWidth="1" filter="url(#glow-soft-e3on)"/>
      ))}
      {/* Reset button */}
      <rect x="340" y="200" width="20" height="20" rx="3" fill="#0A0A1A" stroke="rgba(255,80,80,0.5)" strokeWidth="1"/>
      <circle cx="350" cy="210" r="5" fill="rgba(255,60,60,0.3)"/>
      {/* WiFi activity indicator animation via opacity trick */}
      <circle cx="285" cy="80" r="12" fill="none" stroke="rgba(204,0,255,0.25)" strokeWidth="2"/>
      <circle cx="285" cy="80" r="7" fill="none" stroke="rgba(204,0,255,0.4)" strokeWidth="2"/>
      <circle cx="285" cy="80" r="2" fill="rgba(204,0,255,0.9)" filter="url(#glow-strong-e3on)"/>
      <text x="130" y="285" fill="rgba(204,0,255,0.5)" fontSize="7" fontFamily="monospace" fontWeight="bold">PS·ELAB — ESP32 INDUSTRIAL SHIELD v3.0</text>
    </svg>
  )
}
