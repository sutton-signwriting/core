
import { re } from './fswquery-re';
import { re as reStyle } from '../style/style-re';
import { range } from './fswquery-range';

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
 *   '(A(S[123][0-9a-f]{2}[0-5][0-9a-f])+)?[BLMR]([0-9]{3}x[0-9]{3})(S[123][0-9a-f]{2}[0-5][0-9a-f][0-9]{3}x[0-9]{3})*S100[0-5][0-9a-f][0-9]{3}x[0-9]{3}(S[123][0-9a-f]{2}[0-5][0-9a-f][0-9]{3}x[0-9]{3})*',
 *   '(A(S[123][0-9a-f]{2}[0-5][0-9a-f])+)?[BLMR]([0-9]{3}x[0-9]{3})(S[123][0-9a-f]{2}[0-5][0-9a-f][0-9]{3}x[0-9]{3})*S20500((4[6-9][0-9])|(500))x((5[0-3][0-9])|(540))(S[123][0-9a-f]{2}[0-5][0-9a-f][0-9]{3}x[0-9]{3})*'
 * ]
 */
const regex = (query) => {
  query = query.match(new RegExp(`^${re.full}`))[0];
  if (!query) {
    return '';
  }
  var matches;
  var i;
  var fsw_pattern;
  var part;
  var from;
  var to;
  var re_range;
  var segment;
  var x;
  var y;
  var base;
  var fill;
  var rotate;
  var fuzz = 20;
  var re_sym = 'S[123][0-9a-f]{2}[0-5][0-9a-f]';
  var re_coord = '[0-9]{3}x[0-9]{3}';
  var re_word = '[BLMR](' + re_coord + ')(' + re_sym + re_coord + ')*';
  var re_sortable = '(A(' + re_sym + ')+)';
  var q_range = 'R[123][0-9a-f]{2}t[123][0-9a-f]{2}';
  var q_sym = 'S[123][0-9a-f]{2}[0-5u][0-9a-fu]';
  var q_coord = '([0-9]{3}x[0-9]{3})?';
  var q_var = '(V[0-9]+)';
  var q_style = '(' + reStyle.full + ')?';
  var q_sortable;

  if (query == 'Q') {
    return [re_sortable + "?" + re_word];
  }
  if (query == 'Q-') {
    return [re_sortable + "?" + re_word + q_style];
  }
  if (query == 'QT') {
    return [re_sortable + re_word];
  }
  if (query == 'QT-') {
    return [re_sortable + re_word + q_style];
  }
  var segments = [];
  var sortable = query.indexOf('T') + 1;
  if (sortable) {
    q_sortable = '(A';
    var qat = query.slice(0, sortable);
    query = query.replace(qat, '');
    if (qat == 'QT') {
      q_sortable += '(' + re_sym + ')+)';
    } else {
      matches = qat.match(new RegExp('(' + q_sym + '|' + q_range + ')', 'g'));
      if (matches) {
        var matched;
        for (i = 0; i < matches.length; i += 1) {
          matched = matches[i].match(new RegExp(q_sym));
          if (matched) {
            segment = matched[0].slice(0, 4);
            fill = matched[0].slice(4, 5);
            if (fill == 'u') {
              segment += '[0-5]';
            } else {
              segment += fill;
            }
            rotate = matched[0].slice(5, 6);
            if (rotate == 'u') {
              segment += '[0-9a-f]';
            } else {
              segment += rotate;
            }
            q_sortable += segment;
          } else {
            from = matches[i].slice(1, 4);
            to = matches[i].slice(5, 8);
            re_range = range(from, to, 'hex');
            segment = 'S' + re_range + '[0-5][0-9a-f]';
            q_sortable += segment;
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
  fsw_pattern = q_sym + q_coord;
  matches = query.match(new RegExp(fsw_pattern, 'g'));
  if (matches) {
    for (i = 0; i < matches.length; i += 1) {
      part = matches[i].toString();
      base = part.slice(1, 4);
      segment = 'S' + base;
      fill = part.slice(4, 5);
      if (fill == 'u') {
        segment += '[0-5]';
      } else {
        segment += fill;
      }
      rotate = part.slice(5, 6);
      if (rotate == 'u') {
        segment += '[0-9a-f]';
      } else {
        segment += rotate;
      }
      if (part.length > 6) {
        x = part.slice(6, 9) * 1;
        y = part.slice(10, 13) * 1;
        //now get the x segment range+++
        segment += range((x - fuzz), (x + fuzz));
        segment += 'x';
        segment += range((y - fuzz), (y + fuzz));
      } else {
        segment += re_coord;
      }
      //now I have the specific search symbol
      // add to general ksw word
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
  //this gets all ranges
  fsw_pattern = q_range + q_coord;
  matches = query.match(new RegExp(fsw_pattern, 'g'));
  if (matches) {
    for (i = 0; i < matches.length; i += 1) {
      part = matches[i].toString();
      from = part.slice(1, 4);
      to = part.slice(5, 8);
      re_range = range(from, to, "hex");
      segment = 'S' + re_range + '[0-5][0-9a-f]';
      if (part.length > 8) {
        x = part.slice(8, 11) * 1;
        y = part.slice(12, 15) * 1;
        //now get the x segment range+++
        segment += range((x - fuzz), (x + fuzz));
        segment += 'x';
        segment += range((y - fuzz), (y + fuzz));
      } else {
        segment += re_coord;
      }
      // add to general ksw word
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
  if (!segments.length) {
    if (query.indexOf('-') > 0) {
      segment += q_style;
    }
    segments.push(q_sortable + re_word);
  }
  return segments;
}

export { regex }
