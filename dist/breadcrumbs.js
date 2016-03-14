'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports._renderCrumbs = exports._toCrumb = exports._createHref = exports._createText = exports._paramReplace = exports.defaultSeparator = exports.defaultLink = exports.defaultResolver = exports.safeKey = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var paramKeys = /:(\w+)/g;

var safeKey = exports.safeKey = function safeKey(key) {
    return key.replace(/\W/g, '');
};
/* eslint-disable */
var defaultResolver = exports.defaultResolver = function defaultResolver(key, text, routePath, route) {
    return key;
};
var defaultLink = exports.defaultLink = function defaultLink(link, key, text, index, routes) {
    return _react2.default.createElement(
        _reactRouter.Link,
        { to: link, key: key },
        text
    );
};
var defaultSeparator = exports.defaultSeparator = function defaultSeparator(crumb, index, array) {
    return _react2.default.createElement(
        'span',
        { key: 'separator-' + index },
        ' > '
    );
};
/* eslint-enable */

var _paramReplace = exports._paramReplace = function _paramReplace(text) {
    var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    return text.replace(paramKeys, function (_, key) {
        return params[key] || key;
    });
};

var _createText = exports._createText = function _createText(routePath, params, resolver) {
    var route = (0, _utils.lastOf)(routePath);
    var text = route.breadcrumbName || route.name || route.component.name;

    return resolver(text, _paramReplace(text, params), routePath, route);
};

var _createHref = exports._createHref = function _createHref(routePath, params) {
    var link = routePath.map(function (route) {
        return route.breadcrumbLink || route.path || '';
    }).map(function (routeName) {
        return routeName.startsWith('/') ? routeName : '/' + routeName;
    }).join('').replace(/\/\//g, '/');

    return _paramReplace(link, params);
};

var _toCrumb = exports._toCrumb = function _toCrumb(_ref) {
    var params = _ref.params;
    var createLink = _ref.createLink;
    var resolver = _ref.resolver;
    return function (route, index, routes) {
        var routePath = routes.slice(0, index + 1);
        var text = _createText(routePath, params, resolver);
        var link = _createHref(routePath, params);
        var key = safeKey(text + '--' + link);

        return createLink(link, key, text, index, routes);
    };
};

var _renderCrumbs = exports._renderCrumbs = function _renderCrumbs(_ref2) {
    var routes = _ref2.routes;
    var createSeparator = _ref2.createSeparator;
    var prefixElements = _ref2.prefixElements;
    var suffixElements = _ref2.suffixElements;
    var params = _ref2.params;
    var createLink = _ref2.createLink;
    var resolver = _ref2.resolver;

    var crumbs = (0, _utils.on)(routes).filter((0, _utils.not)((0, _utils.where)((0, _utils.pluck)('breadcrumbIgnore'), (0, _utils.isEqualTo)(true)))).map(_toCrumb({ params: params, createLink: createLink, resolver: resolver })).reduce((0, _utils.join)(createSeparator), []);

    return (0, _utils.on)(prefixElements).concat(crumbs).concat((0, _utils.on)(suffixElements));
};

function Breadcrumbs(_ref3) {
    var className = _ref3.className;
    var wrappingComponent = _ref3.wrappingComponent;

    var props = _objectWithoutProperties(_ref3, ['className', 'wrappingComponent']);

    var crumbs = _renderCrumbs(props);
    return _react2.default.createElement(wrappingComponent, { className: className }, crumbs);
}

Breadcrumbs.defaultProps = {
    wrappingComponent: 'div',
    className: 'breadcrumbs',
    params: {},
    resolver: defaultResolver,
    createLink: defaultLink,
    createSeparator: defaultSeparator,
    prefixElements: [],
    suffixElements: []
};

Breadcrumbs.propTypes = {
    routes: _react.PropTypes.arrayOf(_reactRouter.PropTypes.route).isRequired,
    params: _react.PropTypes.object,
    resolver: _react.PropTypes.func,
    createLink: _react.PropTypes.func,
    createSeparator: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]),
    className: _react.PropTypes.string,
    wrappingComponent: _react.PropTypes.string,
    prefixElements: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.element), _react.PropTypes.element]),
    suffixElements: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.element), _react.PropTypes.element])
};

exports.default = Breadcrumbs;