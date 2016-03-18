(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.User = exports.Users = exports.UserImage = exports.UserDetails = exports.NoMatch = exports.Info = exports.App = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterBreadcrumbs = require('react-router-breadcrumbs');

var _reactRouterBreadcrumbs2 = _interopRequireDefault(_reactRouterBreadcrumbs);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint react/no-multi-comp:0 */
/* eslint react/prop-types:0 */


var userlist = [{ id: '1', name: 'John', img: 'http://cdn3.thr.com/sites/default/files/2011/08/rambo_a.jpg' }, { id: '2', name: 'Rambo', img: 'https://i.ytimg.com/vi/bZemQdvthBs/maxresdefault.jpg' }];

var userResolver = (0, _reactRouterBreadcrumbs.resolver)((0, _reactRouterBreadcrumbs.key)(':userId')).then(function (_, keyValue) {
    return userlist.filter(function (u) {
        return u.id === keyValue;
    })[0].name;
});

var itemResolver = (0, _reactRouterBreadcrumbs.resolver)((0, _reactRouterBreadcrumbs.key)(':item1'), (0, _reactRouterBreadcrumbs.childOf)((0, _reactRouterBreadcrumbs.pathname)('RouteName1'), (0, _reactRouterBreadcrumbs.path)('parent'))).then(function (_, keyValue) {
    return keyValue.toUpperCase();
});

var customResolver = function customResolver(keyValue, text) {
    if (keyValue === ':item2') {
        return keyValue + '/' + text;
    }
    return undefined;
};

var crumbResolver = (0, _reactRouterBreadcrumbs.combineResolvers)(userResolver, itemResolver, customResolver, _reactRouterBreadcrumbs.textResolver);

var App = exports.App = function App(_ref) {
    var routes = _ref.routes;
    var params = _ref.params;
    var children = _ref.children;
    return _react2.default.createElement(
        'div',
        { className: 'animated fadeIn' },
        _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_reactRouterBreadcrumbs2.default, { routes: routes, createSeparator: ' | ' }),
            _react2.default.createElement(_reactRouterBreadcrumbs2.default, { routes: routes, params: params, resolver: crumbResolver }),
            _react2.default.createElement(
                'div',
                { className: 'content' },
                _react2.default.createElement(
                    'h3',
                    null,
                    'Navigation'
                ),
                'Users route: ',
                _react2.default.createElement(
                    _reactRouter.Link,
                    { to: 'users' },
                    'Users'
                ),
                _react2.default.createElement('hr', null),
                'Very long route: ',
                _react2.default.createElement(
                    _reactRouter.Link,
                    { to: '/parent' },
                    'Parent'
                ),
                " ",
                _react2.default.createElement(
                    _reactRouter.Link,
                    { to: '/parent/child1' },
                    'Child1'
                ),
                " ",
                _react2.default.createElement(
                    _reactRouter.Link,
                    { to: '/parent/child1/item1' },
                    'Item1'
                ),
                " ",
                _react2.default.createElement(
                    _reactRouter.Link,
                    { to: '/parent/child1/item1/child2' },
                    'Child2'
                ),
                " ",
                _react2.default.createElement(
                    _reactRouter.Link,
                    { to: '/parent/child1/item1/child2/item2' },
                    'Item2'
                ),
                " ",
                _react2.default.createElement(
                    _reactRouter.Link,
                    { to: '/parent/child1/item1/child2/item2/child3' },
                    'Child3'
                ),
                " ",
                _react2.default.createElement('br', null),
                'Second very long route: ',
                _react2.default.createElement(
                    _reactRouter.Link,
                    { to: '/parent-2' },
                    'Parent-2'
                ),
                " ",
                _react2.default.createElement(
                    _reactRouter.Link,
                    { to: '/parent-2/child1' },
                    'Child1-2'
                ),
                " ",
                _react2.default.createElement(
                    _reactRouter.Link,
                    { to: '/parent-2/child1/item1' },
                    'Item1-2'
                ),
                " ",
                _react2.default.createElement(
                    _reactRouter.Link,
                    { to: '/parent-2/child1/item1/child2' },
                    'Child2-2'
                ),
                " ",
                _react2.default.createElement(
                    _reactRouter.Link,
                    { to: '/parent-2/child1/item1/child2/item2' },
                    'Item2-2'
                ),
                " ",
                _react2.default.createElement(
                    _reactRouter.Link,
                    { to: '/parent-2/child1/item1/child2/item2/child3' },
                    'Child3-2'
                ),
                " ",
                _react2.default.createElement(
                    'h3',
                    null,
                    'Content'
                ),
                children
            )
        )
    );
};

