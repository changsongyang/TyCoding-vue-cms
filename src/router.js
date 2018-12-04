//导入vue-router模块
import VueRouter from 'vue-router'

//导入路由组件
//首页
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
//新闻页
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
//图片页
import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
//商品页
import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'
import GoodsDesc from './components/goods/GoodsDesc.vue'
import GoodsComment from './components/goods/GoodsComment.vue'

//VueRouter实例
var router = new VueRouter({
    routes: [ //配置路由规则
        { path: '/', redirect: '/home' },
        { path: '/home', component: HomeContainer },
        { path: '/member', component: MemberContainer },
        { path: '/shopcar', component: ShopcarContainer },
        { path: '/search', component: SearchContainer },
        { path: '/home/newslist', component: NewsList },
        { path: '/home/newslist/:id', component: NewsInfo },
        { path: '/home/photolist/', component: PhotoList },
        { path: '/home/photoinfo/:id', component: PhotoInfo},
        { path: '/home/goodslist', component: GoodsList},
        { path: '/home/goodsinfo/:id', component: GoodsInfo },
        { path: '/home/goodsdesc/:id', component: GoodsDesc, name: 'goodsdesc' },
        { path: '/home/goodscomment/:id', component: GoodsComment, name: 'goodscomment' }

    ],
    linkActiveClass: 'mui-active' //添加一个active类属性，覆盖路由默认高亮的类
})

export default router