const STICKERS = ['🌟','🎉','🐧','🌈','💖','🔥','😎','🦋','🍕','🎵']

export default function Decorate({ goTo, photos, stickers, setStickers }) {
  const addSticker = (emoji) => {
    setStickers([...stickers, { emoji, x: 60, y: 60, id: Date.now() }])
  }

  return (
    <div style={{ minHeight:'100vh', padding:'2rem', background:'var(--color-surface)' }}>
      <h2 style={{ fontFamily:'var(--font-family-display)', fontSize:'var(--font-size-2xl)', marginBottom:'0.5rem' }}>Decorate!</h2>
      <p style={{ color:'var(--color-text-subtle)', marginBottom:'1.5rem' }}>Tap a sticker to add it to your strip</p>

      <div style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap', marginBottom:'2rem' }}>
        {STICKERS.map(s => (
          <button key={s} onClick={() => addSticker(s)}
            style={{ fontSize:'var(--font-size-2xl)', background:'var(--color-surface-muted)', border:'2px solid var(--color-navy)', borderRadius:12, padding:'0.5rem', cursor:'pointer' }}>
            {s}
          </button>
        ))}
      </div>

      {stickers.length > 0 && (
        <div style={{ marginBottom:'1rem' }}>
          <p style={{ fontFamily:'var(--font-family-display)', marginBottom:'0.5rem' }}>Added stickers:</p>
          <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap' }}>
            {stickers.map(s => <span key={s.id} style={{ fontSize:'var(--font-size-xl)' }}>{s.emoji}</span>)}
          </div>
          <button onClick={() => setStickers([])} style={{ marginTop:'0.5rem', fontSize:'var(--font-size-md)', color:'var(--color-danger)', background:'none', border:'none', cursor:'pointer' }}>Clear all</button>
        </div>
      )}

      <div style={{ display:'flex', gap:'1rem', marginTop:'1rem' }}>
        <button onClick={() => goTo('addPhotos')} style={{ background:'none', border:'none', color:'var(--color-text-subtle)', cursor:'pointer' }}>← Back</button>
        <button onClick={() => goTo('save')}
          style={{ background:'var(--color-accent-yellow)', color:'var(--color-navy)', border:'none', borderRadius:'999px', padding:'0.8rem 2rem', fontFamily:'var(--font-family-display)', fontWeight:'var(--font-weight-extra-bold)', fontSize:'var(--font-size-base)', cursor:'pointer' }}>
          Next: Save →
        </button>
      </div>
    </div>
  )
}
