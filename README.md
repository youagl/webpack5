npm init -y
npm i -g yarn  //如果安装过yarn就不用运行了
yarn add webpack webpack-cli -D

创建src/main.js
创建build/webpack.common.js

调整 package.json 文件，以便确保我们安装包是私有的(private)，并且移除 main 入口。这可以防止意外发布你的代码。

在不使用webpack构建命令脚本时，使用  npx webpack ./src/main.js 去生成翻译后的文件

在package.json文件下，创建一个运行webpack命令构建脚本
执行npm run build将会在dist文件下生成相应的js文件

html-webpack-plugin将为你生成一个HTML5文件，在body中使用script标签引入你所有webpack生成的bundle

需要安装模板插件，安装命令
yarn add -D html-webpack-plugin

配置webpack.common.js的plugins

重新执行npm run build后，在dist文件夹下会生成了html并引入了main.bundle.js

配置相关loader

安装lodash
npm install --save lodash

加载css 
安装：yarn add css-loader style-loader -D
css-loader
style-loader

加载图片和文件
yarn add file-loader url-loader -D