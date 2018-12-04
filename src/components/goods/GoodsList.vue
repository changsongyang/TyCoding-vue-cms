<template>
    <div class="goods-list">
        <!-- <router-link class="goods-item" v-for="item in goodsList" :key="item.id" :to="'/home/goodsinfo/' + item.id">
            <img :src="item.url" alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.price}}</span>
                    <span class="old">￥{{item.cost_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩余60件</span>
                </p>
            </div>
        </router-link> -->

        <!-- 上面使用的是<a>标签跳转页面 -->
        <!-- 方式二：使用 window.location.href 进行编程式导航跳转 -->
        <div class="goods-item" v-for="item in goodsList" :key="item.id" @click="goDetail(item.id)">
            <img :src="item.url" alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.price}}</span>
                    <span class="old">￥{{item.cost_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩余60件</span>
                </p>
            </div>
        </div>
        <mt-button type="danger" size="large">加载更多</mt-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            goodsList: [], //商品数据
        }
    },
    created() {
        this.getGoodsList();
    },
    methods: {
        //获取商品列表
        getGoodsList() {
            this.$http.get('/api/goodslist.json').then(result => {
                if (result.body.code == 200) {
                    this.goodsList = result.body.data;
                } else {
                    Toaset()
                }
            });
        },
        //跳转
        goDetail(id) {
            //使用JS的方式实现路由导航
            //区分：this.$route是路由参数对象，所有路由中的参数，params, query 都属于它。
            //     this.$router是一个路由导航对象，用它可以方便的使用JS代码实现路由的前进、后退、跳转到新的URL地址
            this.$router.push('/home/goodsinfo/' + id);
        }
    }
}
</script>

<style lang="scss" scoped>
.goods-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 7px;
    .goods-item{
        width: 49%;
        border: 1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        margin: 4px 0px;
        padding: 2px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 293px;
        img{
            width:100%;
        }
        .title{
            font-size: 14px;
        }
        .info{
            background-color: #eee;
            p{
                margin: 0;
                padding: 5px;
            }
            .price{
                .now{
                    color: red;
                    font-weight: bold;
                    font-size: 16px;
                }
                .old{
                    text-decoration: line-through;
                    font-size: 12px;
                    margin-left: 10px;
                }
            }
            .sell{
                display: flex;
                justify-content: space-between;
                font-size: 13px;
            }

        }
    }
}
</style>
