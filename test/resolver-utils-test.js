/* eslint-env node, mocha */
/* eslint-disable newline-per-chained-call */
import { expect } from 'chai';
import { spy } from 'sinon';
import * as Utils from './../src/resolver-utils';

describe('ResolverUtils.combineResolvers', () => {
    it('should return result of first matching resolver', () => {
        const resolver = Utils.combineResolvers(() => 'match1', () => 'match2');

        const res = resolver();

        expect(res).to.equal('match1');
    });

    it('should return result of first matching resolver', () => {
        const fn1 = spy();
        const fn2 = spy();
        const resolver = Utils.combineResolvers(fn1, fn2, () => 'match3');

        const res = resolver();

        expect(fn1.calledOnce).to.equal(true);
        expect(fn2.calledOnce).to.equal(true);
        expect(res).to.equal('match3');
    });

    it('should send all arguments to resolver function', () => {
        const fn = spy();
        const resolver = Utils.combineResolvers(fn);
        const arg3 = { a: 3 };

        resolver('arg1', 2, arg3);

        expect(fn.calledWith('arg1', 2, arg3)).to.equal(true);
    });

    it('should return undefined if no resolver matches', () => {
        const fn1 = spy();
        const fn2 = spy();
        const resolver = Utils.combineResolvers(fn1, fn2);

        const res = resolver();

        expect(fn1.calledOnce).to.equal(true);
        expect(fn2.calledOnce).to.equal(true);
        expect(res).to.equal(undefined);
    });
});

describe('ResolverUtils.debugger', () => {
    it('should call debugger before function', () => {
        const fn = Utils.debug(() => 'value');
        const res = fn();

        expect(res).to.equal('value');
    });
});

describe('ResolverUtils.key', () => {
    it('should check object reference', () => {
        const obj1 = {};
        const obj2 = {};

        const res = Utils.key(obj1)(obj2);

        expect(res).to.equal(false);
    });

    it('should return true for equal numbers and string', () => {
        const stringRes = Utils.key('str')('str');
        const numberRes = Utils.key(123)(123);

        expect(stringRes).to.equal(true);
        expect(numberRes).to.equal(true);
    });
});

describe('ResolverUtils.pathname', () => {
    it('should check route.name value', () => {
        const obj1 = { name: 'val1' };

        const res = Utils.pathname('val1')(null, null, null, obj1);

        expect(res).to.equal(true);
    });
});

describe('ResolverUtils.path', () => {
    it('should check route.path value', () => {
        const obj1 = { path: 'val1' };

        const res = Utils.path('val1')(null, null, null, obj1);

        expect(res).to.equal(true);
    });
});

describe('ResolverUtils.childOf', () => {
    const routePath = [
        { name: 'name1', path: 'extra1' },
        { name: 'name2' },
        { path: 'path1' },
        { path: 'path2' },
        { name: 'name3' }
    ];

    it('should return true if route-parents match the predicates', () => {
        const res = Utils.childOf(Utils.pathname('name1'))(null, null, routePath);
        const falseRes = Utils.childOf(Utils.pathname('path1'))(null, null, routePath);

        expect(res).to.equal(true);
        expect(falseRes).to.equal(false);
    });

    it('should not test for last route in routepath', () => {
        const res = Utils.childOf(Utils.pathname('name3'))(null, null, routePath);

        expect(res).to.equal(false);
    });

    it('should match all predicates on a single route', () => {
        const twoRouteRes = Utils.childOf(Utils.pathname('name1'), Utils.pathname('name2'))(null, null, routePath);
        const singleRoute = Utils.childOf(Utils.pathname('name1'), Utils.path('extra1'))(null, null, routePath);

        expect(twoRouteRes).to.equal(false);
        expect(singleRoute).to.equal(true);
    });
});

describe('ResolverUtils.resolver', () => {
    it('should provida a promise like API', () => {
        const resolver = Utils.resolver(Utils.path('param1'));

        expect(resolver.then).to.not.equal(undefined);
        expect(resolver.then).to.not.equal(null);
        expect(typeof resolver.then).to.equal('function');
    });

    it('should check all predicates before calling callback', () => {
        const resolverFn = Utils.resolver(Utils.path('extra1'), Utils.pathname('name1'));
        const callback = spy(() => {
        });

        const resolver = resolverFn.then(callback);

        resolver(null, null, null, { name: 'name1', path: 'extra1' });
        resolver(null, null, null, { name: 'name1', path: 'extra2' });

        expect(callback.calledOnce).to.equal(true);
    });

    it('should return undefined if nothing matches', () => {
        const resolverFn = Utils.resolver(Utils.path('extra1'), Utils.pathname('name1'));
        const callback = spy(() => {
        });

        const resolver = resolverFn.then(callback);

        const res = resolver(null, null, null, { name: 'name1', path: 'extra2' });

        expect(callback.notCalled).to.equal(true);
        expect(res).to.equal(undefined);
    });
});

describe('ResolverUtils.textResolver', () => {
    it('should return second argument', () => {
        const res = Utils.textResolver('arg1', 'arg2');

        expect(res).to.equal('arg2');
    });
});
