import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
//时间插件
// import moment from 'moment'

//导入MUI库
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

//安装模块
Vue.use(VueRouter);
Vue.use(VueResource);


//设置全局请求根路径，我这里仅用来模拟数据，详细数据请看 `/api/`
Vue.http.options.root = 'http://127.0.0.1/';
// 导入格式化时间的插件
import moment from 'moment'
//定义全局过滤器
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern)
});

//按需导入Mint-UI组件
// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
// Vue.component(Header.name, Header); 
// Vue.component(Swipe.name, Swipe); 
// Vue.component(SwipeItem.name, SwipeItem); 
// Vue.component(Button.name, Button); 
// Vue.use(Lazyload);
import MintUI from 'mint-ui'
Vue.use(MintUI);

import app from './App.vue'
import router from './router.js'

//Vue实例 
var vm = new Vue({
    el: '#app',
    data: {

    },
    render: c => c(app),
    router //将路由对象挂载到 Vue实例上
});

