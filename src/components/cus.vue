<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/second' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>客户管理</el-breadcrumb-item>
            <el-breadcrumb-item>客户信息</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-table :data="tabledata" border style="width:100%">
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="idNum" label="身份证号"></el-table-column>
                <el-table-column prop="birthday" label="出生日期"></el-table-column>
                <el-table-column prop="gender" label="男"></el-table-column>
                <el-table-column prop="email" label="电子邮件"></el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
                <el-table-column prop="phoneNum" label="电话"></el-table-column>
                <el-table-column label="操作" width="180px">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(scope.row)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini"
                            @click.native.prevent="deleteRow(scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog title="修改信息" :visible.sync="dialogVisible" width="30%">
            <el-form :model="updataInfo" label-width="100px">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="updataInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" prop="idNum">
                    <el-input v-model="updataInfo.idNum"></el-input>
                </el-form-item>
                <el-form-item label="出生日期" prop="birthday">
                    <el-input v-model="updataInfo.birthday"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="gender">
                    <el-input v-model="updataInfo.gender"></el-input>
                </el-form-item>
                <el-form-item label="电子邮件" prop="email">
                    <el-input v-model="updataInfo.email"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input v-model="updataInfo.address"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="phoneNum">
                    <el-input v-model="updataInfo.phoneNum"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button @click="updata" type="primary">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            dialogVisible: false,
            tabledata: [],
            updataInfo:{
                id:'',
                idNum:'',
                birthday:'',
                gender:'',
                email:'',
                address:'',
                phoneNum:'',
                userId:''
            } 
        }
    },
    created() {
        // 页面加载时获取用户信息
        this.getUserInfo()
    },
    methods: {
        getUserInfo() {
            this.$http.get('http://localhost:3000/user/list').then(res => {
                for (let i = 0; i < res.data.data.length; i++) {
                    res.data.data[i].birthday = res.data.data[i].birthday.split('T')[0];
                }
                this.tabledata = res.data.data
                // console.log(this.tabledata);
            })
        },



        deleteRow(data) {
            // console.log(data.userId)
            this.$http.delete('http://localhost:3000/user/delete', {
                // 注意：delete请求的参数放在data里面,则在req.body里面获取
                data: {
                    userId: data.userId
                }
            }).then(res => {
                return res
                // console.log(res)
                // this.getUserInfo()
            }
            )
        },
        edit(data) {
            console.log(data);
            this.updataInfo.name=data.name
            this.updataInfo.idNum=data.idNum
            this.updataInfo.birthday=data.birthday
            this.updataInfo.gender=data.gender
            this.updataInfo.email=data.email
            this.updataInfo.address=data.address
            this.updataInfo.phoneNum=data.phoneNum
            this.updataInfo.userId=data.userId
            this.dialogVisible=true
        },
        async updata(){
            console.log(this.updataInfo);
           await this.$http.post('http://localhost:3000/user/update',this.updataInfo).then(res=>{
                // console.log(res);
                this.dialogVisible=false
                this.getUserInfo()
                return res
            })
        }

    }
}
</script>
<style lang="less" scoped></style>