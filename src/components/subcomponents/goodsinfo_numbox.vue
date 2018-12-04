<template>
    <div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" @change="countChanged" ref="numbox" value="5" />
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
        countChanged() {
            //每当文本框的数据被修改时，就立即吧最新的数据通过事件调用，传递给父组件
            this.$emit("getcount", parseInt(this.$refs.numbox.value));
        }
    },
    props: ["max"], //父组件传递来的参数
    //属性监听
    watch: {
        'max': function(newVal, oldVal){
            //使用MUI的API设置max
            mui('.mui-numbox').numbox().setOption('max', newVal)
        }
    }
}
</script>
<style>

</style>

