
/**
 * Object of regular expressions for FSW strings
 * 
 * @alias fsw.re
 * @property {string} null - the null symbol
 * @property {string} symbol - a symbol
 * @property {string} nullorsymbol - null or a symbol
 * @property {string} sort - the sorting marker
 * @property {string} prefix - a sorting marker followed by one or more symbols with nulls
 * @property {string} box - a signbox marker
 * @property {string} coord - a coordinate
 * @property {string} spatial - a symbol followed by a coordinate
 * @property {string} signbox - a signbox marker, max coordinate and zero or more spatial symbols
 * @property {string} sign - an optional prefix followed by a signbox
 * @property {string} sortable - a mandatory prefix followed by a signbox
 */
let re = {
  'null': 'S00000',
  'symbol': 'S[123][0-9a-f]{2}[0-5][0-9a-f]',
  'coord': '[0-9]{3}x[0-9]{3}',
  'sort': 'A',
  'box': '[BLMR]'
}
re.nullorsymbol = `(?:${re.null}|${re.symbol})`;
re.prefix = `(?:${re.sort}${re.nullorsymbol}+)`;
re.spatial = `${re.symbol}${re.coord}`;
re.signbox = `${re.box}${re.coord}(?:${re.spatial})*`;
re.sign = `${re.prefix}?${re.signbox}`;
re.sortable = `${re.prefix}${re.signbox}`;

export { re }
