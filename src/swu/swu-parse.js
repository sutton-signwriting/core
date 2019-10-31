
import * as style from '../style';
import { swu2coord } from '../convert';
import { re } from './swu-re';

const parse = {
  /**
   * Function to parse an swu symbol with optional coordinate and style string
   * @function swu.parse.symbol
   * @param {string} swuSym - an swu symbol
   * @returns {object} elements of swu symbol
   * @example
   * swu.parse.symbol('񀀁𝤆𝤆-C')
   * 
   * return {
   *  'symbol': '񀀁',
   *  'coord': [500, 500],
   *  'style': '-C'
   * }
   */
  symbol: (swuSym) => {
    const regex = `^(${re.symbol})(${re.coord})?(${style.re.full})?`;
    const symbol = (typeof swuSym === 'string') ? swuSym.match(new RegExp(regex)) : undefined;
    return {
      'symbol': (symbol ? symbol[1] : undefined),
      'coord': (symbol && symbol[2] ? swu2coord(symbol[2]) : undefined),
      'style': (symbol ? symbol[3] : undefined)
    };
  },
 /**
   * Function to parse an swu sign with style string
   * @function swu.parse.sign
   * @param {string} swuSign - an swu sign
   * @returns {object} elements of swu sign
   * @example
   * swu.parse.sign('𝠀񀀒񀀚񋚥񋛩𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭-C')
   * 
   * return {
   *  sequence: ['񀀒','񀀚','񋚥','񋛩''],
   *  box: '𝠃',
   *  max: [525, 535],
   *  spatials: [
   *    {
   *      symbol: '񋛩',
   *      coord: [483, 510]
   *    },
   *    {
   *      symbol: '񀀒',
   *      coord: [501, 466]
   *    },
   *    {
   *      symbol: '񋚥',
   *      coord: [510, 500]
   *    },
   *    {
   *      symbol: '񀀚',
   *      coord: [476, 475]
   *    }
   *  ],
   *  style: '-C'
   * }
   */  sign: (swuSign) => {
    const regex = `^(${re.prefix})?(${re.signbox})(${style.re.full})?`;
    const sign = (typeof swuSign === 'string') ? swuSign.match(new RegExp(regex)) : undefined;
    if (sign) {
      return {
        'sequence': (sign[1] ? sign[1].slice(2).match(/.{2}/g) : undefined),
        'box': sign[2].slice(0, 2),
        'max': swu2coord(sign[2].slice(2, 6)),
        'spatials': sign[2].length < 7 ? undefined : sign[2].slice(6).match(/(.{6})/g).map(m => {
          return {
            symbol: m.slice(0, 2),
            coord: swu2coord(m.slice(2))
          }
        }),
        'style': sign[3]
      };
    } else {
      return {};
    }
  }
}

/**
 * Function to encode SWU characters using the UTF-16 escape format.
 * @function swu.encode
 * @param {string} swu - SWU characters
 * @returns {string} UTF-16 escape format
 * @example
 * swu.encode('񀀁𝤆𝤆')
 * 
 * return '\\uD8C0\\uDC01\\uD836\\uDD06\\uD836\\uDD06'
 */
const encode = (text) => text.replace(/[\u007F-\uFFFF]/g, function (chr) {
  return "\\u" + ("0000" + chr.charCodeAt(0).toString(16)).substr(-4).toUpperCase();
});

/**
 * Function to decode UTF-16 escape format to SWU characters.
 * @function swu.decode
 * @param {string} encoded - UTF-16 escape format
 * @returns {string} SWU characters
 * @example
 * swu.decode('\\uD8C0\\uDC01\\uD836\\uDD06\\uD836\\uDD06')
 * 
 * return '񀀁𝤆𝤆'
 */
const decode = (encoded) => encoded.replace(/\\u([0-9A-F]{4})/g, function (match, chr) {
  return String.fromCharCode(parseInt(chr, 16));
});

/**
 * Function to decompose an SWU character into UTF-16 surrogate pairs.
 * @function swu.pair
 * @param {string} swuChar - an SWU character
 * @returns {string[]} an array of UTF-16 surrogate pairs
 * @example
 * swu.pair('񀀁')
 * 
 * return ['D8C0', 'DC01']
 */
const pair = (swuChar) => [swuChar.charCodeAt(0).toString(16).toUpperCase(), swuChar.charCodeAt(1).toString(16).toUpperCase()];

export { parse, encode, decode, pair }
