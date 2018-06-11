// 一个常见的`webpack`配置文件
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require("path")

module.exports = {
    devtool: 'eval-source-map',
        // target: 'electron-renderer',
        entry: __dirname + "/src/index.js", //已多次提及的唯一入口文件
        output: {
            // path: __dirname + "/dist",
            path: path.resolve(__dirname, '/dist'),
            filename: "bundle.js"
        },
        devtool: 'none',
        devServer: {
            contentBase: "./public", //本地服务器所加载的页面所在的目录
            historyApiFallback: true, //不跳转
            inline: true,
            hot: true
        },
        module: {
            rules: [
                {
                    test: /(\.jsx|\.js)$/,
                    use: {
                        loader: "babel-loader"
                    },
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: "style-loader"
                        }, {
                            loader: "css-loader",
                            // options: {
                            //     modules: true, // 指定启用css modules
                            //     // localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
                            // }
                        }, {
                            loader: "postcss-loader"
                        }
                    ]
                },{
                    test: /\.less$/,
                    use: [
                      'style-loader',
                      { loader: 'css-loader', options: { importLoaders: 1 } },
                      'less-loader'
                    ]
                },{
                    test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                    loader: 'file-loader'
                },
                {test: /\.json$/,loader: 'json-loader'},
                {test: /\.html$/,loader: 'raw-loader'},
            ]
    },
    resolve: {
        extensions: ['.js', '.jsx'], //后缀名自动补全
    },
    
    node: {
        console: false,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        // new HtmlWebpackPlugin({
        //     template: __dirname + "/public/index.html" //new 一个这个插件的实例，并传入相关的参数
        // }),
        new webpack.HotModuleReplacementPlugin()//热加载插件
        // new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.optimize.UglifyJsPlugin(),
        // new ExtractTextPlugin("style.css")
    ],
    // target: 'electron-renderer'
}