'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = exports.route = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var route = exports.route = _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.element]);
var routes = exports.routes = _propTypes2.default.oneOfType([route, _propTypes2.default.arrayOf(route)]);