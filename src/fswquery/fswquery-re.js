
/**
 * Object of regular expressions for FSW query strings
 * 
 * @alias fswquery.re
 * @type {object}
 * @property {string} null - the null symbol
 * @property {string} base - FSW symbol base with neither fill or rotation
 * @property {string} coord - FSW coordinate of X and Y values separated by 'x'
 * @property {string} var - variance string for searching sign box
 * @property {string} symbol - FSW symbol key starting with 'S'
 * @property {string} nullorsymbol - null or a symbol
 * @property {string} range - FSW range starting with 'R'
 * @property {string} item - FSW symbol or range query string
 * @property {string} list - several FSW symbols and FSW ranges as a logical OR for searching 
 * @property {string} prefix - a sequential list of FSW symbol keys with nulls starting with 'A'
 * @property {string} signbox - several groups of FSW lists, each group having a coordinate
 * @property {string} full - a query string to search prefix in order and the signbox with variance
 */
let re = {
  'null': 'S00000',
  'base': '[123][0-9a-f]{2}',
  'coord': '(?:[0-9]{3}x[0-9]{3})?',
  'var': 'V[0-9]+'
}

re.symbol = `S${re.base}[0-5u][0-9a-fu]`;
re.nullorsymbol = `(?:${re.null}|${re.symbol})`;
re.range = `R${re.base}t${re.base}`;
re.item = `(?:${re.null}|${re.symbol}|${re.range})`;
re.list = `${re.item}(?:o${re.item})*`;
re.prefix = `(?:A(?:${re.list})+)?T`;
re.signbox = `(?:${re.list}${re.coord})*`;
re.full = `Q(${re.prefix})?(${re.signbox})?(${re.var})?(-?)`

export { re }
