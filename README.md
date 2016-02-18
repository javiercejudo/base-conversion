# base-conversion

[![Build Status](https://travis-ci.org/javiercejudo/base-conversion.svg)](https://travis-ci.org/javiercejudo/base-conversion)
[![Coverage Status](https://coveralls.io/repos/javiercejudo/base-conversion/badge.svg?branch=master)](https://coveralls.io/r/javiercejudo/base-conversion?branch=master)
[![Code Climate](https://codeclimate.com/github/javiercejudo/base-conversion/badges/gpa.svg)](https://codeclimate.com/github/javiercejudo/base-conversion)

Auto-curried converter between any bases with arbitrary precision support and customisable symbols

## Install

    npm i base-conversion

## Basic usage

```js
var bc = require('base-conversion');
var hexToBin = bc(16, 2);

hexToBin('A'); //=> '1010'
hexToBin('1E'); //=> '11110'
```

See [spec](test/spec.js).

## Custom symbols

For any bases above 62, custom symbols are required.
See [tests](test/bigint-base-converter.js) for working examples.

```js
var bc = require('base-conversion');

bc.symbols('⓿①②③④⑤⑥⑦⑧⑨ⒶⒷ', 8, 12, '⑦③'); //=> '④Ⓑ'
```

## Arbitrary precision

```js
var bc = require('base-conversion');
var Decimal = require('arbitrary-precision')(require('bigjs-adapter'));
var toDecimalFactory = require('to-decimal-arbitrary-precision');

var d = toDecimalFactory(Decimal);

// avoid large numbers to go into exponential notation (adapter dependent)
Decimal.Impl.E_POS = 50;

bc.big(d, 10, 9, '5678364565345634563456346757364563534534645745');
//=> '802531310452364303450750087576673257456135727727'

// equivalent but it skips a trivial decimal to decimal conversion
bc.fromDecimal(d, 9, '5678364565345634563456346757364563534534645745');
=> '802531310452364303450750087576673257456135727727'
```

## Full raw version

```js
var bc = require('base-conversion');
var Decimal = require('arbitrary-precision')(require('bigjs-adapter'));
var toDecimalFactory = require('to-decimal-arbitrary-precision');

var d = toDecimalFactory(Decimal);

// avoid large numbers to go into exponential notation (adapter dependent)
Decimal.Impl.E_POS = 50;

bc.raw(d, '01234#6789', 10, 9, '#678364#6#34#634#634#63467#7364#63#34#3464#74#');
//=> '802#313104#23643034#07#0087#766732#74#613#727727'

// equivalent
bc.fromDecimal(d, '01234#6789', 9, '#678364#6#34#634#634#63467#7364#63#34#3464#74#');
//=> '802#313104#23643034#07#0087#766732#74#613#727727'
```

## Defaults

The default symbols and big implementation are exposed as follows:

```js
bc.defaultSymbols; //=> '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
bc.defaultB; //=> default arbitrary precision implementation (plus, times, div, mod & pow)
```
