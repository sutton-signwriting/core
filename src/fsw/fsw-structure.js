
import { parse } from './fsw-parse';

/**
 * Array of numbers for kinds of symbols: writing, location, and punctuation.
 * @alias fsw.kind
 * @type {array}
 */
const kind = [0x100, 0x37f, 0x387];

/**
 * Array of numbers for categories of symbols: hand, movement, dynamics, head, trunk & limb, location, and punctuation.
 * @alias fsw.category
 * @type {array}
 */
const category = [0x100, 0x205, 0x2f7, 0x2ff, 0x36d, 0x37f, 0x387];

/**
 * Array of numbers for the 30 symbol groups.
 * @alias fsw.group
 * @type {array}
 */
const group = [0x100, 0x10e, 0x11e, 0x144, 0x14c, 0x186, 0x1a4, 0x1ba, 0x1cd, 0x1f5, 0x205, 0x216, 0x22a, 0x255, 0x265, 0x288, 0x2a6, 0x2b7, 0x2d5, 0x2e3, 0x2f7, 0x2ff, 0x30a, 0x32a, 0x33b, 0x359, 0x36d, 0x376, 0x37f, 0x387];

/**
 * Object of symbol ranges with starting and ending numbers.
 * 
 *   { all, writing, hand, movement, dynamic, head, hcenter, vcenter, trunk, limb, location, punctuation }
 * @alias fsw.ranges
 * @type {object}
 */
const ranges = {
  'all': [0x100, 0x38b],
  'writing': [0x100, 0x37e],
  'hand': [0x100, 0x204],
  'movement': [0x205, 0x2f6],
  'dynamic': [0x2f7, 0x2fe],
  'head': [0x2ff, 0x36c],
  'hcenter': [0x2ff, 0x36c],
  'vcenter': [0x2ff, 0x375],
  'trunk': [0x36d, 0x375],
  'limb': [0x376, 0x37e],
  'location': [0x37f, 0x386],
  'punctuation': [0x387, 0x38b]
}

/**
 * Function to test if symbol is of a certain type.
 * @function fsw.isType
 * @param {string} key - an FSW symbol key
 * @param {string} type - the name of a symbol range
 * @returns {boolean} is symbol of specified type
 * @example
 * fsw.isType('S10000', 'hand')
 * 
 * return true
 */
const isType = (key, type) => {
  const parsed = parse.symbol(key);
  if (parsed.symbol) {
    const dec = parseInt(parsed.symbol.slice(1, 4), 16);
    const range = ranges[type];
    if (range) {
      return (range[0] <= dec && range[1] >= dec);
    }
  }
  return false;
}

export { kind, category, group, ranges, isType }
