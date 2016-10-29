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
    var transformation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (a) {
        return a;
    };
    var predicate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
        return true;
    };
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