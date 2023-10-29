
/** The convert module contains functions to convert between Formal SignWriitng in ASCII (FSW) and SignWriting in Unicode (SWU) characters, along with other types of data.
 * [Characters set definitions](https://tools.ietf.org/id/draft-slevinski-formal-signwriting-09.html#name-characters)
 * @module convert
 */

import { re as reFsw } from '../fsw/fsw-re';
import { re as reSwu } from '../swu/swu-re';
import { symidArr } from './symidArr';

/**
 * Function to convert an SWU structural marker to FSW equivalent
 * @function convert.swu2mark
 * @param {string} swuMark - character for SWU structural marker
 * @returns {string} FSW structural marker
 * @example
 * convert.swu2mark('𝠀')
 * 
 * return 'A'
 */
const swu2mark = (swuMark) => {
  return { '𝠀': 'A', '𝠁': 'B', '𝠂': 'L', '𝠃': 'M', '𝠄': 'R' }[swuMark]
}

/**
 * Function to convert an FSW structural marker to SWU equivalent
 * @function convert.mark2swu
 * @param {string} fswMark - character for FSW structural marker
 * @returns {string} SWU structural marker
 * @example
 * convert.mark2swu('A')
 * 
 * return '𝠀'
 */
const mark2swu = (fswMark) => {
  return { 'A': '𝠀', 'B': '𝠁', 'L': '𝠂', 'M': '𝠃', 'R': '𝠄' }[fswMark]
}

/**
 * Function to convert an SWU number character to an integer
 * @function convert.swu2num
 * @param {string} swuNum - SWU number character
 * @returns {number} Integer value for number
 * @example
 * convert.swu2num('𝤆')
 * 
 * return 500
 */
const swu2num = (swuNum) => parseInt(swuNum.codePointAt(0)) - 0x1D80C + 250;

/**
 * Function to convert a number to an SWU number character
 * @function convert.num2swu
 * @param {number} num - Integer value for number
 * @returns {string} SWU number character
 * @example
 * convert.num2swu(500)
 * 
 * return '𝤆'
 */
const num2swu = (num) => String.fromCodePoint(0x1D80C + parseInt(num) - 250);

/**
 * Function to convert two SWU number characters to an array of x,y integers
 * @function convert.swu2coord
 * @param {string} swuCoord - Two SWU number character
 * @returns {number[]} Array of x,y integers
 * @example
 * convert.swu2coord('𝤆𝤆')
 * 
 * return [500, 500]
 */
const swu2coord = (swuCoord) => [swu2num(swuCoord.slice(0, 2)), swu2num(swuCoord.slice(2, 4))];

/**
 * Function to convert an array of x,y integers to two SWU number characters
 * @function convert.coord2swu
 * @param {number[]} coord - Array of x,y integers
 * @returns {string} Two SWU number character
 * @example
 * convert.coord2swu([500, 500])
 * 
 * return '𝤆𝤆'
 */
const coord2swu = (coord) => coord.map(num => num2swu(num)).join('');


/**
 * Function to convert an FSW coordinate string to an array of x,y integers
 * @function convert.fsw2coord
 * @param {string} fswCoord - An FSW coordinate string
 * @returns {number[]} Array of x,y integers
 * @example
 * convert.fsw2coord('500x500')
 * 
 * return [500, 500]
 */
const fsw2coord = (fswCoord) => fswCoord.split('x').map(num => parseInt(num));

/**
 * Function to convert an array of x,y integers to an FSW coordinate string
 * @function convert.coord2fsw
 * @param {number[]} coord - Array of x,y integers
 * @returns {string} An FSW coordinate string
 * @example
 * convert.coord2fsw([500, 500])
 * 
 * return '500x500'
 */
const coord2fsw = (coord) => coord.join('x');

/**
 * Function to convert an SWU symbol character to a code point on plane 4
 * @function convert.swu2code
 * @param {string} swuSym - SWU symbol character
 * @returns {number} Code point on plane 4
 * @example
 * convert.swu2code('񀀁')
 * 
 * return 0x40001
 */
const swu2code = (swuSym) => parseInt(swuSym.codePointAt(0));

/**
 * Function to convert a code point on plane 4 to an SWU symbol character
 * @function convert.code2swu
 * @param {number} code - Code point on plane 4
 * @returns {string} SWU symbol character
 * @example
 * convert.code2swu(0x40001)
 * 
 * return '񀀁'
 */
const code2swu = (code) => String.fromCodePoint(code);

/**
 * Function to convert an SWU symbol character to a 16-bit ID
 * @function convert.swu2id
 * @param {string} swuSym - SWU symbol character
 * @returns {number} 16-bit ID
 * @example
 * convert.swu2id('񀀁')
 * 
 * return 1
 */
