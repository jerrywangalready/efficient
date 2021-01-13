module.exports = {
    outputDir: 'dist', //build输出目录
    assetsDir: 'assets', // 静态资源目录(js,css,img)
    lintOnSave: false, // 是否开启eslint
    devServer: {
        open: true, // 是否自动弹出浏览器页面
        host: "localhost",
        port: '8080',
        https: false,
        hotOnly: false, // 是否开启热更新
        proxy: {
            'api': {
                target: 'http://127.0.0.1:10927/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}