const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const os = require('os');
const common = require('./webpack.common');
const { appPublic, appPackageJson } = require('../config/paths');
const proxy = require('../config/proxy');
const { 
    protocol,
    host,
    port
} = require('../config/devServer');


// 在开发环境中获取局域网中的本机iP地址
const interfaces = os.networkInterfaces();
let IPAddress = '';
for(var devName in interfaces){
  var iface = interfaces[devName];
  for(var i=0;i<iface.length;i++){
        var alias = iface[i];
        if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){  
            IPAddress = alias.address;
        }
    }
}

const config = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        // 作为服务器发布的目录
        contentBase: appPublic,
        // 热加载
        hot: true,
        // host 地址
        host,
        // 端口号
        port,
        historyApiFallback: true,
        open: true,
        // 是否在浏览器蒙层展示错误信息
        overlay: true,
        inline: true,
        // 展示的统计信息
        stats: 'errors-only',
        logLevel: 'silent',
        quiet: true,
        // 配置代理
        proxy
    },
    plugins: [
        // 热加载插件
        new webpack.HotModuleReplacementPlugin(),
        // 提取 css 文件
        new MiniCssExtractPlugin({
            filename: 'public/styles/[name].css',
            chunkFilename: 'public/styles/[name].chunk.css'
        }),
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [`You can now view ${require(appPackageJson).name} in the browser.\r\n`, 
                    ` Local:            ${protocol}://${host}:${port}`,
                    ` On Your Network:  ${protocol}://${IPAddress}:${port}`
                ]
            },
            clearConsole: true
        })
    ]
});

module.exports = config;