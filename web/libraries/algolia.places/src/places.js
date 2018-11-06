'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = places;

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _algoliasearchLite = require('algoliasearch/src/browser/builds/algoliasearchLite');

var _algoliasearchLite2 = _interopRequireDefault(_algoliasearchLite);

var _autocomplete = require('autocomplete.js');

var _autocomplete2 = _interopRequireDefault(_autocomplete);

require('./navigatorLanguage');

var _createAutocompleteDataset = require('./createAutocompleteDataset');

var _createAutocompleteDataset2 = _interopRequireDefault(_createAutocompleteDataset);

var _clear = "<svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M.566 1.698L0 1.13 1.132 0l.565.566L6 4.868 10.302.566 10.868 0 12 1.132l-.566.565L7.132 6l4.302 4.3.566.568L10.868 12l-.565-.566L6 7.132l-4.3 4.302L1.13 12 0 10.868l.566-.565L4.868 6 .566 1.698z\"/></svg>\n";

var _clear2 = _interopRequireDefault(_clear);

var _address = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 14 20\"><path d=\"M7 0C3.13 0 0 3.13 0 7c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5C5.62 9.5 4.5 8.38 4.5 7S5.62 4.5 7 4.5 9.5 5.62 9.5 7 8.38 9.5 7 9.5z\"/></svg>\n";

var _address2 = _interopRequireDefault(_address);

var _places = ".algolia-places {\n  width: 100%;\n}\n\n.ap-input, .ap-hint {\n  width: 100%;\n  padding-right: 35px;\n  padding-left: 16px;\n  line-height: 40px;\n  height: 40px;\n  border: 1px solid #CCC;\n  border-radius: 3px;\n  outline: none;\n  font: inherit;\n  appearance: none;\n  -webkit-appearance: none;\n  box-sizing: border-box;\n}\n\n.ap-input::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n.ap-input::-ms-clear {\n  display: none;\n}\n\n.ap-input:hover ~ .ap-input-icon svg,\n.ap-input:focus ~ .ap-input-icon svg,\n.ap-input-icon:hover svg {\n  fill: #aaaaaa;\n}\n\n.ap-dropdown-menu {\n  width: 100%;\n  background: #ffffff;\n  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.1);\n  border-radius: 3px;\n  margin-top: 3px;\n  overflow: hidden;\n}\n\n.ap-suggestion {\n  cursor: pointer;\n  height: 46px;\n  line-height: 46px;\n  padding-left: 18px;\n  overflow: hidden;\n}\n\n.ap-suggestion em {\n  font-weight: bold;\n  font-style: normal;\n}\n\n.ap-address {\n  font-size: smaller;\n  margin-left: 12px;\n  color: #aaaaaa;\n}\n\n.ap-suggestion-icon {\n  margin-right: 10px;\n  width: 14px;\n  height: 20px;\n  vertical-align: middle;\n}\n\n.ap-suggestion-icon svg {\n  -webkit-transform: scale(0.9) translateY(2px);\n          transform: scale(0.9) translateY(2px);\n  fill: #cfcfcf;\n}\n\n.ap-input-icon {\n  border: 0;\n  background: transparent;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  right: 16px;\n  outline: none;\n}\n\n.ap-input-icon.ap-icon-pin {\n  cursor: initial;\n}\n\n.ap-input-icon svg {\n  fill: #cfcfcf;\n  position: absolute;\n  top: 50%;\n  right: 0;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n}\n\n.ap-cursor {\n  background: #efefef;\n}\n\n.ap-cursor .ap-suggestion-icon svg {\n  -webkit-transform: scale(1) translateY(2px);\n          transform: scale(1) translateY(2px);\n  fill: #aaaaaa;\n}\n\n.ap-footer {\n  opacity: .8;\n  text-align: right;\n  padding: .5em 1em .5em 0;\n  font-size: 12px;\n  line-height: 12px;\n}\n\n.ap-footer a {\n  color: inherit;\n  text-decoration: none;\n}\n\n.ap-footer a svg {\n  vertical-align: text-bottom;\n  max-width: 60px;\n}\n\n.ap-footer:hover {\n  opacity: 1;\n}\n";

var _places2 = _interopRequireDefault(_places);

var _insertCss = require('insert-css');

var _insertCss2 = _interopRequireDefault(_insertCss);

var _errors = require('./errors');

var _errors2 = _interopRequireDefault(_errors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _insertCss2.default)(_places2.default, { prepend: true });

