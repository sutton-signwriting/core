# @sutton-signwriting/core

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/sutton-signwriting/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

@sutton-signwriting/core is a javascript package for node and browsers that supports general processing of SignWriting text.

This package supports both Formal SignWriting in ASCII (FSW) and SignWriting in Unicode (SWU) character sets, along with the associated query languages and style string.  See [draft-slevinski-formal-signwriting](https://tools.ietf.org/id/draft-slevinski-formal-signwriting-07.html) for detailed specification.

## Useful links

- GitHub Repo: https://github.com/sutton-signwriting/core
- Documentation: https://sutton-signwriting.github.io/core/
- Issue Tracker: https://github.com/sutton-signwriting/core/issues
- Online Discussion: https://gitter.im/sutton-signwriting/community


## Installation

### Install with NPM

    npm install @sutton-signwriting/core

### Download from GitHub

    https://github.com/sutton-signwriting/core/archive/master.zip


## Usage

### Using in Node

    // import entire library
    const core = require('@sutton-signwriting/core);

    // import individual module
    const fsw = require('@sutton-signwriting/core/fsw);

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
    <script src="https://unpkg.com/@sutton-signwriting/core"></script>

    // import individual module
    // available as ssw.fsw
    <script src="https://unpkg.com/@sutton-signwriting/core/fsw"></script>

## License
MIT

## SignWriting General Interest
- SignWriting Website: https://signwriting.org/
- Wikipedia page: https://en.wikipedia.org/wiki/SignWriting
- Email Discussion: https://www.signwriting.org/forums/swlist/
- Facebook Group: https://www.facebook.com/groups/SuttonSignWriting/
