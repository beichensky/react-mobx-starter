const HTMLWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const { 
    appSrc,
    appDist,
    appIndex,
    appHtml,
    appUtils,
    appPages,
    appComponents,
    appNodeModules,
} = require('../config/paths');


module.exports = {
    entry: {
        main: [appIndex],
        common: ['react', 'react-dom', 'react-router-dom', 'mobx']
    },
    output: {
        filename: 'public/js/[name].[hash:8].js',
        path: appDist,
        publicPath: '/'
    },
    plugins: [
        // 自动在出口目录生成 html 并自动引入 js 文件
        new HTMLWebpackPlugin({
            template: appHtml,
            filename: 'index.html'
        }),
        // 在命令行展示更清晰地提示信息
        new FriendlyErrorsWebpackPlugin()
    ],
    module: {
        rules: [
            // 解析 js
            {
                test: /\.(js|jsx)$/,
                // loader: 'babel-loader?cacheDirectory',
                include: [ appSrc ],
                exclude: /node_modules/,
                use: ['babel-loader?cacheDirectory', 'eslint-loader']
            },
            // 解析样式
            {
                test: /\.(css|less)$/,
                exclude: /node_modules/,
                use: [
                    {
                        // 使用 MiniCssExtractPlugin.loader 代替 style-loader
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            modules: true,
                            localIdentName: '[local].[hash:8]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [autoprefixer()]
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            {
                test: /\.(css|less)$/,
                include: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {}
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [autoprefixer()]
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            // 解析图片资源
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            // 解析 字体
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            // 解析数据资源
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            // 解析数据资源
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            },
            // 解析 MakeDown 文件
            {
                test: /\.md$/,
                use: [
                    'html-loader',
                    'markdown-loader'
                ]
            }
        ]
    },
    resolve: {
        // 设置别名
        alias: {
            src: appSrc,
            utils: appUtils,
            pages: appPages,
            components: appComponents
        },
        // 设置模块查找范围
        modules: ['node_modules', appNodeModules]
    }
};