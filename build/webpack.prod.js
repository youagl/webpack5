const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
// 可视化webpack输出文件的体积
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// 生成环境开启gzip压缩
const CompressionPlugin = require("compression-webpack-plugin");
// css压缩
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// 配置全局变量
const env = require('../config/prod.env');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: "production",
  module: {
    //   猜测与html-webpack-plugin冲突，加上下面这段会报错
    // rules: [
    //     {
    //         test: /\.html$/i,
    //         loader: "html-loader",
    //         // options: {
    //         //   esModule: false, //在开发环境中启用false
    //         // },
    //     },
    // ],
  },
  plugins:[
      new BundleAnalyzerPlugin(),
      new webpack.DefinePlugin({
        "process.env":env,
      }),
      new CompressionPlugin(),
      new CssMinimizerPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      name: "vendor",
      cacheGroups: {
        "echarts.vendor": {
          name: "echarts.vendor",
          priority: 40,
          test: /[\\/]node_modules[\\/](echarts|zrender)[\\/]/,
          chunks: "all",
        },
        lodash: {
          name: "lodash",
          chunks: "async",
          test: /[\\/]node_modules[\\/]lodash[\\/]/,
          priority: 40,
        },
        "async-common": {
          chunks: "async",
          minChunks: 2,
          name: "async-commons",
          priority: 30,
        },
        commons: {
          name: "commons",
          chunks: "all",
          minChunks: 2,
          priority: 20,
        },
      },
    },
  },
});
