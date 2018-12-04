<template>
    <div>
        <!-- 顶部滑动栏 -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item', item == '全部' ? 'mui-active' : '']" href="#" v-for="(item, index) in cates" :key="index">
                        {{item}}
                    </a>
                </div>
            </div>
        </div>
        <!-- 图片列表 -->
        <ul class="photo-list">
            <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
                <img v-lazy="item.url">
                <div class="info">
                    <h1 class="info-title">{{item.description}}</h1>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>

//导入MUI的库
import mui from '../../lib/mui/js/mui.min.js'
//初始化滑动控件
mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005
});

export default {
    data() {
        return {
            cates: ['全部', '娱乐', '科技', '古风', '音乐'],
            list: [], //图片列表
        }
    },
    created() {
        this.getAllCategory();
    },
    mounted() {
        // 当 组件中的DOM结构被渲染好并放到页面中后，会执行这个 钩子函数
        // 如果要操作元素了，最好在 mounted 里面，因为，这里时候的 DOM 元素 是最新的
        // 2. 初始化滑动控件
        mui(".mui-scroll-wrapper").scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    methods: {
        getAllCategory() {
            this.$http.get('/api/photolist.json').then(result => {
                if (result.body.code == 200) {
                    this.list = result.body.data;
                } else {
                    //失败
                    Toast("加载图片失败");
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
* {
    touch-action: pan-y;
}
.photo-list{
    list-style: none;
    margin: 0;
    padding: 10px;
    li{
        background-color: #ccc;
        text-align: center;
        margin-bottom: 10px;
        padding-bottom: 0;
        box-shadow: 0 0 6px #999;
        position: relative;
        img {
            width: 100%;
            vertical-align: middle;
        }
        img[lazy="loading"]{
            width: 40px;
            height: 300px;
            margin: auto;
        }
        .info{
            color: white;
            text-align: left;
            position: absolute;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.4);
            .info-title {
                font-size: 14px;
            }
        }
    }
}
</style>
