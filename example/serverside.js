require('babel-register');
var React = require('react');
var renderToString = require('react-dom/server').renderToString;
var reactRouter = require('react-router');
var match = reactRouter.match;
var RouterContext = reactRouter.RouterContext;
var routes = require('./routes').default;
var express = require('express');
var app = express();

app.get('*', (req, res) => {
    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
        if (error) {
            res.status(500).send(error.message)
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
            res.status(200).send(renderToString(React.createElement(RouterContext, renderProps)))
        } else {
            res.status(404).send('Not found')
        }
    })
});


app.listen(8000, () => {
    console.log('Started app on', 8000);
});