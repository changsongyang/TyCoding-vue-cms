<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要评论的内容，最多120字" maxlength="120"></textarea>
        <mt-button type="primary" size="large">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(i, index) in 4" :key="index">
                <div class="cmt-title">
                    第一楼&nbsp;&nbsp;用户：匿名用户&nbsp;&nbsp;发表时间： 2012-11-11 12:12:12
                </div>
                <div class="cmt-body">
                    测试一下啊
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain>加载更多</mt-button>
    </div>
</template>

<script>
export default {
    //模拟评论列表数据，因为找不到公共的API接口
}
</script>

<style lang="scss" scoped>
.cmt-container{
    h3{
        font-size: 17px;
    }
    textarea{
        font-size: 12px;
        height: 85px;
        margin: 0;
    }
    .cmt-list{
        margin: 5px 0;
        .cmt-item{
            font-size:13px;
            .cmt-title{
                line-height: 30px;
                background-color: #ccc;
            }
            .cmt-body{
                line-height: 35px;
                text-indent: 2em;
            }
        }
    }
}
</style>
