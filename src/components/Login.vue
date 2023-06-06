<template>
    <div class="login_container">
        <div class="login_box">
            <div class="aver_box">
                <img src="../assets/logo.jpg">
            </div>
            <el-form class="login_form" ref="loginRef" :model="loginForm">
                <el-form-item class="item" prop="username">
                    <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid" placeholder="账号"
                        clearable></el-input>
                </el-form-item>
                <el-form-item class="item" prop="password">
                    <el-input v-model="loginForm.password" prefix-icon="el-icon-key" placeholder="密码"
                        show-password></el-input>
                </el-form-item>
                <el-form-item class="item">
                    <el-radio v-model="radio" label="1" border size="medium">用户</el-radio>
                    <el-radio v-model="radio" label="2" border size="medium">系统管理员</el-radio>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="text" @click="zhuce">注册账号</el-button>
                    <el-button type="primary" @click="login" size="mini">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-dialog title="注册账号" :visible.sync="dialogVisible" width="30%">
            <el-form :model="zhuceForm" :rules="zhucerules" ref="ruleForm" label-width="100px">
                <el-form-item label="账号" prop="id">
                    <el-input v-model="zhuceForm.id"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="zhuceForm.password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="zhuceForm.email"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="phone">
                    <el-input v-model="zhuceForm.phoneNumber"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addconfirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    data() {
        return {
            radio: '',
            dialogVisible: false,
            loginForm: {
                username: '',
                password: ''
            },
            zhuceForm: {
                email: '',
                phoneNumber: '',
                password: '',
                id: ''
            },
            zhucerules: {
                id: [{ required: true, message: '请输入账号', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                phoneNumber: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
                email: [{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
                { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]
            }
        }
    },
    methods: {
        zhuce() {
            this.dialogVisible = true
        },
        // login(){
        //     if(this.radio==1 && this.loginForm.username!='' && this.loginForm.password!=''){//判断条件
        //         this.$router.push('/user')//页面跳转
        //     }
        //     else if(this.radio==2 && this.loginForm.username!='' && this.loginForm.password!=''){
        //         this.$router.push('/second')
        //      }
        //     else{
        //         this.$message.error('登录失败！')
        //     }
        // },
        login() {
            // console.log(this.loginForm.username, this.loginForm.password);
            if (this.loginForm.username && this.loginForm.password && this.radio == 1) {
                axios.post('http://localhost:3000/user/login', {
                    account: this.loginForm.username,
                    password: this.loginForm.password
                }).then(res => {
                    console.log(res.data);
                    if (res.data.code == 200) {
                        this.$message.success('登录成功！')
                        this.$router.push('/user')
                    }
                    else {
                        this.$message.error('登录失败！')
                    }
                })
            } else if (this.loginForm.username == 'lucan' && this.loginForm.password == '666666' && this.radio == 2
            ) {
                this.$message.success('登录成功！')
                this.$router.push('/second')
            }
            else {
                this.$message.error('登陆失败！')
            }

        },
        addconfirm() {
            axios.post('http://localhost:3000/user/register', {
                account: this.zhuceForm.id,
                password: this.zhuceForm.password,
                email: this.zhuceForm.email,
                phoneNumber: this.zhuceForm.phoneNumber
            }).then(res => {
                if (res.data.code == 200) {
                    this.$message.success('注册成功！')
                    this.$refs.ruleForm.resetFields()
                    this.dialogVisible = false
                }
                else {
                    this.$message.error('注册失败！')
                }
                console.log(res.data);
            })
        }
    }
}
</script>
<style lang="less" scoped>
.login_container {
    background-color: aquamarine;
    height: 100%;
}

.login_box {
    height: 300px;
    width: 450px;
    background-color: #fff;
    border-radius: 5px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .aver_box {
        height: 140px;
        width: 140px;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);

        img {
            height: 100%;
            width: 100%;
            border-radius: 50%;
        }

    }
}

.btns {
    display: flex;
    justify-content: flex-end;
}

.login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}

.item {
    margin-bottom: 15px;
}
</style>