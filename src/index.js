/*jshint node:true */

'use strict';

var posNotation = require('positional-notation');
var toDecimalFactory = require('to-decimal-arbitrary-precision');

var R = require('./R');
var Decimal = require('./Decimal');

var defaultD = toDecimalFactory(Decimal);
var defaultSymbols = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

var fromBase = function(d, symbols, base) {
  return R.pipe(
    R.split(''),
    R.reverse,
    R.map(R.indexOf(R.__, symbols)),
    R.addIndex(R.map)(posNotation.mapper(posNotation.raw(d, base))),
    R.reduce(R.invoker(1, 'plus'), d(0))
  );
};

var toBase = function(d, symbols, base) {
  return R.pipe(
    R.unfold(function(cur) {
      return cur === '0' ? false : [
        d(cur).mod(d(base)).toString(),
        d(cur).div(d(base)).toString().split('.')[0]
      ];
    }),
    R.reverse,
    R.map(R.nth(R.__, symbols)),
    R.join('')
  );
};

var convertBasesRaw = R.curryN(5, function(d, symbols, oldBase, newBase, n) {
  return R.pipe(fromBase(d, symbols, oldBase), toBase(d, symbols, newBase))(n);
});

var convertBases = convertBasesRaw(defaultD, defaultSymbols);

convertBases.decimal = convertBasesRaw(R.__, defaultSymbols);
convertBases.symbols = convertBasesRaw(defaultD);
convertBases.raw = convertBasesRaw;

module.exports = convertBases;
