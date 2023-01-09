# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Evaluation report: https://www.skypack.dev/view/@sutton-signwriting/core

## [Unreleased]
### Todo
- update parse for style string that drops empty style of '-'
- clean up generated regular expressions for consistency
- copy QuerySignbox types for QueryPrefix

## [1.5.6] - 2023-01-09
### Fixed
- security issue

## [1.5.5] - 2022-11-07

### Changed
- donate link

## [1.5.4] - 2022-10-12
### Added
- additional style functions for merge and rgb

### Fixed
- type definitions for optional properties
- swu.parse.symbol, swu.compose return type

## [1.5.3] - 2022-09-25
### Fixed
- README.md links

## [1.5.2] - 2022-09-25
### Fixed
- typescript definition script

### Changed
- entry points in package.json to point to non-minified code

### Removed
- types and exports from package.json

## [1.5.1] - 2022-09-18
### Added
- object type definition

### Fixed
- TypeScript definitions for core and modules

## [1.5.0] - 2022-08-21
### Added
- type definitions for TypeScript as .d.ts
- export map in package.json

## Changed
- return types from generic object to QueryObject

## Fixed
- library import for security warning

## [1.4.2] - 2022-04-10
### Added
- documentation types of ColumnOptions, ColumnData, ColumnSegment
- function columnDefaultsMerge

## [1.4.1] - 2022-03-30
### Fixed
- documentation for fsw.columns and swu.columns
- security fix for dependency

## [1.4.0] - 2022-03-14
### Added
- parse text for FSW and SWU
- info functions from signs and symbols for FSW and SWU
- FSW and SWU text to column segments

### Fixed
- various documentation fixes

### Removed
- zoom and offset for individual symbols in style string

## [1.3.1] - 2021-10-15
### Fixed
- tmpl version to 1.0.5
- link to draft-slevinski-formal-signwriting

## [1.3.0] - 2021-06-26
### Added
- OR searching improvement for FSW and SWU query string

## [1.2.1] - 2021-06-24
### Fixed
- updated dependencies to fix warnings

## [1.2.0] - 2020-02-27
### Fixed
- documentation for library, module, and functions
correct module and function names
- parse style for parsing non-style strings
- compose functions with empty call
### Added
- original source JavaScript
- link to online training
- fsw.compose and swu.compose functions

## [1.1.0] - 2019-12-05
### Added
- convert module functions key2id and id2key

## [1.0.2] - 2019-10-31
### Added
- core modules of fsw, fswquery, swu, swuquery, style, and convert
- documentation for core modules

### Fixed
- unpkg example for individual module
- documentation


[Unreleased]: https://github.com/sutton-signwriting/core/compare/v1.5.4...HEAD
[1.5.4]: https://github.com/sutton-signwriting/core/releases/tag/v1.5.4
[1.5.3]: https://github.com/sutton-signwriting/core/releases/tag/v1.5.3
[1.5.2]: https://github.com/sutton-signwriting/core/releases/tag/v1.5.2
[1.5.1]: https://github.com/sutton-signwriting/core/releases/tag/v1.5.1
[1.5.0]: https://github.com/sutton-signwriting/core/releases/tag/v1.5.0
[1.4.2]: https://github.com/sutton-signwriting/core/releases/tag/v1.4.2
[1.4.1]: https://github.com/sutton-signwriting/core/releases/tag/v1.4.1
[1.4.0]: https://github.com/sutton-signwriting/core/releases/tag/v1.4.0
[1.3.1]: https://github.com/sutton-signwriting/core/releases/tag/v1.3.1
[1.3.0]: https://github.com/sutton-signwriting/core/releases/tag/v1.3.0
[1.2.1]: https://github.com/sutton-signwriting/core/releases/tag/v1.2.1
[1.2.0]: https://github.com/sutton-signwriting/core/releases/tag/v1.2.0
[1.1.0]: https://github.com/sutton-signwriting/core/releases/tag/v1.1.0
[1.0.2]: https://github.com/sutton-signwriting/core/releases/tag/v1.0.2
