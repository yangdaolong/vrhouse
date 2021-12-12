const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = ["js", "css"];
const webpack = require("webpack");

module.exports = {
  devServer: {
    port: 8084,
    disableHostCheck: true,
    proxy: {
      "/api_pc/": {
        target: "https://jt.xraybot.com/api_pc/", //API服务器的地址
        ws: true, //代理websockets
        changeOrigin: true, // 虚拟的站点需要更管origin
        pathRewrite: {
          //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
          "/api_pc/": ""
        }
      }
    }
  },
  publicPath: "/",
  assetsDir: "public",
  configureWebpack: {
    devtool: "source-map",
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // 配置compression-webpack-plugin压缩
      new CompressionWebpackPlugin({
        algorithm: "gzip",
        test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
        threshold: 10240,
        minRatio: 0.8
      }),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 5,
        minChunkSize: 100
      })
    ]
  },
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "";
      return args;
    });
  }
};
