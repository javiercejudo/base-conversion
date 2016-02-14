/*jshint node:true */

'use strict';

module.exports = Object.freeze({
  __: require('ramda/src/__'),
  curryN: require('ramda/src/curryN'),
  pipe: require('lodash/fp/pipe'),
  split: require('lodash/fp/split'),
  join: require('lodash/fp/join'),
  reverse: require('lodash/fp/reverse'),
  map: require('lodash/fp/map'),
  indexOf: require('ramda/src/indexOf'),
  addIndex: require('ramda/src/addIndex'),
  invoker: require('ramda/src/invoker'),
  reduce: require('lodash/fp/reduce'),
  unfold: require('ramda/src/unfold'),
  nth: require('ramda/src/nth')
});
