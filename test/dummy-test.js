import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow, mount, render } from 'enzyme';

class Foo extends React.Component {
    componentDidMount() {

    }

    render() {
        return <noscript />
    }
}

describe('<Foo />', () => {
    it("contains spec with an expectation", () => {
        expect(shallow(<Foo />).contains(<noscript />)).to.equal(true);
    });

    it('calls componentDidMount', () => {
        spy(Foo.prototype, 'componentDidMount');
        mount(<Foo />);
        expect(Foo.prototype.componentDidMount.calledOnce).to.equal(true);
    });
});