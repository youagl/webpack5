const path = require('path')
// 生成dist/index.html文件
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 增加编译进度条
const chalk = require("chalk");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
// 把css提取到单独的文件中，支持按需加载
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const isProd = process.env.NODE_ENV === "production"; //cross-env全局变量

console.log('process.env.NODE_ENV',process.env.NODE_ENV);

module.exports = {
    // mode:'development',
    entry:{
        main:path.resolve(__dirname,'../src/main.js'),//vue的入口文件
        index:path.resolve(__dirname,'../src/index.js'),//react的入口文件
    },
    output:{
        path:path.resolve(__dirname,'../dist'),
        filename:'[name].[contenthash:8].js',//[contenthash]将根据资源内容创建出唯一hash。当资源内容发生变化时，[contenthash]也会发生变化。
        clean:true //每次构建清除dist包
    },
    externals:{
        jquery:'jQuery',
        'vue':'Vue',
        'vue-router':'VueRouter',
    },
    resolve: {
        extensions: [".js", ".jsx", ".json", ".vue"], //省略文件后缀
        alias: { //配置别名
            "@": path.resolve(__dirname, "../src"),
        },
    },
    // devServer:{
    //     hot:true,//热更新开启
    //     open:true,
    //     compress:true,
    //     port:8088,
    //     static:{
    //         directory:path.resolve(__dirname,'../public'),
    //     },
    //     client:{
    //         progress:true
    //     }
    // },
    module: {
        rules: [
            {
                test:/\.vue$/,
                loader:'vue-loader',
                include:[path.resolve(__dirname,'../src')],
            },
            {
                test: /\.(css|scss|sass)$/,
                use: [
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    "autoprefixer",
                                ],
                            },
                        },
                    },
                    'sass-loader',
                ], //从右向左解析
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/, //加载图片资源
                loader: "url-loader",
                type: 'javascript/auto',//解决asset重复
                options: {
                  esModule: false, //解决html区域,vue模板引入图片路径问题
                  limit: 1000,
                  name: "static/img/[name].[hash:7].[ext]",
                },
              },
              {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,//加载视频资源
                loader: "url-loader",
                options: {
                  limit: 10000,
                  name: "static/media/[name].[hash:7].[ext]",
                },
              },
              {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, //加载字体资源
                loader: "url-loader",
                options: {
                  limit: 10000,
                  name: "static/fonts/[name].[hash:7].[ext]",
                },
              },
            // 使用url-loader可以限制limit大小，超出则另生成图片文件。而file-loader没有此功能
            // 将图片转成base64字符串后，内联到bundle.js文件中
            // {
            //     test: /.(jpg|png|gif)$/,
            //     use: {
            //       loader: 'url-loader',
            //       options: {
            //         // 占位符 placeholder
            //         name: '[name]_[hash].[ext]',
            //         outputPath: 'images/',
            //         limit: 2048
            //       }
            //     }
            // },
            // 在webpack5中，内置了资源模块（asset module），代替了file-loader和url-loader
            // 在rules下增加
            // {
            //     test: /\.(png|svg|jpg|jpeg|gif)$/i,
            //     type: "asset",
            //     generator: {
            //         filename: "static/img/[name].[hash:7].[ext]",
            //     },
            // },
            {
                test:/(\.jsx|\.js)$/,
                use:["babel-loader"],
                exclude:/node_modules/,
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
                options: {
                  esModule: false, //在开发环境中启用false
                 },
            },
        ],
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,"../public/index.html"),
            filename:"index.html",
        }),
        // 进度条
        new ProgressBarPlugin({
            format: `  :msg [:bar] ${chalk.green.bold(":percent")} (:elapsed s)`,
        }),
        new MiniCssExtractPlugin({
            filename:"static/css/[name].css",
        }),
        new VueLoaderPlugin(),
    ]
}