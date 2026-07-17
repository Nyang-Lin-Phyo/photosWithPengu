import { useState } from "react";
import { getNextScreen, getPreviousScreen, SCREENS } from "./navigation";
import Landing from "./screens/Landing";
import ChooseFrame from "./screens/ChooseFrame";
import PosePengu from "./screens/PosePengu";
import AddPhotos from "./screens/AddPhotos";
import Decorate from "./screens/Decorate";
import SaveStrip from "./screens/SaveStrip";

export default function App() {
  const [screen, setScreen] = useState(SCREENS.LANDING);
  const [frame, setFrame] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [penguSlots, setPenguSlots] = useState([]);
  const [stickers, setStickers] = useState([]);

  const goNext = () => setScreen((current) => getNextScreen(current));
  const goBack = () => setScreen((current) => getPreviousScreen(current));

  const resetApp = () => {
    setFrame(null);
    setPhotos([]);
    setPenguSlots([]);
    setStickers([]);
    setScreen(SCREENS.LANDING);
  };

  const selectFrame = (nextFrame) => {
    setFrame(nextFrame);
    setPhotos([]);
    setPenguSlots([]);
    setStickers([]);
  };

  return (
    <>
      {screen === SCREENS.LANDING && <Landing onStart={goNext} />}
      {screen === SCREENS.CHOOSE_FRAME && (
        <ChooseFrame
          frame={frame}
          onExit={resetApp}
          onNext={goNext}
          onReset={resetApp}
          onSelectFrame={selectFrame}
        />
      )}
      {screen === SCREENS.POSE_PENGU && (
        <PosePengu
          frame={frame}
          onBack={goBack}
          onNext={goNext}
          onReset={resetApp}
          penguSlots={penguSlots}
          setPenguSlots={setPenguSlots}
        />
      )}
      {screen === SCREENS.ADD_PHOTOS && (
        <AddPhotos
          frame={frame}
          onBack={goBack}
          onNext={goNext}
          onReset={resetApp}
          photos={photos}
          setPhotos={setPhotos}
          penguSlots={penguSlots}
        />
      )}
      {screen === SCREENS.DECORATE && (
        <Decorate
          onBack={goBack}
          onNext={goNext}
          onReset={resetApp}
          stickers={stickers}
          setStickers={setStickers}
        />
      )}
      {screen === SCREENS.SAVE && (
        <SaveStrip
          onBack={goBack}
          onReset={resetApp}
          frame={frame}
          photos={photos}
          stickers={stickers}
        />
      )}
    </>
  );
}
