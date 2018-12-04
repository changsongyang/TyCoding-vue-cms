<template>
    <div class="newsinfo-container">
        <h3 class="title">{{newsInfo.title}}</h3>
        <p class="subtitle">
            <span>时间：{{newsInfo.add_time | dateFormat}}</span>
            <span>点击：{{newsInfo.click}}次</span>
        </p>
        <hr>
        <div class="content" v-html="newsInfo.content"></div>

        <!-- 评论框 -->
        <comment-box></comment-box>
    </div>
</template>

<script>
//导入评论子组件
import comment from '../subcomponents/comment.vue'
export default {
    data() {
        return {
            id: this.$route.params.id, //将URL地址中传递的参数赋值到id属性上
            newsInfo: {}, //新闻详情
        }
    },
    created() {
        this.getNewsInfo();
    },
    methods: {
        //获取新闻详情
        getNewsInfo() {
            this.$http.get('/api/newsinfo.json').then(result => {
                if(result.body.code == 200) {
                    this.newsInfo = result.body.data[0];
                } else {
                   Toast("获取新闻失败"); 
                }
            })
        }
    },
    //组件子组件
    components: {
        "comment-box": comment
    }
}
</script>

<style lang="scss">
.newsinfo-container{
    padding: 0 4px;
    .title{
        font-size: 16px;
        text-align: center;
        color: red;
        margin: 15px 0;
    }
    .subtitle{
        font-size: 13px;
        color: #226aff;
        display: flex;
        justify-content: space-between;
    }
    .content{
        img {
            width: 100%;
        }
    }
}
</style>
