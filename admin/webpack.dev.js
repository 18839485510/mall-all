const {merge} =require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common,{
    mode:'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',//内容的目录,将dist目录下的文件serve到localhost:8080下运行
        port: 3001,//服务运行的端口
        open:true,//自动打开浏览器窗口
        historyApiFallback:true,//阻止发送网络请求
        proxy: {
            '/v1': 'http://127.0.0.1:3000'
          } 
    }
})