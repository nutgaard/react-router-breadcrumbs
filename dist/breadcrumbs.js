'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var Breadcrumbs = function (_Component) {
    _inherits(Breadcrumbs, _Component);

    function Breadcrumbs(props) {
        _classCallCheck(this, Breadcrumbs);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Breadcrumbs).call(this, props));

        _this._paramReplace = _this._paramReplace.bind(_this);
        _this._createText = _this._createText.bind(_this);
        _this._createHref = _this._createHref.bind(_this);
        _this._toCrumb = _this._toCrumb.bind(_this);
        return _this;
    }

    _createClass(Breadcrumbs, [{
        key: '_paramReplace',
        value: function _paramReplace(text) {
            var params = this.props.params;

            return text.replace(paramKeys, function (_, key) {
                return params[key] || key;
            });
        }
    }, {
        key: '_createText',
        value: function _createText(routePath) {
            var resolver = this.props.resolver;

            var route = (0, _utils.lastOf)(routePath);
            var text = route.breadcrumbName || route.name || route.component.name;

            return resolver(text, this._paramReplace(text), routePath, route);
        }
    }, {
        key: '_createHref',
        value: function _createHref(routePath) {
            var params = this.props.params;

            var link = routePath.map(function (route) {
                return route.breadcrumbLink || route.path || '';
            }).map(function (routeName) {
                return routeName.startsWith('/') ? routeName : '/' + routeName;
            }).join('').replace(/\/\//g, '/');

            return link.replace(paramKeys, function (_, key) {
                return params[key] || key;
            });
        }
    }, {
        key: '_toCrumb',
        value: function _toCrumb() {
            var _this2 = this;

            var createLink = this.props.createLink;

            return function (route, index, routes) {
                var routePath = routes.slice(0, index + 1);
                var text = _this2._createText(routePath);
                var link = _this2._createHref(routePath);
                var key = safeKey(text + '--' + link);

                return createLink(link, key, text, index, routes);
            };
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props;
            var routes = _props.routes;
            var createSeparator = _props.createSeparator;
            var className = _props.className;

            var crumbs = (0, _utils.on)(routes).filter((0, _utils.not)((0, _utils.where)((0, _utils.pluck)('breadcrumbIgnore'), (0, _utils.isEqualTo)(true)))).map(this._toCrumb()).reduce((0, _utils.join)(createSeparator), []);

            return _react2.default.createElement(
                'div',
                { className: className },
                crumbs
            );
        }
    }]);

    return Breadcrumbs;
}(_react.Component);

Breadcrumbs.defaultProps = {
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
    className: _react.PropTypes.string
};

exports.default = Breadcrumbs;