import { useRef, useEffect } from 'react'

export default function SaveStrip({ goTo, frame, photos, stickers }) {
  const canvasRef = useRef()
  const slots = frame?.slots ?? 4
  const W = 300, H = 120

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = W
    canvas.height = H * slots + 20

    ctx.fillStyle = '#1a1a2e'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    photos.forEach((src, i) => {
      const img = new Image()
      img.onload = () => {
        ctx.drawImage(img, 10, i * H + 10, W - 20, H - 10)
        // draw stickers on last photo load
        if (i === photos.length - 1) {
          stickers.forEach(s => {
            ctx.font = '40px serif'
            ctx.fillText(s.emoji, s.x, s.y)
          })
        }
      }
      img.src = src
    })
  }, [photos, stickers, slots])

  const download = () => {
    const link = document.createElement('a')
    link.download = 'photostrip.png'
    link.href = canvasRef.current.toDataURL()
    link.click()
  }

  return (
    <div style={{ minHeight:'100vh', padding:'2rem', background:'var(--white)', display:'flex', flexDirection:'column', alignItems:'center' }}>
      <h2 style={{ fontFamily:'Baloo 2', fontSize:'2rem', marginBottom:'0.5rem', alignSelf:'flex-start' }}>Your photo strip!</h2>
      <p style={{ color:'#888', marginBottom:'2rem', alignSelf:'flex-start' }}>Looking good 🎉</p>

      <canvas ref={canvasRef} style={{ borderRadius:12, boxShadow:'0 8px 32px rgba(0,0,0,0.15)', maxWidth:'100%' }} />

      <div style={{ display:'flex', gap:'1rem', marginTop:'2rem' }}>
        <button onClick={() => goTo('decorate')} style={{ background:'none', border:'none', color:'#888', cursor:'pointer' }}>← Back</button>
        <button onClick={download}
          style={{ background:'var(--yellow)', color:'var(--navy)', border:'none', borderRadius:'999px', padding:'0.8rem 2rem', fontFamily:'Baloo 2', fontWeight:800, fontSize:'1rem', cursor:'pointer' }}>
          ⬇ Download Strip
        </button>
        <button onClick={() => goTo('landing')}
          style={{ background:'var(--navy)', color:'var(--white)', border:'none', borderRadius:'999px', padding:'0.8rem 2rem', fontFamily:'Baloo 2', fontWeight:800, fontSize:'1rem', cursor:'pointer' }}>
          Start over
        </button>
      </div>
    </div>
  )
}