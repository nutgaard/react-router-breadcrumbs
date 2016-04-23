export function combineResolvers(...resolvers) {
    return (...args) => resolvers
        .reduce((acc, res) => {
            if (acc) return acc;
            return res(...args);
        }, undefined);
}

export const debug = (fn) => (...args) => {
    debugger; // eslint-disable-line no-debugger, no-restricted-syntax
    return fn(...args);
};
export const key = (expected) => (keyValue) => expected === keyValue;
export const pathname = (expected) => (keyValue, text, routePath, route) => expected === route.name;
export const path = (expected) => (keyValue, text, routePath, route) => expected === route.path;
export const childOf = (...predicates) =>
    (keyValue, text, routePath) => routePath
        .slice(0, routePath.length - 1)
        .map((route) => predicates.reduce((acc, predicate) => acc && predicate(keyValue, text, routePath, route), true))
        .includes(true);

export const resolver = (...predicates) => ({
    then: (cb) => (...args) => {
        const predicateResult = predicates.reduce((acc, predicate) => acc && predicate(...args), true);
        if (predicateResult) {
            return cb(...args);
        }
        return undefined;
    }
});

export function textResolver(_, text) {
    return text;
}
