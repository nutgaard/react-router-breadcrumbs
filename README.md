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
(crumbText, crumbTextProcessed, routePath, _route) => crumbText
```

```
// Default for `createLink` prop
const defaultLink = (link, key, text, index, routes) => <Link to={link} key={key}>{text}</Link>;
```

```
// Default for `createSeparator` prop
const defaultSeparator = (crumb, index, array) => <span key={`separator-${index}`}> &gt; </span>;
```

## Peer dependencies
This component has the newest react and react-router as peerdependenies, but will most likely work with lower version.
If you test the component with lower versions of react and/or react-router please let me know so that the dependencies can be adjusted.

```
"react": "^0.14.7",
"react-router": "^2.0.0"
```

## Example
The example can be seen at <url> and is greatly inspired by https://github.com/svenanders/react-breadcrumbs which provides a similar breadcrumb component. 