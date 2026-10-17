// How busy the starfield sky is. The home page's sky only fills the top half of the hero (the grid
// takes the bottom), while sub-pages use the whole screen, so each has its own settings. Ranges are
// [min, max], rolled on every page load.

type Range = [number, number];

export interface SkySettings {
  constellations: Range; // how many constellations (up to 12)
  haze: boolean; // soft glow around each constellation's stars
  nebulas: Range; // how many nebula clouds (up to 12)
  nebulaFade: boolean; // fade the nebulas in after page load instead of showing them right away
  cometSeconds: Range; // wait between comets
}

export const homeSky: SkySettings = {
  constellations: [1, 6],
  haze: true,
  nebulas: [2, 8],
  nebulaFade: false,
  cometSeconds: [8, 20],
};

export const pageSky: SkySettings = {
  constellations: [1, 6],
  haze: true,
  nebulas: [3, 10],
  nebulaFade: false,
  cometSeconds: [8, 20],
};
