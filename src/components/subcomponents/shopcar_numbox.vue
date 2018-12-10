<template>
    <div class="mui-numbox">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input class="mui-input-numbox" type="number" @change="countChanged" ref="numbox" :value="initcount" readonly />
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'
export default {
    mounted() {
        //初始化数字选择框组件
        mui('.mui-numbox').numbox();
    },
    methods: {
        //监听事件
        countChanged() {
            console.log(this.$refs.numbox.value);
            this.$store.commit('updateGoodsInfo', { id: this.goodsid, count: this.$refs.numbox.value })
        }
    },

    props: ['initcount', 'goodsid']
}
</script>
<style>

</style>

