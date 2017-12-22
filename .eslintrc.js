module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
        amd: true
    },
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'eslint:recommended',
    globals: {
        LCalendar: true,
        LArea: true,
        pa_sdcajax: true
    },
    // required to lint *.vue files
    plugins: ['html', 'promise'],
    // add your custom rules here
    rules: {
        // 'indent': 2,
        'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
        'no-unused-vars': ['error', {
            args: 'none'
        }],
        'no-console': 0,
        'no-debugger': 0,
        'no-useless-escape': 0,
        quotes: ['error', 'single', {
            avoidEscape: true
        }],
        'eol-last': 0,
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    }
}