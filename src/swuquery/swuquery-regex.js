
import { re } from './swuquery-re';
import { re as reSWU } from '../swu/swu-re';
import { re as reStyle } from '../style/style-re';
import { range } from './swuquery-range';
import { symbolRanges } from './swuquery-symbol-ranges';
import { swu2coord, num2swu, swu2key, key2swu } from '../convert';

const regexRange = (symRange) => {
  let from = swu2key(symRange.slice(1, 3));
  let to = swu2key(symRange.slice(-2));
  from = key2swu(from.slice(0, 4) + '00');
  to = key2swu(to.slice(0, 4) + '5f');
  return range(from, to);
}

//needs rewritten, but it works
/**
 * Function to transform an SWU query string to one or more regular expressions
 * @function swuquery.regex
 * @param {string} query - an SWU query string
 * @returns {string[]} an array of one or more regular expressions
 * @example
 * swuquery.regex('QA񀀒T')
 * 
 * return [
 *   '(\uD836\uDC00\uD8C0\uDC12((?:(?:\uD8C0[\uDC01-\uDFFF])|(?:[\uD8C1-\uD8FC][\uDC00-\uDFFF])|(?:\uD8FD[\uDC00-\uDC80])))*)\uD836[\uDC01-\uDC04](?:\uD836[\uDC0C-\uDDFF]){2}((?:(?:\uD8C0[\uDC01-\uDFFF])|(?:[\uD8C1-\uD8FC][\uDC00-\uDFFF])|(?:\uD8FD[\uDC00-\uDC80]))(?:\uD836[\uDC0C-\uDDFF]){2})*'
 * ]
 */
const regex = (query) => {
  query = query.match(new RegExp(`^${re.full}`))[0];

  if (!query) {
    return '';
  }
  let matches;
  let matchesOr;
  let matched;
  let orList;
  let i;
  let j;
  let coord;
  let segment;
  let x;
  let y;
  let fuzz = 20;

  let re_word = reSWU.box + reSWU.coord + '(?:' + reSWU.symbol + reSWU.coord + ')*';
  let re_sortable = '(?:' + reSWU.sort + reSWU.nullorsymbol + '+)';

  let q_var = '(?:V[0-9]+)';
  let q_style = '(?:' + reStyle.full + ')?';
  let q_sortable;

  if (query == 'Q') {
    return [reSWU.sign];
  }
  if (query == 'Q-') {
    return [reSWU.sign + "(" + reStyle.full + ")?"];
  }
  if (query == 'QT') {
    return [reSWU.sortable];
  }
  if (query == 'QT-') {
    return [reSWU.sortable + "(" + reStyle.full + ")?"];
  }
  let segments = [];
  let sortable = query.indexOf('T') + 1;
  if (sortable) {
    q_sortable = '(?:' + reSWU.sort;
    let qat = query.slice(0, sortable);
    query = query.replace(qat, '');
    if (qat == 'QT') {
      q_sortable += reSWU.nullorsymbol + '+)';
    } else {
      matches = qat.match(new RegExp(re.list, 'g'));
      if (matches) {
        for (i = 0; i < matches.length; i += 1) {
          orList = [];
          matchesOr = matches[i].match(new RegExp(re.item, 'g'));
          if (matchesOr) {
            for (j = 0; j < matchesOr.length; j += 1) {
              matched = matchesOr[j].match(new RegExp(re.range));
              if (matched) {
                orList.push(regexRange(matchesOr[j]));
              } else {
                orList.push(symbolRanges(matchesOr[j]));
              }
            }
            if (orList.length==1){
              q_sortable += orList[0];
            } else {
              q_sortable += '(?:' + orList.join('|') + ')';
            }
          }
        }
        q_sortable += reSWU.nullorsymbol + '*)';
      }
    }
  }

  //get the variance
  matches = query.match(new RegExp(q_var, 'g'));
  if (matches) {
    fuzz = matches.toString().slice(1) * 1;
  }

  //this gets all symbols and ranges with or without location
  matches = query.match(new RegExp(re.list + re.coord, 'g'));
  if (matches) {
    for (i = 0; i < matches.length; i += 1) {
      orList = [];
      matchesOr = matches[i].match(new RegExp('(' + re.range + '|' + re.symbol + ')', 'g'));
      if (matchesOr) {
        for (j = 0; j < matchesOr.length; j += 1) {
          matched = matchesOr[j].match(new RegExp(re.range));
          if (matched) {
            orList.push(regexRange(matchesOr[j]));
          } else {
            orList.push(symbolRanges(matchesOr[j]));
          }
        }
        if (orList.length==1){
          segment = orList[0];
        } else {
          segment = '(?:' + orList.join('|') + ')';
        }
      }

      coord = matches[i].match(new RegExp(`${reSWU.coord}`));
      if (coord) {
        coord = swu2coord(coord[0]);
        x = coord[0];
        y = coord[1];
        segment += range(num2swu(x - fuzz), num2swu(x + fuzz));
        segment += range(num2swu(y - fuzz), num2swu(y + fuzz));
      } else {
        segment += reSWU.coord;
      }

      // add to general swu word
      segment = re_word + segment + '(?:' + reSWU.symbol + reSWU.coord + ')*';
      if (sortable) {
        segment = q_sortable + segment;
      } else {
        segment = re_sortable + "?" + segment;
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
    segments.push(q_sortable + re_word);
  }
  return segments;
}

export { regex }
