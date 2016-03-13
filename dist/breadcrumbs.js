'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var paramKeys = /:(\w+)/g;

var safeKey = function safeKey(key) {
    return key.replace(/\W/g, '');
};
/* eslint-disable */
var defaultResolver = function defaultResolver(key, text, routePath, route) {
    return key;
};
var defaultLink = function defaultLink(link, key, text, index, routes) {
    return _react2.default.createElement(
        _reactRouter.Link,
        { to: link, key: key },
        text
    );
};
var defaultSeparator = function defaultSeparator(crumb, index, array) {
    return _react2.default.createElement(
        'span',
        { key: 'separator-' + index },
        ' > '
    );
};
/* eslint-enable */

var _paramReplace = function _paramReplace(text, params) {
    return text.replace(paramKeys, function (_, key) {
        return params[key] || key;
    });
};

var _createText = function _createText(routePath, params, resolver) {
    var route = (0, _utils.lastOf)(routePath);
    var text = route.breadcrumbName || route.name || route.component.name;

    return resolver(text, _paramReplace(text, params), routePath, route);
};

var _createHref = function _createHref(routePath, params) {
    var link = routePath.map(function (route) {
        return route.breadcrumbLink || route.path || '';
    }).map(function (routeName) {
        return routeName.startsWith('/') ? routeName : '/' + routeName;
    }).join('').replace(/\/\//g, '/');

    return link.replace(paramKeys, function (_, key) {
        return params[key] || key;
    });
};

var _toCrumb = function _toCrumb(_ref) {
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

function Breadcrumbs(_ref2) {
    var routes = _ref2.routes;
    var createSeparator = _ref2.createSeparator;
    var className = _ref2.className;
    var wrappingComponent = _ref2.wrappingComponent;
    var prefixElements = _ref2.prefixElements;
    var suffixElements = _ref2.suffixElements;
    var params = _ref2.params;
    var createLink = _ref2.createLink;
    var resolver = _ref2.resolver;

    var crumbs = (0, _utils.on)(routes).filter((0, _utils.not)((0, _utils.where)((0, _utils.pluck)('breadcrumbIgnore'), (0, _utils.isEqualTo)(true)))).map(_toCrumb({ params: params, createLink: createLink, resolver: resolver })).reduce((0, _utils.join)(createSeparator), []);

    var allCrumbs = (0, _utils.on)(prefixElements).concat(crumbs).concat((0, _utils.on)(suffixElements));

    return _react2.default.createElement(wrappingComponent, { className: className }, allCrumbs);
}

Breadcrumbs.defaultProps = {
    wrappingComponent: 'div',
    className: 'breadcrumbs',
    params: {},
    resolver: defaultResolver,
    createLink: defaultLink,
    createSeparator: defaultSeparator
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