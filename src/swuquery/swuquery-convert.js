import { parse } from '../swu/swu-parse';
import { coord2swu } from '../convert';

/**
 * Function to convert an SWU sign to a query string
 * 
 * For the flags parameter, use one or more of the following.
 * - A: exact symbol in temporal prefix
 * - a: general symbol in temporal prefix
 * - S: exact symbol in spatial signbox
 * - s: general symbol in spatial signbox
 * - L: spatial signbox symbol at location
 * @function swuquery.swu2query
 * @param {string} swuSign - SWU sign
 * @param {string} flags - flags for query string creation
 * @returns {string} SWU query string
 * @example
 * swuquery.swu2query('𝠀񀀒񀀚񋚥񋛩𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭', 'ASL')
 * 
 * return 'QA񀀒񀀚񋚥񋛩T񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭'
 */
const swu2query = (swuSign, flags) => {
  let query = '';
  const parsed = parse.sign(swuSign);

  if (parsed.box) {
    const A_flag = flags.indexOf('A') > -1;
    const a_flag = flags.indexOf('a') > -1;
    const S_flag = flags.indexOf('S') > -1;
    const s_flag = flags.indexOf('s') > -1;
    const L_flag = flags.indexOf('L') > -1;

    if (A_flag || a_flag || S_flag || s_flag) {
      if ((A_flag || a_flag) && parsed.sequence) {
        query += 'A';
        query += parsed.sequence.map(sym => sym + (a_flag ? 'fr' : '')).join('');
        query += 'T';
      }

      if ((S_flag || s_flag) && parsed.spatials) {
        query += parsed.spatials.map(spatial => spatial.symbol + (s_flag ? 'fr' : '') + (L_flag ? coord2swu(spatial.coord) : '')).join('');
      }
    }
    return query ? "Q" + query : undefined;
  } else {
    return undefined;
  }
}

export { swu2query }