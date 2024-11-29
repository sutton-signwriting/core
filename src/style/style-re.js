
/**
 * Object of regular expressions for style strings
 * 
 * @alias style.re
 * @type {object}
 * @property {string} colorize - regular expression for colorize section
 * @property {string} colorhex - regular expression for color hex values with 3 or 6 characters
 * @property {string} colorname - regular expression for css color name
 * @property {string} padding - regular expression for padding section
 * @property {string} zoom - regular expression for zoom section
 * @property {string} classbase - regular expression for class name definition
 * @property {string} id - regular expression for id definition
 * @property {string} colorbase - regular expression for color hex or color name
 * @property {string} color - regular expression for single color entry
 * @property {string} colors - regular expression for double color entry
 * @property {string} background - regular expression for background section
 * @property {string} detail - regular expression for color details for line and optional fill
 * @property {string} detailsym - regular expression for color details for individual symbols
 * @property {string} classes - regular expression for one or more class names
 * @property {string} full - full regular expression for style string
 */
let re = {
  'colorize': 'C',
  'colorhex': '(?:[0-9a-fA-F]{3}){1,2}',
  'colorname': '[a-zA-Z]+',
  'padding': 'P[0-9]{2}',
  'zoom': 'Z(?:[0-9]+(?:\\.[0-9]+)?|x)',
  'classbase': '-?[_a-zA-Z][_a-zA-Z0-9-]{0,100}',
  'id': '[a-zA-Z][_a-zA-Z0-9-]{0,100}',
}

re.colorbase = `(?:${re.colorhex}|${re.colorname})`;
re.color = `_${re.colorbase}_`;
re.colors = `_${re.colorbase}(?:,${re.colorbase})?_`;
re.background = `G${re.color}`;
re.detail = `D${re.colors}`;
re.detailsym = `D[0-9]{2}${re.colors}`;
re.classes = `${re.classbase}(?: ${re.classbase})*`;
re.full = `-(${re.colorize})?(${re.padding})?(${re.background})?(${re.detail})?(${re.zoom})?(?:-((?:${re.detailsym})*))?(?:-(${re.classes})?!(?:(${re.id})!)?)?`;

export { re }
