
import { category } from './fsw-structure';
import { parse } from './fsw-parse';

/**
 * Array of colors associated with the seven symbol categories.
 * @alias fsw.colors
 * @type {string[]}
 */
const colors = ['#0000CC', '#CC0000', '#FF0099', '#006600', '#000000', '#884411', '#FF9900'];

/**
 * Function that returns the standardized color for a symbol.
 * @function fsw.colorize
 * @param {string} key - an FSW symbol key
 * @returns {string} name of standardized color for symbol
 * @example
 * fsw.colorize('S10000')
 * 
 * return '#0000CC'
 */
const colorize = (key) => {
  const parsed = parse.symbol(key);
  let color = '#000000';
  if (parsed.symbol) {
    const dec = parseInt(parsed.symbol.slice(1, 4), 16);
    const index = category.findIndex((val) => val > dec);
    color = colors[(index < 0 ? 6 : index - 1)];
  }
  return color;
}

export { colors, colorize }
