
import { re } from './swuquery-re';
import { swu2coord } from '../convert';

const parsePrefix = (text) => {
  return {
    required: true,
    parts: text == 'T' ? undefined :
      text.match(new RegExp(`(${re.symbol}|${re.range})`, 'g'))
        .map(part => part[0] != 'R' ? part : [part.slice(1, 3), part.slice(3, 5)])
  }
}
const parseSignbox = (text) => {
  return text.match(new RegExp(`(${re.symbol}${re.coord}|${re.range}${re.coord})`, 'g'))
    .map(part => {
      let coord, front;
      if (part.length > 5) {
        coord = swu2coord(part.slice(-4));
        front = part.slice(0, -4);
      } else {
        front = part;
      }
      if (!front.includes('R')) {
        return {
          symbol: front,
          coord: coord
        }
      } else {
        return {
          range: [front.slice(1, 3), front.slice(3, 5)],
          coord: coord
        }
      }
    })
}

/**
 * Function to parse SWU query string to object
 * @function swuquery.parse
 * @param {string} swuQueryString - an SWU query string
 * @returns {object} elements of an SWU query string
 * @example
 * fswquery.parse('QA񀀁R񀀁񆆑񆇡T񆀁R񀀁񀇱𝤆𝤆V5-')
 * 
 * return { 
 *   query: true,
 *   prefix: {
 *     required: true,
 *     parts: [
 *       '񀀁',
 *       ['񀀁', '񆆑'],
 *       '񆇡'
 *     ]
 *   },
 *   signbox: [
 *     { symbol: '񆀁' },
 *     {
 *       range: ['񀀁', '񀇱'],
 *       coord: [500, 500]
 *     }
 *   ],
 *   variance: 5,
 *   style: true 
 * }
 */
const parse = (swuQueryString) => {
  const query = (typeof swuQueryString === 'string') ? swuQueryString.match(new RegExp(`^${re.full}`)) : undefined;
  return {
    'query': query ? true : undefined,
    'prefix': query && query[1] ? parsePrefix(query[1]) : undefined,
    'signbox': query && query[2] ? parseSignbox(query[2]) : undefined,
    'variance': query && query[3] ? parseInt(query[3].slice(1)) : undefined,
    'style': query && query[4] ? true : undefined
  };
}

export { parse }
