
/**
 * Object of regular expressions for FSW strings
 * 
 * @alias fsw.re
 * @property {string} symbol - regular expressions for a symbol
 * @property {string} coord - regular expressions for a coordinate
 * @property {string} sort - regular expressions for the sorting marker
 * @property {string} box - regular expression for a signbox marker
 * @property {string} prefix - regular expression for a sorting marker followed by one or more symbols
 * @property {string} spatial - regular expression for a symbol followed by a coordinate
 * @property {string} signbox - regular expression for a signbox marker, max coordinate and zero or more spatial symbols
 * @property {string} sign - regular expression for an optional prefix followed by a signbox
 * @property {string} sortable - regular expression for a mandatory prefix followed by a signbox
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
re.sortable = `${re.prefix}${re.signbox}`;

export { re }
