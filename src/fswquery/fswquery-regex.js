
import { re } from './fswquery-re';
import { re as reFSW } from '../fsw/fsw-re';
import { re as reStyle } from '../style/style-re';
import { range } from './fswquery-range';
import { fsw2coord } from '../convert';

const regexSymbol = (sym) => {
  let segment = sym.slice(0, 4);
  let fill = sym.slice(4, 5);
  if (fill == 'u') {
    segment += '[0-5]';
  } else {
    segment += fill;
  }
  let rotate = sym.slice(5, 6);
  if (rotate == 'u') {
    segment += '[0-9a-f]';
  } else {
    segment += rotate;
  }
  return segment;
}

const regexRange = (symRange) => {
  let from = symRange.slice(1, 4);
  let to = symRange.slice(5, 8);
  return 'S' + range(from, to, 'hex') + '[0-5][0-9a-f]';
}

//needs rewritten, but it works
/**
 * Function to transform an FSW query string to one or more regular expressions
 * @function fswquery.regex
 * @param {string} query - an FSW query string
 * @returns {string[]} an array of one or more regular expressions
 * @example
 * fswquery.regex('QS100uuS20500480x520')
 * 
 * return [
 *   '(?:A(?:S[123][0-9a-f]{2}[0-5][0-9a-f])+)?[BLMR]([0-9]{3}x[0-9]{3})(S[123][0-9a-f]{2}[0-5][0-9a-f][0-9]{3}x[0-9]{3})*S100[0-5][0-9a-f][0-9]{3}x[0-9]{3}(S[123][0-9a-f]{2}[0-5][0-9a-f][0-9]{3}x[0-9]{3})*',
 *   '(?:A(?:S[123][0-9a-f]{2}[0-5][0-9a-f])+)?[BLMR]([0-9]{3}x[0-9]{3})(S[123][0-9a-f]{2}[0-5][0-9a-f][0-9]{3}x[0-9]{3})*S20500((4[6-9][0-9])|(500))x((5[0-3][0-9])|(540))(S[123][0-9a-f]{2}[0-5][0-9a-f][0-9]{3}x[0-9]{3})*'
 * ]
 */
const regex = (query) => {
  query = query.match(new RegExp(`^${re.full}`))[0];
  if (!query) {
    return '';
  }
  var matches;
  var matchesOr;
  var matched;
  var orList;
  var i;
  var j;
  var fsw_pattern;
  var part;
  var from;
  var to;
  var re_range;
  var segment;
  var coord;
  var x;
  var y;
  var fuzz = 20;
  var q_style = '(' + reStyle.full + ')?';
  var q_sortable;

  if (query == 'Q') {
    return [reFSW.prefix + "?" + reFSW.signbox];
  }
  if (query == 'Q-') {
    return [reFSW.prefix + "?" + reFSW.signbox + q_style];
  }
  if (query == 'QT') {
    return [reFSW.prefix + reFSW.signbox];
  }
  if (query == 'QT-') {
    return [reFSW.prefix + reFSW.signbox + q_style];
  }
  var segments = [];
  var sortable = query.indexOf('T') + 1;
  if (sortable) {
    q_sortable = '(A';
    var qat = query.slice(0, sortable);
    query = query.replace(qat, '');
    if (qat == 'QT') {
      q_sortable += '(' + reFSW.symbol + ')+)';
    } else {
      matches = qat.match(new RegExp('(' + re.list + ')', 'g'));
      if (matches) {
        for (i = 0; i < matches.length; i += 1) {
          orList = [];
          matchesOr = matches[i].match(new RegExp('(' + re.symbol + '|' + re.range + ')', 'g'));
          if (matchesOr) {
            for (j = 0; j < matchesOr.length; j += 1) {
              matched = matchesOr[j].match(new RegExp(re.symbol));
              if (matched) {
                orList.push(regexSymbol(matched[0]));
              } else {
                orList.push(regexRange(matchesOr[j]));
              }
            }
            if (orList.length==1){
              q_sortable += orList[0];
            } else {
              q_sortable += '(' + orList.join('|') + ')';
            }
          }
        }
        q_sortable += '(' + reFSW.symbol + ')*)';
      }
    }
  }
  //get the variance
  matches = query.match(new RegExp(re.var, 'g'));
  if (matches) {
    fuzz = matches.toString().slice(1) * 1;
  }
  //this gets all symbols and ranges with or without location
  matches = query.match(new RegExp(re.list + re.coord, 'g'));
  if (matches) {
    for (i = 0; i < matches.length; i += 1) {
      orList = [];
      matchesOr = matches[i].match(new RegExp('(' + re.symbol + '|' + re.range + ')', 'g'));
      if (matchesOr) {
        for (j = 0; j < matchesOr.length; j += 1) {
          matched = matchesOr[j].match(new RegExp(re.symbol));
          if (matched) {
            orList.push(regexSymbol(matched[0]));
          } else {
            orList.push(regexRange(matchesOr[j]));
          }
        }
        if (orList.length==1){
          segment = orList[0];
        } else {
          segment = '(' + orList.join('|') + ')';
        }
      }
      if (matches[i].includes('x')) {
        coord = fsw2coord(matches[i].slice(-7))
        x = coord[0];
        y = coord[1];
        segment += range((x - fuzz), (x + fuzz));
        segment += 'x';
        segment += range((y - fuzz), (y + fuzz));
      } else {
        segment += reFSW.coord;
      }

      // add to general fsw word
      segment = reFSW.signbox + segment + '(' + reFSW.symbol + reFSW.coord + ')*';
      if (sortable) {
        segment = q_sortable + segment;
      } else {
        segment = reFSW.prefix + "?" + segment;
      }
      if (query.indexOf('-') > 0) {
        segment += q_style;
      }
      segments.push(segment);
    }
  }

  if (!segments.length) {
    if (query.indexOf('-') > 0) {
      segment += q_style;
    }
    segments.push(q_sortable + reFSW.signbox);
  }
  return segments;
}

export { regex }
