import React from 'react';
import PT from 'prop-types';
import { Link, formatPattern } from 'react-router';
import * as RouterProps from './router-props';
import { on, not, where, pluck, isEqualTo, join, lastOf } from './utils';

const paramKeys = /:(\w+)/g;

export const safeKey = (key) => key.replace(/\W/g, '');
/* eslint-disable no-unused-vars */
export const defaultResolver = (key, text, routePath, route) => key;
export const defaultLink = (link, key, text, index, routes) => <Link to={link} key={key}>{text}</Link>;
export const defaultSeparator = (crumb, index, array) => <span key={`separator-${index}`}> &gt; </span>;
/* eslint-enable */

export const paramReplace = (text, params = {}) => text.replace(paramKeys, (_, key) => (params[key] || key));

export const createText = (routePath, params, resolver) => {
    const route = lastOf(routePath);
    const text = route.breadcrumbName || route.name || route.component.name;

    return resolver(text, paramReplace(text, params), routePath, route);
};

export const createHref = (routePath, params) => {
    const link = routePath
        .map((route) => route.breadcrumbLink || route.path || '')
        .map((routeName) => routeName.startsWith('/') ? routeName : `/${routeName}`)
        .join('')
        .replace(/\/\/+/g, '/');

    return formatPattern(link, params);
};

export const toCrumb = ({ params, createLink, resolver }) =>
    (route, index, routes) => {
        if (route.breadcrumbIgnore) {
            return route;
        }

        const routePath = routes.slice(0, index + 1);
        const text = createText(routePath, params, resolver);
        const link = createHref(routePath, params);
        const key = safeKey(`${text}--${link}`);

        return createLink(link, key, text, index, routes);
    };

export const renderCrumbs = ({
    routes,
    createSeparator,
    prefixElements,
    suffixElements,
    params,
    createLink,
    resolver
    }) => {
    const crumbs = on(routes)
        .map(toCrumb({ params, createLink, resolver }))
        .filter(not(where(pluck('breadcrumbIgnore'), isEqualTo(true))))
        .reduce(join(createSeparator), []);

    return on(prefixElements).concat(crumbs).concat(on(suffixElements));
};

function Breadcrumbs({ className, wrappingComponent, ...props }) {
    const crumbs = renderCrumbs(props);

    if (crumbs.length === 0) {
        return null;
    }

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
    routes: RouterProps.routes.isRequired,
    params: PT.object, // eslint-disable-line react/forbid-prop-types
    resolver: PT.func,
    createLink: PT.func,
    createSeparator: PT.oneOfType([PT.func, PT.string]),
    className: PT.string,
    wrappingComponent: PT.string,
    prefixElements: PT.oneOfType([PT.arrayOf(PT.element), PT.element]),
    suffixElements: PT.oneOfType([PT.arrayOf(PT.element), PT.element])
};

export default Breadcrumbs;
