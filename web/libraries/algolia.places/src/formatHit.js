'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = formatHit;

var _findCountryCode = require('./findCountryCode');

var _findCountryCode2 = _interopRequireDefault(_findCountryCode);

var _findType = require('./findType');

var _findType2 = _interopRequireDefault(_findType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getBestHighlightedForm(highlightedValues) {
  var defaultValue = highlightedValues[0].value;
  // collect all other matches
  var bestAttributes = [];
  for (var i = 1; i < highlightedValues.length; ++i) {
    if (highlightedValues[i].matchLevel !== 'none') {
      bestAttributes.push({
        index: i,
        words: highlightedValues[i].matchedWords
      });
    }
  }
  // no matches in this attribute, retrieve first value
  if (bestAttributes.length === 0) {
    return defaultValue;
  }
  // sort the matches by `desc(words), asc(index)`
  bestAttributes.sort(function (a, b) {
    if (a.words > b.words) {
      return -1;
    } else if (a.words < b.words) {
      return 1;
    }
    return a.index - b.index;
  });
  // and append the best match to the first value
  return bestAttributes[0].index === 0 ? defaultValue + ' (' + highlightedValues[bestAttributes[1].index].value + ')' : highlightedValues[bestAttributes[0].index].value + ' (' + defaultValue + ')';
}

function getBestPostcode(postcodes, highlightedPostcodes) {
  var defaultValue = highlightedPostcodes[0].value;
  // collect all other matches
  var bestAttributes = [];
  for (var i = 1; i < highlightedPostcodes.length; ++i) {
    if (highlightedPostcodes[i].matchLevel !== 'none') {
      bestAttributes.push({
        index: i,
        words: highlightedPostcodes[i].matchedWords
      });
    }
  }
  // no matches in this attribute, retrieve first value
  if (bestAttributes.length === 0) {
    return { postcode: postcodes[0], highlightedPostcode: defaultValue };
  }
  // sort the matches by `desc(words)`
  bestAttributes.sort(function (a, b) {
    if (a.words > b.words) {
      return -1;
    } else if (a.words < b.words) {
      return 1;
    }
    return a.index - b.index;
  });

  var postcode = postcodes[bestAttributes[0].index];
  return {
    postcode: postcode,
    highlightedPostcode: highlightedPostcodes[bestAttributes[0].index].value
  };
}

function formatHit(_ref) {
  var formatInputValue = _ref.formatInputValue,
      hit = _ref.hit,
      hitIndex = _ref.hitIndex,
      query = _ref.query,
      rawAnswer = _ref.rawAnswer;

  try {
    var name = hit.locale_names[0];
    var country = hit.country;
    var administrative = hit.administrative && hit.administrative[0] !== name ? hit.administrative[0] : undefined;
    var city = hit.city && hit.city[0] !== name ? hit.city[0] : undefined;
    var suburb = hit.suburb && hit.suburb[0] !== name ? hit.suburb[0] : undefined;

    var county = hit.county && hit.county[0] !== name ? hit.county[0] : undefined;

    var _ref2 = hit.postcode ? getBestPostcode(hit.postcode, hit._highlightResult.postcode) : { postcode: undefined, highlightedPostcode: undefined },
        postcode = _ref2.postcode,
        highlightedPostcode = _ref2.highlightedPostcode;

    var highlight = {
      name: getBestHighlightedForm(hit._highlightResult.locale_names),
      city: city ? getBestHighlightedForm(hit._highlightResult.city) : undefined,
      administrative: administrative ? getBestHighlightedForm(hit._highlightResult.administrative) : undefined,
      country: country ? hit._highlightResult.country.value : undefined,
      suburb: suburb ? getBestHighlightedForm(hit._highlightResult.suburb) : undefined,
      county: county ? getBestHighlightedForm(hit._highlightResult.county) : undefined,
      postcode: highlightedPostcode
    };

    var suggestion = {
      name: name,
      administrative: administrative,
      county: county,
      city: city,
      suburb: suburb,
      country: country,
      countryCode: (0, _findCountryCode2.default)(hit._tags),
      type: (0, _findType2.default)(hit._tags),
      latlng: {
        lat: hit._geoloc.lat,
        lng: hit._geoloc.lng
      },
      postcode: postcode,
      postcodes: hit.postcode ? hit.postcode : undefined
    };

    // this is the value to put inside the <input value=
    var value = formatInputValue(suggestion);

    return _extends({}, suggestion, {
      highlight: highlight,
      hit: hit,
      hitIndex: hitIndex,
      query: query,
      rawAnswer: rawAnswer,
      value: value
    });
  } catch (e) {
    /* eslint-disable no-console */
    console.error('Could not parse object', hit);
    console.error(e);
    /* eslint-enable no-console */
    return {
      value: 'Could not parse object'
    };
  }
}