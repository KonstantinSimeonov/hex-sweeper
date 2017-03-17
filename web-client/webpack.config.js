'use strict';

const stylusPlugin = require('stylus-loader'),
    cssLoader = require('css-loader'),
    styleLoader = require('style-loader'),
    HTMLWebpackPlugin = require('html-webpack-plugin'),
    htmlWebpackPluginConfig = new HTMLWebpackPlugin({
        template: `${__dirname}/app/index.html`,
        filename: 'index.html',
        inject: 'body'
    });

module.exports = {
    entry: ['./app/index.jsx'],
    module: {
        loaders: [
            { test: /\.jsx$/, include: `${__dirname}/app`, loader: 'babel-loader', query: { presets: ['es2015', 'react'] } },
            { test: /\.styl$/, include: `${__dirname}/app/styles`, loader: 'style-loader!css-loader!stylus-loader' }
        ]
    },
    output: {
        filename: 'index.js',
        path: `${__dirname}/dist`
    },
    plugins: [htmlWebpackPluginConfig]
}
