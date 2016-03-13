/* eslint-env node, mocha */
/* eslint-disable newline-per-chained-call */
import { expect } from 'chai';
import * as Utils from './../src/utils';

describe('Utils.on', () => {
    it('should return array with value', () => {
        const value = 1;
        const res = Utils.on(value);

        expect(Array.isArray(res)).to.equal(true);
        expect(res.length).to.equal(1);
        expect(res[0]).to.equal(value);
    });

    it('should return same array', () => {
        const arr = [1, 2, 3];
        const res = Utils.on(arr);

        expect(res).to.equal(arr);
        expect(res).to.deep.equal(arr);
    });

    it('should not fail on undefined or null', () => {
        const undefRes = Utils.on(undefined);
        const nullRes = Utils.on(null);

        expect(Array.isArray(undefRes)).to.equal(true);
        expect(Array.isArray(nullRes)).to.equal(true);
    });
});

describe('Utils.not', () => {
    const truePredicate = () => true;

    it('should invert result of predicates', () => {
        const input = 'value';
        const predRes = truePredicate(input);
        const notRes = Utils.not(truePredicate)(input);

        expect(predRes).to.equal(!notRes);
    });
});

describe('Utils.where', () => {
    const keyTransform = (obj) => obj.key;
    const values = [{ key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 }];

    it('should work without predicate', () => {
        values.filter(Utils.where());
        values.filter(Utils.where(keyTransform));
    });

    it('should transform before predicate', () => {
        const res = values.filter(Utils.where(keyTransform, (key) => key === 1));

        expect(Array.isArray(res)).to.equal(true);
        expect(res.length).to.equal(1);
        expect(res[0]).to.deep.equal({ key: 1, val: 1 });
    });
});

describe('Utils.pluck', () => {
    const obj = { key1: 'val1', key2: 'val2' };

    it('should not fail on missing keys', () => {
        const res = Utils.pluck('key')(obj);

        expect(res).to.equal(undefined);
    });

    it('should return value of key', () => {
        const res = Utils.pluck('key2')(obj);

        expect(res).to.equal('val2');
    });
});

describe('Utils.isEqualTo', () => {
    it('should check object reference', () => {
        const obj1 = {};
        const obj2 = {};

        const res = Utils.isEqualTo(obj1)(obj2);

        expect(res).to.equal(false);
    });

    it('should return true for equal numbers and string', () => {
        const stringRes = Utils.isEqualTo('str')('str');
        const numberRes = Utils.isEqualTo(123)(123);

        expect(stringRes).to.equal(true);
        expect(numberRes).to.equal(true);
    });
});

describe('Utils.fn', () => {
    const truePredicate = () => true;

    it('should return same function is function is argument', () => {
        const res = Utils.fn(truePredicate);

        expect(res).to.equal(truePredicate);
    });

    it('should wrap value in function is argument is not a function', () => {
        const val = 'Hello there';
        const fnVal = Utils.fn(val);

        const fnValRes = fnVal();

        expect(typeof fnVal).to.equal('function');
        expect(fnValRes).to.equal(val);
    });

    it('should handle no input', () => {
        const res = Utils.fn();

        expect(res()).to.equal(undefined);
    });
});

describe('Utils.join', () => {
    const arr = ['a', 'b', 'c'];

    it('should interleave separator value', () => {
        const res = arr.reduce(Utils.join('sep'), []);

        expect(res).to.deep.equal(['a', 'sep', 'b', 'sep', 'c']);
    });

    it('should handle function separator', () => {
        const res = arr.reduce(Utils.join(() => 'test'), []);

        expect(res).to.deep.equal(['a', 'test', 'b', 'test', 'c']);
    });
});

describe('Utils.lastOf', () => {
    it('should return last element in array', () => {
        const res = Utils.lastOf([5, 6, 7, 8]);

        expect(res).to.equal(8);
    });

    it('should handle undefined and null', () => {
        const undefRes = Utils.lastOf(undefined);
        const nullRes = Utils.lastOf(null);

        expect(undefRes).to.equal(undefined);
        expect(nullRes).to.equal(null);
    });

    it('should handle empty arrays', () => {
        const res = Utils.lastOf([]);

        expect(res).to.equal(undefined);
    });
});
