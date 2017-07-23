# react-router-breadcrumbs
A react-component for creating breadcrumbs based on your current active route.

[![circleci.com](https://circleci.com/gh/nutgaard/react-router-breadcrumbs/tree/master.svg?style=shield&circle-token=6b1cea2c148aa465e5bd27b3c186693e4be2d4a5)](https://circleci.com/gh/nutgaard/react-router-breadcrumbs/tree/master)
[![codecov.io](https://codecov.io/github/nutgaard/react-router-breadcrumbs/coverage.svg?branch=master)](https://codecov.io/github/nutgaard/react-router-breadcrumbs?branch=master)
[![Dependency Status](https://david-dm.org/nutgaard/react-router-breadcrumbs.svg)](https://david-dm.org/nutgaard/react-router-breadcrumbs)
[![devDependency Status](https://david-dm.org/nutgaard/react-router-breadcrumbs/dev-status.svg)](https://david-dm.org/nutgaard/react-router-breadcrumbs#info=devDependencies)
[![peerDependency Status](https://david-dm.org/nutgaard/react-router-breadcrumbs/peer-status.svg)](https://david-dm.org/nutgaard/react-router-breadcrumbs#info=peerDependencies)

[DEMO](http://www.utgaard.xyz/react-router-breadcrumbs)

## How to install
```
npm install react-router-breadcrumbs --save
```

## How to use it
The component is written with customization and ease-of-use in mind. 
It therefore comes with some useful default which you can override if needed.

### The most basic setup
Using just the default provided by the component. 

```jsx
<Breadcrumbs routes={routes} />
```

### The default behaviour
The component takes five props in addition to `routes`.
                                                
|    PropName           |    PropType                                           |    Default    |  Description                                          |
| --------------------- | ----------------------------------------------------- | ------------- | ----------------------------------------------------- |
| `className`           | `PropTypes.string`                                    | `breadcrumbs` | The className for the `div` wrapping your breadcrumbs |
| `params`              | `PropTypes.object`                                    | `{}`          | Typically the params from react-router                |
| `resolver`            | `PropTypes.func`                                      | See below     | A text resolver for customized texts                  |
| `createLink`          | `PropTypes.func`                                      | See below     | Hook for overriding how links are created             |
| `createSeparator`     | `PT.oneOfType([PT.func, PT.string])`                  | See below     | Hook for override how separators are created          |
| `wrappingComponent`   | `PT.string`                                           | `div`         | Determines the tagName for the wrapping component     |
| `prefixElements`      | `PT.oneOfType([PT.arrayOf(PT.element), PT.element])`  | none          | Elements to be added infront of the breadcrumb        |
| `suffixElements`      | `PT.oneOfType([PT.arrayOf(PT.element), PT.element])`  | none          | Elements to be added at the end of the breadcrumb     |

```
// Default for `resolver` prop
const defaultResolver = (key, text, routePath, route) => key;

// Inputs and how they are determined:
// key:         route.breadcrumbName || route.name || route.component.name
// text:        paramsReplaced(key) (based on the `params` props)
// routePath:   All current routes, except the last one
// route:       Your current <Route /> (last in <Route>-chain
```

```
// Default for `createLink` prop
const defaultLink = (link, key, text, index, routes) => <Link to={link} key={key}>{text}</Link>;

// Inputs and how they are determined:
// link:        The suggested href for this crumbs
// key:         The suggested react-key <Component key={key} />
// text:        The resulting text, either from the defaultResolver or your custom resolver
// routes:      All current routes, including the last one
```


**NB! Its also possible to just send a `string` as this props-value.**
```
// Default for `createSeparator` prop
const defaultSeparator = (crumbElement, index, array) => <span key={`separator-${index}`}> &gt; </span>;

// Inputs and how they are determined:
// crumb:       The react-element (crumb) you are creating a separator after.
// index:       The index of the current crumb
// array:       All crumbs that a being generated
```

## Routes-customization
A lot-of customization can be done through the props of the component, but in many cases it will be enough to add props to your `Routes`.
The component looks for three specific props on the `Route` object.

1. `breadcrumbIgnore`, will remove the `Route` for any breadcrumb-path
2. `breadcrumbName`, will override the `Route.name` and sent to the `resolver`
3. `breadcrumbLink`, will override the `Route.path` and be subject to `params` replacement.

Which can be used to name your breadcrumbs exactly as you want.
### BreadcrumbIgnore Example

**NB. Theres is currently a bug where paths become wrong if this is used on a 'Route' with a path other then '/'**


```
// The example allways show 'Example' as its first breadcrumb.
// To remove this, add 'breadcrumbIgnore' as a prop
<Route path="/" name="Examples" component={App} breadcrumbIgnore > 
```

### BreadcrumbName Example

```
// To over the name-prop, we've added the breadcrumbName-prop. 
<Route name="UserDetails" path="details" component={UserDetails} breadcrumbName="Details" />


// The resulting name will be sent to the resolver as the 'key' and i param-replaced form as 'text' (see resolver)
<Route name="UserLocator" path=":userId" component={User} breadcrumbName=":userId">
```

### BreadcrumbLink Example

```
// Overriding the path-prop
// NB. Can break functionality if abused
<Route path="/" name="Examples" component={App} breadcrumbLink="/my-application" >
```


## Peer dependencies
This component has the newest react and react-router as peerdependenies, but will most likely work with lower version.
If you test the component with lower versions of react and/or react-router please let me know so that the dependencies can be adjusted.

```
"react": "^0.14.9 || ^15.3.0",
"react-dom": "^0.14.9 || ^15.3.0",
"react-router": "^2.0.1 || ^3.0.0"
```

In addition a polyfill for `Array.includes` is needed if you are targeting a browser which does not support this.

## Undocumented / TODO
1. If a breadcrumbLink and the route.path is both falsy the component uses a empty string. Suggest adding a default message/invariant/console.error to warn the user

## Example
The example can be seen at [http://www.utgaard.xyz/react-router-breadcrumbs](http://www.utgaard.xyz/react-router-breadcrumbs) and is greatly inspired by https://github.com/svenanders/react-breadcrumbs which provides a similar breadcrumb component. 
