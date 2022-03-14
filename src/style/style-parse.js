
import { re } from './style-re';

const prefixColor = (color) => {
  const regex = new RegExp(`^${re.colorhex}$`);
  return (regex.test(color) ? '#' : '') + color;
}

const definedProps = obj => Object.fromEntries(
  Object.entries(obj).filter(([k, v]) => v !== undefined)
);

/**
 * Function to parse style string to object
 * @function style.parse
 * @param {string} styleString - a style string
 * @returns {object} elements of style string
 * @example
 * style.parse('-CP10G_blue_D_red,Cyan_')
 * 
 * return {
 *  'colorize': true,
 *  'padding': 10,
 *  'background': 'blue',
 *  'detail': ['red', 'Cyan']
 * }
 */
const parse = (styleString) => {
  const regex = `^${re.full}`;
  const m = ((typeof styleString === 'string') ? styleString.match(new RegExp(regex)) : []) || [];

  return definedProps({
    'colorize': !m[1] ? undefined : !!m[1],
    'padding': !m[2] ? undefined : parseInt(m[2].slice(1)),
    'background': !m[3] ? undefined : prefixColor(m[3].slice(2, -1)),
    'detail': !m[4] ? undefined : m[4].slice(2, -1).split(',').map(prefixColor),
    'zoom': !m[5] ? undefined : (m[5] === 'Zx' ? 'x' : parseFloat(m[5].slice(1))),
    'detailsym': !m[6] ? undefined : m[6].match(new RegExp(re.detailsym, 'g')).map((val) => {
      const parts = val.split('_');
      const detail = parts[1].split(',').map(prefixColor);
      return {
        'index': parseInt(parts[0].slice(1)),
        'detail': detail
      }
    }),
    'classes': !m[7] ? undefined : m[7],
    'id': !m[8] ? undefined : m[8]
  })
}

export { parse }
