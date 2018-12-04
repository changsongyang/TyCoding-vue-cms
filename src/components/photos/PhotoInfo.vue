<template>
    <div class="photoinfo-container">
        <h3>{{info.title}}</h3>
        <p class="subtitle">
            <span>发表时间：{{info.add_time | dateFormat}}</span>
            <span>点击次数：{{info.click}}次</span>
        </p>
        <hr/>
        
        <!-- 缩略图 -->
        <div class="thumbs">
            <img :src="info.url" >
        </div>
        
        <!-- 评论组件 -->
        <cmt-box></cmt-box>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
//导入评论组件
import comment from '../subcomponents/comment.vue'
export default {
    data() {
        return {
            id: this.$route.params.id, //获取URL传递的参数，这里是模拟数据，不做请求处理
            info: {}, //图片信息
        }
    },
    created() {
        this.getPhotoInfo();
    },
    methods: {
        getPhotoInfo() {
            this.$http.get('/api/photoinfo.json').then(result => {
                if (result.body.code == 200) {
                    this.info = result.body.data;
                } else {
                    Toast('获取数据失败!');
                }
            })
        }
    },
    components: {
        "cmt-box": comment
    }
}
</script>

<style lang="scss" scoped>
.photoinfo-container{
    padding: 3px;
    h3{
        color: #26a2ff;
        font-size: 15px;
        text-align: center;
        margin: 15px 0;
    }
    .subtitle {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
    }
    .thumbs{
        margin: 10px;
        img{
            vertical-align: middle;
            width: 100%;
            box-shadow: 0 0 8px #999;
        }
    }
}
</style>
