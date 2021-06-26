
import { re } from './fswquery-re';
import { fsw2coord } from '../convert';

const parsePrefix = (text) => {
  return {
    required: true,
    parts: text == 'T' ? undefined :
      text.match(new RegExp(`${re.list}`, 'g'))
        .map(part => {
          if (part.includes('o')) {
            return ['or'].concat(part.match(new RegExp(`(${re.item})`, 'g'))
            .map(part => part[0] == 'S' ? part : part.slice(1).split('t')))
          } else {
            return part[0] == 'S' ? part : part.slice(1).split('t')
          }
        })
  }
}
const parseSignbox = (text) => {
  return text.match(new RegExp(`(${re.list}${re.coord})`, 'g'))
    .map(part => {
      let coord, front;
      if (part.includes('x')) {
        coord = fsw2coord(part.slice(-7));
        front = part.slice(0, -7);
      } else {
        front = part;
      }
      if (front.includes('o')) {
        return {
          or: front.split('o').map(part => {
            if (part.includes('S')) {
              return part;
            } else {
              return part.slice(1).split('t');
            } 
          }),
          coord, coord
        }
      } else if (front.includes('S')) {
        return {
          symbol: front,
          coord: coord
        }
      } else {
        return {
          range: front.slice(1).split('t'),
          coord: coord
        }
      }
    })
}

/**
 * Function to parse FSW query string to object
 * @function fswquery.parse
 * @param {string} fswQueryString - an FSW query string
 * @returns {object} elements of an FSW query string
 * @example
 * fswquery.parse('QAS10000S10500oS20500oR2fft304TS100uuR205t206oS207uu510x510V5-')
 * 
 * return {
 *   "query": true,
 *   "prefix": {
 *     "required": true,
 *     "parts": [
 *       "S10000",
 *       [
 *         "or",
 *         "S10500",
 *         "S20500",
 *         [
 *           "2ff",
 *           "304"
 *         ]
 *       ]
 *     ]
 *   },
 *   "signbox": [
 *     {
 *       "symbol": "S100uu"
 *     },
 *     {
 *       "or": [
 *         [
 *           "205",
 *           "206"
 *         ],
 *         "S207uu"
 *       ],
 *       "coord": [
 *         510,
 *         510
 *       ]
 *     }
 *   ],
 *   "variance": 5,
 *   "style": true
 * }
 */
const parse = (fswQueryString) => {
  const query = (typeof fswQueryString === 'string') ? fswQueryString.match(new RegExp(`^${re.full}`)) : undefined;
  return {
    'query': query ? true : undefined,
    'prefix': query && query[1] ? parsePrefix(query[1]) : undefined,
    'signbox': query && query[2] ? parseSignbox(query[2]) : undefined,
    'variance': query && query[3] ? parseInt(query[3].slice(1)) : undefined,
    'style': query && query[4] ? true : undefined
  };
}

export { parse }
