import React, { PropTypes as PT } from 'react';
import { Link, PropTypes as RouterProps } from 'react-router';
import { on, not, where, pluck, isEqualTo, join, lastOf } from './utils';

const paramKeys = /:(\w+)/g;

export const safeKey = (key) => key.replace(/\W/g, '');
/* eslint-disable */
export const defaultResolver = (key, text, routePath, route) => key;
export const defaultLink = (link, key, text, index, routes) => <Link to={link} key={key}>{text}</Link>;
export const defaultSeparator = (crumb, index, array) => <span key={`separator-${index}`}> &gt; </span>;
/* eslint-enable */

export const _paramReplace = (text, params = {}) => text.replace(paramKeys, (_, key) => (params[key] || key));

export const _createText = (routePath, params, resolver) => {
    const route = lastOf(routePath);
    const text = route.breadcrumbName || route.name || route.component.name;

    return resolver(text, _paramReplace(text, params), routePath, route);
};

export const _createHref = (routePath, params) => {
    const link = routePath
        .map((route) => route.breadcrumbLink || route.path || '')
        .map((routeName) => routeName.startsWith('/') ? routeName : `/${routeName}`)
        .join('')
        .replace(/\/\//g, '/');

    return _paramReplace(link, params);
};

export const _toCrumb = ({ params, createLink, resolver }) =>
    (route, index, routes) => {
        const routePath = routes.slice(0, index + 1);
        const text = _createText(routePath, params, resolver);
        const link = _createHref(routePath, params);
        const key = safeKey(`${text}--${link}`);

        return createLink(link, key, text, index, routes);
    };

export const _renderCrumbs = ({
    routes,
    createSeparator,
    prefixElements,
    suffixElements,
    params,
    createLink,
    resolver
    }) => {
    const crumbs = on(routes)
        .filter(not(where(pluck('breadcrumbIgnore'), isEqualTo(true))))
        .map(_toCrumb({ params, createLink, resolver }))
        .reduce(join(createSeparator), []);

    return on(prefixElements).concat(crumbs).concat(on(suffixElements));
};

function Breadcrumbs({ className, wrappingComponent, ...props }) {
    const crumbs = _renderCrumbs(props);
    return React.createElement(wrappingComponent, { className }, crumbs);
}

Breadcrumbs.defaultProps = {
    wrappingComponent: 'div',
    className: 'breadcrumbs',
    params: {},
    resolver: defaultResolver,
    createLink: defaultLink,
    createSeparator: defaultSeparator,
    prefixElements: [],
    suffixElements: []
};

Breadcrumbs.propTypes = {
    routes: PT.arrayOf(RouterProps.route).isRequired,
    params: PT.object,
    resolver: PT.func,
    createLink: PT.func,
    createSeparator: PT.oneOfType([PT.func, PT.string]),
    className: PT.string,
    wrappingComponent: PT.string,
    prefixElements: PT.oneOfType([PT.arrayOf(PT.element), PT.element]),
    suffixElements: PT.oneOfType([PT.arrayOf(PT.element), PT.element])
};

export default Breadcrumbs;
