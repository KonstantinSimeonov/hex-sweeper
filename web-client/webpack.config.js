'use strict';

const webpack = require('webpack'),
    stylusPlugin = require('stylus-loader'),
    cssLoader = require('css-loader'),
    styleLoader = require('style-loader'),
    HTMLWebpackPlugin = require('html-webpack-plugin'),
    htmlWebpackPluginConfig = new HTMLWebpackPlugin({
        template: `${__dirname}/app/index.html`,
        filename: 'index.html',
        inject: 'body'
    }),
    webpackUglifyJsPlugin = require('webpack-uglify-js-plugin');

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: ['./app/main.jsx'],
    module: {
        loaders: [
            { test: /\.styl$/, include: `${__dirname}/app/`, loader: 'style-loader!css-loader!stylus-loader' },
            { test: /\.jsx$/, loader: 'babel-loader', query: { presets: ['es2015', 'react'] } },
            {
                //IMAGE LOADER
                test: /\.(jpe?g|png|gif|svg)$/,
                loader: 'file-loader'
            },
        ]
    },
    output: {
        filename: 'main.js',
        path: `${__dirname}/dist`
    },
    plugins: [
        htmlWebpackPluginConfig,
        new webpack.DefinePlugin({
                'process.env': { 'NODE_ENV': JSON.stringify('production') }
            }),
            new webpackUglifyJsPlugin({ 
                compress: { warnings: false },
                 minimize: true,
            cacheFolder: `${__dirname}/styles-cache`,    
             })
        ]
}
