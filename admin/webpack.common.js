const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { type } = require('os');
module.exports = {
    entry: {
        index: './src/index.js'
    },
    output: {
        filename: '[name]-bundle.js',
        publicPath: '/',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        //配置loader
        rules: [
            //处理css
            {
                test: /\.css$/, //标识出需要进行转换文件类型,这里指的是所有以.css结尾的文件
                /*
                use: [  //转换时应该使用的loader
                    'style-loader',
                    'css-loader'
                ]*/
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },

            //处理图片
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 17313, //当图片大小超过limit值后,会生成一个文件,否则生成Data URL
                        }
                    }
                ]
            },
            //babel处理ES6
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        //presets: ['env', 'react'],
                        presets: ['env', 'es2015', 'react', 'stage-3'],
                        plugins: [["import", { "libraryName": "antd", "libraryDirectory": "es", "style":true }]]
                    }
                }
            },
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader',
                  }, {
                    loader: 'css-loader', // translates CSS into CommonJS
                  }, {
                    loader: 'less-loader', // compiles Less to CSS
                   options: {
                     lessOptions: { // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
                       modifyVars: {
                         'primary-color': '#1DA57A',
                         'link-color': '#1DA57A',
                         'border-radius-base': '2px',
                       },
                       javascriptEnabled: true,
                     },
                   },
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            //inject:'true',//script标签写在哪里，默认为body标签里
            hash: 'true',//给生成的文件添加一个额外的唯一的hash标识
            chunks: ['index']
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[fullhash].css'
        }),
        new CleanWebpackPlugin()
    ]
};