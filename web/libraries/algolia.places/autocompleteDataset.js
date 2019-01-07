"use strict";

// we need to export using commonjs for ease of usage in all
// JavaScript environments

/* eslint-disable import/no-commonjs */
require('./src/navigatorLanguage');

var createAutocompleteDataset = require('./src/createAutocompleteDataset').default;

var css = require('./src/places.css');

var insertCss = require('insert-css');

insertCss(css, {
  prepend: true
}); // must use module.exports to be commonJS compatible

module.exports = createAutocompleteDataset;