const swu2id = (swuSym) => swu2code(swuSym) - 0x40000;

/**
 * Function to convert a 16-bit ID to an SWU symbol character
 * @function convert.id2swu
 * @param {number} id - 16-bit ID
 * @returns {string} SWU symbol character
 * @example
 * convert.id2swu(1)
 * 
 * return '񀀁'
 */
const id2swu = (id) => code2swu(id + 0x40000);

/**
 * Function to convert an FSW symbol key to a 16-bit ID
 * @function convert.key2id
 * @param {string} key - FSW symbol key
 * @returns {number} 16-bit ID
 * @example
 * convert.key2id('S10000')
 * 
 * return 1
 */
const key2id = (key) => 1 + ((parseInt(key.slice(1, 4), 16) - 256) * 96) + ((parseInt(key.slice(4, 5), 16)) * 16) + parseInt(key.slice(5, 6), 16);

/**
 * Function to convert a 16-bit ID to an FSW symbol key
 * @function convert.id2key
 * @param {number} id - 16-bit ID
 * @returns {string} FSW symbol key
 * @example
 * convert.id2key(1)
 * 
 * return 'S10000'
 */
const id2key = (id) => {
  const symcode = id - 1;
  const base = parseInt(symcode / 96);
  const fill = parseInt((symcode - (base * 96)) / 16);
  const rotation = parseInt(symcode - (base * 96) - (fill * 16));
  return 'S' + (base + 0x100).toString(16) + fill.toString(16) + rotation.toString(16);
}

/**
 * Function to convert an SWU symbol character to an FSW symbol key
 * @function convert.swu2key
 * @param {string} swuSym - SWU symbol character
 * @returns {string} FSW symbol key
 * @example
 * convert.swu2key('񀀁')
 * 
 * return 'S10000'
 */
const swu2key = (swuSym) => {
  const symcode = swu2code(swuSym) - 0x40001;
  const base = parseInt(symcode / 96);
  const fill = parseInt((symcode - (base * 96)) / 16);
  const rotation = parseInt(symcode - (base * 96) - (fill * 16));
  return 'S' + (base + 0x100).toString(16) + fill.toString(16) + rotation.toString(16);
}

/**
 * Function to convert an FSW symbol key to an SWU symbol character
 * @function convert.key2swu
 * @param {string} key - FSW symbol key
 * @returns {string} SWU symbol character
 * @example
 * convert.key2swu('S10000')
 * 
 * return '񀀁'
 */
const key2swu = (key) => code2swu(0x40001 + ((parseInt(key.slice(1, 4), 16) - 256) * 96) + ((parseInt(key.slice(4, 5), 16)) * 16) + parseInt(key.slice(5, 6), 16));

/**
 * Function to convert SWU text to FSW text
 * @function convert.swu2fsw
 * @param {string} swuText - SWU text
 * @returns {string} FSW text
 * @example
 * convert.swu2fsw('𝠀񀀒񀀚񋚥񋛩𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭')
 * 
 * return 'AS10011S10019S2e704S2e748M525x535S2e748483x510S10011501x466S2e704510x500S10019476x475'
 */
const swu2fsw = (swuText) => {
  if (!swuText) return '';
  let fsw = swuText.replace(/𝠀/g, "A").replace(/𝠁/g, "B").replace(/𝠂/g, "L").replace(/𝠃/g, "M").replace(/𝠄/g, "R");
  const syms = fsw.match(new RegExp(reSwu.symbol, 'g'));
  if (syms) {
    syms.forEach(function (sym) {
      fsw = fsw.replace(sym, swu2key(sym));
    });
  }
  const coords = fsw.match(new RegExp(reSwu.coord, 'g'));
  if (coords) {
    coords.forEach(function (coord) {
      fsw = fsw.replace(coord, swu2coord(coord).join('x'));
    });
  }
  return fsw;
}

/**
 * Function to convert FSW text to SWU text
 * @function convert.fsw2swu
 * @param {string} fswText - FSW text
 * @returns {string} SWU text
 * @example
 * convert.fsw2swu('AS10011S10019S2e704S2e748M525x535S2e748483x510S10011501x466S2e704510x500S10019476x475')
 * 
 * return '𝠀񀀒񀀚񋚥񋛩𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭'
 */
