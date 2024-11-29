# @sutton-signwriting/core

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/sutton-signwriting/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![version](https://img.shields.io/npm/v/@sutton-signwriting/core)](https://www.npmjs.com/package/@sutton-signwriting/core)
[![npm downloads](https://img.shields.io/npm/dm/@sutton-signwriting/core)](https://npm-stat.com/charts.html?package=@sutton-signwriting/core&from=2019-10-31)


![Core Package Mindmap](./Core.jpg)

@sutton-signwriting/core is a javascript package for node and browsers that supports general processing of SignWriting text.

This package supports both Formal SignWriting in ASCII (FSW) and SignWriting in Unicode (SWU) character sets, along with the associated query languages and style string.  See [draft-slevinski-formal-signwriting](https://tools.ietf.org/id/draft-slevinski-formal-signwriting-09.html) for detailed specification.

Version 2 of the core library adds support for the SignWriting Null character as S00000 in Formal SignWriting in ASCII (FSW) and U+40000 in SignWriting in Unicode (SWU).  The SignWriting Null character is allowed in the temporal prefix used for sorting, but the SignWriting Null character is not allowed in the two-dimensional arrangement of symbols.  The fonts do not provide a glyph for the SignWriting Null character yet.  You can use Ø, alt-0216, U+00D8 as a visualization of the SignWriting Null character.

Version 2 of the core library also provides a tokenizer for FSW to be used for machine learning researchers & developers. The default tokenizer follows patterns similar to those used in NLP with special tokens ([CLS], [SEP], [PAD], [UNK]).  It enables converting SignWriting into numerical representations suitable for machine learning models.

Use Cases:
- Sign language recognition systems
- Sign language generation
- Sign language translation models

Key Features:
- Flexible tokenization options (sequence/signbox flags)
- Bidirectional conversion (FSW ↔ tokens)
- Handles complex features (symbols, coordinates, and structures)
- Well-documented code
- Modular design allows for different use cases

> Author: https://SteveSlevinski.me  
> Channel: https://www.youtube.com/channel/UCXu4AXlG0rXFtk_5SzumDow  
> Support: https://www.patreon.com/signwriting  
> Donate: https://donate.sutton-signwriting.io

## Useful links

- Source: https://github.com/sutton-signwriting/core
- Distribution: https://unpkg.com/browse/@sutton-signwriting/core/
- Documentation: https://www.sutton-signwriting.io/core/
- Issue Tracker: https://github.com/sutton-signwriting/core/issues
- Online Discussion: https://gitter.im/sutton-signwriting/community

## Types of files
The source is written in small ES Modules available in the `src` directory along with the associated tests.

The distribution is available in three flavors.  28 KB for the whole library minified.  Individual modules as small as 3 KB.
* .js - Universal Module Definition
* .cjs - CommonJS
* .mjs - ES Module 

## Installation

### Download and Install with NPM

    npm install @sutton-signwriting/core

## Developer Installation

### Download from GitHub and Install Development Dependencies

    wget https://github.com/sutton-signwriting/core/archive/master.zip
    unzip master.zip
    cd core-master
    npm install

### Install tsc command line tool

    sudo apt install node-typescript

## Usage

### Using in Node

    // import entire library
    const core = require('@sutton-signwriting/core');

    // import individual module
    const fsw = require('@sutton-signwriting/core/fsw');

### Using in the Browser

#### Local files
    // import entire library
    // available as ssw.core
    <script src="core.js"></script>

    // import individual module
    // available as ssw.fsw
    <script src="fsw/fsw.js"></script>

#### Unpkg
    // import entire library
    // available as ssw.core
    <script src="https://unpkg.com/@sutton-signwriting/core@1.6.0"></script>

    // import individual module
    // available as ssw.fsw
    <script src="https://unpkg.com/@sutton-signwriting/core@1.6.0/fsw/fsw.js"></script>

## License
MIT

## SignWriting General Interest
- SignWriting Website: https://signwriting.org/
- Sutton SignWriting Resources: https://www.sutton-signwriting.io/
- Wikipedia page: https://en.wikipedia.org/wiki/SignWriting
- Email Discussion: https://www.signwriting.org/forums/swlist/
- Facebook Group: https://www.facebook.com/groups/SuttonSignWriting/
