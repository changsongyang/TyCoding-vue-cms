<template>
    <div>
        <!-- 轮播图 -->
        <swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>

        <!-- 九宫格布局 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist">
                    <span class="mui-icon mui-icon-home"></span>
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/photolist">
                    <span class="mui-icon mui-icon-image"><span class="mui-badge">5</span></span>
                    <div class="mui-media-body">图片分享</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/goodslist">
                    <span class="mui-icon mui-icon mui-icon-trash"></span>
                    <div class="mui-media-body">商品购买</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist">
                    <span class="mui-icon mui-icon mui-icon-chatbubble"></span>
                    <div class="mui-media-body">留言反馈</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist">
                    <span class="mui-icon mui-icon-search"></span>
                    <div class="mui-media-body">视频专区</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist">
                    <span class="mui-icon mui-icon-phone"></span>
                    <div class="mui-media-body">联系我们</div>
                </router-link>
            </li>
        </ul> 
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
import swiper from '../subcomponents/swiper.vue'
export default {
    data() {
        return {
            lunbotuList: [] //存放轮播图的数组
        }
    },
    created() {
        this.getLunbotu();
    },
    methods: {
        //获取轮播图
        getLunbotu() {
            //使用的假数据，详细的JSON数据请看 `/api` 目录
            this.$http.get('/api/lunbotu.json').then(result => {
                if (result.body.code == 200) {
                    this.lunbotuList = result.body.data;
                } else {
                    //失败
                    Toast("加载轮播图失败");
                }
            });
        },
    },
    components: {
        swiper
    }
}
</script>

<style lang="scss" scoped>
    body {
        background-color: #fff;
    }
    .mui-grid-view .mui-grid-9 {
        background-color: #fff;
        border: none;
    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell {
        border: 0;
    }
</style>
