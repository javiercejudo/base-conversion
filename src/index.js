/*jshint node:true */

'use strict';

var posNotation = require('positional-notation');
var toBigFactory = require('to-decimal-arbitrary-precision');
var fromDecimal = require('base-conversion-from-dec');

var R = require('./R');

var defaultB = toBigFactory(require('./Big'));
var defaultSymbols = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
var toString = R.invoker(0, 'toString');

var indexOfSymbol = R.memoize(function(symbols) {
  return R.memoize(R.indexOf(R.__, symbols));
});

var nthSymbol = R.memoize(function(symbols) {
  return R.memoize(R.nth(R.__, symbols));
});

var postprocess = R.memoize(function(symbols) {
  return R.identical(symbols, defaultSymbols) ?
    R.identity :
    R.pipe(
      R.map(nthSymbol(symbols)),
      R.join(''),
      toString
    );
});

var toDecimal = R.curryN(4, function(b, symbols, base, n) {
  return R.pipe(
    R.split(''),
    R.reverse,
    R.map(indexOfSymbol(symbols)),
    R.addIndex(R.map)(posNotation.mapper(b, base)),
    R.reduce(R.invoker(1, 'plus'), b(0)),
    toString,
    postprocess(symbols)
  )(n);
});


var convertBasesRaw = R.curryN(5, function(b, symbols, oldBase, newBase, n) {
  return R.pipe(
    toString,
    toDecimal(b, symbols, oldBase),
    fromDecimal.raw(b, symbols, newBase)
  )(n);
});

var convertBases = convertBasesRaw(defaultB, defaultSymbols);

convertBases.big = convertBasesRaw(R.__, defaultSymbols);
convertBases.symbols = convertBasesRaw(defaultB);
convertBases.raw = convertBasesRaw;

convertBases.toDecimal = toDecimal(defaultB, defaultSymbols);
convertBases.toDecimalBig = toDecimal(R.__, defaultSymbols);
convertBases.toDecimalSymbols = toDecimal(defaultB);
convertBases.toDecimalRaw = toDecimal;

convertBases.fromDecimal = fromDecimal;

convertBases.defaultSymbols = defaultSymbols;
convertBases.defaultB = defaultB;

module.exports = convertBases;
