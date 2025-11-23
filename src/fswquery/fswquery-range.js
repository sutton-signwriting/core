/**
 * Function to transform a range to a regular expression
 * @function fswquery.range
 * @param {(number|string)} min - either a decimal number or hexidecimal string
 * @param {(number|string)} max - either a decimal number or hexidecimal string
 * @param {boolean?} hex - if true, the regular expression will match a hexidecimal range
 * @returns {string} a regular expression that matches a range
 * @example
 * fswquery.range(500,750)
 * 
 * return '(([56][0-9][0-9])|(7[0-4][0-9])|(750))'
 * @example
 * fswquery.range('100','10e',true)
 * 
 * return '10[0-9a-e]'
 */
const range = (min, max, hex) => {
  const isHex = hex || false;
  
  // Convert to strings and pad to 3 digits
  if (typeof min === 'number') min = min.toString().padStart(3, '0');
  else min = ("000" + min).slice(-3);
  
  if (typeof max === 'number') max = max.toString().padStart(3, '0');
  else max = '' + max;

  // Split into individual digits
  const a = min[0], b = min[1], c = min[2];
  const d = max[0], e = max[1], f = max[2];

  // Define digit sequence based on mode
  const digitSeq = isHex ? '0123456789abcdef' : '0123456789';
  const aIndex = digitSeq.indexOf(a);
  const dIndex = digitSeq.indexOf(d);
  if (aIndex > dIndex) throw new Error('Start is greater than end');

  // If first digits are the same, match between the last two digits
  if (a === d) {
      const betweenPattern = regexBetweenTwoDigits(b + c, e + f, isHex);
      return betweenPattern.includes('|') ? `${a}(?:${betweenPattern})` : `${a}${betweenPattern}`;
  } else {
      const parts = [];
      // Start: first digit 'a', last two digits >= bc
      const geqPattern = regexGeq(b, c, isHex);
      parts.push(geqPattern.includes('|') ? `${a}(?:${geqPattern})` : `${a}${geqPattern}`);

      // Middle: first digits between a and d, any two digits
      if (aIndex + 1 < dIndex) {
          const middleDigits = digitSeq.slice(aIndex + 1, dIndex);
          const middlePattern = rangePattern(middleDigits[0], middleDigits[middleDigits.length - 1], isHex);
          const digitClass = isHex ? '[0-9a-f]' : '[0-9]';
          parts.push(middlePattern + digitClass + digitClass);
      }

      // End: first digit 'd', last two digits <= ef
      const leqPattern = regexLeq(e, f, isHex);
      parts.push(leqPattern.includes('|') ? `${d}(?:${leqPattern})` : `${d}${leqPattern}`);

      return `(?:${parts.join('|')})`;
  }
};

function rangePattern(low, high, isHex) {
  if (low === high) return low;
  if (!isHex) return `[${low}-${high}]`; // Decimal: simple range
  // Hex: handle ranges like '3' to 'b'
  const hexDigits = '0123456789abcdef';
  const lowIndex = hexDigits.indexOf(low);
  const highIndex = hexDigits.indexOf(high);
  const range = hexDigits.slice(lowIndex, highIndex + 1);
  // If range crosses '9' to 'a', split into numeric and alpha parts
  if (range.includes('9') && range.includes('a')) {
      const numeric = range.match(/[0-9]+/)[0];
      const alpha = range.match(/[a-f]+/)[0];
      return `[${numeric[0]}-${numeric.slice(-1)}${alpha[0]}-${alpha.slice(-1)}]`;
  } else {
      return `[${range[0]}-${range.slice(-1)}]`;
  }
}

function regexGeq(p, q, isHex) {
  const digitSeq = isHex ? '0123456789abcdef' : '0123456789';
  const lastDigit = digitSeq[digitSeq.length - 1];
  const pIndex = digitSeq.indexOf(p);
  if (q === digitSeq[0]) {
      // e.g., >= '00' or '0d': p to last digit, any second digit
      return rangePattern(p, lastDigit, isHex) + (isHex ? '[0-9a-f]' : '[0-9]');
  } else {
      // e.g., >= '0d': '0'[d-f] | [1-f][0-9a-f]
      const qRange = rangePattern(q, lastDigit, isHex);
      const nextP = pIndex + 1 < digitSeq.length ? digitSeq[pIndex + 1] : null;
      if (nextP) {
          const nextRange = rangePattern(nextP, lastDigit, isHex);
          return p + qRange + '|' + nextRange + (isHex ? '[0-9a-f]' : '[0-9]');
      } else {
          return p + qRange;
      }
  }
}

function regexLeq(r, s, isHex) {
  const digitSeq = isHex ? '0123456789abcdef' : '0123456789';
  const firstDigit = digitSeq[0];
  const rIndex = digitSeq.indexOf(r);
  if (rIndex > 0) {
      // e.g., <= 'd4': [0-c][0-9a-f] | d[0-4]
      const prevR = digitSeq[rIndex - 1];
      const prevPart = rangePattern(firstDigit, prevR, isHex) + (isHex ? '[0-9a-f]' : '[0-9]') + '|';
      const sRange = rangePattern(firstDigit, s, isHex);
      return prevPart + r + sRange;
  } else {
      // e.g., <= '04': 0[0-4]
      const sRange = rangePattern(firstDigit, s, isHex);
      return r + sRange;
  }
}

function regexBetweenTwoDigits(s, t, isHex) {
  const s1 = s[0], s2 = s[1], t1 = t[0], t2 = t[1];
  const digitSeq = isHex ? '0123456789abcdef' : '0123456789';
  const s1Index = digitSeq.indexOf(s1);
  const t1Index = digitSeq.indexOf(t1);
  if (s1Index < t1Index) {
      // e.g., '0d' to '24': 0[d-f] | [1-1][0-9a-f] | 2[0-4]
      const parts = [`${s1}${rangePattern(s2, digitSeq[digitSeq.length - 1], isHex)}`];
      const middleDigits = digitSeq.slice(s1Index + 1, t1Index);
      if (middleDigits.length > 0) {
          parts.push(rangePattern(middleDigits[0], middleDigits[middleDigits.length - 1], isHex) + (isHex ? '[0-9a-f]' : '[0-9]'));
      }
      parts.push(`${t1}${rangePattern(digitSeq[0], t2, isHex)}`);
      return parts.join('|');
  } else {
      // e.g., 'dd' to 'df': d[d-f]
      return `${s1}${rangePattern(s2, t2, isHex)}`;
  }
}

export { range };