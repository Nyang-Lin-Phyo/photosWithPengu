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

export default function AddPhotos({ goTo, frame, photos, setPhotos }) {
  const slots = frame?.slots ?? 4
  const [slotContents, setSlotContents] = useState(Array(slots).fill(null))
  const [dragging, setDragging] = useState(null) // { penguId, src, fromSlot (or null) }
  const [hoveringSlot, setHoveringSlot] = useState(null)

  const frameImg = FRAME_IMGS[frame?.id] ?? f1

  // drag from pengu grid
  const onDragStartPengu = (e, pengu) => {
    setDragging({ penguId: pengu.id, src: pengu.src, fromSlot: null })
    e.dataTransfer.effectAllowed = 'copy'
  }

  // drag from a slot
  const onDragStartSlot = (e, slotIndex) => {
    const content = slotContents[slotIndex]
    if (!content) return
    setDragging({ penguId: content.penguId, src: content.src, fromSlot: slotIndex })
    e.dataTransfer.effectAllowed = 'move'
  }

  const onDragOverSlot = (e, slotIndex) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = dragging?.fromSlot !== null ? 'move' : 'copy'
    setHoveringSlot(slotIndex)
  }

  const onDropSlot = (e, slotIndex) => {
    e.preventDefault()
    if (!dragging) return
    const updated = [...slotContents]
    // if dragging from another slot, clear that slot
    if (dragging.fromSlot !== null) updated[dragging.fromSlot] = null
    updated[slotIndex] = { penguId: dragging.penguId, src: dragging.src }
    setSlotContents(updated)
    setPhotos(updated.map(s => s?.src ?? null))
    setDragging(null)
    setHoveringSlot(null)
  }

  // drop onto right panel = remove from slot
  const onDropRightPanel = (e) => {
    e.preventDefault()
    if (!dragging || dragging.fromSlot === null) return
    const updated = [...slotContents]
    updated[dragging.fromSlot] = null
    setSlotContents(updated)
    setPhotos(updated.map(s => s?.src ?? null))
    setDragging(null)
    setHoveringSlot(null)
  }

  const onDragEnd = () => {
    setDragging(null)
    setHoveringSlot(null)
  }

  const allFilled = slotContents.every(Boolean)

  const steps = [
    { n:1, label:'frame\nselection', done: true },
    { n:2, label:'pose\npengu', done: false },
    { n:3, label:'add your\nphotos', done: false },
    { n:4, label:'decorate!', done: false },
  ]

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
          display: flex; align-items: center; justify-content: center;
        }
        .pengu-card:hover {
          border-color: #FFD84D;
          transform: scale(1.05);
          box-shadow: 0 4px 16px rgba(0,0,0,0.12);
        }
        .pengu-card:active { cursor: grabbing; }
        .slot-box {
          border-radius: 8px;
          transition: background 0.15s, border 0.15s, transform 0.15s;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
          border: 2px dashed transparent;
        }
        .slot-box.hovering {
          background: rgba(255,216,77,0.25) !important;
          border-color: #FFD84D !important;
          transform: scale(1.03);
        }
      `}</style>

      <div style={{ display:'flex', flexDirection:'column', height:'100vh', background:'#fff', fontFamily:'Nunito, sans-serif', overflow:'hidden' }}>

        {/* Navbar */}
        <nav style={{ display:'flex', alignItems:'center', gap:'0.6rem', padding:'1rem 2rem', borderBottom:'1px solid #eee', flexShrink:0 }}>
          <img src={penguIcon} alt="pengu" style={{ width:36, height:36, borderRadius:'50%', objectFit:'cover' }} />
          <span style={{ fontFamily:'Baloo 2', fontWeight:700, fontSize:'1rem', color:'#111' }}>pengu photobooth</span>
        </nav>

        {/* Step indicator */}
        <div style={{ display:'flex', justifyContent:'center', alignItems:'flex-start', padding:'1.5rem 2rem 0', flexShrink:0 }}>
          {steps.map((step, i) => (
            <div key={step.n} style={{ display:'flex', alignItems:'flex-start' }}>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'0.4rem' }}>
                <div style={{
                  width:32, height:32, borderRadius:'50%',
                  border: `2px solid ${step.done ? '#4CAF50' : step.n === 2 ? '#111' : '#ccc'}`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontFamily:'Baloo 2', fontWeight:700, fontSize:'0.9rem',
                  color: step.done ? '#fff' : step.n === 2 ? '#111' : '#ccc',
                  background: step.done ? '#4CAF50' : '#fff'
                }}>
                  {step.done ? <Check size={16} strokeWidth={3} color="#fff" /> : step.n}
                </div>
                <div style={{ fontSize:'0.7rem', color: step.n <= 2 ? '#111' : '#ccc', textAlign:'center', lineHeight:1.3, whiteSpace:'pre-line', fontWeight: step.n === 2 ? 700 : 400 }}>
                  {step.label}
                </div>
              </div>
              {i < 3 && <div style={{ width:60, height:2, background: step.done ? '#4CAF50' : '#ddd', marginTop:15, flexShrink:0 }} />}
            </div>
          ))}
        </div>

        {/* Heading */}
        <p style={{ textAlign:'center', fontFamily:'Nunito', fontSize:'1rem', color:'#333', margin:'1rem 0 0' }}>
          pick your pengu partner!
        </p>

        {/* Content row */}
        <div style={{ flex:1, display:'flex', minHeight:0, padding:'1rem 2rem', gap:'2rem' }}>

          {/* Left: frame with slots */}
          <div style={{ flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', position:'relative', width:180 }}>
            <img src={frameImg} alt="frame" style={{ height:'100%', maxHeight:'100%', objectFit:'contain', userSelect:'none', pointerEvents:'none' }} />

            {/* Slot overlays — positioned over the frame's photo areas */}
            <div style={{ position:'absolute', top:0, left:0, right:0, bottom:0, display:'flex', flexDirection:'column', justifyContent:'space-evenly', alignItems:'center', padding:'8% 12% 20%' }}>
              {Array.from({ length: slots }).map((_, i) => (
                <div
                  key={i}
                  className={`slot-box${hoveringSlot === i ? ' hovering' : ''}`}
                  onDragOver={e => onDragOverSlot(e, i)}
                  onDrop={e => onDropSlot(e, i)}
                  onDragLeave={() => setHoveringSlot(null)}
                  draggable={!!slotContents[i]}
                  onDragStart={e => onDragStartSlot(e, i)}
                  onDragEnd={onDragEnd}
                  style={{ width:'100%', flex:1, margin:'2px 0', cursor: slotContents[i] ? 'grab' : 'default', border: slotContents[i] ? '2px solid transparent' : '2px dashed rgba(255,255,255,0.5)' }}
                >
                  {slotContents[i] && (
                    <img src={slotContents[i].src} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', pointerEvents:'none', userSelect:'none' }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: pengu picker */}
          <div
            style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center' }}
            onDragOver={e => { if (dragging?.fromSlot !== null) e.preventDefault() }}
            onDrop={onDropRightPanel}
          >
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'0.75rem', maxWidth:520 }}>
              {PENGUS.map((p, i) => {
                const usedInSlots = slotContents.filter(s => s?.penguId === p.id).length
                return (
                  <div
                    key={p.id}
                    className="pengu-card"
                    draggable
                    onDragStart={e => onDragStartPengu(e, p)}
                    onDragEnd={onDragEnd}
                    style={{ position:'relative' }}
                  >
                    <img src={p.src} alt={`pengu ${i+1}`} style={{ width:'85%', height:'85%', objectFit:'contain', pointerEvents:'none', userSelect:'none' }} />
                    {usedInSlots > 0 && (
                      <div style={{ position:'absolute', top:6, right:6, width:20, height:20, borderRadius:'50%', background:'#111', color:'#fff', fontSize:'0.7rem', fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center' }}>
                        {usedInSlots}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            <p style={{ marginTop:'1rem', fontSize:'0.8rem', color:'#aaa' }}>
              drag a pengu into a slot · drag out of the frame to remove
            </p>
          </div>
        </div>

        {/* Bottom buttons */}
        <div style={{ display:'flex', justifyContent:'flex-end', gap:'1rem', padding:'1.5rem 2.5rem', flexShrink:0 }}>
          <button
            onClick={() => goTo('chooseFrame')}
            style={{ background:'#111', color:'#fff', border:'none', borderRadius:'999px', padding:'0.8rem 2rem', fontFamily:'Nunito', fontWeight:700, fontSize:'1rem', cursor:'pointer', display:'flex', alignItems:'center', gap:'0.5rem' }}
          >
            <ChevronLeft size={18} /> frame selection
          </button>
          <button
            onClick={() => allFilled && goTo('decorate')}
            disabled={!allFilled}
            style={{ background: allFilled ? '#111' : '#fff', color: allFilled ? '#fff' : '#ccc', border:`2px solid ${allFilled ? '#111' : '#ddd'}`, borderRadius:'999px', padding:'0.8rem 2rem', fontFamily:'Nunito', fontWeight:700, fontSize:'1rem', cursor: allFilled ? 'pointer' : 'not-allowed', display:'flex', alignItems:'center', gap:'0.5rem', transition:'all 0.2s ease' }}
          >
            add your photos <ChevronRight size={18} />
          </button>
        </div>

      </div>
    </>
  )
}