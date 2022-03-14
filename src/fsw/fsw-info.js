import { parse } from './fsw-parse';
import { parse as parseStyle } from '../style/style-parse';

/**
 * Function to gather sizing information about an fsw sign or symbol
 * @function fsw.info
 * @param {string} fsw - an fsw sign or symbol
 * @returns {object} information about the fsw string
 * @example
 * fsw.info('AS14c20S27106L518x529S14c20481x471S27106503x489-P10Z2')
 * 
 * return {
 *   minX: 481,
 *   minY: 471,
 *   width: 37,
 *   height: 58,
 *   zoom: 2,
 *   padding: 10,
 *   segment: 'sign',
 *   lane: -1
 * }
 */
  const info = (fsw) => {
  let lanes = {
    "B": 0,
    "L": -1,
    "M": 0,
    "R": 1
  }
  let parsed = parse.sign(fsw);
  let width, height, segment, x1, x2, y1, y2, lane;
  if (parsed.spatials) {
    x1 = Math.min(...parsed.spatials.map(spatial => spatial.coord[0]));
    x2 = parsed.max[0];
    width = x2 - x1;
    y1 = Math.min(...parsed.spatials.map(spatial => spatial.coord[1]));
    y2 = parsed.max[1];
    height = y2 - y1;
    segment = 'sign';
    lane = parsed.box;
  } else {
    parsed = parse.symbol(fsw);
    lane = "M";
    if (parsed.coord){
      x1 = parsed.coord[0];
      width = (500 - x1) * 2;
      y1 = parsed.coord[1];
      height = (500 - y1) * 2;
      segment = 'symbol';
    } else {
      x1 = 490;
      width = 20;
      y1 = 490;
      height = 20;
      segment = 'none';
    }
  }
  let style = parseStyle(parsed.style);
  let zoom = style.zoom || 1;
  let padding = style.padding || 0;
  return {
    minX: x1,
    minY: y1,
    width: width,
    height: height,
    segment: segment,
    lane: lanes[lane],
    padding: padding,
    zoom: zoom
  };
}

export { info }