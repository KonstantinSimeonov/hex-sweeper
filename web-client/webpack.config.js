'use strict';

const path = require('path');

const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devServer: {
        historyApiFallback: true,
        port: 8080
    },
    devtool: 'source-map',
    entry: {
        app: path.resolve(__dirname, 'app', 'app.js')
    },
    module: {
        loaders: [
            {
                test: /\.styl$/,
                loaders: ['style-loader', 'css-loader', 'stylus-loader']
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                loader: 'file-loader'
            },
        ]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            'process.env.APP_DOMAIN': JSON.stringify('http://localhost:6969')
        }),
        new HTMLWebpackPlugin({
            template: `${__dirname}/app/index.html`,
            filename: 'index.html',
            inject: 'body'
        })
    ]
}
