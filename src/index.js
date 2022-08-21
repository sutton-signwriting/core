
import * as fsw from './fsw';
import * as fswquery from './fswquery';
import * as swu from './swu';
import * as swuquery from './swuquery';
import * as style from './style';
import * as convert from './convert';

export { fsw, fswquery, swu, swuquery, style, convert }


/**
 * Object of query elements with regular expression identification.
 * @typedef {object} QueryObject
 * @property {boolean} query - required true for FSW query object
 * @property {object} prefix - an object for prefix elements
 * @property {boolean} prefix.required - true if sorting prefix is required
 * @property {(string|string[]|(string|string[])[])[]} prefix.parts - array of symbol strings, range arrays, and OR arrays of strings and range arrays
 * @property {({symbol:string,coord:number[]}|{range:string[],coord:number[]}|{or:(string|string[])[],coord:number[]})[]} signbox - array of objects for symbols, ranges, and list of symbols or ranges, with optional coordinates
 * @property {number} variance - amount that x or y coordinates can vary and find a match, defaults to 20
 * @property {boolean} style - boolean value for including style string in matches
 */

/**
 * @typedef {object} ColumnOptions
 * @property {number} height - the height of the columns
 * @property {number} width - the widths of the columns
 * @property {number} offset - the lane offset for left and right lanes
 * @property {number} pad - amount of padding before and after signs as well as at top, left, and right of columns
 * @property {number} margin - amount of space at bottom of column that is not available
 * @property {boolean} dynamic - enables variable width columns
 * @property {string} background - background color for columns
 * @property {StyleObject} style - an object of style options
 * @property {object} punctuation - an object of punctuation options
 * @property {boolean} punctuation.spacing - enables special spacing for punctuation with no space above and custom space below
 * @property {number} punctuation.pad - the amount of spacing after a punctuation if punctuation spacing is enabled
 * @property {boolean} punctuation.pull - prevents line breaks before punctuation by reducing spacing between signs in a column
 */

/**
 * @typedef {ColumnSegment[]} ColumnData
 */

/**
 * @typedef {object} ColumnSegment
 * @property {number} x - the x position in the column
 * @property {number} y - the y position in the column
 * @property {number} minX - the min x value within the segment
 * @property {number} minY - the min y value within the segment
 * @property {number} width - the width of the text segment
 * @property {number} height - the height of the text segment
 * @property {number} lane - Left as -1, Middle as 0, Right as 1
 * @property {number} padding - the padding of the text segment affects colored background
 * @property {string} segment - "sign" or "symbol"
 * @property {string} text - the text of the sign or symbol with optional style string
 * @property {number} zoom - the zoom size of the segment
 */
