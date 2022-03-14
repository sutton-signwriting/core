
import { re } from './style-re';

/**
 * Function to compose style string from object
 * @function style.compose
 * @param {object} styleObject - an object of style options
 * @param {boolean} styleObject.colorize - boolean to use standardized colors for symbol groups
 * @param {number} styleObject.padding - integer value for padding around symbol or sign
 * @param {string} styleObject.background - css name or hex color for background
 * @param {string[]} styleObject.detail - css name or hex color for line and optional fill
 * @param {number} styleObject.zoom - decimal value for zoom level
 * @param {{index:number,detail:string[]}[]} styleObject.detailsym - array of symbol indexes and detail color array
 * @param {string} styleObject.classes - list of class names separated with spaces used for SVG
 * @param {string} styleObject.id - id name used for SVG
 * @returns {string} style string 
 * @example 
 * style.compose({
 *  'colorize': true,
 *  'padding': 10,
 *  'background': 'blue',
 *  'detail': ['red', 'Cyan'],
 *  'zoom': 1.1,
 *  'detailsym': [
 *    {
 *      'index': 1,
 *      'detail': ['#ff00ff']
 *    },
 *    {
 *      'index': 2,
 *      'detail': ['yellow', 'green']
 *    }
 *  ],
 *  'classes': 'primary blinking',
 *  'id': 'cursor'
 * })
 *
 * return '-CP10G_blue_D_red,Cyan_Z1.1-D01_ff00ff_D02_yellow,green_-primary blinking!cursor!'
 */
const compose = (styleObject) => {
  if (typeof styleObject !== 'object' || styleObject === null) return undefined;

  // three sections
  let style1 = '-';

  style1 += !styleObject.colorize ? '' : 'C';

  const padding = parseInt(styleObject.padding);
  style1 += (!padding || padding <= 0 || padding > 99) ? '' : 'P' + (padding > 9 ? padding : '0' + padding);

  const background = (!styleObject.background || !(typeof styleObject.background === 'string')) ? undefined : styleObject.background.match(re.colorbase)[0];
  style1 += !background ? '' : 'G_' + background + '_';

  const detail1 = (!styleObject.detail || !styleObject.detail[0] || !(typeof styleObject.detail[0] === 'string')) ? undefined : styleObject.detail[0].match(re.colorbase)[0];
  const detail2 = (!styleObject.detail || !styleObject.detail[1] || !(typeof styleObject.detail[1] === 'string')) ? undefined : styleObject.detail[1].match(re.colorbase)[0];
  if (detail1) {
    style1 += 'D_' + detail1;
    if (detail2) {
      style1 += ',' + detail2;
    }
    style1 += '_';
  }

  const zoom = (styleObject.zoom === 'x') ? 'x' : parseFloat(styleObject.zoom);
  style1 += (!zoom || zoom <= 0) ? '' : 'Z' + zoom;

  let style2 = '';

  const detailsym = (!styleObject.detailsym || !Array.isArray(styleObject.detailsym)) ? [] : styleObject.detailsym.map((styleObject) => {
    const index = parseInt(styleObject.index);
    if (!index || index <= 0 || index > 99) return '';
    let style = 'D' + (index > 9 ? index : '0' + index);
    const detail1 = (!styleObject.detail || !styleObject.detail[0]) ? undefined : styleObject.detail[0].match(re.colorbase)[0];
    const detail2 = (!styleObject.detail || !styleObject.detail[1]) ? undefined : styleObject.detail[1].match(re.colorbase)[0];
    if (detail1) {
      style += '_' + detail1;
      if (detail2) {
        style += ',' + detail2;
      }
      style += '_';
    }
    return style;
  })
  style2 += detailsym.join('');

  let style3 = '';
  const classes = (!styleObject.classes || !(typeof styleObject.classes === 'string')) ? undefined : styleObject.classes.match(re.classes)[0];
  style3 += !classes ? '' : classes;
  const id = (!styleObject.id || !(typeof styleObject.id === 'string')) ? undefined : styleObject.id.match(re.id)[0];
  style3 += (classes || id) ? '!' : '';
  style3 += !id ? '' : id + '!';

  return style1 + ((style2 || style3) ? '-' + style2 : '') + (style3 ? '-' + style3 : '');
}

export { compose }
