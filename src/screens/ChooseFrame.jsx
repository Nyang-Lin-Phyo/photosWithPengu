const FRAMES = [
  { id: 'classic', label: 'Classic', slots: 4, layout: '1-col' },
  { id: 'wide',    label: 'Wide',    slots: 3, layout: '1-col' },
  { id: 'grid',    label: 'Grid',    slots: 4, layout: '2-col' },
]

export default function ChooseFrame({ goTo, setFrame }) {
  const pick = (f) => { setFrame(f); goTo('addPhotos') }

  return (
    <div style={{ minHeight:'100vh', padding:'2rem', background:'var(--white)' }}>
      <h2 style={{ fontFamily:'Baloo 2', fontSize:'2rem', marginBottom:'0.5rem' }}>Choose a frame</h2>
      <p style={{ color:'#888', marginBottom:'2rem' }}>Pick the layout for your photo strip</p>
      <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
        {FRAMES.map(f => (
          <div key={f.id} onClick={() => pick(f)}
            style={{ border:'3px solid var(--navy)', borderRadius:16, padding:'1.5rem 2rem', cursor:'pointer', textAlign:'center', fontFamily:'Baloo 2', fontWeight:700, fontSize:'1.1rem', background:'var(--gray)', minWidth:120 }}>
            <div style={{ fontSize:'2rem', marginBottom:'0.5rem' }}>🖼️</div>
            {f.label}
            <div style={{ fontSize:'0.8rem', fontFamily:'Nunito', fontWeight:400, color:'#888', marginTop:4 }}>{f.slots} photos</div>
          </div>
        ))}
      </div>
      <button onClick={() => goTo('landing')} style={{ marginTop:'2rem', background:'none', border:'none', color:'#888', cursor:'pointer', fontSize:'0.95rem' }}>← Back</button>
    </div>
  )
}