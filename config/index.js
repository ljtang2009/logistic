// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

const localBuild = false;
module.exports = {
    build: {
        env: {
            NODE_ENV: '"production"'
        },
        indexDeskTop: path.resolve(__dirname, '../release/index.html'),
        achievementDeskTop: path.resolve(__dirname, '../release/achievement.html'),
        indexMobile: path.resolve(__dirname, '../release/mobile.html'),
        assetsRoot: path.resolve(__dirname, '../release'),
        assetsSubDirectory: 'static',
        assetsPublicPath: './', //本地build
        // assetsPublicPath: localBuild ? './' : '/m/tetris_release/', //服务器build
        productionSourceMap: false,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        //if using webpack dll way to build 
        // npm install --add-asset-html-webpack-plugin
        usingDll: false,
        //set stg env if need vconsole debugger
        showVConsole: localBuild || false
    },
    dev: {
        env: {
            NODE_ENV: '"development"'
        },
        port: 8089,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false,
        showVConsole: true
    }
}