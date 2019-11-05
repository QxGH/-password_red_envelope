module.exports = {
    publicPath: "./",
    outputDir: "dist",
    lintOnSave: false,
    runtimeCompiler: false,
    productionSourceMap: false,
    devServer: {
        host: "0.0.0.0",
        port: 8085,
        https: false,
        proxy: {
            '/api': {
                target: 'http://192.168.2.60:8080/',
                changeOrigin: true,   //允许跨域
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
};