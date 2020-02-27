
/** The swu module contains functions for handling SignWriitng in Unicode (SWu) characters.
 * [SWU characters definition](https://tools.ietf.org/id/draft-slevinski-formal-signwriting-07.html#rfc.section.2.2.2)
 * @module swu
 */

import { re } from './swu-re';
import { parse, encode, decode, pair } from './swu-parse';
import { compose } from './swu-compose';
import { kind, category, group, ranges, isType } from './swu-structure';
import { colors, colorize } from './swu-colorize';

export { re, parse, encode, decode, pair, compose, kind, category, group, ranges, isType, colors, colorize }
