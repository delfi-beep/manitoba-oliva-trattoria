import React, { useState, useEffect } from 'react'

// ─── DESIGN TOKENS — LIGHT ───────────────────────────────────────────────────
const C = {
  bg:           '#ffffff',
  surface:      '#fafaf9',
  border:       '#e5e4e1',
  borderSoft:   '#eeede9',
  red:          '#C8102E',
  redDark:      '#9a0c24',
  redFaint:     '#fdf2f4',
  redBorder:    '#f2c0c8',
  green:        '#1a6b40',
  greenFaint:   '#f0f8f4',
  greenBorder:  '#a8d8bc',
  amber:        '#7a5c18',
  ongoingBg:    '#f7f5f0',
  ongoingBorder:'#d8d0c0',
  text:         '#111111',
  textSoft:     '#555250',
  muted:        '#aaa9a6',
}

// ─── WEEKS ────────────────────────────────────────────────────────────────────
const WEEKS = [
  { label: '04–08 MAY', startIdx: 0  },
  { label: '11–15 MAY', startIdx: 5  },
  { label: '18–22 MAY', startIdx: 10 },
  { label: '25–29 MAY', startIdx: 15 },
  { label: '01–05 JUN', startIdx: 20 },
  { label: '08–12 JUN', startIdx: 25 },
  { label: '15–19 JUN', startIdx: 30 },
  { label: '22–26 JUN', startIdx: 35 },
]
const DAYS = ['L','M','M','J','V']
const TOTAL_DAYS = 40
const TODAY_IDX = 1  // Martes 05 May

// ─── TASKS ────────────────────────────────────────────────────────────────────
const TASKS = [
  { name: 'Identidad conceptual',             owner: 'Manitoba', start: 0,  end: 12, type: 'delivery' },
  { name: 'Identidad conceptual — Feedback',  owner: 'Oliva',    start: 10, end: 12, type: 'feedback', italic: true },
  { name: 'Identidad Visual',                 owner: 'Manitoba', start: 5,  end: 23, type: 'delivery' },
  { name: 'Campaña Lanzamiento',              owner: 'Manitoba', start: 10, end: 23, type: 'delivery' },
  { name: 'Id. Visual & Campaña — Feedback',  owner: 'Oliva',    start: 20, end: 22, type: 'feedback', italic: true },
  { name: 'Identidad + Campaña v2',           owner: 'Manitoba', start: 25, end: 29, type: 'delivery' },
  { name: 'Always on — Mes 01 Launch',        owner: 'Manitoba', start: 30, end: 34, type: 'launch'   },
  { name: 'Plan de Comunicación',             owner: 'Manitoba', start: 30, end: 39, type: 'ongoing'  },
  { name: 'Brandbook',                        owner: 'Manitoba', start: 30, end: 39, type: 'ongoing'  },
]

function barStyle(type) {
  switch (type) {
    case 'delivery': return { bg: C.red,        border: C.redDark,      text: '#fff' }
    case 'feedback': return { bg: C.green,       border: C.green,        text: '#fff' }
    case 'launch':   return { bg: C.amber,       border: C.amber,        text: '#fff' }
    case 'ongoing':  return { bg: C.ongoingBg,   border: C.ongoingBorder, text: C.textSoft }
    default:         return { bg: C.muted,       border: C.muted,        text: '#fff' }
  }
}

function chipStyle(owner) {
  return owner === 'Oliva'
    ? { color: C.green, bg: C.greenFaint, border: C.greenBorder }
    : { color: C.red,   bg: C.redFaint,   border: C.redBorder   }
}

const LEGEND = [
  { label: 'Entrega Manitoba', color: C.red },
  { label: 'Feedback Oliva',   color: C.green },
  { label: 'Launch',           color: C.amber },
  { label: 'Ongoing',          color: C.ongoingBorder },
]

