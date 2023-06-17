/* eslint-disable indent */
// 导入 HtmlWebpackPlugin 模块
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 导入mini-css-extract-plugin插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');

// 将模块导出
module.exports = {
    // 出口文件的配置
    output: {
        // 指定出口文件的名称
        filename: './js/main.[contenthash:8].js', // 解决多个入口文件打包到1个出口文件时会发生冲突

        // 文件的路径
        path: path.resolve(__dirname, 'dist'), // 绝对路径

        // 清理冗余文件
        clean: true,
    },
    mode: process.env.NODE_ENV,
    // 配置插件（在模块被加载到 bundle 中前预处理源码）
    plugins: [
        new HtmlWebpackPlugin({
            // 指定要使用的 HTML 模板文件
            template: './public/index.html',
            // 设置 HTML 页面的标题
            // eslint-disable-next-line quotes
            title: "webpack练习",
            // 配置引入的 CDN 资源文件
            cdn: {
                script: [
                    'https://cdn.bootcdn.net/ajax/libs/jquery/3.6.4/jquery.min.js',
                    'https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.core.min.js',
                ],
                // 空数组代表不需要引入样式文件
                style: [],
            },
        }),

        // 配置MiniCssExtractPlugin插件
        new MiniCssExtractPlugin({
            filename: './css/main.[contenthash:8].css', // 新成功的文件的名称
        }),
    ],
    // module 添加模块资源的配置，值是对象
    module: {
        rules: [
            // 解析txt文件
            {
                test: /\.txt$/,
                type: 'asset/source',
            },

            // 解析 png|jpe?g|gif 格式图片并输出到images文件夹内
            {
                test: /\.(png|jpe?g|gif)$/i, // 图片的格式
                type: 'asset/resource', // 载入资源
                generator: { // 输出格式
                    filename: './images/[contenthash:8][ext]',
                },
            },

            // 解析css|less文件
            {
                test: /\.(css|less)$/i, // 匹配所有.css文件
                use: [
                    MiniCssExtractPlugin.loader, // 使用MiniCssExtractPlugin.loader提取CSS为独立文件
                    'css-loader', // 处理CSS文件
                    'less-loader', // 将Less编译为CSS
                ],
            },

            // 导入字体图标/自定义字体
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/i, // 字体的格式
                type: 'asset/resource', // 载入资源
                generator: { // 输出格式
                    filename: './icon/[contenthash:8][ext]',
                },
            },
        ],
    },
    // 配置外部依赖项
    externals: {
        // 将从 "jquery" 模块中引入的内容映射为全局变量 jQuery
        jquery: 'jQuery', // import jQuery from "jquery"
        // 将从 "lodash" 模块中引入的内容映射为全局变量 _
        lodash: '_',
    },
    // 配置 Webpack-dev-server 服务器
    devServer: {
        // 启动服务器自动打开默认浏览器
        open: true,

        // 配置前端请求代理，将匹配到的请求转发到指定地址
        proxy: {
            // 在开发环境下面代理的目标是 http://127.0.0.1:3000
            // 在生产环境下面代理的目标是 http://api.cc0820.top:3000

            '^/api': {
                target:
                    // eslint-disable-next-line no-nested-ternary
                    process.env.NODE_ENV === 'development'
                        ? 'http://127.0.0.1:3000'
                        : process.env.NODE_ENV === 'production'
                            ? 'http://api.cc0820.top:3000'
                            : '',

                pathRewrite: { '/api': '' },
            },
        },

        // 配置客户端
        client: {
            // 禁用错误提示蒙版
            overlay: false,
        },
    },
    // 配置 Webpack 的路径解析规则
    resolve: {
        // 别名配置，以 "@" 为例
        alias: {
            // 将 "@"" 指向 "./src" 目录
            '@': path.resolve(__dirname, './src'),
        },
        extensions: ['.js', '.json', '.css'],
    },
};
