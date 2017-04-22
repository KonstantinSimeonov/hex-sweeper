'use strict';

const ENVIRONMENT = process.env.ENV;

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

const mainFilePath = (ENVIRONMENT === 'production') ? './app/main.production.jsx' : './app/main.development.jsx';

module.exports = {
    devServer: {
        historyApiFallback: true,
    },
    devtool: 'cheap-module-source-map',
    entry: [mainFilePath],
    module: {
        loaders: [
            { test: /\.styl$/, include: `${__dirname}/app/`, loader: 'style-loader!css-loader!stylus-loader' },
            { test: /\.jsx?$/, loader: 'babel-loader', query: { presets: ['es2015', 'react'] }, exclude: /(node_modules|bower_components)/, },
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
        // new webpackUglifyJsPlugin({
        //     cacheFolder: `${__dirname}/webpack_cached/`,
        //     debug: true,
        //     minimize: true,
        //     sourceMap: false,
        //     output: {
        //         comments: false
        //     },
        //     compressor: {
        //         warnings: false
        //     }
        // }),
        // new webpack.EnvironmentPlugin(['NODE_ENV']),
        htmlWebpackPluginConfig
    ]
}
