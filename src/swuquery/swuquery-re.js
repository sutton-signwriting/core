
/**
 * Object of regular expressions for SWU query strings
 * 
 *   { base, coord, var, symbol, range, prefix, signbox, full }
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
re.prefix = `(?:A(?:${re.symbol}|${re.range})+)?T`;
re.signbox = `(?:${re.symbol}${re.coord}|${re.range}${re.coord})*`;
re.full = `Q(${re.prefix})?(${re.signbox})?(${re.var})?(-?)`

export { re }