var Info = exports.Info = function Info() {
    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
            'div',
            null,
            'The breadcrumbs will use the route names for non-dynamic routes or the parameter value for :item1 and :item2.'
        )
    );
};

var NoMatch = exports.NoMatch = function NoMatch() {
    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_reactRouterBreadcrumbs2.default, { routes: undefined.props.routes })
        )
    );
};

var UserDetails = exports.UserDetails = function (_React$Component) {
    _inherits(UserDetails, _React$Component);

    function UserDetails(props) {
        _classCallCheck(this, UserDetails);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(UserDetails).call(this, props));

        _this.state = { user: { id: 0, name: '', img: '' } };
        return _this;
    }

    _createClass(UserDetails, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setUserState();
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate(nextProps) {
            if (this.state.user.id !== nextProps.params.userId) {
                this.setUserState();
            }
        }
    }, {
        key: 'setUserState',
        value: function setUserState() {
            this.setState({
                user: this.findUserById(this.props.params.userId)[0]
            });
        }
    }, {
        key: 'findUserById',
        value: function findUserById(id) {
            return userlist.filter(function (item) {
                return item.id === id;
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement('hr', null),
                    'This is what we know:',
                    _react2.default.createElement('br', null),
                    'ID: ',
                    this.state.user.id,
                    _react2.default.createElement('br', null),
                    'NAME: ',
                    this.state.user.name
                )
            );
        }
    }]);

    return UserDetails;
}(_react2.default.Component);

var UserImage = exports.UserImage = function (_React$Component2) {
    _inherits(UserImage, _React$Component2);

    function UserImage(props) {
        _classCallCheck(this, UserImage);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(UserImage).call(this, props));

        _this2.state = { user: { id: 0, name: '', img: '' } };
        return _this2;
    }

    _createClass(UserImage, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setUserState();
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate(nextProps) {
            if (this.state.user.id !== nextProps.params.userId) {
                this.setUserState();
            }
        }
    }, {
        key: 'setUserState',
        value: function setUserState() {
            this.setState({
                user: this.findUserById(this.props.params.userId)[0]
            });
        }
    }, {
        key: 'findUserById',
        value: function findUserById(id) {
            return userlist.filter(function (item) {
                return item.id === id;
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement('hr', null),
                    'This is what we know:',
                    _react2.default.createElement('img', { src: this.state.user.img, alt: 'Rambo' })
                )
            );
        }
    }]);

    return UserImage;
}(_react2.default.Component);

var Users = exports.Users = function (_React$Component3) {
    _inherits(Users, _React$Component3);

    function Users(props) {
        _classCallCheck(this, Users);

        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(Users).call(this, props));

        _this3.state = { users: userlist };
        return _this3;
    }

    _createClass(Users, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            if ('users' in this.props) {
                this.setState({ users: this.props.users });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'h1',
                    null,
                    'User List'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'master' },
                    _react2.default.createElement(
                        'ul',
                        null,
                        this.state.users // eslint-disable-line newline-per-chained-call
                        .map(function (user) {
                            return _react2.default.createElement(
                                'li',
                                { key: user.id },
                                _react2.default.createElement(
                                    _reactRouter.Link,
                                    { to: '/users/' + user.id },
                                    user.name
                                )
                            );
                        })
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'detail' },
                    this.props.children
                )
            );
        }
    }]);

    return Users;
}(_react2.default.Component);

