<template>
    <div>
        <!-- 轮播图 -->
        <mt-swipe :auto="4000">
            <!-- 在组件中使用v-for循环，一定要使用key -->
            <!-- 其中 lunbotuList 应该是父组件给子组件传值 -->
            <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
                <img :src="item.url" alt="" :class="{'full': isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
export default {
    props: ["lunbotuList", "isfull"] //获取父组件传进来的值
}
</script>

<style lang="scss" scoped>
    .mint-swipe {
        height: 200px;
        text-align: center;
        img {
            // width: 100%;
            height:200px;
        }
    }

    .full{
        width: 100%;
    }
</style>
