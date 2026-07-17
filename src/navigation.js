export const SCREENS = {
  LANDING: "landing",
  CHOOSE_FRAME: "chooseFrame",
  POSE_PENGU: "posePengu",
  ADD_PHOTOS: "addPhotos",
  DECORATE: "decorate",
  SAVE: "save",
};

export const SCREEN_FLOW = [
  SCREENS.LANDING,
  SCREENS.CHOOSE_FRAME,
  SCREENS.POSE_PENGU,
  SCREENS.ADD_PHOTOS,
  SCREENS.DECORATE,
  SCREENS.SAVE,
];

export const WIZARD_STEPS = [
  { screen: SCREENS.CHOOSE_FRAME, n: 1, label: "frame\nselection" },
  { screen: SCREENS.POSE_PENGU, n: 2, label: "pose\npengu" },
  { screen: SCREENS.ADD_PHOTOS, n: 3, label: "add your\nphotos" },
  { screen: SCREENS.DECORATE, n: 4, label: "decorate!" },
];

export function getNextScreen(screen) {
  const index = SCREEN_FLOW.indexOf(screen);
  return SCREEN_FLOW[Math.min(index + 1, SCREEN_FLOW.length - 1)];
}

export function getPreviousScreen(screen) {
  const index = SCREEN_FLOW.indexOf(screen);
  return SCREEN_FLOW[Math.max(index - 1, 0)];
}
