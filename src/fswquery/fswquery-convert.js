import { parse } from '../fsw/fsw-parse';

/**
 * Function to convert an FSW sign to a query string
 * 
 * For the flags parameter, use one or more of the following.
 * - A: exact symbol in temporal prefix
 * - a: general symbol in temporal prefix
 * - S: exact symbol in spatial signbox
 * - s: general symbol in spatial signbox
 * - L: spatial signbox symbol at location
 * @function fswquery.fsw2query
 * @param {string} fswSign - FSW sign
 * @param {string} flags - flags for query string creation
 * @returns {string} FSW query string
 * @example
 * fswquery.fsw2query('AS10011S10019S2e704S2e748M525x535S2e748483x510S10011501x466S2e704510x500S10019476x475', 'ASL')
 * 
 * return 'QAS10011S10019S2e704S2e748TS2e748483x510S10011501x466S2e704510x500S10019476x475'
 */
const fsw2query = (fswSign, flags) => {
  let query = '';
  const parsed = parse.sign(fswSign);

  if (parsed.box) {
    const A_flag = flags.indexOf('A') > -1;
    const a_flag = flags.indexOf('a') > -1;
    const S_flag = flags.indexOf('S') > -1;
    const s_flag = flags.indexOf('s') > -1;
    const L_flag = flags.indexOf('L') > -1;

    if (A_flag || a_flag || S_flag || s_flag) {
      if ((A_flag || a_flag) && parsed.sequence) {
        query += 'A';
        query += parsed.sequence.map(sym => sym.slice(0, 4) + (a_flag ? 'uu' : sym.slice(4, 6))).join('');
        query += 'T';
      }

      if ((S_flag || s_flag) && parsed.spatials) {
        query += parsed.spatials.map(spatial => spatial.symbol.slice(0, 4) + (s_flag ? 'uu' : spatial.symbol.slice(4, 6)) + (L_flag ? spatial.coord.join('x') : '')).join('');
      }
    }
    return query ? "Q" + query : undefined;
  } else {
    return undefined;
  }
}

export { fsw2query }