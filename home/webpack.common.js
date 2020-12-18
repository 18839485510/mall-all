const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { type } = require('os');

//生成HtmlWebpackPlugin的配置项
const getHtmlConfig = (name, title) => ({
    template: './src/view/' + name + '.html',
    filename: name + '.html',
    title: title,
    //inject:'true',//script标签写在哪里，默认为body标签里
    hash: 'true',//给生成的文件添加一个额外的唯一的hash标识
    chunks: ['common', name]
})
module.exports = {
    entry: {//对象写法指定需要打包的入口文件
        //chunk名称:入口文件路径
        'common': './src/pages/common/index.js',
        'index': './src/pages/index/index.js',
        'list': './src/pages/list/index.js',
        'user-login': './src/pages/user-login/index.js',
        'user-dynamic-login': './src/pages/user-dynamic-login/index.js',
        'user-register': './src/pages/user-register/index.js',
        'result': './src/pages/result/index.js',
    },
    output: {
        filename: 'js/[name]-[chunkhash].bundle.js',
        publicPath: '/',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        alias: {
            pages: path.resolve(__dirname, 'src/pages/'),
            utils: path.resolve(__dirname, 'src/utils'),
            api: path.resolve(__dirname, 'src/api'),
        }
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
                        presets: ['env', 'es2015', 'stage-3']
                    }
                }
            },
            //处理tpl文件
            {
                test: /\.tpl$/,
                use: {
                    loader: 'html-loader',
                }
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                    },
                    {
                        loader: 'less-loader', // compiles Less to CSS
                    },
                    {
                        loader: 'style-resources-loader',
                        options: {
                            patterns: [
                                './src/pages/common/them.less',
                                './src/pages/common/iconfont.css'
                            ]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(getHtmlConfig('index', '商城-首页')),
        new HtmlWebpackPlugin(getHtmlConfig('list', '商城-列表页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-dynamic-login', '用户动态登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('result', '结果提示')),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[fullhash].css'
        }),
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
};