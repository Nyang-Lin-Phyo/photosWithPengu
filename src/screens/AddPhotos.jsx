export default function AddPhotos({ goTo, frame, photos, setPhotos }) {
  const slots = frame?.slots ?? 4

  const handleUpload = (i, e) => {
    const file = e.target.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    const updated = [...photos]
    updated[i] = url
    setPhotos(updated)
  }

  const allFilled = photos.filter(Boolean).length >= slots

  return (
    <div style={{ minHeight:'100vh', padding:'2rem', background:'var(--white)' }}>
      <h2 style={{ fontFamily:'Baloo 2', fontSize:'2rem', marginBottom:'0.5rem' }}>Add your photos</h2>
      <p style={{ color:'#888', marginBottom:'2rem' }}>Upload {slots} photos for your strip</p>

      <div style={{ display:'flex', flexDirection:'column', gap:'1rem', maxWidth:320 }}>
        {Array.from({ length: slots }).map((_, i) => (
          <label key={i} style={{ display:'block', width:'100%', height:160, border:'3px dashed var(--navy)', borderRadius:12, overflow:'hidden', cursor:'pointer', position:'relative', background:'var(--gray)' }}>
            {photos[i]
              ? <img src={photos[i]} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
              : <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%', fontFamily:'Baloo 2', color:'#aaa', fontSize:'1rem' }}>Photo {i+1} +</div>
            }
            <input type="file" accept="image/*" onChange={e => handleUpload(i, e)} style={{ display:'none' }} />
          </label>
        ))}
      </div>

      <div style={{ display:'flex', gap:'1rem', marginTop:'2rem' }}>
        <button onClick={() => goTo('chooseFrame')} style={{ background:'none', border:'none', color:'#888', cursor:'pointer' }}>← Back</button>
        <button onClick={() => goTo('decorate')} disabled={!allFilled}
          style={{ background: allFilled ? 'var(--yellow)' : '#ddd', color:'var(--navy)', border:'none', borderRadius:'999px', padding:'0.8rem 2rem', fontFamily:'Baloo 2', fontWeight:800, fontSize:'1rem', cursor: allFilled ? 'pointer' : 'not-allowed' }}>
          Next: Decorate →
        </button>
      </div>
    </div>
  )
}