import React, { Component, PropTypes as PT } from 'react';
import { Link, PropTypes as RouterProps } from 'react-router';
import { on, not, where, pluck, isEqualTo, join, lastOf } from './utils';

const paramKeys = /:(\w+)/g;

const safeKey = (key) => key.replace(/\W/g, '');
/* eslint-disable */
const defaultResolver = (key, text, routePath, route) => key;
const defaultLink = (link, key, text, index, routes) => <Link to={link} key={key}>{text}</Link>;
const defaultSeparator = (crumb, index, array) => <span key={`separator-${index}`}> &gt; </span>;
/* eslint-enable */

class Breadcrumbs extends Component {
    constructor(props) {
        super(props);

        this._paramReplace = this._paramReplace.bind(this);
        this._createText = this._createText.bind(this);
        this._createHref = this._createHref.bind(this);
        this._toCrumb = this._toCrumb.bind(this);
    }

    _paramReplace(text) {
        const { params } = this.props;
        return text.replace(paramKeys, (_, key) => (params[key] || key));
    }

    _createText(routePath) {
        const { resolver } = this.props;
        const route = lastOf(routePath);
        const text = route.breadcrumbName || route.name || route.component.name;

        return resolver(text, this._paramReplace(text), routePath, route);
    }

    _createHref(routePath) {
        const { params } = this.props;
        const link = routePath
            .map((route) => route.breadcrumbLink || route.path || '')
            .map((routeName) => routeName.startsWith('/') ? routeName : `/${routeName}`)
            .join('')
            .replace(/\/\//g, '/');

        return link.replace(paramKeys, (_, key) => (params[key] || key));
    }

    _toCrumb() {
        const { createLink } = this.props;
        return (route, index, routes) => {
            const routePath = routes.slice(0, index + 1);
            const text = this._createText(routePath);
            const link = this._createHref(routePath);
            const key = safeKey(`${text}--${link}`);

            return createLink(link, key, text, index, routes);
        };
    }

    render() {
        const {
            routes,
            createSeparator,
            className,
            wrappingComponent
            } = this.props;
        const crumbs = on(routes)
            .filter(not(where(pluck('breadcrumbIgnore'), isEqualTo(true))))
            .map(this._toCrumb())
            .reduce(join(createSeparator), []);

        return React.createElement(wrappingComponent, { className }, crumbs);
    }
}

Breadcrumbs.defaultProps = {
    wrappingComponent: 'div',
    className: 'breadcrumbs',
    params: {},
    resolver: defaultResolver,
    createLink: defaultLink,
    createSeparator: defaultSeparator
};

Breadcrumbs.propTypes = {
    routes: PT.arrayOf(RouterProps.route).isRequired,
    params: PT.object,
    resolver: PT.func,
    createLink: PT.func,
    createSeparator: PT.oneOfType([PT.func, PT.string]),
    className: PT.string,
    wrappingComponent: PT.string
};

export default Breadcrumbs;
