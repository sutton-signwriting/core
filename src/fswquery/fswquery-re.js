
/**
 * Object of regular expressions for FSW query strings
 * 
 *   { base, coord, var, symbol, range, prefix, signbox, full }
 * @alias fswquery.re
 * @type {object}
 */
let re = {
  'base': '[123][0-9a-f]{2}',
  'coord': '(?:[0-9]{3}x[0-9]{3})?',
  'var': 'V[0-9]+'
}

re.symbol = `S${re.base}[0-5u][0-9a-fu]`;
re.range = `R${re.base}t${re.base}`;
re.prefix = `(?:A(?:${re.symbol}|${re.range})+)?T`;
re.signbox = `(?:${re.symbol}${re.coord}|${re.range}${re.coord})*`;
re.full = `Q(${re.prefix})?(${re.signbox})?(${re.var})?(-?)`

export { re }
