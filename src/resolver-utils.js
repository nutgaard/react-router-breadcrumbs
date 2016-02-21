export function combineResolvers(...resolvers) {
    return (...args) => resolvers
        .reduce((acc, res) => {
            if (acc) return acc;
            return res(...args);
        }, undefined);
}

export const key = (expected) => (keyValue) => expected === keyValue;

export function resolver(...predicates) {
    return {
        then: (cb) => (...args) => {
            const predicateResult = predicates.reduce((acc, predicate) => acc && predicate(...args), true);
            if (predicateResult) {
                return cb(...args);
            }
            return undefined;
        }
    };
}

export function textResolver(_, text) {
    return text;
}
