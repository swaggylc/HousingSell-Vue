<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/second' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>留言管理</el-breadcrumb-item>
            <el-breadcrumb-item>留言信息</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <div v-for="item in leaveMsg" :key="item.msgId">
                <el-alert :title="item.content" :type="getColor()" style="margin-bottom: 20px;margin-top: 20px;"
                    @close="deleteMsg(item.msgId)"></el-alert>
            </div>
            <el-input type="textarea" placeholder="我来说点什么..." v-model="myMsg" style="margin-bottom: 20px;"></el-input>
            <el-button type="primary" @click="sendMsg">发布</el-button>
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            leaveMsg: [],   //留言数据
            leaveColor: ['success', 'warning', 'info', 'error'],    //留言的颜色
            myMsg: '',    //发送的留言
        }
    },
    created() {
        this.getLeaveMsg()
    },
    methods: {
        // 获取留言的方法
        getLeaveMsg() {
            this.$http.get('http://localhost:3000/leave/list').then(res => {
                // console.log(res.data.data)
                this.leaveMsg = res.data.data
            })
        },
        // 获得随机留言的颜色
        getColor() {
            return this.leaveColor[Math.floor(Math.random() * this.leaveColor.length)];
        },
        // 发布留言
        sendMsg() {
            this.$http.post('http://localhost:3000/leave/add', {
                content: this.myMsg
            }).then(res => {
                console.log(res)
                this.$message.success('发布成功')
                this.getLeaveMsg()
            })
        },
        // 删除留言
        deleteMsg(id) {
            console.log(id);
            this.$http.post('http://localhost:3000/leave/delete', {
                msgId: id
            }).then(res => {
                console.log(res.data)
                this.$message.success('删除成功')
                this.getLeaveMsg()
            }
            )
        }

    }
}
</script>
<style lang="less" scoped></style>