## 开发环境


1.  使用 `npm run mock` 启动 mock server。(默认端口8004)

1. 使用 `npm run start` 启动 `webpackDevServer`。(默认端口8003)

	> mock server实时读取 `./mock` 目录下资源，每次修改无需重启




## 和后端联调


1. 修改 `package.json` 里 `proxy`， 指向RD的server

1. 使用 `npm start` 重新启动 `webpackDevServer`




## 发布到生产环境


1. 配置 `package.json` 里 `homepage`属性，使所有静态资源 (默认会被编译到 `./build/static` 目录) 自动增加 CDN域名

	> `package.json`配好后可跳过该步骤

1. 使用 `npm run build` 编译

1. 配置 `./scripts/upload_cdn_conf.js`， 指定静态资源上传的CDN目录(和上面的 `homepage` 对应)

	> `upload_cdn_conf.js`配好后可跳过该步骤

1. 使用 `npm run cdn` 上传 `./build/static` 资源到CDN

1. 使用 `npm run verify` 确认CDN资源无误 ( 浏览器访问 http://localhost/index.html )

1. 把`index.html` 给到后端











