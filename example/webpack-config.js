/* eslint no-var:0 no-unused-vars:0 */
var webpack = require('webpack');
var path = require('path');

module.exports = {
    devtool: 'eval',
    entry: './index.js',
    output: {
        path: __dirname,
        filename: './bundle.js'
    },
    module: {
        loaders: [
            {
                test: /.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    }
};
