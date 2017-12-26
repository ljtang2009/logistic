const config = require('../config')
const baseWebpackConfig = require('./webpack.base.conf')
const merge = require('webpack-merge')
const utils = require('./utils')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.dev.cssSourceMap
        })
    },
    devtool: '#eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        //桌面首页
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/desktop/main.html',
            inject: true,
            chunks: ['desktopIndex']
        }),
        //桌面业绩展示
        new HtmlWebpackPlugin({
            filename: 'achievement.html',
            template: 'src/desktop/main.html',
            inject: true,
            chunks: ['desktopAchievement']
        }),
        //移动页面
        new HtmlWebpackPlugin({
            filename: 'mobile.html',
            template: 'src/mobile/main.html',
            inject: true,
            chunks: ['mobile']
        }),
        new FriendlyErrorsPlugin()
    ]
})