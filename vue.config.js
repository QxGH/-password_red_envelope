let config = {
    publicPath: "./",
    outputDir: "dist",
    lintOnSave: false,
    runtimeCompiler: false,
    productionSourceMap: false,
    devServer: {
        host: "0.0.0.0",
        port: 8085,
        https: false
    }
};

if(process.env.NODE_ENV == 'development') {
    // production 代理
    config.devServer.proxy = {
        '/api': {
            target: 'http://mock-api.com/ynWopyn6.mock',
            // target: 'http://192.168.2.60:8080/',
            changeOrigin: true,
            ws: true,
            pathRewrite: {
                '^/api': ''
            }
        }
    }
};

module.exports = config;