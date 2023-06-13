<template>
    <div>
        <div>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/second' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>房产管理</el-breadcrumb-item>
                <el-breadcrumb-item>房产信息</el-breadcrumb-item>
            </el-breadcrumb>
            <el-card>
                <el-table :data="tabledata" border style="width:100%">
                    <el-table-column prop="homeId" label="发布编号"></el-table-column>
                    <el-table-column prop="sellUserId" label="售卖人ID"></el-table-column>
                    <el-table-column prop="allArea" label="建筑面积"></el-table-column>
                    <el-table-column prop="actualArea" label="套内面积"></el-table-column>
                    <el-table-column prop="type" label="户型"></el-table-column>
                    <el-table-column prop="address" label="地址"></el-table-column>
                    <el-table-column prop="price" label="售价"></el-table-column>
                    <el-table-column prop="buyTime" label="购买时间"></el-table-column>
                    <el-table-column label="操作" width="180px">
                        <template slot-scope="scope">
                            <el-button type="primary" icon="el-icon-edit" size="mini"
                                @click.native.prevent="showDetail(scope.row)"></el-button>
                            <el-button type="danger" icon="el-icon-delete" size="mini"
                                @click.native.prevent="deleteInfo(scope.row)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>




            <el-dialog title="修改信息" :visible.sync="dialogVisible" width="30%">
                <el-form :model="updataInfo" label-width="100px">
                    <el-form-item label="售卖人ID" prop="sellUserId">
                        <el-input v-model="updataInfo.sellUserId"></el-input>
                    </el-form-item>
                    <el-form-item label="建筑面积" prop="allArea">
                        <el-input v-model="updataInfo.allArea"></el-input>
                    </el-form-item>
                    <el-form-item label="套内面积" prop="actualArea">
                        <el-input v-model="updataInfo.actualArea"></el-input>
                    </el-form-item>
                    <el-form-item label="户型" prop="type">
                        <el-input v-model="updataInfo.type"></el-input>
                    </el-form-item>
                    <el-form-item label="地址" prop="address">
                        <el-input v-model="updataInfo.address"></el-input>
                    </el-form-item>
                    <el-form-item label="售价" prop="price">
                        <el-input v-model="updataInfo.price"></el-input>
                    </el-form-item>
                    <el-form-item label="购买时间" prop="buyTime">
                        <el-input v-model="updataInfo.buyTime"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button @click="updataHomeInfo" type="primary">确 定</el-button>
                </span>
            </el-dialog>

        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            dialogVisible: false,
            dialog1: false,
            dialog2: false,
            fabuForm: {

            },
            tabledata: [],
            updataInfo: {
                homeId: '',
                allArea: '',
                actualArea: '',
                type: '',
                address: '',
                price: '',
                buyTime: '',
                sellUserId: ''
            }
        }
    },
    created() {
        this.getHomeInfo()
    },
    methods: {
        getHomeInfo() {
            this.$http.get('http://localhost:3000/home/list').then(res => {
                console.log(res.data.data);
                for (let i = 0; i < res.data.data.length; i++) {
                    res.data.data[i].buyTime = res.data.data[i].buyTime.split('T')[0];
                }
                this.tabledata = res.data.data
            })
        },



        deleteInfo(data) {
            this.$http.delete('http://localhost:3000/home/delete', {
                data: {
                    homeId: data.homeId
                }
            }).then(res => {
                this.getHomeInfo()
                this.$message.success('删除成功!')
                return res
            })

        },
        showDetail(data) {
            // console.log(data);
            this.updataInfo.sellUserId = data.sellUserId
            this.updataInfo.homeId = data.homeId
            this.updataInfo.allArea = data.allArea
            this.updataInfo.actualArea = data.actualArea
            this.updataInfo.type = data.type
            this.updataInfo.address = data.address
            this.updataInfo.price = data.price
            this.updataInfo.buyTime = data.buyTime
            

            this.dialogVisible = true
        },

        updataHomeInfo() {
            this.$http.post('http://localhost:3000/home/update', this.updataInfo).then(res => {
                this.dialogVisible = false
                this.getHomeInfo()
                this.$message.success('修改成功!')
                return res
            })
        }
    }
}
</script>
<style lang="less" scoped></style>