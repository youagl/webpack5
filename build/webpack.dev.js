const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");
const env = require('../config/dev.env');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: "development",
  devServer: {
    hot: true, //热更新
    open: true, //编译完自动打开浏览器
    compress: true, //开启gzip压缩
    port: 8088, //开启端口号
    //托管的静态资源文件
    //可通过数组的方式托管多个静态资源文件
    static: {
      directory: path.join(__dirname, "../public"),
    },
    client: {
      //在浏览器端打印编译进度
      progress: true,
    },
  },
  plugins:[
      new webpack.DefinePlugin({
          "process.env":env,
      })
  ]
});