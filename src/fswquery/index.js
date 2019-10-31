
/** The fswquery module contains functions for handling the FSW query language.
 * [Query Language definition](https://tools.ietf.org/id/draft-slevinski-formal-signwriting-07.html#rfc.section.2.6)
 * @module fswquery
 */

import { re } from './fswquery-re';
import { parse } from './fswquery-parse';
import { compose } from './fswquery-compose';
import { fsw2query } from './fswquery-convert';
import { range } from './fswquery-range';
import { regex } from './fswquery-regex';
import { results, lines } from './fswquery-results';

export { re, parse, compose, fsw2query, range, regex, results, lines }
