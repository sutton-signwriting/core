
/**
 * Object of regular expressions for style strings
 * 
 *   { colorize, colorhex, colorname, padding, zoom, zoomsym, classbase, id, colorbase, color, colors, background, detail, detailsym, classes, full }
 * @alias style.re
 * @type {object}
 */
let re = {
  'colorize': 'C',
  'colorhex': '(?:[0-9a-fA-F]{3}){1,2}',
  'colorname': '[a-zA-Z]+',
  'padding': 'P[0-9]{2}',
  'zoom': 'Z(?:[0-9]+(?:\\.[0-9]+)?|x)',
  'zoomsym': 'Z[0-9]{2},[0-9]+(?:\\.[0-9]+)?(?:,[0-9]{3}x[0-9]{3})?',
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
re.full = `-(${re.colorize})?(${re.padding})?(${re.background})?(${re.detail})?(${re.zoom})?(?:-((?:${re.detailsym})*)((?:${re.zoomsym})*))?(?:-(${re.classes})?!(?:(${re.id})!)?)?`;

export { re }
