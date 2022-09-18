
import * as style from '../style';
import { fsw2coord } from '../convert';
import { re } from './fsw-re';

const parse = {
  /**
   * Function to parse an fsw symbol with optional coordinate and style string
   * @function fsw.parse.symbol
   * @param {string} fswSym - an fsw symbol
   * @returns {SymbolObject} elements of fsw symbol
   * @example
   * fsw.parse.symbol('S10000500x500-C')
   * 
   * return {
   *  'symbol': 'S10000',
   *  'coord': [500, 500],
   *  'style': '-C'
   * }
   */
  symbol: (fswSym) => {
    const regex = `^(${re.symbol})(${re.coord})?(${style.re.full})?`;
    const symbol = (typeof fswSym === 'string') ? fswSym.match(new RegExp(regex)) : undefined;
    return {
      'symbol': (symbol ? symbol[1] : undefined),
      'coord': (symbol && symbol[2] ? fsw2coord(symbol[2]) : undefined),
      'style': (symbol ? symbol[3] : undefined)
    };
  },
  /**
   * Function to parse an fsw sign with style string
   * @function fsw.parse.sign
   * @param {string} fswSign - an fsw sign
   * @returns { SignObject } elements of fsw sign
   * @example
   * fsw.parse.sign('AS10011S10019S2e704S2e748M525x535S2e748483x510S10011501x466S2e704510x500S10019476x475-C')
   * 
   * return {
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
   * }
   */
  sign: (fswSign) => {
    const regex = `^(${re.prefix})?(${re.signbox})(${style.re.full})?`;
    const sign = (typeof fswSign === 'string') ? fswSign.match(new RegExp(regex)) : undefined;
    if (sign) {
      return {
        'sequence': (sign[1] ? sign[1].slice(1).match(/.{6}/g) : undefined),
        'box': sign[2][0],
        'max': fsw2coord(sign[2].slice(1, 8)),
        'spatials': sign[2].length < 9 ? undefined : sign[2].slice(8).match(/(.{13})/g).map(m => {
          return {
            symbol: m.slice(0, 6),
            coord: [parseInt(m.slice(6, 9)), parseInt(m.slice(10, 13))]
          }
        }),
        'style': sign[3]
      };
    } else {
      return {};
    }
  },
  /**
   * Function to parse an fsw text
   * @function fsw.parse.text
   * @param {string} fswText - an fsw text
   * @returns {string[]} fsw signs and punctuations
   * @example
   * fsw.parse.text('AS14c20S27106M518x529S14c20481x471S27106503x489 AS18701S1870aS2e734S20500M518x533S1870a489x515S18701482x490S20500508x496S2e734500x468 S38800464x496')
   * 
   * return [
   *  'AS14c20S27106M518x529S14c20481x471S27106503x489',
   *  'AS18701S1870aS2e734S20500M518x533S1870a489x515S18701482x490S20500508x496S2e734500x468',
   *  'S38800464x496'
   * ]
   */
  text: (fswText) => {
    if (typeof fswText !== 'string') return [];
    const regex = `(${re.sign}(${style.re.full})?|${re.spatial}(${style.re.full})?)`;
    const matches = fswText.match(new RegExp(regex,'g'))
    return matches?[...matches]:[]
  }
}

export { parse }
