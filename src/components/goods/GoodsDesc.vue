<template>
    <div class="goodsdesc-container">
        <h3>{{info.title}}</h3>
        <hr>
        <div class="content" v-html="info.content"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            info: {} //商品图文数据
        }
    },
    created() {
        this.getGoodsDesc();
    },
    methods: {
        getGoodsDesc() {
            this.$http.get('/api/goodsdesc.json').then(result => {
                if (result.body.code == 200) {
                    this.info = result.body.data;
                }
            })
        }
    },
}
</script>

<style lang="scss">
.goodsdesc-container{
    padding: 4px;
    h3{
        font-size: 16px;
        color: #226aff;
        text-align: center;
        margin: 15px 0;

    }
    .content {
        img {
            width: 100%;
        }
    }
}
</style>
