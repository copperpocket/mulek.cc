// How busy the starfield sky is. The home page's sky only fills the top half of the hero (the grid
// takes the bottom), while sub-pages use the whole screen, so each has its own settings. Ranges are
// [min, max], rolled on every page load.

/**
 * @typedef {object} SkySettings
 * @property {[number, number]} constellations how many constellations (up to 12)
 * @property {boolean} haze soft glow around each constellation's stars
 * @property {[number, number]} nebulas how many nebula clouds (up to 12)
 * @property {boolean} nebulaFade fade the nebulas in after page load instead of showing them right away
 * @property {[number, number]} cometSeconds wait between comets
 */

/** @type {SkySettings} */
export const homeSky = {
  constellations: [1, 6],
  haze: true,
  nebulas: [2, 8],
  nebulaFade: false,
  cometSeconds: [8, 20],
};

/** @type {SkySettings} */
export const pageSky = {
  constellations: [1, 6],
  haze: true,
  nebulas: [3, 10],
  nebulaFade: false,
  cometSeconds: [8, 20],
};
