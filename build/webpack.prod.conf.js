var path = require('path')
var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
var AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
var OptimizedIdsPlugin = require('./optimize-ids')
var env = config.build.env

var webpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true
        })
    },
    devtool: config.build.productionSourceMap ? '#source-map' : false,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].js'),
        chunkFilename: utils.assetsPath('js/modules/[name].min.js')
    },
    plugins: [
        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': env
        }),
        new BundleAnalyzerPlugin({
            // Can be `server`, `static` or `disabled`.
            // In `server` mode analyzer will start HTTP server to show bundle report.
            // In `static` mode single HTML file with bundle report will be generated.
            // In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file by setting `generateStatsFile` to `true`.
            analyzerMode: 'server',
            // Host that will be used in `server` mode to start HTTP server.
            analyzerHost: '127.0.0.1',
            // Port that will be used in `server` mode to start HTTP server.
            analyzerPort: config.build.bundleAnalyzerReport,
            // Path to bundle report file that will be generated in `static` mode.
            // Relative to bundles output directory.
            reportFilename: 'report.html',
            // Module sizes to show in report by default.
            // Should be one of `stat`, `parsed` or `gzip`.
            // See "Definitions" section for more information.
            defaultSizes: 'parsed',
            // Automatically open report in default browser
            openAnalyzer: true,
            // If `true`, Webpack Stats JSON file will be generated in bundles output directory
            generateStatsFile: false,
            // Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`.
            // Relative to bundles output directory.
            statsFilename: 'stats.json',
            // Options for `stats.toJson()` method.
            // For example you can exclude sources of your modules from stats file with `source: false` option.
            // See more options here: https://github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
            statsOptions: null,
            // Log level. Can be 'info', 'warn', 'error' or 'silent'.
            logLevel: 'info'
        }),


        // extract css into its own file
        new ExtractTextPlugin(utils.assetsPath('css/[name].css')),
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: config.build.indexDeskTop,
            template: 'src/desktop/main.html',
            inject: true,
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency',
            chunks: ['desktopIndex', 'vendor', 'manifest']
        }),
        new HtmlWebpackPlugin({
            filename: config.build.achievementDeskTop,
            template: 'src/desktop/main.html',
            inject: true,
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency',
            chunks: ['desktopAchievement', 'vendor', 'manifest']
        }),
        new HtmlWebpackPlugin({
            filename: config.build.indexMobile,
            template: 'src/mobile/main.html',
            inject: true,
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency',
            chunks: ['mobile', 'vendor', 'manifest']
        }),

    //     // split vendor js into its own file
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module, count) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                )
            }
        }),

        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
        new OptimizedIdsPlugin(),
        new AddAssetHtmlPlugin([{
            filepath: path.resolve(__dirname, '../dll/polyfill.min.js'),
            outputPath: '../release',
            publicPath: config.build.assetsPublicPath,
            includeSourcemap: false
        }, {
            filepath: path.resolve(__dirname, '../dll/vconsole.min.js'),
            outputPath: '../release',
            publicPath: config.build.assetsPublicPath,
            includeSourcemap: false
        }])
    ]
})

// if (!config.build.showVConsole) {
//     webpackConfig.plugins.push(
//         //nodejs多核压缩
//         new UglifyJsParallelPlugin({
//             workers: os.cpus().length,
//             mangle: true,
//             compressor: {
//                 warnings: false,
//                 drop_console: true,
//                 drop_debugger: true
//             }
//         })
//     )
// }
/*else{
    webpackConfig.plugins.push(
        new AddAssetHtmlPlugin([{
            filepath: path.resolve(__dirname, '../dll/vconsole.min.js'),
            outputPath: '../tetris_release',
            publicPath: config.build.assetsPublicPath,
            includeSourcemap: false
        },{
            filepath: path.resolve(__dirname, '../dll/vconsole-elements.min.js'),
            outputPath: '../tetris_release',
            publicPath: config.build.assetsPublicPath,
            includeSourcemap: false
        },{
            filepath: path.resolve(__dirname, '../dll/vconsole-resources.min.js'),
            outputPath: '../tetris_release',
            publicPath: config.build.assetsPublicPath,
            includeSourcemap: false
        }])
    )
}*/

if (config.build.usingDll) {
    var AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
    webpackConfig.plugins.push(
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('../dll/vendors-manifest.json'),
        }),
        new AddAssetHtmlPlugin([{
            filepath: path.resolve(__dirname, '../dll/vendors.dll.js'),
            outputPath: utils.assetsPath('dll'),
            // publicPath: path.resolve(config.build.assetsPublicPath, config.build.assetsSubDirectory, 'dll'),
            publicPath: 'static/dll',
            includeSourcemap: false
        }])
    )
}

if (config.build.productionGzip) {
    var CompressionWebpackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' +
                config.build.productionGzipExtensions.join('|') +
                ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    )
}

module.exports = webpackConfig