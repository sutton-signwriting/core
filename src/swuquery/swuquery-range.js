
import { decode, pair } from '../swu/swu-parse';

//needs rewritten, but it works
/**
 * Function to transform a range of SWU characters to a regular expression
 * @function swuquery.range
 * @param {string} min - an SWU character
 * @param {string} max - an SWU character
 * @returns {string} a regular expression that matches a range of SWU characters
 * @example
 * swuquery.range('񀀁', '񀇡')
 * 
 * return '\uD8C0[\uDC01-\uDDE1]'
 * @example
 * swuquery.range('𝣔', '𝤸')
 * 
 * return '\uD836[\uDCD4-\uDD38]'
 */
const range = (min, max) => {
  if (min > max) return '';
  let pattern = '';
  let cnt, code, str;
  let re = [];

  min = pair(min);
  max = pair(max);
  if (min.length != 2 && max.length != 2) return '';
  // HEAD // min[0] with range of min[1] to (DFFF or max[1])
  if (min[0] == max[0]) {
    if (min[1] == max[1]) {
      pattern = '\\u' + min[0] + '\\u' + min[1];
      re.push(pattern);
    } else {
      pattern = '\\u' + min[0] + '[\\u' + min[1] + '-\\u' + max[1] + ']';
      re.push(pattern);
    }
  } else {
    if (min[1] == "DFFF") {
      pattern = '\\u' + min[0] + '\\uDFFF';
    } else {
      pattern = '\\u' + min[0] + '[\\u' + min[1] + '-\\uDFFF]';
    }
    re.push(pattern);

    // BODY // range of (min[0] +1) to (max[0] -1) with all DC00-DFFF
    let diff = (parseInt(max[0], 16)) - (parseInt(min[0], 16));
    if (diff == 2) {
      pattern = '\\u' + (parseInt(min[0], 16) + 1).toString(16).toUpperCase();
      pattern += '[\\uDC00-\\uDFFF]';
      re.push(pattern);
    }
    if (diff > 2) {
      pattern = '[';
      pattern += '\\u' + (parseInt(min[0], 16) + 1).toString(16).toUpperCase();
      pattern += '-\\u' + (parseInt(max[0], 16) - 1).toString(16).toUpperCase();
      pattern += '][\\uDC00-\\uDFFF]';
      re.push(pattern);
    }

    // TAIL // max[0] with range of DC00 to max[1]
    if (max[1] == "DC00") {
      pattern = '\\u' + max[0] + '\\uDC00';
    } else {
      pattern = '\\u' + max[0] + '[\\uDC00-\\u' + max[1] + ']';
    }
    re.push(pattern);

  }
  cnt = re.length;
  if (cnt == 1) {
    pattern = re[0];
  } else {
    pattern = re.join(')|(');
    pattern = '((' + pattern + '))';
  }
  return decode(pattern);
}

export { range }