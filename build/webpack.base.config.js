const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
// const webpack = require('webpack')
const uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
console.log(process.env.NODE_ENV)
let config = {
    mode: process.env.NODE_ENV,
    entry: {
        app: path.join(__dirname, '../views/index.js'),
        vendor: ['react', 'react-router', 'react-router-dom']
    },
    output: {
        filename: '[name].[hash:8].js',
        path: path.resolve(__dirname, '../dist'),
        chunkFilename: '[name].[hash:8].bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: path.join(__dirname, '../node_modules')
            },
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'},
                ]
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.join(__dirname, '../views/index.html'),
            filename: 'index.html'
        }),
        new uglifyjsWebpackPlugin({
            test: /\.(js|jsx)$/,
            exclude: /\/node_modules/
        })
    ],
    // splitChunks 是用来进行公共代码合并的
    optimization: {
        splitChunks:{
            chunks: 'all',
            name: true
        }
    }
}

if(process.env.NODE_ENV === 'development') {
    config.devServer = {
        host: 'localhost',
        port: 3000,
    }
    config.devtool = '#cheap-module-eval-source-map'
}

module.exports = config



