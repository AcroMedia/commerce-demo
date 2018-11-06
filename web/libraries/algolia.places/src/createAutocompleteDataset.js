'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = createAutocompleteDataset;

var _createAutocompleteSource = require('./createAutocompleteSource');

var _createAutocompleteSource2 = _interopRequireDefault(_createAutocompleteSource);

var _defaultTemplates = require('./defaultTemplates');

var _defaultTemplates2 = _interopRequireDefault(_defaultTemplates);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createAutocompleteDataset(options) {
  var templates = _extends({}, _defaultTemplates2.default, options.templates);

  var source = (0, _createAutocompleteSource2.default)(_extends({}, options, {
    formatInputValue: templates.value,
    templates: undefined
  }));

  return {
    source: source,
    templates: templates,
    displayKey: 'value',
    name: 'places'
  };
}