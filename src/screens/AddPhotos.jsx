import { useState, useRef } from 'react'
import { ChevronRight, ChevronLeft, Check, Plus, Upload } from 'lucide-react'
import penguIcon from '../assets/pengu1.png'
import f1 from '../assets/framePoro1.png'
import f2 from '../assets/framePoro2.png'
import f3 from '../assets/framePoro3.png'
import f4 from '../assets/framePoro4.png'

const FRAME_IMGS = { poro: f1, league: f2, cloud: f3, crown: f4 }

const SLOTS = [
  { top: 26,  height: 187 - 26  },
  { top: 216, height: 377 - 216 },
  { top: 404, height: 563 - 404 },
]

const steps = [
  { n: 1, label: 'frame\nselection', done: true },
  { n: 2, label: 'pose\npengu', done: true },
  { n: 3, label: 'add your\nphotos', active: true },
  { n: 4, label: 'decorate!' },
]

export default function AddPhotos({ goTo, frame, photos, setPhotos, penguSlots }) {
  const slots = 3
  const [uploadedPhotos, setUploadedPhotos] = useState([])
  const [slotPhotos, setSlotPhotos] = useState(Array(slots).fill(null))
  const [activeSlot, setActiveSlot] = useState(0)
  const [draggingOver, setDraggingOver] = useState(false)
  const fileInputRef = useRef()

  const frameImg = FRAME_IMGS[frame?.id] ?? f1
  const allFilled = slotPhotos.every(Boolean)

  const handleFiles = (files) => {
    const newPhotos = []
    Array.from(files).forEach(file => {
      if (!file.type.startsWith('image/')) return
      const url = URL.createObjectURL(file)
      newPhotos.push(url)
    })
    setUploadedPhotos(prev => [...prev, ...newPhotos])
  }

  const onFileChange = (e) => handleFiles(e.target.files)

  const onDrop = (e) => {
    e.preventDefault()
    setDraggingOver(false)
    handleFiles(e.dataTransfer.files)
  }

  const assignPhoto = (photoUrl) => {
    const updated = [...slotPhotos]
    updated[activeSlot] = photoUrl
    setSlotPhotos(updated)
    setPhotos(updated)
    const nextEmpty = updated.findIndex((s, i) => i > activeSlot && !s)
    if (nextEmpty !== -1) setActiveSlot(nextEmpty)
  }

  return (
    <>
      <style>{`
        .upload-zone {
          border: 2px dashed #ccc;
          border-radius: 16px;
          transition: border-color 0.2s, background 0.2s;
          cursor: pointer;
        }
        .upload-zone:hover, .upload-zone.drag-over {
          border-color: #FFD84D;
          background: rgba(255,216,77,0.06);
        }
        .thumb {
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          border: 3px solid transparent;
          transition: border 0.15s, transform 0.15s;
          aspect-ratio: 1;
          flex-shrink: 0;
        }
        .thumb:hover { border-color: #FFD84D; transform: scale(1.04); }
        .ap-slot {
          position: absolute;
          left: 9%;
          right: 9%;
          overflow: hidden;
          border-radius: 6px;
          cursor: pointer;
          border: 3px solid transparent;
          transition: border 0.15s;
          box-sizing: border-box;
        }
        .ap-slot.active { border-color: #FFD84D; }
        .ap-slot.filled { border-color: #4CAF50; }
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
          your turn to pose!{uploadedPhotos.length > 0 && ' select your photos.'}
        </p>

        {/* Content row */}
        <div style={{ flex: 1, display: 'flex', minHeight: 0, padding: '1rem 2rem', gap: '2rem', alignItems: 'center', overflowY: 'auto' }}>

          {/* Left: frame */}
          <div style={{ flexShrink: 0, position: 'relative', marginLeft: '100px', alignSelf: 'center' }}>
            {/* Frame on top */}
            <img
              src={frameImg}
              alt="frame"
              style={{ height: 807, width: 'auto', display: 'block', userSelect: 'none', pointerEvents: 'none', position: 'relative', zIndex: 3 }}
            />

            {/* Slots: photo bottom (z1), pengu middle (z2), frame top (z3) */}
            {SLOTS.map((slot, i) => (
              <div
                key={i}
                className={`ap-slot${activeSlot === i ? ' active' : ''}${slotPhotos[i] ? ' filled' : ''}`}
                style={{ top: slot.top, height: slot.height, zIndex: 0 }}
                onClick={() => setActiveSlot(i)}
              >
                {/* Photo — bottom layer */}
                {slotPhotos[i] && (
                  <img
                    src={slotPhotos[i]}
                    alt=""
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}
                  />
                )}
                {/* Pengu — middle layer */}
                {penguSlots?.[i] && (
                  <img
                    src={penguSlots[i]}
                    alt=""
                    style={{ position: 'absolute', bottom: 0, right: 0, width: '70%', height: '100%', objectFit: 'contain', objectPosition: 'bottom right', zIndex: 2, pointerEvents: 'none' }}
                  />
                )}
                {/* Empty state */}
                {!slotPhotos[i] && !penguSlots?.[i] && (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>
                    {i + 1}
                  </div>
                )}
                {/* Active indicator */}
                {activeSlot === i && (
                  <div style={{ position: 'absolute', top: 4, right: 4, background: '#FFD84D', borderRadius: '50%', width: 16, height: 16, fontSize: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#111', zIndex: 4 }}>
                    ✎
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right: upload or photo picker */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem', maxWidth: 680 }}>

            {uploadedPhotos.length === 0 ? (
              <div
                className={`upload-zone${draggingOver ? ' drag-over' : ''}`}
                onClick={() => fileInputRef.current.click()}
                onDragOver={e => { e.preventDefault(); setDraggingOver(true) }}
                onDragLeave={() => setDraggingOver(false)}
                onDrop={onDrop}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', padding: '4rem 2rem', background: '#fafafa' }}
              >
                <Upload size={40} color="#aaa" />
                <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '1rem', color: '#555', margin: 0 }}>
                  click to add or drag and drop your photos here
                </p>
                <p style={{ fontSize: '0.8rem', color: '#aaa', margin: 0 }}>JPEG and PNG formats, up to 50MB</p>
                <button
                  onClick={e => { e.stopPropagation(); fileInputRef.current.click() }}
                  style={{ background: '#111', color: '#fff', border: 'none', borderRadius: '999px', padding: '0.6rem 1.8rem', fontFamily: 'Nunito', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', marginTop: '0.5rem' }}
                >
                  browse
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '1rem', height: '500px', alignItems: 'stretch' }}>
                {/* Thumbnail column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: 90, overflowY: 'auto', flexShrink: 0 }}>
                  <div
                    onClick={() => fileInputRef.current.click()}
                    style={{ width: 80, height: 80, borderRadius: 8, border: '2px dashed #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, background: '#fafafa' }}
                  >
                    <Plus size={20} color="#aaa" />
                  </div>
                  {uploadedPhotos.map((url, i) => (
                    <div key={i} className="thumb" onClick={() => assignPhoto(url)} style={{ width: 80, height: 80 }}>
                      <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>

                {/* Large preview */}
                <div style={{ flex: 1, borderRadius: 12, overflow: 'hidden', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {slotPhotos[activeSlot]
                    ? <img src={slotPhotos[activeSlot]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: '#bbb' }}>
                        <Upload size={32} />
                        <span style={{ fontSize: '0.85rem' }}>click a photo to assign to slot {activeSlot + 1}</span>
                      </div>
                  }
                </div>
              </div>
            )}

            {/* Slot pagination */}
            {uploadedPhotos.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                <button
                  onClick={() => setActiveSlot(s => Math.max(0, s - 1))}
                  disabled={activeSlot === 0}
                  style={{ background: 'none', border: 'none', cursor: activeSlot === 0 ? 'not-allowed' : 'pointer', color: activeSlot === 0 ? '#ccc' : '#111', display: 'flex', alignItems: 'center', gap: '0.3rem', fontFamily: 'Nunito', fontWeight: 600, fontSize: '0.85rem' }}
                >
                  <ChevronLeft size={16} /> previous frame
                </button>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {Array.from({ length: slots }).map((_, i) => (
                    <div
                      key={i}
                      onClick={() => setActiveSlot(i)}
                      style={{ width: 28, height: 28, borderRadius: '50%', background: activeSlot === i ? '#111' : slotPhotos[i] ? '#4CAF50' : '#eee', color: activeSlot === i || slotPhotos[i] ? '#fff' : '#aaa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Baloo 2', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setActiveSlot(s => Math.min(slots - 1, s + 1))}
                  disabled={activeSlot === slots - 1}
                  style={{ background: 'none', border: 'none', cursor: activeSlot === slots - 1 ? 'not-allowed' : 'pointer', color: activeSlot === slots - 1 ? '#ccc' : '#111', display: 'flex', alignItems: 'center', gap: '0.3rem', fontFamily: 'Nunito', fontWeight: 600, fontSize: '0.85rem' }}
                >
                  next frame <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', padding: '1.5rem 2.5rem', flexShrink: 0 }}>
          <button
            onClick={() => goTo('posePengu')}
            style={{ background: '#111', color: '#fff', border: 'none', borderRadius: '999px', padding: '0.8rem 2rem', fontFamily: 'Nunito', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <ChevronLeft size={18} /> pose pengu
          </button>
          <button
            onClick={() => allFilled && goTo('decorate')}
            disabled={!allFilled}
            style={{ background: allFilled ? '#111' : '#fff', color: allFilled ? '#fff' : '#ccc', border: `2px solid ${allFilled ? '#111' : '#ddd'}`, borderRadius: '999px', padding: '0.8rem 2rem', fontFamily: 'Nunito', fontWeight: 700, fontSize: '1rem', cursor: allFilled ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s ease' }}
          >
            decorate <ChevronRight size={18} />
          </button>
        </div>

        <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={onFileChange} style={{ display: 'none' }} />
      </div>
    </>
  )
}