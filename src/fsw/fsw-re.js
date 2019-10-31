
/**
 * Object of regular expressions for FSW strings
 * 
 *   { symbol, coord, sort, box, prefix, spatial, signbox, sign, term }
 * @alias fsw.re
 * @type {object}
 */
let re = {
  'symbol': 'S[123][0-9a-f]{2}[0-5][0-9a-f]',
  'coord': '[0-9]{3}x[0-9]{3}',
  'sort': 'A',
  'box': '[BLMR]'
}
re.prefix = `(?:${re.sort}(?:${re.symbol})+)`;
re.spatial = `${re.symbol}${re.coord}`;
re.signbox = `${re.box}${re.coord}(?:${re.spatial})*`;
re.sign = `${re.prefix}?${re.signbox}`;
re.term = `${re.prefix}${re.signbox}`;

export { re }
