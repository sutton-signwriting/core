
import { re } from './fswquery-re';

/**
 * Function to compose FSW query string from object
 * @function fswquery.compose
 * @param {object} fswQueryObject - an object of style options
 * @param {boolean} fswQueryObject.query - required true for FSW query object
 * @param {object} fswQueryObject.prefix - an object for prefix elements
 * @param {boolean} fswQueryObject.prefix.required - true if sorting prefix is required
 * @param {(string|string[]|(string|string[])[])[]} fswQueryObject.prefix.parts - array of symbol strings, range arrays, and OR arrays of strings and range arrays
 * @param {({symbol:string,coord:number[]}|{range:string[],coord:number[]}|{or:(string|string[])[],coord:number[]})[]} fswQueryObject.signbox - array of objects for symbols, ranges, and list of symbols or ranges, with optional coordinates
 * @param {number} fswQueryObject.variance - amount that x or y coordinates can vary and find a match, defaults to 20
 * @param {boolean} fswQueryObject.style - boolean value for including style string in matches
 * @returns {string} FSW query string 
 * @example 
 * fswquery.compose({
 *  query: true,
 *  prefix: {
 *    required: true,
 *    parts: [
 *      'S10000',
 *      ['100', '204'],
 *      'S20500'
 *    ]
 *  },
 *  signbox: [
 *    { symbol: 'S20000' },
 *    {
 *      range: ['100', '105'],
 *      coord: [500, 500]
 *    }
 *  ],
 *  variance: 5,
 *  style: true
 * })
 *
 * return 'QAS10000R100t204S20500TS20000R100t105500x500V5-'
 */
const compose = (fswQueryObject) => {
  if (!fswQueryObject || !fswQueryObject.query) {
    return undefined;
  }

  let query = 'Q';

  if (fswQueryObject.prefix && fswQueryObject.prefix.required) {
    if (Array.isArray(fswQueryObject.prefix.parts)) {
      query += 'A';
      query += fswQueryObject.prefix.parts.map(part => {
        if (typeof part === 'string') {
          return part;
        } else {
          if (Array.isArray(part) && part.length == 2) {
            return `R${part[0]}t${part[1]}`;
          } else if (Array.isArray(part) && part.length > 2 && part[0] == 'or') {
            part.shift();
            return part.map(part => {
              if (typeof part === 'string') {
                return part;
              } else {
                if (Array.isArray(part) && part.length == 2) {
                  return `R${part[0]}t${part[1]}`;
                }
              }
            }).join('o')
          }
        }
      }).join('')
    }
    query += 'T';
  }

  if (Array.isArray(fswQueryObject.signbox)) {
    query += fswQueryObject.signbox.map(part => {
      let out;
      if (part.or) {
        out = part.or.map(item => {
          if (typeof item === 'string') {
            return item;
          } else {
            if (Array.isArray(item) && item.length == 2) {
              return `R${item[0]}t${item[1]}`;
            }
          }
        }).join('o');
      } else if (part.symbol) {
        out = part.symbol;
      } else {
        if (part.range && Array.isArray(part.range) && part.range.length == 2) {
          out = `R${part.range[0]}t${part.range[1]}`;
        }
      }
      return out + (Array.isArray(part.coord) && part.coord.length == 2 ? (part.coord.join('x')) : '');
    }).join('')
  }

  query += fswQueryObject.style ? '-' : '';

  query = query.match(new RegExp(`^${re.full}`))[0];

  return query;
}

export { compose }
