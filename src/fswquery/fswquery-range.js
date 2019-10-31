
//needs rewritten, but it works
/**
 * Function to transform a range to a regular expression
 * @function fswquery.range
 * @param {(number|string)} min - either a decimal number or hexidecimal string
 * @param {(number|string)} max - either a decimal number or hexidecimal string
 * @param {boolean?} hex - if true, the regular expression will match a hexidecimal range
 * @returns {string} a regular expression that matches a range
 * @example
 * fswquery.range(500,749)
 * 
 * return '(([56][0-9][0-9])|(7[0-4][0-9])|(750))'
 * @example
 * fswquery.range('100','10e',true)
 * 
 * return '10[0-9a-e]'
 */
const range = (min, max, hex) => {
  let pattern;
  let re;
  let diff;
  let tmax;
  let cnt;
  let minV;
  let maxV;
  if (!hex) {
    hex = '';
  }
  min = ("000" + min).slice(-3);
  max = '' + max;
  pattern = '';

  if (min === max) { return min; }

  //ending pattern will be series of connected OR ranges
  re = [];

  //first pattern+  10's don't match and the min 1's are not zero
  //odd number to 9
  if (!(min[0] == max[0] && min[1] == max[1])) {
    if (min[2] != '0') {
      pattern = min[0] + min[1];
      if (hex) {
        //switch for dex
        switch (min[2]) {
          case "f":
            pattern += 'f';
            break;
          case "e":
            pattern += '[ef]';
            break;
          case "d":
          case "c":
          case "b":
          case "a":
            pattern += '[' + min[2] + '-f]';
            break;
          default:
            switch (min[2]) {
              case "9":
                pattern += '[9a-f]';
                break;
              case "8":
                pattern += '[89a-f]';
                break;
              default:
                pattern += '[' + min[2] + '-9a-f]';
                break;
            }
            break;
        }
        diff = 15 - parseInt(min[2], 16) + 1;
        min = '' + ((parseInt(min, 16) + diff)).toString(16);
        re.push(pattern);
      } else {
        //switch for dex
        switch (min[2]) {
          case "9":
            pattern += '9';
            break;
          case "8":
            pattern += '[89]';
            break;
          default:
            pattern += '[' + min[2] + '-9]';
            break;
        }
        diff = 9 - min[2] + 1;
        min = '' + (min * 1 + diff);
        re.push(pattern);
      }
    }
  }
  pattern = '';

  //if hundreds are different, get odd to 99 or ff
  if (min[0] != max[0]) {
    if (min[1] != '0') {
      if (hex) {
        //scrape to ff
        pattern = min[0];
        switch (min[1]) {
          case "f":
            pattern += 'f';
            break;
          case "e":
            pattern += '[ef]';
            break;
          case "d":
          case "c":
          case "b":
          case "a":
            pattern += '[' + min[1] + '-f]';
            break;
          case "9":
            pattern += '[9a-f]';
            break;
          case "8":
            pattern += '[89a-f]';
            break;
          default:
            pattern += '[' + min[1] + '-9a-f]';
            break;
        }
        pattern += '[0-9a-f]';
        diff = 15 - parseInt(min[1], 16) + 1;
        min = '' + (parseInt(min, 16) + diff * 16).toString(16);
        re.push(pattern);
      } else {
        //scrape to 99
        pattern = min[0];
        diff = 9 - min[1] + 1;
        switch (min[1]) {
          case "9":
            pattern += '9';
            break;
          case "8":
            pattern += '[89]';
            break;
          default:
            pattern += '[' + min[1] + '-9]';
            break;
        }
        pattern += '[0-9]';
        diff = 9 - min[1] + 1;
        min = '' + (min * 1 + diff * 10);
        re.push(pattern);
      }
    }
  }
  pattern = '';

  //if hundreds are different, get to same
  if (min[0] != max[0]) {
    if (hex) {
      diff = parseInt(max[0], 16) - parseInt(min[0], 16);
      tmax = (parseInt(min[0], 16) + diff - 1).toString(16);

      switch (diff) {
        case 1:
          pattern = min[0];
          break;
        case 2:
          pattern = '[' + min[0] + tmax + ']';
          break;
        default:
          if (parseInt(min[0], 16) > 9) {
            minV = 'h';
          } else {
            minV = 'd';
          }
          if (parseInt(tmax, 16) > 9) {
            maxV = 'h';
          } else {
            maxV = 'd';
          }
          switch (minV + maxV) {
            case "dd":
              pattern += '[' + min[0] + '-' + tmax + ']';
              break;
            case "dh":
              diff = 9 - min[0];
              //firs get up to 9
              switch (diff) {
                case 0:
                  pattern += '[9';
                  break;
                case 1:
                  pattern += '[89';
                  break;
                default:
                  pattern += '[' + min[0] + '-9';
                  break;
              }
              switch (tmax[0]) {
                case 'a':
                  pattern += 'a]';
                  break;
                case 'b':
                  pattern += 'ab]';
                  break;
                default:
                  pattern += 'a-' + tmax + ']';
                  break;
              }
              break;
            case "hh":
              pattern += '[' + min[0] + '-' + tmax + ']';
              break;
          }
      }

      pattern += '[0-9a-f][0-9a-f]';
      diff = parseInt(max[0], 16) - parseInt(min[0], 16);
      min = '' + (parseInt(min, 16) + diff * 256).toString(16);
      re.push(pattern);
    } else {
      diff = max[0] - min[0];
      tmax = min[0] * 1 + diff - 1;

      switch (diff) {
        case 1:
          pattern = min[0];
          break;
        case 2:
          pattern = '[' + min[0] + tmax + ']';
          break;
        default:
          pattern = '[' + min[0] + '-' + tmax + ']';
          break;
      }
      pattern += '[0-9][0-9]';
      min = '' + (min * 1 + diff * 100);
      re.push(pattern);
    }
  }
  pattern = '';

  //if tens are different, get to same
  if (min[1] != max[1]) {
    if (hex) {
      diff = parseInt(max[1], 16) - parseInt(min[1], 16);
      tmax = (parseInt(min[1], 16) + diff - 1).toString(16);
      pattern = min[0];
      switch (diff) {
        case 1:
          pattern += min[1];
          break;
        case 2:
          pattern += '[' + min[1] + tmax + ']';
          break;
        default:

          if (parseInt(min[1], 16) > 9) {
            minV = 'h';
          } else {
            minV = 'd';
          }
          if (parseInt(tmax, 16) > 9) {
            maxV = 'h';
          } else {
            maxV = 'd';
          }
          switch (minV + maxV) {
            case "dd":
              pattern += '[' + min[1];
              if (diff > 1) {
                pattern += '-';
              }
              pattern += tmax + ']';
              break;
            case "dh":
              diff = 9 - min[1];
              //firs get up to 9
              switch (diff) {
                case 0:
                  pattern += '[9';
                  break;
                case 1:
                  pattern += '[89';
                  break;
                default:
                  pattern += '[' + min[1] + '-9';
                  break;
              }
              switch (max[1]) {
                case 'a':
                  pattern += ']';
                  break;
                case 'b':
                  pattern += 'a]';
                  break;
                default:
                  pattern += 'a-' + (parseInt(max[1], 16) - 1).toString(16) + ']';
                  break;
              }
              break;
            case "hh":
              pattern += '[' + min[1];
              if (diff > 1) {
                pattern += '-';
              }
              pattern += (parseInt(max[1], 16) - 1).toString(16) + ']';
              break;
          }
          break;
      }
      pattern += '[0-9a-f]';
      diff = parseInt(max[1], 16) - parseInt(min[1], 16);
      min = '' + (parseInt(min, 16) + diff * 16).toString(16);
      re.push(pattern);
    } else {
      diff = max[1] - min[1];
      tmax = min[1] * 1 + diff - 1;
      pattern = min[0];
      switch (diff) {
        case 1:
          pattern += min[1];
          break;
        case 2:
          pattern += '[' + min[1] + tmax + ']';
          break;
        default:
          pattern += '[' + min[1] + '-' + tmax + ']';
          break;
      }
      pattern += '[0-9]';
      min = '' + (min * 1 + diff * 10);
      re.push(pattern);
    }
  }
  pattern = '';

  //if digits are different, get to same
  if (min[2] != max[2]) {
    if (hex) {
      pattern = min[0] + min[1];
      diff = parseInt(max[2], 16) - parseInt(min[2], 16);
      if (parseInt(min[2], 16) > 9) {
        minV = 'h';
      } else {
        minV = 'd';
      }
      if (parseInt(max[2], 16) > 9) {
        maxV = 'h';
      } else {
        maxV = 'd';
      }
      switch (minV + maxV) {
        case "dd":
          pattern += '[' + min[2];
          if (diff > 1) {
            pattern += '-';
          }
          pattern += max[2] + ']';
          break;
        case "dh":
          diff = 9 - min[2];
          //firs get up to 9
          switch (diff) {
            case 0:
              pattern += '[9';
              break;
            case 1:
              pattern += '[89';
              break;
            default:
              pattern += '[' + min[2] + '-9';
              break;
          }
          switch (max[2]) {
            case 'a':
              pattern += 'a]';
              break;
            case 'b':
              pattern += 'ab]';
              break;
            default:
              pattern += 'a-' + max[2] + ']';
              break;
          }

          break;
        case "hh":
          pattern += '[' + min[2];
          if (diff > 1) {
            pattern += '-';
          }
          pattern += max[2] + ']';
          break;
      }
      diff = parseInt(max[2], 16) - parseInt(min[2], 16);
      min = '' + (parseInt(min, 16) + diff).toString(16);
      re.push(pattern);
    } else {
      diff = max[2] - min[2];
      pattern = min[0] + min[1];
      switch (diff) {
        case 0:
          pattern += min[2];
          break;
        case 1:
          pattern += '[' + min[2] + max[2] + ']';
          break;
        default:
          pattern += '[' + min[2] + '-' + max[2] + ']';
          break;
      }
      min = '' + (min * 1 + diff);
      re.push(pattern);
    }
  }
  pattern = '';

  //last place is whole hundred
  if (min[2] == '0' && max[2] == '0') {
    pattern = max;
    re.push(pattern);
  }
  pattern = '';

  cnt = re.length;
  if (cnt == 1) {
    pattern = re[0];
  } else {
    pattern = re.join(')|(');
    pattern = '((' + pattern + '))';
  }
  return pattern;
}

export { range }