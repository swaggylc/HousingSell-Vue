<template>
    <el-container class="container">
        <el-header class="header">
            <div>
                <img src="../assets/logo.jpg" class="head_img">
                <span class="text1">房产中介信息发布中心</span>
            </div>
            <el-button type="danger" @click="logout" round>退出</el-button>
        </el-header>
        <el-main>

            <!-- 搜索部分 -->
            <div class="ser">
                <i class="el-icon-message-solid" style="margin-right: 20px; color:powderblue; font-size: 1.5rem;"></i>
                <el-input style="width: 200px;" placeholder="请输入内容" v-model="search" @clear="getHomeList" clearable>
                </el-input>
                <el-button slot="append" icon="el-icon-search" style="background-color: #e4e7ed;"
                    @click="SerchMessage"></el-button>
                <el-link type="info" style="margin-left: 5px; margin-bottom: -20px;" @click="serchdata">历史数据查询</el-link>
            </div>

            <el-divider></el-divider>

            <!-- 轮播图 -->
            <div class="carousel">
                <el-carousel :interval="4000" type="card" height="300px">
                    <el-carousel-item v-for="item in pic" :key="item.id">
                        <img :src="item.idView" class="image">
                    </el-carousel-item>
                </el-carousel>
            </div>
            <el-divider></el-divider>

            <!-- 房屋卡片 -->
            <el-row style="margin-top: 10px; width: 100%;">
                <div v-for="item in homeList" :key="item">
                    <el-col :span="8">
                        <el-card :body-style="{ padding: '0px' }"
                            style="width: 300px;height: 390px; margin-left: 110px;margin-bottom:20px;">
                            <img :src="item.imgUrl" class="card_img">
                            <div style="padding: 14px;margin-top: 10px;">
                                <span>{{ item.address }}</span>
                                <div class="bottom clearfix">
                                    <h5 style="color: darkgray;"><i class="el-icon-house"></i> {{ item.type }}</h5>
                                    <el-button type="primary" icon="el-icon-view"
                                        @click="know(item.homeId)">了解详情</el-button>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </div>
            </el-row>

            <el-divider></el-divider>

            <!-- 发布房屋按钮 -->
            <div style="margin-top: 30px;">
                <el-row>
                    <div class="addmsg">
                        <el-button type="success" @click="isChange">发布信息<i
                                class="el-icon-upload el-icon--right"></i></el-button>
                    </div>
                </el-row>
            </div>

            <!-- 留言板部分 -->
            <el-divider content-position="left">留言板</el-divider>
            <el-card class="carousel">
                <template>
                    <span style="font-size: 25px; font-family: Courier New;color: cornflowerblue">留言板</span>
                    <div v-for="(item, index) in leaveMsg" :key="index">
                        <el-alert :title="item.content" :type="getColor()" @close="deleteMsg(item.msgId)"
                            style="margin-bottom: 20px;margin-top: 20px;"></el-alert>
                    </div>

                    <el-input type="textarea" placeholder="我来说点什么..." v-model="myMsg"
                        style="margin-bottom: 20px;"></el-input>
                    <el-button type="primary" @click="sendMsg">发布</el-button>
                </template>
            </el-card>

        </el-main>

        <!-- 历史数据部分 -->
        <el-drawer title="历史数据查询" :visible.sync="drawer">
            <el-table :data="searchHistory" style="width: 100%;margin-left: 15px;">
                <el-table-column prop="keyWord" label="查询信息"></el-table-column>
                <el-table-column prop="time" label="查询时间"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click.native.prevent="deleteRow(scope.$index, searchHistory)" type="text">
                            移除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-drawer>


        <!-- 房产的详细信息 -->
        <el-dialog title="欢迎浏览" :visible.sync="dialog1" width="50%">
            <el-descriptions class="margin-top" title="房屋详细信息" :column="4">
                <el-descriptions-item label="发布信息编号">{{ oneHome.homeId }}</el-descriptions-item>
                <el-descriptions-item label="建筑面积">{{ oneHome.allArea }}</el-descriptions-item>
                <el-descriptions-item label="套内面积">{{ oneHome.actualArea }}</el-descriptions-item>
                <el-descriptions-item label="户型">{{ oneHome.type }}</el-descriptions-item>
                <el-descriptions-item label="估计售价">{{ oneHome.price }}W</el-descriptions-item>
                <el-descriptions-item label="购买时间">{{ oneHome.buyTime }}</el-descriptions-item>
                <el-descriptions-item label="地址">{{ oneHome.address }}</el-descriptions-item>
            </el-descriptions>

            <!-- 发布人的信息列表 -->
            <el-descriptions class="margin-top" title="发布人信息" :column="3" border>
                <el-descriptions-item><template slot="label"><i class="el-icon-user"></i>姓名</template>{{ sellUser.name }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label"><i class="el-icon-mobile-phone"></i>手机号</template>{{ sellUser.phoneNum }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label"><i class="el-icon-message"></i>邮箱</template>{{ sellUser.email }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-office-building"></i>
                        联系地址
                    </template>
                    {{ sellUser.address }}
                </el-descriptions-item>
            </el-descriptions>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialog1 = false">确 定</el-button>
            </span>
        </el-dialog>


        <!-- 发布信息表单（添加房产） -->
        <el-dialog title="发布信息" :visible.sync="dialogVisible" width="30%">
            <el-form :model="addList" :rules="zhucerules" ref="ruleForm" label-width="100px">
                <el-form-item label="购买时间" prop="buyTime">
                    <el-input v-model="addList.buyTime"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input v-model="addList.address"></el-input>
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-input v-model="addList.type"></el-input>
                </el-form-item>
                <el-form-item label="建筑面积" prop="allArea">
                    <el-input v-model="addList.allArea"></el-input>
                </el-form-item>
                <el-form-item label="套内面积" prop="actualArea">
                    <el-input v-model="addList.actualArea"></el-input>
                </el-form-item>
                <el-form-item label="售价" prop="price">
                    <el-input v-model="addList.price"></el-input>
                </el-form-item>
                <el-form-item label="图片" prop="imgUrl">
                    <el-input v-model="addList.imgUrl"></el-input>
                </el-form-item>
                <el-form-item label="售卖人ID" prop="sellUserId">
                    <el-input v-model="addList.sellUserId"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addconfirm">确 定</el-button>
            </span>
        </el-dialog>
    </el-container>
</template>
<script>
export default {
    data() {
        return {
            // 搜索框数据
            search: '',
            searchList: [],    //搜索结果列表
            searchHistory: [],    //搜索历史记录
            // 请求房屋数据
            homeList: [],
            // 发布房屋数据
            addList: {
                allArea: '',
                actualArea: '',
                type: '',
                address: '',
                price: '',
                buyTime: '',
                imgUrl: '',
                sellUserId: ''
            },
            // 单个房屋数据
            oneHome: {
                allArea: '',
                actualArea: '',
                type: '',
                address: '',
                price: '',
                buyTime: '',
                sellUserId: '',
                homeId: ''
            },
            // 房屋发布者数据
            sellUser: {
                name: '',
                phoneNum: '',
                email: '',
                address: ''
            },
            leaveMsg: [],   //留言数据
            leaveColor: ['success', 'warning', 'info', 'error'],    //留言的颜色
            myMsg: '',    //发送的留言

            state: '',
            drawer: false,  //搜索历史记录的抽屉的状态
            isShow: false,

            pic: [      //轮播图数据
                { id: 0, idView: require('../assets/1.png') },
                { id: 1, idView: require('../assets/3.png') },
                { id: 2, idView: require('../assets/2.png') },
                { id: 3, idView: require('../assets/4.png') },
                { id: 4, idView: require('../assets/6.png') },
                { id: 5, idView: require('../assets/5.png') }
            ],
            dialog1: false,
            dialog2: false,
            dialogVisible: false,   //发布信息表单
        }
    },
    created() {
        this.getHomeList()
        this.getLeaveMsg()
    },
    methods: {
        // 获取房屋数据
        getHomeList() {
            this.$http.get('http://localhost:3000/home/list').then(res => {
                this.homeList = res.data.data
                console.log(this.homeList);
            })
        },
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
            if (this.myMsg == '') {
                this.$message.error('留言不能为空')
                return
            }
            this.$http.post('http://localhost:3000/leave/add', {
                content: this.myMsg
            }).then(res => {
                console.log(res)
                this.getLeaveMsg()
                this.$message.success('留言成功')
            })
            this.myMsg = ''
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
        },

        logout() {
            this.$router.push('/Login')
        },
        // 显示搜索记录
        serchdata() {
            this.drawer = true
        },
        // 移除搜索记录的回调
        deleteRow(index, rows) {
            rows.splice(index, 1);
        },
        //了解详情展示页面
        know(id) {
            // console.log(id);
            this.$http.post('http://localhost:3000/home/check', {
                homeId: id
            }).then(res => {
                // console.log(res.data.data[0]);
                // console.log(res.data.data[0].sellUserId);
                this.oneHome.allArea = res.data.data[0].allArea
                this.oneHome.actualArea = res.data.data[0].actualArea
                this.oneHome.type = res.data.data[0].type
                this.oneHome.address = res.data.data[0].address
                this.oneHome.price = res.data.data[0].price
                this.oneHome.homeId = res.data.data[0].homeId
                this.oneHome.sellUserId = res.data.data[0].sellUserId
                this.oneHome.buyTime = res.data.data[0].buyTime.split('T')[0]
                // 根据售卖人id获取售卖人信息
                console.log(this.oneHome.sellUserId);
                this.$http.post('http://localhost:3000/user/check', {
                    userId: this.oneHome.sellUserId
                }).then(res => {
                    console.log(res.data.data[0]);
                    this.sellUser.name = res.data.data[0].name
                    this.sellUser.phoneNum = res.data.data[0].phoneNum
                    this.sellUser.address = res.data.data[0].address
                    this.sellUser.email = res.data.data[0].email
                })
                this.dialog1 = true
            })


        },
        //点击搜索按钮的回调
        SerchMessage() {
            if(this.search == ''){
                this.$message.error('搜索内容不能为空')
                return
            }
            // console.log(this.search);
            // 将search的值添加进searchHistory
            const time = new Date()
            this.searchHistory.push({
                keyWord: this.search,
                time: time.toLocaleString()
            })

            // 向服务器发送搜索信息
            this.$http.post('http://localhost:3000/home/search', {
                search: this.search,
            }).then(res => {
                // 返回的结果
                // console.log(res.data);
                if (res.data.code == 201) {
                    this.$message.error('查询失败')
                }
                if (res.data.data.length == 0) {
                    this.$message.error('没有找到相关信息')
                }
                this.searchList = res.data.data
                // console.log(this.searchList);
                // 将搜索结果渲染到页面
                this.homeList = this.searchList
            })

        },
        isChange() {
            this.dialogVisible = true
        },
        //发布信息
        addconfirm() {
            if (this.addList.allArea == '' || this.addList.actualArea == '' || this.addList.type == '' || this.addList.address == '' || this.addList.price == '' || this.addList.buyTime == '' || this.addList.imgUrl == '' || this.addList.sellUserId == '') {
                this.$message.error('请填写完整信息')

            } else {
                this.$http.post('http://localhost:3000/home/add', this.addList).then(res => {
                    console.log(res);
                    this.dialogVisible = false
                    this.$message.success('发布成功')
                    this.getHomeList()
                })
            }

        },

    },
    mounted() {
        this.restaurants = this.loadAll();
    }
}
</script>
<style lang="less" scoped>
.container {
    height: 100%;
}

.header {
    background-color: rgb(151, 180, 188);
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 23px;

    >div {
        display: flex;
        align-items: center;

        span {
            margin-left: 15px;
        }
    }
}

.head_img {
    width: 55px;
    height: 56px;
    border-radius: 50%;
}

.text1 {
    margin-top: 0.5rem;
    text-align: center;
}

.ser {
    margin-top: 15px;
    align-items: center;
    text-align: center;

}

.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}

.image {
    width: 100%;
    height: 100%;
}

.carousel {
    margin-top: 25px;
    width: 1000px;
    margin-left: 260px;
}

.card_img {
    width: 100%;
    height: 200px;
    display: block;
}

.addmsg {
    padding-left: 50%;
}
</style>