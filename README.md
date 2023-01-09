# @sutton-signwriting/core

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/sutton-signwriting/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![version](https://img.shields.io/npm/v/@sutton-signwriting/core)](https://www.npmjs.com/package/@sutton-signwriting/core)
[![npm downloads](https://img.shields.io/npm/dm/@sutton-signwriting/core)](https://npm-stat.com/charts.html?package=@sutton-signwriting/core&from=2019-10-31)

![Core Package Mindmap](./Core.jpg)

@sutton-signwriting/core is a javascript package for node and browsers that supports general processing of SignWriting text.

This package supports both Formal SignWriting in ASCII (FSW) and SignWriting in Unicode (SWU) character sets, along with the associated query languages and style string.  See [draft-slevinski-formal-signwriting](https://tools.ietf.org/id/draft-slevinski-formal-signwriting-09.html) for detailed specification.

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

The distribution is available in three flavors.  26 KB for the whole library minified.  Individual modules as small as 3 KB.
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
    <script src="https://unpkg.com/@sutton-signwriting/core@1.5.6"></script>

    // import individual module
    // available as ssw.fsw
    <script src="https://unpkg.com/@sutton-signwriting/core@1.5.6/fsw/fsw.js"></script>

## License
MIT

## SignWriting General Interest
- SignWriting Website: https://signwriting.org/
- Sutton SignWriting Resources: https://www.sutton-signwriting.io/
- Wikipedia page: https://en.wikipedia.org/wiki/SignWriting
- Email Discussion: https://www.signwriting.org/forums/swlist/
- Facebook Group: https://www.facebook.com/groups/SuttonSignWriting/
