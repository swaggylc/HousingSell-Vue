<template>
    <el-container class="container">
        <el-header class="header">
            <div>
                 <img src="../assets/logo.jpg" class="head_img">   
                 <span class="text1">房产中介信息后台管理系统</span> 
            </div>
                <el-button type="danger" @click="logout" round>退出</el-button>
        </el-header>
        <el-container>
            <el-aside :width="iscollapse? '64px' :'200px'">
                <div class="toggle-button" @click="toggleCollapse">|||</div>
                <el-menu :default-active="activePath" :collapse-transition="false" unique-opened router
                    background-color="rgb(32, 88, 106)" text-color="#fff"  :collapse="iscollapse">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-user-solid"></i>
                            <span>客户管理</span>
                        </template>
                        <el-menu-item index="/cus">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>客户信息</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-s-order"></i>
                            <span>房产管理</span>
                        </template>
                        <el-menu-item index="/fan">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>房产信息</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-edit-outline"></i>
                            <span>留言管理</span>
                        </template>
                        <el-menu-item index="/liu">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>留言信息</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <!-- 路由占位符 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
export default {
    data(){
        return{
            iscollapse:false,
            activePath:'',
        }
    },
    methods:{
        logout(){
            this.$router.push('/Login')
        },
        toggleCollapse(){
            this.iscollapse=!this.iscollapse
        },
    }
}
</script>
<style lang="less" scoped>
.container{
    height: 100%;
}
.header{
    background-color: rgb(32, 88, 106);
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 23px;
    > div{
        display: flex;
        align-items: center;
        span{
            margin-left: 15px;
        }
    }
}
.head_img{
    width: 55px;
    height: 56px;
    border-radius: 50%;
}
.text1{
    margin-top: 0.5rem;
    text-align: center;
}
.toggle-button{
    background-color:#666699;
    font-size: 10px;
    line-height: 24px;
    color: #000;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}
.el-aside{
    background-color: rgb(32, 88, 106);
    .el-menu{
        border-right: none;
    }
}
.el-main{
    background-color: rgb(213, 245, 240);
}
</style>