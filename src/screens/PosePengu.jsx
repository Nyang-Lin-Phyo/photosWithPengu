import { useState } from 'react'
import { ChevronRight, ChevronLeft, Check } from 'lucide-react'
import penguIcon from '../assets/pengu1.png'
import p1 from '../assets/pengu1.png'
import p2 from '../assets/pengu2.png'
import p3 from '../assets/pengu3.png'
import p4 from '../assets/pengu4.png'
import p5 from '../assets/pengu5.png'
import p6 from '../assets/pengu6.png'
import f1 from '../assets/framePoro1.png'
import f2 from '../assets/framePoro2.png'
import f3 from '../assets/framePoro3.png'
import f4 from '../assets/framePoro4.png'

const PENGUS = [
  { id: 'p1', src: p1 },
  { id: 'p2', src: p2 },
  { id: 'p3', src: p3 },
  { id: 'p4', src: p4 },
  { id: 'p5', src: p5 },
  { id: 'p6', src: p6 },
]

const FRAME_IMGS = { poro: f1, league: f2, cloud: f3, crown: f4 }

const SLOTS = [
  { top: 26,  height: 187 - 26  },
  { top: 216, height: 377 - 216 },
  { top: 404, height: 563 - 404 },
]

const steps = [
  { n: 1, label: 'frame\nselection', done: true },
  { n: 2, label: 'pose\npengu', active: true },
  { n: 3, label: 'add your\nphotos' },
  { n: 4, label: 'decorate!' },
]

