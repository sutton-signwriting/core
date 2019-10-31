
/**
 * Object of regular expressions for FSW strings
 * 
 *   { symbol, coord, sort, box, prefix, spatial, signbox, sign, term }
 * @alias swu.re
 * @type {object}
 */
let re = {
  'symbol': '(?:(?:\uD8C0[\uDC01-\uDFFF])|(?:[\uD8C1-\uD8FC][\uDC00-\uDFFF])|(?:\uD8FD[\uDC00-\uDC80]))',
  'coord': '(?:\uD836[\uDC0C-\uDDFF]){2}',
  'sort': '\uD836\uDC00',
  'box': '\uD836[\uDC01-\uDC04]'
}
re.prefix = `(?:${re.sort}(?:${re.symbol})+)`;
re.spatial = `${re.symbol}${re.coord}`;
re.signbox = `${re.box}${re.coord}(?:${re.spatial})*`;
re.sign = `${re.prefix}?${re.signbox}`;
re.term = `${re.prefix}${re.signbox}`;

export { re }
