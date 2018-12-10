# 基于Vue组件开发的手机端项目

**涉及到的技术：**

* Mint-UI  MUI
* webpack vue vuex vue-router vue-resource 

# 笔记

## npm i

> 基本命令

```
# 初始化项目
npm init
```

> 切换NPM镜像源：nrm

```
# 全局安装
npm i nrm -g

# 查看所有源
nrm ls

# 切换源
nrm use xx
```

> 项目构建工具：webpack

```
# 全局安装
npm i webpack -g 

# 全局安装后再安装到项目依赖中
npm i webpack --save-dev

# 运行项目需要用webpack打包处理浏览器才能识别高级JS语法。
# 语法： webpack 项目入口JS文件  打包后的JS保存的路径和名称
webpack src/js/main.js dist/bundle.js  
```

**使用webpack的配置文件简化打包时的命令**

在项目根目录下创建`webpack.config.js`

```javascript
//导入处理路径的模块
var path = require('path');

//导入一个配置对象，webpack启动时会自动查看这个webpack.config.js文件中配置对象并进行打包处理
module.exports = {
    entry: path.resolve(__dirname, 'src/js/main.js'), //项目入口文件
    output: {
        path: path.resolve(__dirname, 'dist'), //配置输出路径
        filename: 'bundle.js' //配置输出文件名
    }
}
```

**实现webpack实时打包构建**

1. 运行`npm i webpack-dev-server --save-dev`安装到开发依赖。
2. 修改`package.json`文件，在`scripts`节点下新增`"dev": "webpack-dev-server"`指令，即可实现实时打包构建，但是实际上`dist`中并没有生成`bundle.js`文件，因为这个`bundle.js`实际上存在于内存中，不存在物理磁盘上，也也就是为什么可以实现实时打包构建。

**使用`html-webpack-plugin`插件配置启动页面**

1. 运行`npm i html-webpack-plugin --save-dev`安装到开发依赖
2. 修改`webpack.config.js`配置如下：

```javascript
// 导入处理路径的模块
var path = require('path');
// 导入自动生成HTMl文件的插件
var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src/js/main.js'), // 项目入口文件
    output: { // 配置输出选项
        path: path.resolve(__dirname, 'dist'), // 配置输出的路径
        filename: 'bundle.js' // 配置输出的文件名
    },
    plugins:[ // 添加plugins节点配置插件
        new htmlWebpackPlugin({
            template:path.resolve(__dirname, 'src/index.html'),//模板路径
            filename:'index.html'//自动生成的HTML文件的名称
        })
    ]
}
```

那么如上`html-webpack-plugin`插件，会将`bundle.js`自动注入到`index.html`入口页面中。

> 实现热部署

```javascript
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
}
```

> 实现打包各种文件

```javascript

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
```

> Vue

1. 运行`npm i vue -S`将vue安装为运行依赖。
2. 运行`npm i vue-loader vue-template-compiler -D`将解析转换vue的包安装为开发依赖。
3. 运行`npm i style-loader css-loader -D`将解析装换CSS的包安装为开发依赖。


## 父子组件

在Vue实例中注册组件：

```javascript
import login from './login.vue'

new Vue({
    el: '#app',
    components: {
        login
    }
})
```

### 父组件向子组件传值

比如在父组件中定义子组件：

```html
<div id="app">
    <son :info="msg"></son>
</div>
```

那么在组件中获取到这个`info`中的数据：

```javascript
data() {
    return {}
},
methods: {},
props: ['info']
```

即可获取到父组件传递来的数据，注意：这个`props`属于`new vue()`根路径下的属性，不属于`data`。如果获取父组件传进来的多个擦书，使用逗号隔开即可获取。

### 子组件向父组件传值

在父组件中定义：

```html
<son @func="getMsg"></son>

//Vue实例
methods: {
    //父组件注册的方法，子组件通过`this.$emit()`的方式调用这个方法将参数传递给父组件的val。
    getMsg(val) {
        console.log("这是子组件传递来的数据：" + val);
    }
}
```

