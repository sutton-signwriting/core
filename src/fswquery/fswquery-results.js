
import { regex } from './fswquery-regex';

//needs rewritten, but it works
/**
 * Function that uses a query string to match signs from a string of text.
 * @function fswquery.results
 * @param {string} query - an FSW query string
 * @param {string} text - a string of text containing multiple signs
 * @returns {string[]} an array of FSW signs
 * @example
 * fswquery.results('QAS10011T','AS10011S10019S2e704S2e748M525x535S2e748483x510S10011501x466S2e704510x500S10019476x475 AS15a21S15a07S21100S2df04S2df14M521x538S15a07494x488S15a21498x489S2df04498x517S2df14497x461S21100479x486 AS1f010S10018S20600M519x524S10018485x494S1f010490x494S20600481x476')
 * 
 * return [
 *   'AS10011S10019S2e704S2e748M525x535S2e748483x510S10011501x466S2e704510x500S10019476x475'
 * ]
 */
const results = (query, text) => {
  if (!text) { return []; }

  let pattern;
  let matches;
  let parts;
  let words;
  let re = regex(query);
  if (!re) { return []; }
  let i;
  for (i = 0; i < re.length; i += 1) {
    pattern = re[i];
    matches = text.match(new RegExp(pattern, 'g'));
    if (matches) {
      text = matches.join(' ');
    } else {
      text = '';
    }
  }
  if (text) {
    parts = text.split(' ');
    words = parts.filter(function (element) {
      return element in parts ? false : parts[element] = true;
    }, {});
  } else {
    words = [];
  }
  return words;
}

//needs rewritten, but it works
/**
 * Function that uses an FSW query string to match signs from multiple lines of text.
 * @function fswquery.lines
 * @param {string} query - an FSW query string
 * @param {string} text - multiple lines of text, each starting with an FSW sign
 * @returns {string[]} an array of lines of text, each starting with an FSW sign
 * @example
 * fswquery.lines('QAS10011T',`AS10011S10019S2e704S2e748M525x535S2e748483x510S10011501x466S2e704510x500S10019476x475 line one
 * AS15a21S15a07S21100S2df04S2df14M521x538S15a07494x488S15a21498x489S2df04498x517S2df14497x461S21100479x486 line two
 * AS1f010S10018S20600M519x524S10018485x494S1f010490x494S20600481x476 line three`)
 * 
 * return [
 *   'AS10011S10019S2e704S2e748M525x535S2e748483x510S10011501x466S2e704510x500S10019476x475 line one'
 * ]
 */
const lines = (query, text) => {
  if (!text) { return []; }

  let pattern;
  let matches;
  let parts;
  let words;
  let re = regex(query);
  if (!re) { return []; }
  let i;
  for (i = 0; i < re.length; i += 1) {
    pattern = re[i];
    pattern = '^' + pattern + '.*';
    matches = text.match(new RegExp(pattern, 'mg'));
    if (matches) {
      text = matches.join("\n");
    } else {
      text = '';
    }
  }
  if (text) {
    parts = text.split("\n");
    words = parts.filter(function (element) {
      return element in parts ? false : parts[element] = true;
    }, {});
  } else {
    words = [];
  }
  return words;
}

export { results, lines }