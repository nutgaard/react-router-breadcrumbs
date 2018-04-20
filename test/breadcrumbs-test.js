/* eslint-env node, mocha */
/* eslint-disable newline-per-chained-call */
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import { spy } from 'sinon';
// eslint-disable-next-line import/no-duplicates
import * as Func from './../src/breadcrumbs';
// eslint-disable-next-line import/no-duplicates, no-duplicate-imports
import Breadcrumbs from './../src/breadcrumbs';

Enzyme.configure({ adapter: new Adapter() });

describe('Breadcrumbs', () => {
    const defaultRoute = {
        breadcrumbName: 'breadcrumbName',
        breadcrumbLink: 'breadcrumbLink',
        name: 'routename',
        path: 'path',
        component: { name: 'componentname' }
    };
    describe('safeKey', () => {
        it('should return same text if it contains only word-characters', () => {
            const res = Func.safeKey('01239_ABCZ_abcz');

            expect(res).to.equal('01239_ABCZ_abcz');
        });

        it('should remove any non-word-character', () => {
            const res = Func.safeKey('!"#abcæøå--');

            expect(res).to.equal('abc');
        });
    });

    describe('defaultResolver', () => {
        it('should return the key (first argument)', () => {
            const res = Func.defaultResolver('arg1', 'arg2', 'arg3', 'arg4');

            expect(res).to.equal('arg1');
        });
    });

    describe('defaultLink', () => {
        it('should return a react-router Link component', () => {
            const res = Func.defaultLink('link', 'key', 'text', 0, undefined);

            expect(res.type.displayName).to.equal('Link');
            expect(res.key).to.equal('key');
            expect(res.props.children).to.equal('text');
            expect(res.props.to).to.equal('link');
        });
    });

    describe('defaultSeparator', () => {
        it('should return a span component', () => {
            const res = Func.defaultSeparator(null, 2, []);

            expect(res.type).to.equal('span');
            expect(res.key).to.equal('separator-2');
            expect(res.props.children).to.equal(' > ');
        });
    });

    describe('paramReplace', () => {
        it('should return same text if nothing can be replaced', () => {
            const res = Func.paramReplace('abcdef123');

            expect(res).to.equal('abcdef123');
        });

        it('should return same text if no params are provided', () => {
            const res = Func.paramReplace(':param1');

            expect(res).to.equal('param1');
        });

        it('should replace all params in text that are provided', () => {
            const res = Func.paramReplace(':param1/:param2/:param3', {
                param1: 'val1',
                param3: 'val3'
            });

            expect(res).to.equal('val1/param2/val3');
        });
    });

    describe('createText', () => {
        it('should call resolver with text, param-replaced-text, routepath and route', () => {
            const resolver = spy();
            const route = { ...defaultRoute, breadcrumbName: ':param1' };
            const routePath = [{ ...route }, route];
            Func.createText(routePath, { param1: 'value1' }, resolver);

            expect(resolver.calledWithExactly(':param1', 'value1', routePath, route)).to.equal(true);
        });

        it('should call resolver with text, param-replaced-text, routepath and route (optional param)', () => {
            const resolver = spy();
            const route = { ...defaultRoute, breadcrumbName: ':param1', breadcrumbLink: 'path(/:param1)' };
            const routePath = [{ ...route }, route];
            Func.createText(routePath, { param1: 'value1' }, resolver);

            expect(resolver.calledWithExactly(':param1', 'value1', routePath, route)).to.equal(true);
        });

        it('should use breadcrumbName, then route.name then route.component.name for text resolution', () => {
            const textResolver = (a) => a;
            const componentNameTest = [undefined, { component: { name: 'componentname' } }];
            const routenameTest = [undefined, { name: 'routename', component: { name: 'componentname' } }];
            const breadcrumbTest = [undefined, { ...defaultRoute }];

            const componentNameRes = Func.createText(componentNameTest, {}, textResolver);
            const routenameRes = Func.createText(routenameTest, {}, textResolver);
            const breadcrumbRes = Func.createText(breadcrumbTest, {}, textResolver);

            expect(componentNameRes).to.equal('componentname');
            expect(routenameRes).to.equal('routename');
            expect(breadcrumbRes).to.equal('breadcrumbName');
        });
    });

    describe('createHref', () => {
        it('should use breadcrumbLink, then route.path then empty string as link', () => {
            const linkRes = Func.createHref([{ ...defaultRoute }, { ...defaultRoute }], {});
            const pathRes = Func.createHref([{ ...defaultRoute }, { ...defaultRoute, breadcrumbLink: undefined }], {});
            const emptyRes = Func.createHref([{ ...defaultRoute }, {
                ...defaultRoute,
                breadcrumbLink: undefined,
                path: undefined
            }], {});

            expect(linkRes).to.equal('/breadcrumbLink/breadcrumbLink');
            expect(pathRes).to.equal('/breadcrumbLink/path');
            expect(emptyRes).to.equal('/breadcrumbLink/');
        });

        it('should add and remove slashed to avoid duplicates', () => {
            const res = Func.createHref([
                { breadcrumbLink: 'path' },
                { breadcrumbLink: 'path' },
                { breadcrumbLink: 'path' },
                { breadcrumbLink: '////path/' },
                { breadcrumbLink: '/path/' },
                { breadcrumbLink: '/path' }
            ], {});

            expect(res).to.equal('/path/path/path/path/path/path');
        });

        it('should replace keys with the params provided', () => {
            const res = Func.createHref([
                { breadcrumbLink: ':item1' },
                { breadcrumbLink: '(:item2)' },
                { breadcrumbLink: ':item3' }
            ], {
                item1: 'val1',
                item3: 'val3'
            });

            expect(res).to.equal('/val1/val3');
        });

        it('should handle optional params with values present', () => {
            const res = Func.createHref([
                { breadcrumbLink: 'path(/:item1)' }
            ], {
                item1: 'val1'
            });

            expect(res).to.equal('/path/val1');
        });
        it('should handle optional params with values missing', () => {
            const res = Func.createHref([
                { breadcrumbLink: 'path(/:item1)' }
            ], {
            });

            expect(res).to.equal('/path');
        });
    });
    describe('_toCrumbs', () => {
        it('should return link', () => {
            const linkSpy = spy();
            const toCrumbFn = Func.toCrumb({
                params: {},
                createLink: linkSpy,
                resolver: () => 'RESOLVER_SPY_'
            });
            const routes = [{ ...defaultRoute }, { ...defaultRoute }];

            toCrumbFn(defaultRoute, 1, routes);

            expect(linkSpy.calledWith(
                '/breadcrumbLink/breadcrumbLink',
                'RESOLVER_SPY_breadcrumbLinkbreadcrumbLink',
                'RESOLVER_SPY_',
                1,
                routes
            )).to.equal(true);
        });
    });

    describe('renderCrumbs', () => {
        const defaultProps = {
            routes: [{ ...defaultRoute }, { ...defaultRoute, breadcrumbIgnore: true }, { ...defaultRoute }],
            params: {},
            resolver: Func.defaultResolver,
            createLink: Func.defaultLink,
            createSeparator: Func.defaultSeparator,
            prefixElements: [],
            suffixElements: []
        };

        it('should ignore routes with breadcrumbIgnore', () => {
            const res = Func.renderCrumbs(defaultProps);

            expect(res.length).to.equal(3); // Link - Separator - Link
            expect(res[0].type.displayName).to.equal('Link');
            expect(res[1].type).to.equal('span');
            expect(res[2].type.displayName).to.equal('Link');
        });

        it('should append prefixElement to the front, and allow for React.element as prop', () => {
            const res = Func.renderCrumbs({
                ...defaultProps,
                prefixElements: <p>Test</p>
            });

            expect(res.length).to.equal(4); // Prefix - Link - Separator - Link
            expect(res[0].type).to.equal('p');
            expect(res[1].type.displayName).to.equal('Link');
            expect(res[2].type).to.equal('span');
            expect(res[3].type.displayName).to.equal('Link');
        });

        it('should append prefixElement to the front, and allow for array of React.element as prop', () => {
            const res = Func.renderCrumbs({
                ...defaultProps,
                prefixElements: [<p>Test</p>, <h1>Test</h1>]
            });

            expect(res.length).to.equal(5); // Prefix - Prefix - Link - Separator - Link
            expect(res[0].type).to.equal('p');
            expect(res[1].type).to.equal('h1');
            expect(res[2].type.displayName).to.equal('Link');
            expect(res[3].type).to.equal('span');
            expect(res[4].type.displayName).to.equal('Link');
        });

        it('should append suffixElements to the end, and allow for React.element as prop', () => {
            const res = Func.renderCrumbs({
                ...defaultProps,
                suffixElements: <p>Test</p>
            });

            expect(res.length).to.equal(4); // Prefix - Link - Separator - Link
            expect(res[0].type.displayName).to.equal('Link');
            expect(res[1].type).to.equal('span');
            expect(res[2].type.displayName).to.equal('Link');
            expect(res[3].type).to.equal('p');
        });

        it('should append suffixElements to the end, and allow for array of React.element as prop', () => {
            const res = Func.renderCrumbs({
                ...defaultProps,
                suffixElements: [<p>Test</p>, <h1>Test</h1>]
            });

            expect(res.length).to.equal(5); // Prefix - Prefix - Link - Separator - Link
            expect(res[0].type.displayName).to.equal('Link');
            expect(res[1].type).to.equal('span');
            expect(res[2].type.displayName).to.equal('Link');
            expect(res[3].type).to.equal('p');
            expect(res[4].type).to.equal('h1');
        });
    });

    describe('Component', () => {
        it('should return a null component if there are no crumbs (or routes)', () => {
            const routes = [{ ...defaultRoute, breadcrumbIgnore: true }];
            const wrapper = shallow(<Breadcrumbs routes={routes} />);

            expect(wrapper.getElement()).to.equal(null);
        });

        it('should render div as default wrappingComponent', () => {
            const routes = [{ ...defaultRoute }];
            const wrapper = shallow(<Breadcrumbs routes={routes} />);

            const wrappingComponent = wrapper.find('div.breadcrumbs');
            expect(wrappingComponent.length).to.equal(1);
        });

        it('should respect wrappingComponent and className props', () => {
            const routes = [{ ...defaultRoute }];
            const wrapper = shallow(<Breadcrumbs routes={routes} wrappingComponent="article" className="custom" />);

            const wrappingComponent = wrapper.find('article.custom');
            expect(wrappingComponent.length).to.equal(1);
        });

        it('should include ignored routes in link', () => {
            const routes = [
                { ...defaultRoute },
                { ...defaultRoute, breadcrumbIgnore: true },
                { ...defaultRoute, breadcrumbIgnore: true },
                { ...defaultRoute }
            ];

            const wrapper = shallow(<Breadcrumbs routes={routes} />);

            const wrappingComponent = wrapper.find('div.breadcrumbs');
            expect(wrappingComponent.length).to.equal(1);

            const links = wrappingComponent.find('Link');
            expect(links.length).to.equal(2);

            const lastLink = links.get(1).props.to;
            expect(lastLink.match(/breadcrumbLink/g).length).to.equal(4);
        });
    });
});
