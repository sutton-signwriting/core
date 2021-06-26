
/**
 * Object of regular expressions for SWU query strings
 * 
 *   { base, coord, var, symbol, range, item, list, prefix, signbox, full }
 * @alias swuquery.re
 * @type {object}
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