export default function App() {
  const [vw, setVw] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
  useEffect(() => {
    const fn = () => setVw(window.innerWidth)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  const isMobile = vw < 640
  const isTablet = vw < 900

  const DAY_W   = isMobile ? 22 : 28
  const LABEL_W = isMobile ? 130 : isTablet ? 170 : 240
  const OWNER_W = isMobile ? 0   : isTablet ? 80  : 96
  const ROW_H   = isMobile ? 38  : 44
  const chartW  = TOTAL_DAYS * DAY_W

  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.text, fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>

      {/* NAV */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: isMobile ? '0 16px' : '0 40px',
        height: isMobile ? 48 : 56,
        borderBottom: `1px solid ${C.border}`,
        background: C.bg,
        position: 'sticky', top: 0, zIndex: 200,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontWeight: 800, fontSize: isMobile ? 11 : 13, letterSpacing: '0.16em', color: C.red, textTransform: 'uppercase' }}>Manitoba</span>
          <span style={{ color: C.muted, fontSize: 11 }}>×</span>
          <span style={{ fontWeight: 300, fontSize: isMobile ? 11 : 13, letterSpacing: '0.24em', color: C.text, textTransform: 'uppercase' }}>Oliva</span>
        </div>
        {!isMobile && (
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            {LEGEND.map(l => (
              <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 9, height: 9, background: l.color, borderRadius: 2 }} />
                <span style={{ fontSize: 9, letterSpacing: '0.12em', color: C.muted, textTransform: 'uppercase' }}>{l.label}</span>
              </div>
            ))}
          </div>
        )}
      </nav>

      {/* RED STRIPE */}
      <div style={{ height: 3, background: `linear-gradient(90deg, ${C.red} 0%, ${C.redDark} 55%, transparent 100%)` }} />

      {/* HERO */}
      <div style={{
        padding: isMobile ? '20px 16px 14px' : '36px 40px 24px',
        borderBottom: `1px solid ${C.border}`,
      }}>
        <div style={{ fontSize: 9, letterSpacing: '0.28em', color: C.red, textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>
          Mayo — Junio 2026
        </div>
        <h1 style={{ fontSize: isMobile ? 28 : 42, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 0.92, textTransform: 'uppercase', marginBottom: 6 }}>
          Roadmap
        </h1>
        <p style={{ fontSize: 11, fontWeight: 300, letterSpacing: '0.14em', color: C.muted, textTransform: 'uppercase', marginBottom: isMobile ? 14 : 0 }}>
          Branding &amp; Comunicación
        </p>
        {isMobile && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 14px', marginTop: 12 }}>
            {LEGEND.map(l => (
              <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 8, height: 8, background: l.color, borderRadius: 2 }} />
                <span style={{ fontSize: 9, letterSpacing: '0.1em', color: C.muted, textTransform: 'uppercase' }}>{l.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* GANTT */}
      <div style={{ overflowX: 'auto', paddingBottom: 72 }}>
        <div style={{ minWidth: LABEL_W + OWNER_W + chartW + (isMobile ? 16 : 40), paddingLeft: isMobile ? 16 : 40 }}>

          {/* Week headers */}
          <div style={{ display: 'flex' }}>
            <div style={{ width: LABEL_W + OWNER_W, flexShrink: 0, position: 'sticky', left: 0, background: C.bg, zIndex: 20 }} />
            {WEEKS.map((wk, wi) => (
              <div key={wi} style={{ width: 5 * DAY_W, flexShrink: 0, borderLeft: `1px solid ${C.border}`, paddingTop: 10, paddingBottom: 6 }}>
                <div style={{ fontSize: 8, letterSpacing: '0.15em', color: C.red, textTransform: 'uppercase', fontWeight: 700, paddingLeft: 5, marginBottom: 5 }}>
                  {wk.label}
                </div>
                <div style={{ display: 'flex' }}>
                  {DAYS.map((d, di) => {
                    const isToday = wk.startIdx + di === TODAY_IDX
                    return (
                      <div key={di} style={{
                        width: DAY_W, textAlign: 'center', fontSize: 8,
                        color: isToday ? C.red : C.muted,
                        fontWeight: isToday ? 700 : 400,
                      }}>{d}</div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: C.border }} />

          {/* Rows */}
          {TASKS.map((task, ti) => {
            const bar  = barStyle(task.type)
            const chip = chipStyle(task.owner)
            const rowBg = ti % 2 === 0 ? C.bg : C.surface

            return (
              <div key={ti} style={{
                display: 'flex', height: ROW_H, alignItems: 'center',
                background: rowBg, borderBottom: `1px solid ${C.borderSoft}`,
              }}>
                {/* Sticky left panel */}
                <div style={{
                  display: 'flex', alignItems: 'center',
                  width: LABEL_W + OWNER_W, flexShrink: 0,
                  position: 'sticky', left: 0,
                  background: rowBg, zIndex: 10,
                  height: '100%',
                  borderRight: `1px solid ${C.borderSoft}`,
                }}>
                  <div style={{ width: LABEL_W, flexShrink: 0, paddingRight: 8 }}>
                    <span style={{
                      fontSize: isMobile ? 10 : 12,
                      fontWeight: task.italic ? 300 : 500,
                      fontStyle: task.italic ? 'italic' : 'normal',
                      color: task.italic ? '#666' : C.text,
                      display: 'block', whiteSpace: 'nowrap',
                      overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>
                      {task.name}
                    </span>
                  </div>
                  {!isMobile && (
                    <div style={{ width: OWNER_W, flexShrink: 0 }}>
                      <span style={{
                        fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase',
                        fontWeight: 700, color: chip.color,
                        background: chip.bg, padding: '3px 7px', borderRadius: 2,
                        border: `1px solid ${chip.border}`, display: 'inline-block',
                      }}>
                        {task.owner}
                      </span>
                    </div>
                  )}
                </div>

                {/* Chart */}
                <div style={{ position: 'relative', width: chartW, height: '100%', flexShrink: 0 }}>
                  {WEEKS.map((wk, wi) => (
                    <div key={wi} style={{
                      position: 'absolute', left: wk.startIdx * DAY_W,
                      top: 0, bottom: 0, width: 1, background: C.borderSoft,
                    }} />
                  ))}
                  <div style={{
                    position: 'absolute',
                    left: TODAY_IDX * DAY_W + DAY_W / 2,
                    top: 0, bottom: 0, width: 1,
                    background: `${C.red}44`, zIndex: 5,
                  }} />
                  <div style={{
                    position: 'absolute',
                    left: task.start * DAY_W + 2,
                    width: (task.end - task.start + 1) * DAY_W - 4,
                    top: '50%', transform: 'translateY(-50%)',
                    height: task.type === 'ongoing' ? (isMobile ? 12 : 15) : (isMobile ? 18 : 22),
                    background: bar.bg, border: `1px solid ${bar.border}`,
                    borderRadius: 3, zIndex: 2,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden',
                  }}>
                    {task.type === 'launch' && (
                      <span style={{ fontSize: isMobile ? 7 : 8, letterSpacing: '0.18em', fontWeight: 800, color: bar.text, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                        Launch
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* FOOTER */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        padding: isMobile ? '10px 16px' : '11px 40px',
        background: C.bg, borderTop: `1px solid ${C.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        zIndex: 100,
      }}>
        <span style={{ fontSize: 9, letterSpacing: '0.14em', color: C.muted, textTransform: 'uppercase' }}>
          {isMobile ? 'Manitoba × Oliva' : 'Manitoba + Oliva — Roadmap Branding y Comunicación'}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <div style={{ width: 6, height: 6, background: C.red, borderRadius: '50%' }} />
          <span style={{ fontSize: 9, letterSpacing: '0.12em', color: C.muted, textTransform: 'uppercase' }}>
            {isMobile ? '05 May' : 'Hoy: Mar 05 May 2026'}
          </span>
        </div>
      </div>
    </div>
  )
}