var User = exports.User = function User(props) {
    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('hr', null),
        'You\'re one click away from learning everything we know about user no ',
        props.params.userId,
        '.',
        _react2.default.createElement('br', null),
        'Click',
        " ",
        _react2.default.createElement(
            'strong',
            null,
            _react2.default.createElement(
                _reactRouter.Link,
                { to: '/users/' + props.params.userId + '/details' },
                'here'
            )
        ),
        ' for more details.',
        _react2.default.createElement(
            _reactRouter.Link,
            { to: '/users/' + props.params.userId + '/image' },
            'Images here'
        ),
        _react2.default.createElement('br', null),
        props.children
    );
};

},{"react":"react","react-router":"react-router","react-router-breadcrumbs":5}],2:[function(require,module,exports){
'use strict';

var _reactDom = require('react-dom');

var _routes = require('./routes.js');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _reactDom.render)(_routes2.default, document.getElementById('app'));

},{"./routes.js":8,"react-dom":"react-dom"}],3:[function(require,module,exports){
module.exports = isFunction

var toString = Object.prototype.toString

function isFunction (fn) {
  var string = toString.call(fn)
  return string === '[object Function]' ||
    (typeof fn === 'function' && string !== '[object RegExp]') ||
    (typeof window !== 'undefined' &&
     // IE8 and below
     (fn === window.setTimeout ||
      fn === window.alert ||
      fn === window.confirm ||
      fn === window.prompt))
};

},{}],4:[function(require,module,exports){
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
},{"./utils":7,"react":"react","react-router":"react-router"}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.key = exports.debug = exports.pathname = exports.path = exports.childOf = exports.resolver = exports.textResolver = exports.combineResolvers = undefined;

var _resolverUtils = require('./resolver-utils');

Object.defineProperty(exports, 'combineResolvers', {
    enumerable: true,
    get: function get() {
        return _resolverUtils.combineResolvers;
    }
});
Object.defineProperty(exports, 'textResolver', {
    enumerable: true,
    get: function get() {
        return _resolverUtils.textResolver;
    }
});
Object.defineProperty(exports, 'resolver', {
    enumerable: true,
    get: function get() {
        return _resolverUtils.resolver;
    }
});
Object.defineProperty(exports, 'childOf', {
    enumerable: true,
    get: function get() {
        return _resolverUtils.childOf;
    }
});
Object.defineProperty(exports, 'path', {
    enumerable: true,
    get: function get() {
        return _resolverUtils.path;
    }
});
Object.defineProperty(exports, 'pathname', {
    enumerable: true,
    get: function get() {
        return _resolverUtils.pathname;
    }
});
Object.defineProperty(exports, 'debug', {
    enumerable: true,
    get: function get() {
        return _resolverUtils.debug;
    }
});
Object.defineProperty(exports, 'key', {
    enumerable: true,
    get: function get() {
        return _resolverUtils.key;
    }
});

var _breadcrumbs = require('./breadcrumbs');

var _breadcrumbs2 = _interopRequireDefault(_breadcrumbs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _breadcrumbs2.default;
},{"./breadcrumbs":4,"./resolver-utils":6}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.combineResolvers = combineResolvers;
exports.textResolver = textResolver;
function combineResolvers() {
    for (var _len = arguments.length, resolvers = Array(_len), _key = 0; _key < _len; _key++) {
        resolvers[_key] = arguments[_key];
    }

    return function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return resolvers.reduce(function (acc, res) {
            if (acc) return acc;
            return res.apply(undefined, args);
        }, undefined);
    };
}

var debug = exports.debug = function debug(fn) {
    return function () {
        debugger; // eslint-disable-line no-debugger
        return fn.apply(undefined, arguments);
    };
};
var key = exports.key = function key(expected) {
    return function (keyValue) {
        return expected === keyValue;
    };
};
var pathname = exports.pathname = function pathname(expected) {
    return function (keyValue, text, routePath, route) {
        return expected === route.name;
    };
};
var path = exports.path = function path(expected) {
    return function (keyValue, text, routePath, route) {
        return expected === route.path;
    };
};
var childOf = exports.childOf = function childOf() {
    for (var _len3 = arguments.length, predicates = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        predicates[_key3] = arguments[_key3];
    }

    return function (keyValue, text, routePath) {
        return routePath.slice(0, routePath.length - 1).map(function (route) {
            return predicates.reduce(function (acc, predicate) {
                return acc && predicate(keyValue, text, routePath, route);
            }, true);
        }).includes(true);
    };
};

var resolver = exports.resolver = function resolver() {
    for (var _len4 = arguments.length, predicates = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        predicates[_key4] = arguments[_key4];
    }

    return {
        then: function then(cb) {
            return function () {
                for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                    args[_key5] = arguments[_key5];
                }

                var predicateResult = predicates.reduce(function (acc, predicate) {
                    return acc && predicate.apply(undefined, args);
                }, true);
                if (predicateResult) {
                    return cb.apply(undefined, args);
                }
                return undefined;
            };
        }
    };
};

