### Hexlet tests and linter status:
[![Actions Status](https://github.com/a-shein/fullstack-javascript-project-46/workflows/hexlet-check/badge.svg)](https://github.com/a-shein/fullstack-javascript-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/31846da04b634ed1a865/maintainability)](https://codeclimate.com/github/a-shein/fullstack-javascript-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/31846da04b634ed1a865/test_coverage)](https://codeclimate.com/github/a-shein/fullstack-javascript-project-46/test_coverage)
![Node CI](https://github.com/a-shein/fullstack-javascript-project-46/actions/workflows/node.js.yml/badge.svg)

### Info:
```
This is the second project from Hexlet. 
With this library you can compare and display the differences between two files with extensions .json, .yaml , yml.
```

### Install:
```
1. Clone this repository "git clone git@github.com:a-shein/fullstack-javascript-project-46.git"
2. cd fullstack-javascript-project-46
3. make install
4. make link
```

### Run test (optional):
```
make test
```
[![asciicast](https://asciinema.org/a/2Dukjah4mdnDRvvkMkByKk7Jr.svg)](https://asciinema.org/a/2Dukjah4mdnDRvvkMkByKk7Jr)

### Usability
For call helper:
```
$ gendiff -h 
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format <type>  output format (default: "stylish")
  -h, --help           display help for command
-----------------------------------------------------------------------------
//This application support output formats (-f option): stylish, plain, json//
```
Import and use in your project
```
import genDiff from '@hexlet/code';
const diff = genDiff(filepath1, filepath2, format);
console.log(diff);
```

### Examples
```
Main menu
```
[![asciicast](https://asciinema.org/a/2Gqm3Zt5c8tyu2ozNR6JsxoRO.svg)](https://asciinema.org/a/2Gqm3Zt5c8tyu2ozNR6JsxoRO)

```
Difference between two files with default output format
```
[![asciicast](https://asciinema.org/a/bF0M0piQD5bQuSoZM4smvRlXL.svg)](https://asciinema.org/a/bF0M0piQD5bQuSoZM4smvRlXL)

```
Difference between two files with default with special format (stylish/plain/json)
```
[![asciicast](https://asciinema.org/a/OhGElaEON1eWH2rk103UDIJB2.svg)](https://asciinema.org/a/OhGElaEON1eWH2rk103UDIJB2)
