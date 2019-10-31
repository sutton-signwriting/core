
import { re } from './swuquery-re';
import { swu2key, key2swu } from '../convert';
import { range } from './swuquery-range';

//needs rewritten, but it works
/**
 * Function to transform an SWU symbol with fill and rotation flags to a regular expression
 * @function swuquery.symbolRanges
 * @param {string} symbolFR - an SWU character with optional flags of 'f' for any fill and 'r' for any rotation
 * @returns {string} a regular expression that matches one or more ranges of SWU symbols
 * @example <caption>Match an exact symbol</caption>
 * swuquery.symbolRanges('񀀁')
 * 
 * return '\uD8C0\uDC01');
 * @example <caption>Match a symbol with any fill</caption>
 * swuquery.symbolRanges('񀀁f')
 * 
 * return '(\uD8C0\uDC01|\uD8C0\uDC11|\uD8C0\uDC21|\uD8C0\uDC31|\uD8C0\uDC41|\uD8C0\uDC51)'
 * @example <caption>Match a symbol with any rotation</caption>
 * swuquery.symbolRanges('񀀁r')
 * 
 * return '\uD8C0[\uDC01-\uDC10]'
 * @example <caption>Match a symbol with any fill or rotation</caption>
 * swuquery.symbolRanges('񀀁fr')
 * 
 * return '\uD8C0[\uDC01-\uDC60]'
 */
const symbolRanges = (symbolFR) => {
  let match = symbolFR.match(new RegExp(re.symbol));
  if (match) {
    let sym = match[0].slice(0, 2);
    let key = swu2key(sym);
    let base = key.slice(0, 4);
    let start, end;
    if (match[0].slice(-2) == 'fr') {
      start = key2swu(base + "00");
      end = key2swu(base + "5f");
      return range(start, end);
    } else if (match[0].slice(-1) == 'r') {
      start = key2swu(key.slice(0, 5) + '0');
      end = key2swu(key.slice(0, 5) + 'f');
      return range(start, end);
    } else if (match[0].slice(-1) == 'f') {
      let list = [0, 1, 2, 3, 4, 5].map(function (f) {
        return key2swu(base + f + key.slice(-1));
      })
      return "(" + list.join("|") + ")";
    } else {
      return sym;
    }
  } else {
    return '';
  }
}

export { symbolRanges }