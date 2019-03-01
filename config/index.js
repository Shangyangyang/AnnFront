var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '',
    productionSourceMap: false,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  },
  
  dev: {
    env: require('./dev.env'),
    port: 8888,							// 端口
    autoOpenBrowser: true,	// 是否自动打开浏览器
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    context: ['/ann','/captcha'],			// 斜杠后面一定要添加别名，原因暂时不明
    cssSourceMap: false
  }
  
}
