const STICKERS = ['🌟','🎉','🐧','🌈','💖','🔥','😎','🦋','🍕','🎵']

export default function Decorate({ goTo, photos, stickers, setStickers }) {
  const addSticker = (emoji) => {
    setStickers([...stickers, { emoji, x: 60, y: 60, id: Date.now() }])
  }

  return (
    <div style={{ minHeight:'100vh', padding:'2rem', background:'var(--white)' }}>
      <h2 style={{ fontFamily:'Baloo 2', fontSize:'2rem', marginBottom:'0.5rem' }}>Decorate!</h2>
      <p style={{ color:'#888', marginBottom:'1.5rem' }}>Tap a sticker to add it to your strip</p>

      <div style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap', marginBottom:'2rem' }}>
        {STICKERS.map(s => (
          <button key={s} onClick={() => addSticker(s)}
            style={{ fontSize:'2rem', background:'var(--gray)', border:'2px solid var(--navy)', borderRadius:12, padding:'0.5rem', cursor:'pointer' }}>
            {s}
          </button>
        ))}
      </div>

      {stickers.length > 0 && (
        <div style={{ marginBottom:'1rem' }}>
          <p style={{ fontFamily:'Baloo 2', marginBottom:'0.5rem' }}>Added stickers:</p>
          <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap' }}>
            {stickers.map(s => <span key={s.id} style={{ fontSize:'1.5rem' }}>{s.emoji}</span>)}
          </div>
          <button onClick={() => setStickers([])} style={{ marginTop:'0.5rem', fontSize:'0.85rem', color:'#e55', background:'none', border:'none', cursor:'pointer' }}>Clear all</button>
        </div>
      )}

      <div style={{ display:'flex', gap:'1rem', marginTop:'1rem' }}>
        <button onClick={() => goTo('addPhotos')} style={{ background:'none', border:'none', color:'#888', cursor:'pointer' }}>← Back</button>
        <button onClick={() => goTo('save')}
          style={{ background:'var(--yellow)', color:'var(--navy)', border:'none', borderRadius:'999px', padding:'0.8rem 2rem', fontFamily:'Baloo 2', fontWeight:800, fontSize:'1rem', cursor:'pointer' }}>
          Next: Save →
        </button>
      </div>
    </div>
  )
}