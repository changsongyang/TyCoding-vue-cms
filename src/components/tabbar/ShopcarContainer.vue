<template>
    <div class="shopcar-container">
        <div class="goods-list">
            <div class="mui-card" v-for="(item, index) in goodsList" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch v-model="$store.getters.getGoodsSelected[item.id]"></mt-switch>
                        <img :src="item.url">
                        <div class="info">
                            <h1>{{item.title}}</h1>
                            <p>
                                <span class="price">￥{{item.price}}</span>
                                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                                <a href="#" @click.prevent="remove(item.id, index)">删除</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan">
                    <div class="left">
                        <p>总计（不含运费）</p>
                        <p>已勾选的商品<span class="red">0</span>件，总价￥<span class="red">0</span></p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>
            </div>
        </div>

        <p>{{$store.getters.getGoodsSelected}}</p>
    </div>
</template>

<script>
import numbox from '../subcomponents/shopcar_numbox.vue'
export default {
    data() {
        return {
            goodsList: [], 
        }
    },
    created() {
        this.getGoodsList();
    },
    methods: {
        getGoodsList(){
            //获取购物车商品列表
           this.$http.get('/api/shopcarlist.json').then(result => {
                if(result.body.code == 200) {
                    this.goodsList = result.body.data;
                }
           })
        },
        remove(id, index){
            console.log("store中传递的ID值：" + id);
            console.log("当前主键中的goodslist中对应的商品ID：" + index);
        }
    },
    components: {
        numbox
    }
}
</script>

<style lang="scss" scoped>
.shopcar-container {
    background-color: #eee;
    overflow: hidden;
    .goods-list{
        .mui-card-content-inner {
            display: flex;
            align-items: center;
        }
        img {
        width: 60px;
        height: 60px;
        }
        h1 {
            font-size: 13px;
        }
        .info{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .price{
                color: red;
                font-weight: bold;
            }
        }
    }
    .jiesuan {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .red{
            color: red;
            font-weight: bold;
            font-size: 16px;
        }
    }
}
</style>
