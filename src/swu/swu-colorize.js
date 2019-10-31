
import { category } from './swu-structure';
import { parse } from './swu-parse';
import { swu2code } from '../convert';

/**
 * Array of colors associated with the seven symbol categories.
 * @alias swu.colors
 * @type {array}
 */
const colors = ['#0000CC', '#CC0000', '#FF0099', '#006600', '#000000', '#884411', '#FF9900'];

/**
 * Function that returns the standardized color for a symbol.
 * @function swu.colorize
 * @param {string} swuSym - an SWU symbol character
 * @returns {string} name of standardized color for symbol
 * @example
 * swu.colorize('񀀁')
 * 
 * return '#0000CC'
 */
const colorize = (swuSym) => {
  const parsed = parse.symbol(swuSym);
  let color = '#000000';
  if (parsed.symbol) {
    const code = swu2code(parsed.symbol);
    const index = category.findIndex((val) => val > code);
    color = colors[(index < 0 ? 6 : index - 1)];
  }
  return color;
}

export { colors, colorize }
