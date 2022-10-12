
import * as style from '../style';
import { coord2swu } from '../convert';
import { re } from './swu-re';

const compose = {
  /**
   * Function to compose an swu symbol with optional coordinate and style string
   * @function swu.compose.symbol
   * @param {SymbolObject} swuSymObject - an swu symbol object
   * @returns {string} an swu symbol string
   * @example
   * swu.compose.symbol({
   *  'symbol': '񀀁',
   *  'coord': [500, 500],
   *  'style': '-C'
   * })
   * 
   * return '񀀁𝤆𝤆-C'
   */
  symbol: (swuSymObject) => {
    if (typeof swuSymObject !== 'object' || swuSymObject === null) return undefined;
    if (typeof swuSymObject.symbol === 'string') {
      const symbol = (swuSymObject.symbol.match(re.symbol) || [''])[0];
      if (symbol) {
        const x = (swuSymObject.coord && swuSymObject.coord[0]) || '';
        const y = (swuSymObject.coord && swuSymObject.coord[1]) || '';
        const coord = (x && y) ? coord2swu([x, y]) : '';
        const styleStr = (typeof swuSymObject.style === 'string') && (swuSymObject.style.match(style.re.full) || [''])[0] || '';
        return symbol + coord + styleStr;

      }
    }
    return undefined;
  },
  /**
   * Function to compose an swu sign with style string
   * @function swu.compose.sign
   * @param {SignObject} swuSignObject - an swu sign object
   * @returns {string} an swu sign string
   * @example
   * swu.compose.sign({
   *  sequence: ['񀀒','񀀚','񋚥','񋛩'],
   *  box: '𝠃',
   *  max: [525, 535],
   *  spatials: [
   *    {
   *      symbol: '񋛩',
   *      coord: [483, 510]
   *    },
   *    {
   *      symbol: '񀀒',
   *      coord: [501, 466]
   *    },
   *    {
   *      symbol: '񋚥',
   *      coord: [510, 500]
   *    },
   *    {
   *      symbol: '񀀚',
   *      coord: [476, 475]
   *    }
   *  ],
   *  style: '-C'
   * })
   * 
   * return '𝠀񀀒񀀚񋚥񋛩𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭-C'
   */
  sign: (swuSignObject) => {
    if (typeof swuSignObject !== 'object' || swuSignObject === null) return undefined;
    let box = (typeof swuSignObject.box !== 'string') ? '𝠃' : (swuSignObject.box + '𝠃').match(re.box)

    const x = (swuSignObject.max && swuSignObject.max[0]) || '';
    const y = (swuSignObject.max && swuSignObject.max[1]) || '';
    const max = (x && y) ? coord2swu([x, y]) : undefined

    if (!max) return undefined;

    let prefix = '';
    if (swuSignObject.sequence && Array.isArray(swuSignObject.sequence)) {
      prefix = swuSignObject.sequence.map(key => (key.match(re.symbol) || [''])[0]).join('')
      prefix = prefix ? '𝠀' + prefix : ''
    }

    let signbox = '';
    if (swuSignObject.spatials && Array.isArray(swuSignObject.spatials)) {
      signbox = swuSignObject.spatials.map(spatial => {
        if (typeof spatial.symbol === 'string') {
          const symbol = (spatial.symbol.match(re.symbol) || [''])[0];
          if (symbol) {
            const x = (spatial.coord && spatial.coord[0]) || '';
            const y = (spatial.coord && spatial.coord[1]) || '';
            const coord = (x && y) ? coord2swu([x, y]) : '';
            if (coord) {
              return symbol + coord;
            }
          }
        }
        return '';
      }).join('');
    }
    const styleStr = (typeof swuSignObject.style === 'string') && (swuSignObject.style.match(style.re.full) || [''])[0] || '';

    return prefix + box + max + signbox + styleStr;

  }
}

export { compose }
