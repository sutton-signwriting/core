
/**
 * Function to merge style objects
 * @function style.merge
 * @param {StyleObject} style1 - a style object
 * @param {StyleObject} style2 - a style object
 * @returns {StyleObject} a style object
 * @example
 * style.merge({'colorize': true},{zoom:2})
 * 
 * return {
 *  'colorize': true,
 *  'zoom': 2
 * }
 */
const merge = (style1, style2) => {
  if (typeof style1 !== 'object') style1 = {};
  if (typeof style2 !== 'object') style2 = {};
  const zoom1 = ('zoom' in style1)?style1['zoom']:1;
  const zoom2 = ('zoom' in style2)?style2['zoom']:1;
  return {
    ...style1,
    ...style2,
    ...{zoom: zoom1 * zoom2}
  }
}

export { merge }
