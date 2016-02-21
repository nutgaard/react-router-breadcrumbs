import React, { PropTypes as PT } from 'react';
import { Link, PropTypes as RouterProps } from 'react-router';
import { on, not, where, pluck, isEqualTo, join } from './iter-utils';

const paramKeys = /:(\w+)/g;

function safeKey(key) {
    return key.replace(/\W/g, '');
}

function defaultLink(link, key, text, index, routes) { // eslint-disable-line no-unused-vars
    return <Link to={link} key={key}>{text}</Link>;
}

function defaultSeparator(crumb, index, array) {  // eslint-disable-line no-unused-vars
    return <span key={`separator-${index}`}>&gt;</span>;
}

function createText(route, textResolver) {
    const text = route.crumbText || route.name || route.component.name;

    if (text.includes(':')) {
        return textResolver(route, text);
    }

    return text;
}

function createHref(route, params) {
    const link = route.crumbLink || route.path;

    if (link.includes(':')) {
        return link.replace(paramKeys, (_, key) => (params[key] || key));
    }

    return link;
}

function toCrumb(textResolver, params, crumblink) {
    return (route, index, routes) => {
        const text = createText(route, textResolver);
        const link = createHref(route, params);
        const key = safeKey(`${text}--${link}`);

        return crumblink(link, key, text, index, routes);
    };
}

function Breadcrumbs({
    routes,
    params = {},
    resolver = (route, crumbText) => crumbText,
    createLink = defaultLink,
    createSeparator = defaultSeparator,
    className
    }) {
    const crumbs = on(routes)
        .filter(not(where(pluck('crumbsIgnore'), isEqualTo(true))))
        .map(toCrumb(resolver, params, createLink))
        .reduce(join(createSeparator), []);

    return (
        <div className={className}>{crumbs}</div>
    );
}

Breadcrumbs.propTypes = {
    routes: PT.arrayOf(RouterProps.route).isRequired,
    params: PT.object,
    resolver: PT.func,
    createLink: PT.func,
    createSeparator: PT.func,
    className: PT.string
};

export default Breadcrumbs;