function places(options) {
  var container = options.container,
      style = options.style,
      _options$autocomplete = options.autocompleteOptions,
      userAutocompleteOptions = _options$autocomplete === undefined ? {} : _options$autocomplete;

  // multiple DOM elements targeted

  if (container instanceof NodeList) {
    if (container.length > 1) {
      throw new Error(_errors2.default.multiContainers);
    }

    // if single node NodeList received, resolve to the first one
    return places(_extends({}, options, { container: container[0] }));
  }

  // container sent as a string, resolve it for multiple DOM elements issue
  if (typeof container === 'string') {
    var resolvedContainer = document.querySelectorAll(container);
    return places(_extends({}, options, { container: resolvedContainer }));
  }

  // if not an <input>, error
  if (!(container instanceof HTMLInputElement)) {
    throw new Error(_errors2.default.badContainer);
  }

  var placesInstance = new _events2.default();
  var prefix = 'ap' + (style === false ? '-nostyle' : '');

  var autocompleteOptions = _extends({
    autoselect: true,
    hint: false,
    cssClasses: {
      root: 'algolia-places' + (style === false ? '-nostyle' : ''),
      prefix: prefix
    },
    debug: process.env.NODE_ENV === 'development'
  }, userAutocompleteOptions);

  var autocompleteDataset = (0, _createAutocompleteDataset2.default)(_extends({}, options, {
    algoliasearch: _algoliasearchLite2.default,
    onHits: function onHits(_ref) {
      var hits = _ref.hits,
          rawAnswer = _ref.rawAnswer,
          query = _ref.query;
      return placesInstance.emit('suggestions', {
        rawAnswer: rawAnswer,
        query: query,
        suggestions: hits
      });
    },
    onError: function onError(e) {
      return placesInstance.emit('error', e);
    },
    onRateLimitReached: function onRateLimitReached() {
      var listeners = placesInstance.listenerCount('limit');
      if (listeners === 0) {
        console.log(_errors2.default.rateLimitReached); // eslint-disable-line
        return;
      }

      placesInstance.emit('limit', { message: _errors2.default.rateLimitReached });
    },
    container: undefined
  }));

  var autocompleteInstance = (0, _autocomplete2.default)(container, autocompleteOptions, autocompleteDataset);
  var autocompleteContainer = container.parentNode;

  var autocompleteChangeEvents = ['selected', 'autocompleted'];

  autocompleteChangeEvents.forEach(function (eventName) {
    autocompleteInstance.on('autocomplete:' + eventName, function (_, suggestion) {
      placesInstance.emit('change', {
        rawAnswer: suggestion.rawAnswer,
        query: suggestion.query,
        suggestion: suggestion,
        suggestionIndex: suggestion.hitIndex
      });
    });
  });
  autocompleteInstance.on('autocomplete:cursorchanged', function (_, suggestion) {
    placesInstance.emit('cursorchanged', {
      rawAnswer: suggestion.rawAnswer,
      query: suggestion.query,
      suggestion: suggestion,
      suggestionIndex: suggestion.hitIndex
    });
  });

  var clear = document.createElement('button');
  clear.setAttribute('type', 'button');
  clear.setAttribute('aria-label', 'clear');
  clear.classList.add(prefix + '-input-icon');
  clear.classList.add(prefix + '-icon-clear');
  clear.innerHTML = _clear2.default;
  autocompleteContainer.appendChild(clear);
  clear.style.display = 'none';

  var pin = document.createElement('button');
  pin.setAttribute('type', 'button');
  pin.setAttribute('aria-label', 'focus');
  pin.classList.add(prefix + '-input-icon');
  pin.classList.add(prefix + '-icon-pin');
  pin.innerHTML = _address2.default;
  autocompleteContainer.appendChild(pin);

  pin.addEventListener('click', function () {
    return autocompleteInstance.focus();
  });
  clear.addEventListener('click', function () {
    autocompleteInstance.autocomplete.setVal('');
    autocompleteInstance.focus();
    clear.style.display = 'none';
    pin.style.display = '';
    placesInstance.emit('clear');
  });

  var previousQuery = '';

  var inputListener = function inputListener() {
    var query = autocompleteInstance.val();
    if (query === '') {
      pin.style.display = '';
      clear.style.display = 'none';
      if (previousQuery !== query) {
        placesInstance.emit('clear');
      }
    } else {
      clear.style.display = '';
      pin.style.display = 'none';
    }
    previousQuery = query;
  };

  autocompleteContainer.querySelector('.' + prefix + '-input').addEventListener('input', inputListener);

  var autocompleteIsomorphicMethods = ['open', 'close', 'getVal'];
  autocompleteIsomorphicMethods.forEach(function (methodName) {
    placesInstance[methodName] = function () {
      var _autocompleteInstance;

      (_autocompleteInstance = autocompleteInstance.autocomplete)[methodName].apply(_autocompleteInstance, arguments);
    };
  });

  placesInstance.destroy = function () {
    var _autocompleteInstance2;

    autocompleteContainer.querySelector('.' + prefix + '-input').removeEventListener('input', inputListener);

    (_autocompleteInstance2 = autocompleteInstance.autocomplete).destroy.apply(_autocompleteInstance2, arguments);
  };

  placesInstance.setVal = function () {
    var _autocompleteInstance3;

    previousQuery = arguments.length <= 0 ? undefined : arguments[0];
    (_autocompleteInstance3 = autocompleteInstance.autocomplete).setVal.apply(_autocompleteInstance3, arguments);
  };

  placesInstance.autocomplete = autocompleteInstance;

  return placesInstance;
}