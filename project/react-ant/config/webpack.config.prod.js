const alias = require('./alias');
const filenames = require('./filenames');
const externals = require('./externals');

module.exports = {
    // todo: 只支持entry.vendor, plugins，其他的字段都会被忽略用默认的
    entry: {
        vendor: ['react-router-dom'],
    },
    resolve: {
        alias: alias
    },
    output: {
        publicPath: '//j1.58cdn.com.cn/jinrong/xxx',
        // publicPath: '.',
        // 如果不同资源用不同的cdn，则可以采用对象形式
        // publicPath: {
        //     js: 'https://j1.58cdn.com.cn/jinrong/finance-pay',
        //     css: 'https://j1.58cdn.com.cn/jinrong/finance-pay',
        //     img: 'https://j1.58cdn.com.cn/jinrong/finance-pay',
        //     media: 'https://j1.58cdn.com.cn/jinrong/finance-pay'
        // },
        filenames: filenames.prod
    },
    externals: externals
    // cssModule: {
    //     exclude: ['src/static', 'node_modules'],
    //     name: '[name]__[local]-[hash:base64:5]'
    // }
    // plugins: isAnalyzeMode ? [new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)()] : []
};
