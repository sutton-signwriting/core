
/** The fsw module contains functions for handling Formal SignWriitng in ASCII (FSW) characters.
 * [FSW characters definition](https://tools.ietf.org/id/draft-slevinski-formal-signwriting-07.html#rfc.section.2.2.1)
 * @module fsw
 */

import { re } from './fsw-re';
import { parse } from './fsw-parse';
import { kind, category, group, ranges, isType } from './fsw-structure';
import { colors, colorize } from './fsw-colorize';

export { re, parse, kind, category, group, ranges, isType, colors, colorize }
