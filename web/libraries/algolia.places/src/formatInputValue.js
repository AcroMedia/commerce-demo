'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatInputValue;
function formatInputValue(_ref) {
  var administrative = _ref.administrative,
      city = _ref.city,
      country = _ref.country,
      name = _ref.name,
      type = _ref.type;

  var out = ('' + name + (type !== 'country' && country !== undefined ? ',' : '') + '\n ' + (city ? city + ',' : '') + '\n ' + (administrative ? administrative + ',' : '') + '\n ' + (country ? country : '')).replace(/\s*\n\s*/g, ' ').trim();
  return out;
}