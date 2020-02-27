
import { re } from './swuquery-re';
import { re as reSwu } from '../swu/swu-re';
import { re as reStyle } from '../style/style-re';
import { range } from './swuquery-range';
import { symbolRanges } from './swuquery-symbol-ranges';
import { swu2coord, coord2swu, swu2key, key2swu } from '../convert';

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
  let i;
  let swu_pattern;
  let part;
  let from;
  let to;
  let coord;
  let re_range;
  let segment;
  let x;
  let y;
  let base;
  let fill;
  let rotate;
  let fuzz = 20;

  let re_sym = reSwu.symbol;
  let re_coord = reSwu.coord;
  let re_signbox = reSwu.box;
  let re_seq = reSwu.sort;
  let re_word = re_signbox + re_coord + '(' + re_sym + re_coord + ')*';
  let re_sortable = '(' + re_seq + '(' + re_sym + ')+)';

  let q_range = 'R' + re_sym + re_sym;
  let q_sym = re_sym + 'f?r?';
  let q_coord = '(' + re_coord + ')?';
  let q_var = '(V[0-9]+)';
  let q_style = '(' + reStyle.full + ')?';
  let q_sortable;

  if (query == 'Q') {
    return [reSwu.sign];
  }
  if (query == 'Q-') {
    return [reSwu.sign + "(" + reStyle.full + ")?"];
  }
  if (query == 'QT') {
    return [reSwu.sortable];
  }
  if (query == 'QT-') {
    return [reSwu.sortable + "(" + reStyle.full + ")?"];
  }
  let segments = [];
  let sym, key;
  let sortable = query.indexOf('T') + 1;
  if (sortable) {
    q_sortable = '(' + reSwu.sort;
    let qat = query.slice(0, sortable);
    query = query.replace(qat, '');
    if (qat == 'QT') {
      q_sortable += '(' + re_sym + ')+)';
    } else {
      matches = qat.match(new RegExp('(' + q_sym + '|' + q_range + ')', 'g'));
      if (matches) {
        let matched;
        for (i = 0; i < matches.length; i += 1) {
          matched = matches[i].match(new RegExp('^' + q_sym));
          if (matched) {
            q_sortable += symbolRanges(matched[0]);
          } else {
            from = swu2key(matches[i].slice(1, 3));
            to = swu2key(matches[i].slice(-2));
            from = key2swu(from.slice(0, 4) + '00');
            to = key2swu(to.slice(0, 4) + '5f');
            q_sortable += range(from, to);
          }
        }
        q_sortable += '(' + re_sym + ')*)';
      }
    }
  }
  //get the variance
  matches = query.match(new RegExp(q_var, 'g'));
  if (matches) {
    fuzz = matches.toString().slice(1) * 1;
  }
  //this gets all symbols with or without location
  swu_pattern = q_sym + q_coord;
  matches = query.match(new RegExp("(" + q_range + q_coord + "|" + q_sym + q_coord + ")", 'g'));

  if (matches) {
    for (i = 0; i < matches.length; i += 1) {
      part = matches[i].toString();
      if (part[0] != "R") {
        sym = part.match(new RegExp(q_sym))[0];
        segment = symbolRanges(sym);
        if (sym.length > part.length) {
          coord = swu2coord(part.slice(-4));
          x = coord[0];
          y = coord[1];
          //now get the x segment range+++
          segment += range(coord2swu([x - fuzz, x + fuzz]));
          segment += range(coord2swu([y - fuzz, y + fuzz]));
        } else {
          segment += re_coord;
        }
        //now I have the specific search symbol
        // add to general swu word
        segment = re_word + segment + '(' + re_sym + re_coord + ')*';
        if (sortable) {
          segment = q_sortable + segment;
        } else {
          segment = re_sortable + "?" + segment;
        }
        if (query.indexOf('-') > 0) {
          segment += q_style;
        }
        segments.push(segment);
      } else {
        //ranges
        part = matches[i].toString();
        from = swu2key(part.slice(1, 3));
        to = swu2key(part.slice(3, 5));
        from = key2swu(from.slice(0, 4) + '00');
        to = key2swu(to.slice(0, 4) + '5f');
        segment = range(from, to);

        if (part.length > 5) {
          coord = swu2coord(part.slice(5, 9));
          x = coord[0];
          y = coord[1];
          //now get the x segment range+++
          segment += range(coord2swu([x - fuzz, x + fuzz]));
          segment += range(coord2swu([y - fuzz, y + fuzz]));
        } else {
          segment += re_coord;
        }
        // add to general swu word
        segment = re_word + segment + '(' + re_sym + re_coord + ')*';
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
