
/** The style module contains regular expressions and functions for parsing and composing style strings.
 * [Style string definition](https://tools.ietf.org/id/draft-slevinski-formal-signwriting-09.html#name-styling-string)
 * @module style
 */

/**
 * The elements of a style string
 * @typedef {object} StyleObject
 * @property {boolean} colorize - boolean to use standardized colors for symbol groups
 * @property {number} padding - integer value for padding around symbol or sign
 * @property {string} background - css name or hex color for background
 * @property {array} detail - array for css name or hex color for line and optional fill
 * @property {number} zoom - decimal value for zoom level
 * @property {object[]} detailsym - custom colors for individual symbols
 * @property {number} detailsym.index - symbol index in sign box
 * @property {array} detailsym.detail - array for css name or hex color for line and optional fill
 * @property {string} classes - list of class names separated with spaces used for SVG
 * @property {string} id - id name used for SVG
 */

import { re } from './style-re';
import { parse } from './style-parse';
import { compose } from './style-compose';

export { re, parse, compose }
