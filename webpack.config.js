
//处理路径的模块
const path = require('path')
//webpack模块
const webpack  = require('webpack')
//自动生成HTML插件
var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, './src/main.js'), //入口
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js' //配置输出的文件名
    },
    devServer: {
        hot: true, 
        open: true,
        port: 3000,
    },
    plugins: [ //添加plugins节点配置插件
        new webpack.HotModuleReplacementPlugin(),
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html'
        })
    ],

    //打包配置
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }, // 处理 CSS 文件的 loader
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }, // 处理 less 文件的 loader
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }, // 处理 scss 文件的 loader
            { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=7631&name=[hash:8]-[name].[ext]' }, // 处理 图片路径的 loader
            // limit 给定的值，是图片的大小，单位是 byte， 如果我们引用的 图片，大于或等于给定的 limit值，则不会被转为base64格式的字符串， 如果 图片小于给定的 limit 值，则会被转为 base64的字符串
            { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' }, // 处理 字体文件的 loader 
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }, // 配置 Babel 来转换高级的ES语法
            { test: /\.vue$/, use: 'vue-loader' } // 处理 .vue 文件的 loader
        ]
    },

    resolve: {
        alias: {
            //alias别名配置，为vue库配置别名，在main.js中就可以直接使用 `import Vue from 'vue'`即可导入Vue，不然导入的是阉割版的Vue
            'vue$': 'vue/dist/vue.esm.js'
        }
    }
}