export default function PosePengu({ goTo, frame, penguSlots, setPenguSlots }) {
  const slots = 3
  const [slotContents, setSlotContents] = useState(Array(slots).fill(null))
  const [dragging, setDragging] = useState(null)
  const [hoveringSlot, setHoveringSlot] = useState(null)

  const frameImg = FRAME_IMGS[frame?.id] ?? f1
  const allFilled = slotContents.every(Boolean)

  const onDragStartPengu = (e, pengu) => {
    setDragging({ penguId: pengu.id, src: pengu.src, fromSlot: null })
    e.dataTransfer.effectAllowed = 'copy'
  }

  const onDragStartSlot = (e, slotIndex) => {
    const content = slotContents[slotIndex]
    if (!content) return
    setDragging({ penguId: content.penguId, src: content.src, fromSlot: slotIndex })
    e.dataTransfer.effectAllowed = 'move'
  }

  const onDragOverSlot = (e, slotIndex) => {
    e.preventDefault()
    setHoveringSlot(slotIndex)
  }

  const onDropSlot = (e, slotIndex) => {
    e.preventDefault()
    if (!dragging) return
    const updated = [...slotContents]
    if (dragging.fromSlot !== null) updated[dragging.fromSlot] = null
    updated[slotIndex] = { penguId: dragging.penguId, src: dragging.src }
    setSlotContents(updated)
    setPenguSlots(updated.map(s => s?.src ?? null))
    setDragging(null)
    setHoveringSlot(null)
  }

  const onDropRightPanel = (e) => {
    e.preventDefault()
    if (!dragging || dragging.fromSlot === null) return
    const updated = [...slotContents]
    updated[dragging.fromSlot] = null
    setSlotContents(updated)
    setPenguSlots(updated.map(s => s?.src ?? null))
    setDragging(null)
    setHoveringSlot(null)
  }

  const onDragEnd = () => {
    setDragging(null)
    setHoveringSlot(null)
  }

  return (
    <>
      <style>{`
        .pengu-card {
          cursor: grab;
          border-radius: 12px;
          overflow: hidden;
          background: #FFF3C4;
          border: 3px solid transparent;
          transition: border 0.15s, transform 0.15s, box-shadow 0.15s;
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .pengu-card:hover {
          border-color: #FFD84D;
          transform: scale(1.05);
          box-shadow: 0 4px 16px rgba(0,0,0,0.12);
        }
        .pengu-card:active { cursor: grabbing; }
        .pp-slot {
          position: absolute;
          left: 9%;
          right: 9%;
          overflow: hidden;
          border-radius: 6px;
          border: 2px dashed transparent;
          transition: border 0.15s, background 0.15s;
          box-sizing: border-box;
        }
        .pp-slot.hovering {
          border-color: #FFD84D !important;
          background: rgba(255,216,77,0.2);
        }
      `}</style>

      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#fff', fontFamily: 'Nunito, sans-serif', overflow: 'hidden' }}>

        {/* Navbar */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '1rem 2rem', borderBottom: '1px solid #eee', flexShrink: 0 }}>
          <img src={penguIcon} alt="pengu" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
          <span style={{ fontFamily: 'Baloo 2', fontWeight: 700, fontSize: '1rem', color: '#111' }}>pengu photobooth</span>
        </nav>

        {/* Step indicator */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '1.5rem 2rem 0', flexShrink: 0 }}>
          {steps.map((step, i) => (
            <div key={step.n} style={{ display: 'flex', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  border: `2px solid ${step.done ? '#4CAF50' : step.active ? '#111' : '#ccc'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Baloo 2', fontWeight: 700, fontSize: '0.9rem',
                  color: step.done ? '#fff' : step.active ? '#111' : '#ccc',
                  background: step.done ? '#4CAF50' : '#fff',
                }}>
                  {step.done ? <Check size={16} strokeWidth={3} color="#fff" /> : step.n}
                </div>
                <div style={{ fontSize: '0.7rem', color: step.done || step.active ? '#111' : '#ccc', textAlign: 'center', lineHeight: 1.3, whiteSpace: 'pre-line', fontWeight: step.active ? 700 : 400 }}>
                  {step.label}
                </div>
              </div>
              {i < 3 && <div style={{ width: 60, height: 2, background: step.done ? '#4CAF50' : '#ddd', marginTop: 15, flexShrink: 0 }} />}
            </div>
          ))}
        </div>

        {/* Heading */}
        <p style={{ textAlign: 'center', fontFamily: 'Nunito', fontSize: '1rem', color: '#333', margin: '1rem 0 0' }}>
          pick your pengu partner!
        </p>

        {/* Content row */}
        <div style={{ flex: 1, display: 'flex', minHeight: 0, padding: '1rem 2rem', gap: '2rem', alignItems: 'center', overflowY: 'auto' }}>

          {/* Left: frame */}
          <div style={{ flexShrink: 0, position: 'relative', marginLeft: '100px', width: 'auto', alignSelf: 'center' }}>
            {/* Frame image on top via z-index */}
            <img
              src={frameImg}
              alt="frame"
              style={{ height: 807, width: 'auto', display: 'block', userSelect: 'none', pointerEvents: 'none', position: 'relative', zIndex: 2 }}
            />

            {/* Slots — behind frame, pengu inside */}
            {SLOTS.map((slot, i) => (
              <div
                key={i}
                className={`pp-slot${hoveringSlot === i ? ' hovering' : ''}`}
                style={{ top: slot.top, height: slot.height, zIndex: 1 }}
                onDragOver={e => onDragOverSlot(e, i)}
                onDrop={e => onDropSlot(e, i)}
                onDragLeave={() => setHoveringSlot(null)}
                draggable={!!slotContents[i]}
                onDragStart={e => onDragStartSlot(e, i)}
                onDragEnd={onDragEnd}
              >
                {slotContents[i] && (
                  <img
                    src={slotContents[i].src}
                    alt=""
                    style={{
                      position: 'absolute', bottom: 0, right: 0,
                      width: '70%', height: '100%',
                      objectFit: 'contain', objectPosition: 'bottom right',
                      pointerEvents: 'none', userSelect: 'none',
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Right: pengu picker */}
          <div
            style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
            onDragOver={e => { if (dragging?.fromSlot !== null) e.preventDefault() }}
            onDrop={onDropRightPanel}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '0.75rem', maxWidth: 700 }}>
              {PENGUS.map((p, i) => {
                const usedInSlots = slotContents.filter(s => s?.penguId === p.id).length
                return (
                  <div key={p.id} className="pengu-card" draggable onDragStart={e => onDragStartPengu(e, p)} onDragEnd={onDragEnd}>
                    <img src={p.src} alt={`pengu ${i + 1}`} style={{ width: '85%', height: '85%', objectFit: 'contain', pointerEvents: 'none', userSelect: 'none' }} />
                    {usedInSlots > 0 && (
                      <div style={{ position: 'absolute', top: 6, right: 6, width: 20, height: 20, borderRadius: '50%', background: '#111', color: '#fff', fontSize: '0.7rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {usedInSlots}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#aaa' }}>
              drag a pengu into a slot · drag out of the frame to remove
            </p>
          </div>
        </div>

        {/* Bottom buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', padding: '1.5rem 2.5rem', flexShrink: 0 }}>
          <button
            onClick={() => goTo('chooseFrame')}
            style={{ background: '#111', color: '#fff', border: 'none', borderRadius: '999px', padding: '0.8rem 2rem', fontFamily: 'Nunito', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <ChevronLeft size={18} /> frame selection
          </button>
          <button
            onClick={() => allFilled && goTo('addPhotos')}
            disabled={!allFilled}
            style={{ background: allFilled ? '#111' : '#fff', color: allFilled ? '#fff' : '#ccc', border: `2px solid ${allFilled ? '#111' : '#ddd'}`, borderRadius: '999px', padding: '0.8rem 2rem', fontFamily: 'Nunito', fontWeight: 700, fontSize: '1rem', cursor: allFilled ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s ease' }}
          >
            add your photos <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </>
  )
}