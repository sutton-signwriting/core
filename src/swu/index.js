
/** The swu module contains functions for handling SignWriitng in Unicode (SWU) characters.
 * [SWU characters definition](https://tools.ietf.org/id/draft-slevinski-formal-signwriting-09.html#name-signwriting-in-unicode-swu)
 * @module swu
 */

import { re } from './swu-re';
import { parse, encode, decode, pair } from './swu-parse';
import { compose } from './swu-compose';
import { info } from './swu-info';
import { columnDefaults, columnDefaultsMerge, columns } from './swu-columns';
import { kind, category, group, ranges, isType } from './swu-structure';
import { colors, colorize } from './swu-colorize';

export { re, parse, encode, decode, pair, compose, info, columnDefaults, columnDefaultsMerge, columns, kind, category, group, ranges, isType, colors, colorize }
