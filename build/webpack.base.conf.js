const config = require('../config')
const path = require('path')
const vueLoaderConfig = require('./vue-loader.conf')
const utils = require('./utils')
const vuxLoader = require('vux-loader')
let projectRoot = path.resolve(__dirname, '../')

let webpackBaseConfig = {
    entry: {
        desktopIndex: './src/desktop/modules/index/index',
        desktopAchievement: './src/desktop/modules/achievement/achievement',
        mobile: './src/mobile/main'
    },
    output: {
        path: config.build.assetsRoot,
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.json', '.js', '.vue', '.less', '.css', '.scss'],
        modules: [path.join(__dirname, '../node_modules')],
        alias: {
            'src': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, '../src/assets'),
            '@components': path.resolve(__dirname, '../src/components'),
            '@modules': path.resolve(__dirname, '../src/modules'),
            '@constant': path.resolve(__dirname, '../src/constant')
        },
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

module.exports = vuxLoader.merge(webpackBaseConfig, {
    plugins: ['vux-ui']
})