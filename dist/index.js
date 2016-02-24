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