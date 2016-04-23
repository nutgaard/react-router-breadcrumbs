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
        debugger; // eslint-disable-line no-debugger, no-restricted-syntax
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