'use strict';

var _places = require('./src/places');

var _places2 = _interopRequireDefault(_places);

var _version = require('./src/version');

var _version2 = _interopRequireDefault(_version);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// must use module.exports to be commonJS compatible
// we need to export using commonjs for ease of usage in all
// JavaScript environments

/* eslint-disable import/no-commonjs */

module.exports = _places2.default;
module.exports.version = _version2.default;
