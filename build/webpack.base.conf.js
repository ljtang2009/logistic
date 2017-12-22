const config = require('../config')
const path = require('path')
const vueLoaderConfig = require('./vue-loader.conf')
const utils = require('./utils')
let projectRoot = path.resolve(__dirname, '../')

let webpackBaseConfig = {
    entry: {
        desktopIndex: './src/desktop/modules/index/index',
    },
    output: {
        path: config.build.assetsRoot,
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            enforce: "pre",
            include: [path.join(__dirname, '..', 'src')],
            options: {
                formatter: require('eslint-friendly-formatter')
            }
        },{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: vueLoaderConfig
        },{
            test: /\.js$/,
            loader: 'babel-loader',
            include: projectRoot,
            exclude: /node_modules/
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 10000,
                name: utils.assetsPath('./img/[name].[ext]')
            }
        },{
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 10000,
                name: utils.assetsPath('./fonts/[name].[ext]')
            }
        }]
    }
}

module.exports = webpackBaseConfig