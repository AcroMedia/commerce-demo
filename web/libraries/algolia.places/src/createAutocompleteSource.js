'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = createAutocompleteSource;

var _formatHit = require('./formatHit');

var _formatHit2 = _interopRequireDefault(_formatHit);

var _version = require('./version');

var _version2 = _interopRequireDefault(_version);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createAutocompleteSource(_ref) {
  var algoliasearch = _ref.algoliasearch,
      clientOptions = _ref.clientOptions,
      apiKey = _ref.apiKey,
      appId = _ref.appId,
      hitsPerPage = _ref.hitsPerPage,
      aroundLatLng = _ref.aroundLatLng,
      aroundRadius = _ref.aroundRadius,
      aroundLatLngViaIP = _ref.aroundLatLngViaIP,
      insideBoundingBox = _ref.insideBoundingBox,
      insidePolygon = _ref.insidePolygon,
      getRankingInfo = _ref.getRankingInfo,
      countries = _ref.countries,
      formatInputValue = _ref.formatInputValue,
      _ref$computeQueryPara = _ref.computeQueryParams,
      computeQueryParams = _ref$computeQueryPara === undefined ? function (params) {
    return params;
  } : _ref$computeQueryPara,
      _ref$useDeviceLocatio = _ref.useDeviceLocation,
      useDeviceLocation = _ref$useDeviceLocatio === undefined ? false : _ref$useDeviceLocatio,
      _ref$language = _ref.language,
      language = _ref$language === undefined ? navigator.language.split('-')[0] : _ref$language,
      _ref$onHits = _ref.onHits,
      onHits = _ref$onHits === undefined ? function () {} : _ref$onHits,
      _ref$onError = _ref.onError,
      onError = _ref$onError === undefined ? function (e) {
    throw e;
  } : _ref$onError,
      onRateLimitReached = _ref.onRateLimitReached,
      type = _ref.type;

  var placesClient = algoliasearch.initPlaces(appId, apiKey, clientOptions);
  placesClient.as.addAlgoliaAgent('Algolia Places ' + _version2.default);

  var defaultQueryParams = {
    countries: countries,
    hitsPerPage: hitsPerPage || 5,
    language: language,
    type: type
  };

  if (Array.isArray(defaultQueryParams.countries)) {
    defaultQueryParams.countries = defaultQueryParams.countries.map(function (country) {
      return country.toLowerCase();
    });
  }

  if (typeof defaultQueryParams.language === 'string') {
    defaultQueryParams.language = defaultQueryParams.language.toLowerCase();
  }

  if (aroundLatLng) {
    defaultQueryParams.aroundLatLng = aroundLatLng;
  } else if (aroundLatLngViaIP !== undefined) {
    defaultQueryParams.aroundLatLngViaIP = aroundLatLngViaIP;
  }

  if (aroundRadius) {
    defaultQueryParams.aroundRadius = aroundRadius;
  }

  if (insideBoundingBox) {
    defaultQueryParams.insideBoundingBox = insideBoundingBox;
  }

  if (insidePolygon) {
    defaultQueryParams.insidePolygon = insidePolygon;
  }

  if (getRankingInfo) {
    defaultQueryParams.getRankingInfo = getRankingInfo;
  }

  var userCoords = void 0;
  if (useDeviceLocation) {
    navigator.geolocation.watchPosition(function (_ref2) {
      var coords = _ref2.coords;

      userCoords = coords.latitude + ',' + coords.longitude;
    });
  }

  return function (query, cb) {
    var _extends2;

    return placesClient.search(computeQueryParams(_extends({}, defaultQueryParams, (_extends2 = {}, _defineProperty(_extends2, userCoords ? 'aroundLatLng' : undefined, userCoords), _defineProperty(_extends2, 'query', query), _extends2)))).then(function (content) {
      var hits = content.hits.map(function (hit, hitIndex) {
        return (0, _formatHit2.default)({
          formatInputValue: formatInputValue,
          hit: hit,
          hitIndex: hitIndex,
          query: query,
          rawAnswer: content
        });
      });

      onHits({
        hits: hits,
        query: query,
        rawAnswer: content
      });

      return hits;
    }).then(cb).catch(function (e) {
      if (e.statusCode === 429) {
        onRateLimitReached();
        return;
      }

      onError(e);
    });
  };
}