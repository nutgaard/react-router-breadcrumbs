'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.renderCrumbs = exports.toCrumb = exports.createHref = exports.createText = exports.paramReplace = exports.defaultSeparator = exports.defaultLink = exports.defaultResolver = exports.safeKey = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _routerProps = require('./router-props');

var RouterProps = _interopRequireWildcard(_routerProps);

var _utils = require('./utils');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var paramKeys = /:(\w+)/g;

var safeKey = exports.safeKey = function safeKey(key) {
    return key.replace(/\W/g, '');
};
/* eslint-disable no-unused-vars */
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

var paramReplace = exports.paramReplace = function paramReplace(text) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return text.replace(paramKeys, function (_, key) {
        return params[key] || key;
    });
};

var createText = exports.createText = function createText(routePath, params, resolver) {
    var route = (0, _utils.lastOf)(routePath);
    var text = route.breadcrumbName || route.name || route.component.name;

    return resolver(text, paramReplace(text, params), routePath, route);
};

var createHref = exports.createHref = function createHref(routePath, params) {
    var link = routePath.map(function (route) {
        return route.breadcrumbLink || route.path || '';
    }).map(function (routeName) {
        return routeName.startsWith('/') ? routeName : '/' + routeName;
    }).join('').replace(/\/\//g, '/');

    return paramReplace(link, params);
};

var toCrumb = exports.toCrumb = function toCrumb(_ref) {
    var params = _ref.params,
        createLink = _ref.createLink,
        resolver = _ref.resolver;
    return function (route, index, routes) {
        if (route.breadcrumbIgnore) {
            return route;
        }

        var routePath = routes.slice(0, index + 1);
        var text = createText(routePath, params, resolver);
        var link = createHref(routePath, params);
        var key = safeKey(text + '--' + link);

        return createLink(link, key, text, index, routes);
    };
};

var renderCrumbs = exports.renderCrumbs = function renderCrumbs(_ref2) {
    var routes = _ref2.routes,
        createSeparator = _ref2.createSeparator,
        prefixElements = _ref2.prefixElements,
        suffixElements = _ref2.suffixElements,
        params = _ref2.params,
        createLink = _ref2.createLink,
        resolver = _ref2.resolver;

    var crumbs = (0, _utils.on)(routes).map(toCrumb({ params: params, createLink: createLink, resolver: resolver })).filter((0, _utils.not)((0, _utils.where)((0, _utils.pluck)('breadcrumbIgnore'), (0, _utils.isEqualTo)(true)))).reduce((0, _utils.join)(createSeparator), []);

    return (0, _utils.on)(prefixElements).concat(crumbs).concat((0, _utils.on)(suffixElements));
};

function Breadcrumbs(_ref3) {
    var className = _ref3.className,
        wrappingComponent = _ref3.wrappingComponent,
        props = _objectWithoutProperties(_ref3, ['className', 'wrappingComponent']);

    var crumbs = renderCrumbs(props);

    if (crumbs.length === 0) {
        return null;
    }

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
    routes: RouterProps.routes.isRequired,
    params: _react.PropTypes.object, // eslint-disable-line react/forbid-prop-types
    resolver: _react.PropTypes.func,
    createLink: _react.PropTypes.func,
    createSeparator: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]),
    className: _react.PropTypes.string,
    wrappingComponent: _react.PropTypes.string,
    prefixElements: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.element), _react.PropTypes.element]),
    suffixElements: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.element), _react.PropTypes.element])
};

exports.default = Breadcrumbs;