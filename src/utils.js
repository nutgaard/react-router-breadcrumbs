import isFunction from 'is-function';

export const on = (type) => Array.isArray(type) ? type : [type];
export const not = (predicate) => (item) => !predicate(item);
export const where = (transformation = (a) => a, predicate = () => true) => (item) => predicate(transformation(item));
export const pluck = (key) => (item) => item[key];
export const isEqualTo = (expected) => (value) => value === expected;
export const fn = (possibleFn) => isFunction(possibleFn) ? possibleFn : () => possibleFn;
export const join = (separator) => {
    const separatorFn = fn(separator);

    return (accumulator, element, index, array) => {
        accumulator.push(element);
        if (index < array.length - 1) {
            accumulator.push(separatorFn(element, index, array));
        }
        return accumulator;
    };
};
export const lastOf = (input) => on(input).slice(-1)[0];
