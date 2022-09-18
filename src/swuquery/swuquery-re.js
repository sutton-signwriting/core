
/**
 * Object of regular expressions for SWU query strings
 * 
 * @alias swuquery.re
 * @type {object}
 * @property {string} base - SWU symbol
 * @property {string} coord - SWU coordinate of X and Y number characters
 * @property {string} var - variance string for searching sign box
 * @property {string} symbol - SWU symbol character with ignore fill and rotation flags
 * @property {string} range - SWU range starting with 'R'
 * @property {string} item - SWU symbol or range query string
 * @property {string} list - several SWU symbols and SWU ranges as a logical OR for searching 
 * @property {string} prefix - a sequential list of SWU symbol characters starting with SWU 'A' character
 * @property {string} signbox - several groups of SWU lists, each group having a coordinate
 * @property {string} full - a query string to search prefix in order and the signbox with variance
 */
let re = {
  'base': '(?:(?:\uD8C0[\uDC01-\uDFFF])|(?:[\uD8C1-\uD8FC][\uDC00-\uDFFF])|(?:\uD8FD[\uDC00-\uDC80]))',
  'coord': '(?:(?:\uD836[\uDC0C-\uDDFF]){2})?',
  'var': 'V[0-9]+'
}

re.symbol = `${re.base}f?r?`;
re.range = `R${re.base}${re.base}`;
re.item = `(?:${re.symbol}|${re.range})`;
re.list = `${re.item}(?:o${re.item})*`;
re.prefix = `(?:A(?:${re.list})+)?T`;
re.signbox = `(?:${re.list}${re.coord})*`;
re.full = `Q(${re.prefix})?(${re.signbox})?(${re.var})?(-?)`

export { re }