function textResolver(_, text) {
    return text;
}
},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.lastOf = exports.join = exports.fn = exports.isEqualTo = exports.pluck = exports.where = exports.not = exports.on = undefined;

var _isFunction = require('is-function');

var _isFunction2 = _interopRequireDefault(_isFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var on = exports.on = function on(type) {
    return Array.isArray(type) ? type : [type];
};
var not = exports.not = function not(predicate) {
    return function (item) {
        return !predicate(item);
    };
};
var where = exports.where = function where() {
    var transformation = arguments.length <= 0 || arguments[0] === undefined ? function (a) {
        return a;
    } : arguments[0];
    var predicate = arguments.length <= 1 || arguments[1] === undefined ? function () {
        return true;
    } : arguments[1];
    return function (item) {
        return predicate(transformation(item));
    };
};
var pluck = exports.pluck = function pluck(key) {
    return function (item) {
        return item[key];
    };
};
var isEqualTo = exports.isEqualTo = function isEqualTo(expected) {
    return function (value) {
        return value === expected;
    };
};
var fn = exports.fn = function fn(possibleFn) {
    return (0, _isFunction2.default)(possibleFn) ? possibleFn : function () {
        return possibleFn;
    };
};
var join = exports.join = function join(separator) {
    var separatorFn = fn(separator);

    return function (accumulator, element, index, array) {
        accumulator.push(element);
        if (index < array.length - 1) {
            accumulator.push(separatorFn(element, index, array));
        }
        return accumulator;
    };
};
var lastOf = exports.lastOf = function lastOf(input) {
    return on(input).slice(-1)[0];
};
},{"is-function":3}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _app = require('./app.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createElement(
  _reactRouter.Router,
  { history: _reactRouter.hashHistory },
  _react2.default.createElement(
    _reactRouter.Route,
    { path: '/', name: 'Examples', component: _app.App },
    _react2.default.createElement(
      _reactRouter.Route,
      { name: 'Users', path: 'users', component: _app.Users },
      _react2.default.createElement(
        _reactRouter.Route,
        { name: 'UserLocator', path: ':userId', component: _app.User, breadcrumbName: ':userId' },
        _react2.default.createElement(_reactRouter.Route, { name: 'UserImage', path: 'image', component: _app.UserImage }),
        _react2.default.createElement(_reactRouter.Route, { name: 'UserDetails', path: 'details', component: _app.UserDetails, breadcrumbName: 'Details' })
      )
    ),
    _react2.default.createElement(
      _reactRouter.Route,
      { name: 'RouteName1', path: 'parent', component: _app.Info },
      _react2.default.createElement(
        _reactRouter.Route,
        { name: 'RouteName2', path: 'child1', component: _app.Info },
        _react2.default.createElement(
          _reactRouter.Route,
          { name: 'RouteName3', path: ':item1', component: _app.Info, breadcrumbName: ':item1' },
          _react2.default.createElement(
            _reactRouter.Route,
            { name: 'RouteName4', path: 'child2', component: _app.Info },
            _react2.default.createElement(
              _reactRouter.Route,
              { name: 'RouteName5', path: ':item2', component: _app.Info, breadcrumbName: ':item2' },
              _react2.default.createElement(_reactRouter.Route, { name: 'RouteName6', path: 'child3', component: _app.Info })
            )
          )
        )
      )
    ),
    _react2.default.createElement(
      _reactRouter.Route,
      { name: 'RouteName7', path: 'parent-2', component: _app.Info },
      _react2.default.createElement(
        _reactRouter.Route,
        { name: 'RouteName8', path: 'child1', component: _app.Info },
        _react2.default.createElement(
          _reactRouter.Route,
          { name: 'RouteName9', path: ':item1', component: _app.Info, breadcrumbName: ':item1' },
          _react2.default.createElement(
            _reactRouter.Route,
            { name: 'RouteName10', path: 'child2', component: _app.Info },
            _react2.default.createElement(
              _reactRouter.Route,
              { name: 'RouteName11', path: ':item2', component: _app.Info, breadcrumbName: ':item2' },
              _react2.default.createElement(_reactRouter.Route, { name: 'RouteName12', path: 'child3', component: _app.Info })
            )
          )
        )
      )
    )
  ),
  _react2.default.createElement(_reactRouter.Route, { name: '404: No Match for route', path: '*', component: _reactRouter.NoMatch })
);

},{"./app.js":1,"react":"react","react-router":"react-router"}]},{},[2]);
