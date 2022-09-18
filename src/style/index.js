
/** The style module contains regular expressions and functions for parsing and composing style strings.
 * [Style string definition](https://tools.ietf.org/id/draft-slevinski-formal-signwriting-09.html#name-styling-string)
 * @module style
 */

import { re } from './style-re';
import { parse } from './style-parse';
import { compose } from './style-compose';

export { re, parse, compose }
