'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = exports.route = undefined;

var _react = require('react');

var route = exports.route = _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.element]);
var routes = exports.routes = _react.PropTypes.oneOfType([route, _react.PropTypes.arrayOf(route)]);