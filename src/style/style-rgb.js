
const rgb2arr = (rgb) => {
  if (typeof rgb !== 'string') return [0,0,0];
  return rgb.replace(/rgba?\((.+?)\)/ig, (_, values) => {
    return values;
  }).split(',').map(Number);
}

const arr2hex = (arr) => {
  return arr.slice(0,3)
  .map(num => num.toString(16).padStart(2, '0'))
  .join('') 
}

/**
 * Function to convert rgb color to hex or "transparent" if below tolerance
 * @function style.rgb2hex
 * @param {string} rgb - an rgb color
 * @param {number} [tolerance=0] - max alpha for full transparency
 * @returns {string} a hex color or "transparent"
 * @example
 * style.rgb2hex("rgb(255,255,255)")
 * return "ffffff"
 * 
 * style.rgb2hex("rgba(255,255,255,0.5)",0.5)
 * return "transparent"
 */
const rgb2hex = (rgb, tolerance=0) => {
  const arr = rgb2arr(rgb);
  if ( arr.length==4 && arr[3]<=tolerance ) {
    return 'transparent';
  } else {
    return arr2hex(arr);
  }
}

/**
 * Function to merge color with background based on alpha transparency
 * @function style.rgba2hex
 * @param {string} color - an rgba color
 * @param {string} background - an rgba background color
 * @returns {string} a hex color or "transparent"
 * @example
 * style.rgba2hex("rgba(255,255,255,0.5)","rgb(0,0,0)")
 * 
 * return "7f7f7f"
 */
const rgba2hex = (color, background) => {
  const bArr = rgb2arr(background);
  const cArr = rgb2arr(color);
  const alpha = (cArr.length==4)?cArr[3]:1;

  if ( alpha==0 ) {
    return 'transparent'
  } else {
    return arr2hex(cArr.map((v,i) => parseInt(((1 - alpha) * bArr[i]) + (alpha * v))))
  }
}

export { rgb2hex, rgba2hex }
