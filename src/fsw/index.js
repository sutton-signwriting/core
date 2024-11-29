
/** The fsw module contains functions for handling Formal SignWriting in ASCII (FSW) characters.
 * [FSW characters definition](https://tools.ietf.org/id/draft-slevinski-formal-signwriting-09.html#name-formal-signwriting-in-ascii)
 * @module fsw
 */

import { re } from './fsw-re';
import { parse } from './fsw-parse';
import { compose } from './fsw-compose';
import { info } from './fsw-info';
import { tokenize, detokenize, createTokenizer } from './fsw-tokenizer';
import { columnDefaults, columnDefaultsMerge, columns } from './fsw-columns';
import { kind, category, group, ranges, isType } from './fsw-structure';
import { colors, colorize } from './fsw-colorize';

export { re, parse, compose, info, tokenize, detokenize, createTokenizer, columnDefaults, columnDefaultsMerge, columns, kind, category, group, ranges, isType, colors, colorize }
