/**
 * 使用 `npm run ftp` 上传完静态资源到CDN后：
 * 
 * 在把html文件提交/拷贝给 RD 之前，
 * 使用 `npm run verify` 验证是否无误
 */

var http = require('http')
var fs = require('fs')
var path = require('path')

var HTML_FILE = 'index.html'
var HTML_FILE_ABS_PATH = path.join( __dirname, '../build', HTML_FILE )



http.createServer(function(req, res) {
    if (req.url === '/' || req.url === '' || req.url.indexOf('/index.html')>-1) {
		fs.readFile(HTML_FILE_ABS_PATH, function(err, file) {
            res.setHeader('Cache-Control', "no-cache")
            res.setHeader('Content-Type', 'text/html')
            res.writeHead('200')
            res.end(file)
        })
    }/* else {
        console.log(req.url)
        fs.readFile('.'+req.url, function(err, file) {
            res.writeHead('200')
            res.end(file)
        })
    }*/
}).listen(80)