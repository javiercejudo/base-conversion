/*jshint node:true */

'use strict';

var posNotation = require('positional-notation');
var toBigFactory = require('to-decimal-arbitrary-precision');

var R = require('./R');

var defaultB = toBigFactory(require('./Big'));
var defaultSymbols = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
var toString = R.invoker(0, 'toString');
var curry4 = R.curryN(4);

var indexOfSymbol = R.memoize(function(symbols) {
  return R.memoize(R.indexOf(R.__, symbols));
});

var nthSymbol = R.memoize(function(symbols) {
  return R.memoize(R.nth(R.__, symbols));
});

var toDecimal = curry4(function(b, symbols, base, n) {
  return R.pipe(
    R.split(''),
    R.reverse,
    R.map(indexOfSymbol(symbols)),
    R.addIndex(R.map)(posNotation.mapper(b, base)),
    R.reduce(R.invoker(1, 'plus'), b(0)),
    toString
  )(n);
});

var fromDecimal = curry4(function(b, symbols, base, n) {
  return R.pipe(
    R.unfold(posNotation.unfolder(b, base)),
    R.map(nthSymbol(symbols)),
    R.reverse,
    R.join('')
  )(n);
});

var convertBasesRaw = R.curryN(5, function(b, symbols, oldBase, newBase, n) {
  return R.pipe(
    toString,
    toDecimal(b, symbols, oldBase),
    fromDecimal(b, symbols, newBase)
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

convertBases.fromDecimal = fromDecimal(defaultB, defaultSymbols);
convertBases.fromDecimalBig = fromDecimal(R.__, defaultSymbols);
convertBases.fromDecimalSymbols = fromDecimal(defaultB);
convertBases.fromDecimalRaw = fromDecimal;

convertBases.defaultSymbols = defaultSymbols;
convertBases.defaultB = defaultB;

module.exports = convertBases;
