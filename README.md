# react-router-breadcrumbs
A react-component for creating breadcrumbs based on your current active route.

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
                                                
|    PropName       |    PropType               |    Default    |  Description                                          |
| ----------------- | ------------------------- | ------------- | ----------------------------------------------------- |
| `className`       | `React.PropTypes.string`  | `breadcrumbs` | The className for the `div` wrapping your breadcrumbs |
| `params`          | `React.PropTypes.object`  | `{}`          | Typically the params from react-router                |
| `resolver`        | `React.PropTypes.func`    | See below     | A text resolver for customized texts                  |
| `createLink`      | `React.PropTypes.func`    | See below     | Hook for overriding how links are created             |
| `createSeparator` | `React.PropTypes.func`    | See below     | Hook for override how separators are created          |

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

## Peer dependencies
This component has the newest react and react-router as peerdependenies, but will most likely work with lower version.
If you test the component with lower versions of react and/or react-router please let me know so that the dependencies can be adjusted.

```
"react": "^0.14.7",
"react-router": "^2.0.0"
```

## Example
The example can be seen at <url> and is greatly inspired by https://github.com/svenanders/react-breadcrumbs which provides a similar breadcrumb component. 