
/**
 * Object of regular expressions for SWU strings in UTF-16
 * 
 * @alias swu.re
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
  'null': '\uD8C0\uDC00',
  'symbol': '(?:(?:\uD8C0[\uDC01-\uDFFF])|(?:[\uD8C1-\uD8FC][\uDC00-\uDFFF])|(?:\uD8FD[\uDC00-\uDC80]))',
  'coord': '(?:\uD836[\uDC0C-\uDDFF]){2}',
  'sort': '\uD836\uDC00',
  'box': '\uD836[\uDC01-\uDC04]'
}
re.nullorsymbol = `(?:${re.null}|${re.symbol})`;
re.prefix = `(?:${re.sort}(?:${re.nullorsymbol})+)`;
re.spatial = `${re.symbol}${re.coord}`;
re.signbox = `${re.box}${re.coord}(?:${re.spatial})*`;
re.sign = `${re.prefix}?${re.signbox}`;
re.sortable = `${re.prefix}${re.signbox}`;

export { re }
