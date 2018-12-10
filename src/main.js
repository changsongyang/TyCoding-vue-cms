import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);
import Vuex from 'vuex'
Vue.use(Vuex);
import VueResource from 'vue-resource'
Vue.use(VueResource);

//每次进入网站中，都会经过main.sj，那么应该每次进入网站，都将本地储存的商品数据读取出来
var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
    state: { //this.$store.state.***
        car: car //将购物车中的商品数据用一个数组储存起来，在car数组中，储存商品对象的数据
    },
    mutations: { //this.$store.commit('方法名称', '按需传递的参数')
        //点击加入购物车，将购物车数据储存到store的car数组上
        addToCar(state, goodsInfo) {
            //1.如果购物车中有这个商品，就更新数量，
            //2.如果没有。就直接将商品数据push到car中
            var flag = false; //标识符，假设在购物车中没有找到对应的商品
            state.car.some(item => {
                if(item.id == goodsInfo.id) {
                    item.count += parseInt(goodsInfo.count);
                    flag = true; //证明找到了，就增加数量
                    return true;
                }
            });
            //如果在购物车中没有找到该商品，就直接添加到state中
            if(!flag) {
                state.car.push(goodsInfo);
            }

            //将商品数据储存到localStorage本地储存中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsInfo(state, goodsInfo) {
            //修改购物车中商品的数量值
            state.car.some(item => {
                if(item.id == goodsInfo.id) {
                    item.count = parseInt(goodsInfo.count);
                    return true;
                }
            });
            //当修改完商品的数量，将最新的购物车数据更新到本地储存中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        removeFormCar(id) {
            //根据ID，从store中的购物车中删除对应的那条商品的数据
            console.log(id);
        }
    },
    getters: { //this.$store.getters.***
        getAllCount(state) {
            var c = 0;
            state.car.forEach(item => {
                c += item.count;
            });
            return c;
        },
        getGoodsCount(state) {
            var o = {};
            state.car.forEach(item => {
                o[item.id] = item.count
            });
            return o;
        },
        getGoodsSelected(state) {
            var o = {};
            state.car.forEach(item => {
                o[item.id] = item.selected;
            });
            return o;
        }
    }
});

// 导入格式化时间的插件
import moment from 'moment'
//定义全局过滤器
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern)
});

//导入MUI库
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

//设置全局请求根路径，我这里仅用来模拟数据，详细数据请看 `/api/`
Vue.http.options.root = 'http://127.0.0.1/';
Vue.http.options.emulateJSON = true;

// 导入 MUI 的样式
import './lib/mui/css/mui.min.css'
// 导入扩展图标样式
import './lib/mui/css/icons-extra.css'
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

import app from './App.vue'
import router from './router.js'

//Vue实例 
var vm = new Vue({
    el: '#app',
    data: {

    },
    render: c => c(app),
    router, //将路由对象挂载到 Vue实例上
    store //挂载Vuex对象
});