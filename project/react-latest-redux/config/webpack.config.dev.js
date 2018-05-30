const filenames = require('./filenames').dev;
const alias = require('./alias');

module.exports = {
    entry: {
        vendor: ['react-router-dom', 'query-string'],
    },
    output: {
        // publicPath: '/abc/',
        filenames: filenames
    },
    resolve: {
        alias: alias
    },
    externals: {
        // echarts : {
        //     root: "echarts", // 指向全局变量
        //     entry: { // cdn地址
        //         path: 'https://cdnjs.cloudflare.com/ajax/libs/echarts/4.0.2/echarts.js',
        //         type: 'js',
        //     },
        //     files: ['index.html', 'test.html'] // 适用于哪个文件
        // },
        // jquery: {
        //     root: "jQuery", // window.jQuery
        //     entry: { // cdn地址
        //         path: 'http://code.jquery.com/jquery-3.3.1.min.js',
        //         type: 'js',
        //     },
        //     files: ['index.html'] // 适用于哪个文件
        // }
    },
    cssModule: {
        exclude: ['src/static', 'node_modules'],
        localIdentName: '[name]__[local]-[hash:base64:5]',
        // getLocalIdent: (context, localIdentName, localName, options) => {
        //     return '[folder]__[local]-[hash:base64:5]'
        // }
    }
    // plugins: []
};
