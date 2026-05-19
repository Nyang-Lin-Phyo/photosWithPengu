import { useState } from 'react'
import Landing from './screens/Landing'
import ChooseFrame from './screens/ChooseFrame'
import AddPhotos from './screens/AddPhotos'
import Decorate from './screens/Decorate'
import SaveStrip from './screens/SaveStrip'

const SCREENS = ['landing', 'chooseFrame', 'addPhotos', 'decorate', 'save']

export default function App() {
  const [screen, setScreen] = useState('landing')
  const [frame, setFrame] = useState(null)
  const [photos, setPhotos] = useState([])
  const [stickers, setStickers] = useState([])

  const goTo = (s) => setScreen(s)

  return (
    <>
      {screen === 'landing'     && <Landing     goTo={goTo} />}
      {screen === 'chooseFrame' && <ChooseFrame goTo={goTo} setFrame={setFrame} />}
      {screen === 'addPhotos'   && <AddPhotos   goTo={goTo} frame={frame} photos={photos} setPhotos={setPhotos} />}
      {screen === 'decorate'    && <Decorate    goTo={goTo} frame={frame} photos={photos} stickers={stickers} setStickers={setStickers} />}
      {screen === 'save'        && <SaveStrip   goTo={goTo} frame={frame} photos={photos} stickers={stickers} />}
    </>
  )
}