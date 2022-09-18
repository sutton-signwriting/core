
import { re } from './swuquery-re';
import { coord2swu } from '../convert';

/**
 * Function to compose SWU query string from object
 * @function swuquery.compose
 * @param {QueryObject} swuQueryObject - an object of query options
 * @returns {string} SWU query string 
 * @example 
 * swuquery.compose({ 
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
  * })
  *
  * return 'QA񀀁R񀀁񆆑񆇡T񆀁R񀀁񀇱𝤆𝤆V5-'
  */
const compose = (swuQueryObject) => {
  if (!swuQueryObject || !swuQueryObject.query) {
    return undefined;
  }

  let query = 'Q';

  if (swuQueryObject.prefix && swuQueryObject.prefix.required) {
    if (Array.isArray(swuQueryObject.prefix.parts)) {
      query += 'A';
      query += swuQueryObject.prefix.parts.map(part => {
        if (typeof part === 'string') {
          return part;
        } else {
          if (Array.isArray(part) && part.length == 2) {
            return `R${part[0]}${part[1]}`;
          } else  if (Array.isArray(part) && part.length > 2 && part[0] == 'or') {
            part.shift();
            return part.map(part => {
              if (typeof part === 'string') {
                return part;
              } else {
                if (Array.isArray(part) && part.length == 2) {
                  return `R${part[0]}${part[1]}`;
                }
              }
            }).join('o')
          }
        }
      }).join('')
    }
    query += 'T';
  }

  if (Array.isArray(swuQueryObject.signbox)) {
    query += swuQueryObject.signbox.map(part => {
      let out;
      if (part.or) {
        out = part.or.map(item => {
          if (typeof item === 'string') {
            return item;
          } else {
            if (Array.isArray(item) && item.length == 2) {
              return `R${item[0]}${item[1]}`;
            }
          }
        }).join('o');
      } else if (part.symbol) {
        out = part.symbol;
      } else {
        if (part.range && Array.isArray(part.range) && part.range.length == 2) {
          out = `R${part.range[0]}${part.range[1]}`;
        }
      }
      return out + (Array.isArray(part.coord) && part.coord.length == 2 ? (coord2swu(part.coord)) : '');
    }).join('')
  }

  query += swuQueryObject.style ? '-' : '';

  query = query.match(new RegExp(`^${re.full}`))[0];

  return query;
}

export { compose }