const fsw2swu = (fswText) => {
  if (!fswText) return '';
  const prefixes = fswText.match(new RegExp(reFsw.prefix, 'g'));
  if (prefixes) {
    prefixes.forEach(function (prefix) {
      fswText = fswText.replace(prefix, '𝠀' +
        prefix.slice(1).match(/.{6}/g).map(key => key2swu(key)).join(''))
    })
  }
  const boxes = fswText.match(new RegExp(reFsw.box + reFsw.coord, 'g'));
  if (boxes) {
    boxes.forEach(function (boxes) {
      fswText = fswText.replace(boxes,
        mark2swu(boxes.slice(0, 1)) +
        coord2swu(fsw2coord(boxes.slice(1, 8))))
    })
  }
  const spatials = fswText.match(new RegExp(reFsw.spatial, 'g'));
  if (spatials) {
    spatials.forEach(function (spatial) {
      fswText = fswText.replace(spatial,
        key2swu(spatial.slice(0, 6)) +
        coord2swu(fsw2coord(spatial.slice(6, 13))))
    })
  }
  return fswText;
}

/**
 * Function to convert base or full symid Min to symid Max
 * @function convert.symidMax
 * @param {string} symidMin - Symbol ID minimized
 * @returns {string} Symbol ID maximized
 * @example
 * convert.symidMax('101011')
 * 
 * return '01-01-001-01'
 * @example
 * convert.symidMax('101011616')
 * 
 * return '01-01-001-01-06-16'
 */
const symidMax = (symidMin) => {
  if (!/^\d{6}(?:\d{3})?$/.test(symidMin)) {
    return '';
  }
  let max = `0${symidMin.charAt(0)}-${symidMin.charAt(1)}${symidMin.charAt(2)}-0${symidMin.charAt(3)}${symidMin.charAt(4)}-0${symidMin.charAt(5)}`;
  if (symidMin.length>6) {
    max += `-0${symidMin.charAt(6)}-${symidMin.charAt(7)}${symidMin.charAt(8)}`
  }
  return max;
}

/**
 * Function to convert base or full symid Max to symid Min
 * @function convert.symidMin
 * @param {string} symidMax - Symbol ID maximized
 * @returns {string} Symbol ID minimized
 * @example
 * convert.symidMin('01-01-001-01')
 * 
 * return '101011'
 * @example
 * convert.symidMin('01-01-001-01-06-16')
 * 
 * return '101011616'
 */
const symidMin = (symidMax) => {
  const matches = symidMax.match(/^0(\d)-(\d{2})-0(\d{2})-0(\d)(?:-0(\d)-(\d{2}))?$/);
  if (!matches) {
      return '';
  }
  if (matches[5]) {
    return matches[1] + matches[2] + matches[3] + matches[4] + matches[5] + matches[6];
  } else {
    return matches[1] + matches[2] + matches[3] + matches[4];
  }
};

/**
 * Function to convert base or full symid to key
 * @function convert.symid2key
 * @param {string} symid - Symbol ID
 * @returns {string} Symbol key
 * @example
 * convert.symid2key('01-01-001-01')
 * 
 * return 'S100'
 * @example
 * convert.symid2key('01-01-001-01-06-16')
 * 
 * return 'S1005f'
 */
const symid2key = (symid) => {
  const matches = symid.match(/^0(\d)-(\d{2})-0(\d{2})-0(\d)(?:-0(\d)-(\d{2}))?$/);
  if (!matches) {
      return '';
  }
  const symidMin = matches[1] + matches[2] + matches[3] + matches[4];
  const i = symidArr.indexOf(symidMin);
  if (i === -1) {
    return '';
  }

  if (matches[5]) {
    return 'S' + (256+i).toString(16) + (parseInt(matches[5],10)-1) + (parseInt(matches[6],10) -1).toString(16);
  } else {
    return 'S' + (256+i).toString(16);
  }

};

/**
 * Function to convert base or full key to symid
 * @function convert.key2symid
 * @param {string} key - Symbol key
 * @returns {string} Symbol ID
 * @example
 * convert.key2symid('S100')
 * 
 * return '01-01-001-01'
 * @example
 * convert.key2symid('S1005f')
 * 
 * return '01-01-001-01-06-16'
 */
const key2symid = (key) => {
  const matches = key.match(/^S([1-3][0-9a-f]{2})(?:([0-5])([0-9a-f]))?$/);
  if (!matches) {
      return '';
  }
  const i = parseInt(matches[1],16) - 256;
  if (i >= symidArr.length){
    return '';
  }

  if (matches[3]){
    return symidMax(symidArr[i]) + '-0' + (1 + parseInt(matches[2])) + '-' + (parseInt(matches[3],16)+1).toString().padStart(2,'0');
  } else {
    return symidMax(symidArr[i]);
  }
}

export { swu2mark, mark2swu, swu2num, num2swu, swu2coord, coord2swu, fsw2coord, coord2fsw, swu2code, code2swu, swu2id, id2swu, key2id, id2key, swu2key, key2swu, swu2fsw, fsw2swu, symidArr, symidMax, symidMin, symid2key, key2symid }