那么在子组件中通过`this.$emit('方法名', 要传递的数据)`的方式调用父组件中的方法，传递数据。

```html
<input type="button" value="向父组件传值" @click="sendMsg">

//Vue实例
methods: {
    sendMsg() {
        this.$emit('func', '我是来自子组件的数据');
    }
}
```

### $refs

`this.$refs`可以获取元素和组件（以及组件中的元素）。

* 如果在HTML中定义了 `ref="xx"` 那么在Vue实例中通过`this.$refs.xx`就能获取到当前定义`ref="xx"`的DOM元素。

* 如果在组件引用上（比如`<son ref="xx">`）上使用了`ref`，那么在父组件Vue实例中通过`this.$refs`获取到的是整个子组件的对象，可以通过`.`的方式调用子组件`data`和`methods`中绑定数据。

## 路由

* 后端路由：不同的URL对应不同的资源
* 前端路由：主要通过hash(#)来实现不同页面之间的切换。且HTTP请求中不包含hash相关的内容。

安装命令：

```
npm i vue-router -S
```

路由导航组件，类似与`<a>`标签，其中的`to=""`类似于`href=""`

```html
<router-link to="路由地址"></router-link>
```

页面展示路由匹配到的组件：

```html
<router-view></router-view>
```

创建VueRouter对象

```javascript
var router = new VueRouter({
    router: [
        { path: '', component: '' }
    ]
})
```

其中`router: []`是一个数组，其中可以包含多个路由导航匹配规则，其中`path`表示匹配的路径地址，`component`表示组件名称。

通过`new VueRouter`的方式创建的络路由对象，需要注册到Vue实例对象中：

```javascript
new Vue({
    el: '#app',
    router: router
})
```

可以将VueRouter路由规则单独提取到`router.js`中，但是根据语法，我们需要将`router.js`中的数据暴露到给外部，那么外部（`main.js`）通过`import './router.js'`的方式可以引入这个`router.js`，相当于`<script>`标签引入，但是`import`这种方式可以实现在一个js中直接引入外部js文件，那么如何暴露`router.js`中的数据呢？

```javascript
import VueRouter from 'vue-router'  //这中方式会直接引用node_modules下的库

var router = new Router({
    routes: [
        { path: '', component: '' }
    ]
});

export default router
```

其中`export default router`即可将这个`var router`对象暴露给外部，那么我们在`main.js`中如何引用这个js并注册router呢？

```javascript
import router from './router.js'

var vm = new Vue({
    el: '#app',
    render: c => c(app)
    router //将router对象挂载到Vue实例上
})
```

如上，在Vue实例中注册`router`，根据ES6语法，属性名和值相同的，可省略写一个。


### 路由传值

当想要在路由跳转页面的时候传递数据到另一个页面，比如id的，可以在路由匹配规则中定义：

```javascript
routes: [
    { path: '/index/:id', component: index }
]
```

那么在匹配这个路由地址的时候，可以使用：

```html
<v-router to="/index/2"></v-router>
```

如上我们传递一个参数`id`给`/index`这个路由地址，且这个参数`id`的值是`2`，那么在匹配到的路由组件(`index`)中如何获取这个id值？

```javascript
this.$route.params.id
```

### 路由嵌套

```javascript
routes: [
    {
        path: '/index',
        component: index,
        children: [
            { path: 'xx', component: xx } //注意子路径的开头位置不要加 / 修饰符
        ]  
    }
]
```

## watch

使用`watch`可以监听Vue实例中属性值的变化：

```javascript
new Vue({
    el: '#app',
    data() {
        name: '',
    }
    watch: {
        'name': function(newVal, oldVal) {
            console.log("name变化前的值：" + newVal + ", name变化后的值：" + oldVal);
        }
    }
})
```

### 监听路由状态的改变

```javascript
watch: {
    '$route': function(newVal, oldVal) {

    }
}
```

## computed

`computed`监听的属性一旦变化，就会自动触发监听，其属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。

```javascript
new Vue({
    el: '#app',
    data() {
        name: ''
    },
    computed: {
        name() {
            return this.name + "--->";
        }
    }
});
```
