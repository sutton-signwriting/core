
import * as style from '../style';
import { fsw2coord, coord2fsw } from '../convert';
import { re } from './fsw-re';

const compose = {
  /**
   * Function to compose an fsw symbol with optional coordinate and style string
   * @function fsw.compose.symbol
   * @param {object} fswSymObject - an fsw symbol object
   * @param {string} fswSymObject.symbol - an fsw symbol key
   * @param {number[]} fswSymObject.coord - top-left coordinate of symbol
   * @param {string} fswSymObject.style - a style string for custom appearance
   * @returns {string} an fsw symbol string
   * @example
   * fsw.compose.symbol({
   *  'symbol': 'S10000',
   *  'coord': [480, 480],
   *  'style': '-C'
   * })
   * 
   * return 'S10000480x480-C'
   */
  symbol: (fswSymObject) => {
    if (typeof fswSymObject.symbol === 'string') {
      const symbol = (fswSymObject.symbol.match(re.symbol) || [''])[0];
      if (symbol) {
        const x = (fswSymObject.coord && fswSymObject.coord[0] || '').toString();
        const y = (fswSymObject.coord && fswSymObject.coord[1] || '').toString();
        const coord = ((x + 'x' + y).match(re.coord) || [''])[0] || '';
        const styleStr = (typeof fswSymObject.style === 'string') && (fswSymObject.style.match(style.re.full) || [''])[0] || '';
        return symbol + coord + styleStr;

      }
    }
    return undefined;
  },
  /**
   * Function to compose an fsw sign with style string
   * @function fsw.compose.sign
   * @param {object} fswSymObject - an fsw sign object
   * @param {string[]} fswSignObject.sequence - an ordered array of symbols
   * @param {string} fswSignObject.box - a choice BLMR: horizontal Box, Left, Middle, and Right lane
   * @param {number[]} fswSignObject.max - max bottom-right coordinate of the signbox space
   * @param {{symbol:string,coord:number[]}[]} fswSignObject.spatials - array of symbols with top-left coordinate placement
   * @param {string} fswSignObject.style - a style string for custom appearance
   * @returns {string} an fsw sign string
   * @example
   * fsw.compose.sign({
   *  sequence: ['S10011', 'S10019', 'S2e704', 'S2e748'],
   *  box: 'M',
   *  max: [525, 535],
   *  spatials: [
   *    {
   *      symbol: 'S2e748',
   *      coord: [483, 510]
   *    },
   *    {
   *      symbol: 'S10011',
   *      coord: [501, 466]
   *    },
   *    {
   *      symbol: 'S2e704',
   *      coord: [510, 500]
   *    },
   *    {
   *      symbol: 'S10019',
   *      coord: [476, 475]
   *    }
   *  ],
   *  style: '-C'
   * })
   * 
   * return 'AS10011S10019S2e704S2e748M525x535S2e748483x510S10011501x466S2e704510x500S10019476x475-C'
   */
  sign: (fswSignObject) => {
    let box = (typeof fswSignObject.box !== 'string') ? 'M' : (fswSignObject.box + 'M').match(re.box)

    const x = (fswSignObject.max && fswSignObject.max[0] || '').toString();
    const y = (fswSignObject.max && fswSignObject.max[1] || '').toString();
    const max = ((x + 'x' + y).match(re.coord) || [''])[0] || '';

    if (!max) return undefined;

    let prefix = '';
    if (fswSignObject.sequence && Array.isArray(fswSignObject.sequence)) {
      prefix = fswSignObject.sequence.map(key => (key.match(re.symbol) || [''])[0]).join('')
      prefix = prefix ? 'A' + prefix : ''
    }

    let signbox = '';
    if (fswSignObject.spatials && Array.isArray(fswSignObject.spatials)) {
      signbox = fswSignObject.spatials.map(spatial => {
        if (typeof spatial.symbol === 'string') {
          const symbol = (spatial.symbol.match(re.symbol) || [''])[0];
          if (symbol) {
            const x = (spatial.coord && spatial.coord[0] || '').toString();
            const y = (spatial.coord && spatial.coord[1] || '').toString();
            const coord = ((x + 'x' + y).match(re.coord) || [''])[0] || '';
            if (coord) {
              return symbol + coord;
            }
          }
        }
        return '';
      }).join('');
    }
    const styleStr = (typeof fswSignObject.style === 'string') && (fswSignObject.style.match(style.re.full) || [''])[0] || '';

    return prefix + box + max + signbox + styleStr;
  }
}

export { compose }
