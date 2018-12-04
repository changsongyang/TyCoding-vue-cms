<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
                <router-link :to="'/home/newslist/' + item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        {{item.title}}
                        <p class='mui-ellipsis'>
                            <span>发表时间: {{item.add_time | dateFormat}}</span>
                            <span>点击：{{item.click}}次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newslist: [] //新闻列表
        }
    },
    created() {
        this.getNewsList();
    },
    methods: {
        //获取新闻列表
        getNewsList() {
            //使用的假数据，详细的JSON数据请看 `/api` 目录
            this.$http.get('/api/newslist.json').then(result => {
                if (result.body.code == 200) {
                    this.newslist = result.body.data;
                } else {
                    Toast('获取新闻列表失败!');
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.mui-table-view {
    h1{font-size: 13px;}
    .mui-ellipsis{
        font-size: 12px;
        color: #226aff;
        display: flex;
        justify-content: space-between;
    }
}

</style>
