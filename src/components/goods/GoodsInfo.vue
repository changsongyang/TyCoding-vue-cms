<template>
    <div class="goodsinfo-container">
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>
        
        <!-- 商品轮播图区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
                </div>
            </div>
        </div>
        
        <!-- 商品购买区域 -->
        <div class="mui-card">
            <div class="mui-card-header">{{goodsinfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<del>￥{{goodsinfo.cost_price}}</del>&nbsp;&nbsp;销售价：<span class="now_price">￥{{goodsinfo.price}}</span>
                    </p>
                    <!-- 通过 `:` 方式可以向子组件传值，但是$http.get 是primary的异步操作，可能数据还没有请求到就已经将数据传给了子组件 undefined -->
                    <p>购买数量：<numbox @getcount="getSelectedCount" :max="goodsinfo.goods_count"></numbox></p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>

        <!-- 商品参数区域 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{goodsinfo.goods_no}}</p>
                    <p>库存情况：{{goodsinfo.goods_count}}</p>
                    <p>上架时间：{{goodsinfo.add_time | dateFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
import swiper from '../subcomponents/swiper.vue'
import numbox from '../subcomponents/goodsinfo_numbox.vue'
export default {
    data() {
        return {
            id: this.$route.params.id, //获取URL中传递的Id
            lunbotu: [], //轮播图数据
            goodsinfo: [], //商品详情数据
            ballFlag: false, //控制小球隐藏和显示的标识
            selectedCount: 1, //选则的商品数量
        }
    },
    created() {
        this.getLunbotu();
        this.getGoodsInfo();
    },
    methods: {
        //商品轮播图展示
        getLunbotu() {
            this.$http.get('/api/goodsimg.json').then(result => {
                if (result.body.code == 200) {
                    this.lunbotu = result.body.data
                }
            })
        },
        //商品详情数据
        getGoodsInfo() {
            this.$http.get('/api/goodsinfo.json').then(result => {
                if (result.body.code == 200) {
                    this.goodsinfo = result.body.data;
                }
            })
        },
        //去商品图文介绍
        goDesc(id) {
            this.$router.push({name: "goodsdesc", params: { id }});
        },
        //去商品评论页
        goComment(id) {
            this.$router.push({name: "goodscomment", params: { id }});
        },
        //添加到购物车
        addToShopCar() {
            this.ballFlag = !this.ballFlag;
            //拼接一个商品数据对象
            var goodsInfo = { id: this.id, count: this.selectedCount, price: this.goodsinfo.price, selected: true };

            //调用store中的mutations将商品加入到购物车中
            this.$store.commit("addToCar", goodsInfo);
        },
        //钩子函数
        beforeEnter(el) {
            el.style.transform = "translate(0, 0)"
        },
        enter(el, done) {
            const ballPosition = this.$refs.ball.getBoundingClientRect();
            // 获取 徽标 在页面中的位置
            const badgePosition = document.getElementById("badge").getBoundingClientRect();

            const xDist = badgePosition.left - ballPosition.left;
            const yDist = badgePosition.top - ballPosition.top;

            el.style.transform = `translate(${xDist}px, ${yDist}px)`;
            el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
            done();
        },
        afterEnter(el) {
            this.ballFlag = !this.ballFlag;
        },
        //购买数量
        getSelectedCount(count) {
            this.selectedCount = count;
            console.log("父组件拿到的count值是：" + this.selectedCount);
        }

    },
    components: {
        swiper,
        numbox
    }
}
</script>

<style lang="scss" scoped>
.goodsinfo-container{
    background-color: #eee;
    overflow: hidden;
    .now_price{
        color: red;
        font-size: 16px;
    }

    .mui-card-footer{
        display: block;
        button{
            margin: 15px 0;
        }
    }
    .ball{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        z-index: 99;
        top: 390px;
        left: 146px;
    }
}
</style>
