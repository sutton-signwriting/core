
import { parse } from './swu-parse';
import { swu2code } from '../convert';

/**
 * Array of plane 4 code points for kinds of symbols: writing, location, and punctuation.
 * @alias swu.kind
 * @type {array}
 */
const kind = [0x40001, 0x4efa1, 0x4f2a1];

/**
 * Array of plane 4 code points for categories of symbols: hand, movement, dynamics, head, trunk & limb, location, and punctuation.
 * @alias swu.category
 * @type {array}
 */
const category = [0x40001, 0x461e1, 0x4bca1, 0x4bfa1, 0x4e8e1, 0x4efa1, 0x4f2a1];

/**
 * Array of plane 4 code points for the 30 symbol groups.
 * @alias swu.group
 * @type {array}
 */
const group = [0x40001, 0x40541, 0x40b41, 0x41981, 0x41c81, 0x43241, 0x43d81, 0x445c1, 0x44ce1, 0x45be1, 0x461e1, 0x46841, 0x46fc1, 0x47fe1, 0x485e1, 0x49301, 0x49e41, 0x4a4a1, 0x4afe1, 0x4b521, 0x4bca1, 0x4bfa1, 0x4c3c1, 0x4cfc1, 0x4d621, 0x4e161, 0x4e8e1, 0x4ec41, 0x4efa1, 0x4f2a1];

/**
 * Object of symbol ranges with starting and ending code points on plane 4.
 * 
 *   { all, writing, hand, movement, dynamic, head, hcenter, vcenter, trunk, limb, location, punctuation }
 * @alias swu.ranges
 * @type {object}
 */
const ranges = {
  'all': [0x40001, 0x4f480],
  'writing': [0x40001, 0x4efa0],
  'hand': [0x40001, 0x461e0],
  'movement': [0x461e1, 0x4bca0],
  'dynamic': [0x4bca1, 0x4bfa0],
  'head': [0x4bfa1, 0x4e8e0],
  'hcenter': [0x4bfa1, 0x4e8e0],
  'vcenter': [0x4bfa1, 0x4ec40],
  'trunk': [0x4e8e1, 0x4ec40],
  'limb': [0x4ec41, 0x4efa0],
  'location': [0x4efa1, 0x4f2a0],
  'punctuation': [0x4f2a1, 0x4f480]
}

/**
 * Function to test if symbol is of a certain type.
 * @function swu.isType
 * @param {string} swuSym - an SWU symbol character
 * @param {string} type - the name of a symbol range
 * @returns {boolean} is symbol of specified type
 * @example
 * swu.isType('񀀁', 'hand')
 * 
 * return true
 */
const isType = (swuSym, type) => {
  const parsed = parse.symbol(swuSym);
  if (parsed.symbol) {
    const code = swu2code(parsed.symbol);
    const range = ranges[type];
    if (range) {
      return (range[0] <= code && range[1] >= code);
    }
  }
  return false;
}

export { kind, category, group, ranges, isType }
