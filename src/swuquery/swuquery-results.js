
import { regex } from './swuquery-regex';

//needs rewritten, but it works
/**
 * Function that uses a query string to match signs from a string of text.
 * @function swuquery.results
 * @param {string} query - an SWU query string
 * @param {string} text - a string of text containing multiple signs
 * @returns {string[]} an array of SWU signs
 * @example
 * swuquery.results('QA񀀒T','𝠀񀀒񀀚񋚥񋛩𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭 𝠀񂇢񂇈񆙡񋎥񋎵𝠃𝤛𝤬񂇈𝤀𝣺񂇢𝤄𝣻񋎥𝤄𝤗񋎵𝤃𝣟񆙡𝣱𝣸 𝠀񅨑񀀙񆉁𝠃𝤙𝤞񀀙𝣷𝤀񅨑𝣼𝤀񆉁𝣳𝣮')
 * 
 * return [
 *   '𝠀񀀒񀀚񋚥񋛩𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭'
 * ]
 */
const results = (query, text) => {
  if (!text) { return []; }

  let pattern;
  let matches;
  let parts;
  let words;
  let res = regex(query);
  if (!res) { return []; }
  let i;
  for (i = 0; i < res.length; i += 1) {
    pattern = res[i];
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
 * Function that uses an SWU query string to match signs from multiple lines of text.
 * @function swuquery.lines
 * @param {string} query - an SWU query string
 * @param {string} text - multiple lines of text, each starting with an SWU sign
 * @returns {string[]} an array of lines of text, each starting with an SWU sign
 * @example
 * swuquery.lines('QA񀀒T',`𝠀񀀒񀀚񋚥񋛩𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭 line one
 * 𝠀񂇢񂇈񆙡񋎥񋎵𝠃𝤛𝤬񂇈𝤀𝣺񂇢𝤄𝣻񋎥𝤄𝤗񋎵𝤃𝣟񆙡𝣱𝣸 line two
 * 𝠀񅨑񀀙񆉁𝠃𝤙𝤞񀀙𝣷𝤀񅨑𝣼𝤀񆉁𝣳𝣮 line three`)
 * 
 * return [
 *   '𝠀񀀒񀀚񋚥񋛩𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭 line one'
 * ]
 */
const lines = (query, text) => {
  if (!text) { return []; }
  let pattern;
  let matches;
  let parts;
  let words;
  let res = regex(query);
  if (!res) { return []; }
  let i;
  for (i = 0; i < res.length; i += 1) {
    pattern = res[i];
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