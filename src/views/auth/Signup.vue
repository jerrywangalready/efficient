<template>
  <div class="container-box">
    <!--    <div class="title-box">-->
    <!--      <div class="title-bar">-->

    <logo></logo>
    <!--      </div>-->
    <!--    </div>-->
    <div class="login-box">
      <el-card class="box-card">
        <el-form label-position="top" ref="form" :model="form" :rules="rules" style="padding: 16px 30px">
          <el-form-item label="">
            <h1>注册</h1>
          </el-form-item>
          <el-form-item label="姓名" prop="fullName">
            <el-input v-model="form.fullName" placeholder="请输入姓名">
              <template #prefix>
                <i class="el-icon-postcard el-input__icon"> </i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="账号" prop="username">
            <el-input v-model="form.username" placeholder="请输入账号">
              <template #prefix>
                <i class="el-icon-user el-input__icon"> </i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password" placeholder="请输入密码" show-password>
              <template #prefix>
                <i class="el-icon-lock el-input__icon"> </i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input type="password" v-model="form.confirmPassword" placeholder="请确认密码" show-password>
              <template #prefix>
                <i class="el-icon-lock el-input__icon"> </i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
          </el-form-item>
          <el-form-item>
            <el-button class="login-button" type="primary" @click="onSubmit" icon="el-icon-s-custom">创建</el-button>
          </el-form-item>
          <el-form-item size="mini">
            <el-alert class="errorInfo" v-show="errorInfo.state" :title="errorInfo.title" type="error" :closable="false"
                      center
                      show-icon/>
          </el-form-item>
          <el-divider content-position="center">或</el-divider>
          <el-form-item size="mini" style="text-align: center">
            <el-button type="success" @click="login">我有账号</el-button>
            <el-button type="warning">找回密码</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import AES from "@/common/AES";
import logo from "@/components/Logo"
import { ElMessage } from 'element-plus'

export default {
  name: "Login",
  components: {
    logo
  },
  data() {
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    let isExistUsername = (rule, value, callback) => {
      this.axios.post("/signup/isExistUsername", value).then(response => {
        if (response.data) {
          callback(new Error('已经存在此账号'));
        } else {
          callback();
        }
      }).catch(err => {
      })
    };
    return {
      form: {
        fullName: "",
        username: "",
        password: "",
        confirmPassword: ""
      },
      rules: {
        fullName: [
          {required: true, message: '请输入姓名', trigger: 'blur'},
          {max: 10, message: '不能超过20个字符', trigger: 'blur'}
        ],
        username: [
          {required: true, message: '请输入账号', trigger: 'blur'},
          {validator: isExistUsername, trigger: 'blur'},
          {max: 30, message: '不能超过30个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 8, max: 30, message: '长度在8-100个字符', trigger: 'blur'}
        ],
        confirmPassword: [
          {required: true, message: '请确认密码', trigger: 'blur'},
          {validator: validatePass2, trigger: 'blur'}
        ]
      },
      errorInfo: {
        state: false,
        title: ""
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.signup();
        } else {
          return false;
        }
      });
    },
    login() {
      this.$router.push({name: 'Login'})
    },
    signup() {
      let encrypt = AES.encrypt(this.form.password);
      this.axios.post("/signup/createUser", {
        "fullName": this.form.fullName,
        "username": this.form.username,
        "password": encrypt
      }).then(response => {
        if (response.data) {
          ElMessage.success('创建成功!');
          this.login();
        } else {
          ElMessage.error('注册失败');
        }
      }).catch(error => {

      });
    }
  }
}
</script>

<style scoped>

.container-box {
  position: relative;
  overflow: hidden;
  height: 100vh;
  background-image: url("../../assets/bg-image.jpg");
  background-size: cover;
  min-width: 860px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

.title-box {
  float: left;
  height: 100%;
  -webkit-justify-content: center;
  justify-content: center;
  display: flex;
  align-items: center;
  margin-left: 10%;
}

.title-bar {
  /*padding: 10px 31px;*/
  /*background: rgb(79 108 197);*/
  position: relative;
  /*border-top-left-radius: 30px;*/
  /*border-top-right-radius: 30px;*/
  /*border-bottom-left-radius: 30px;*/
  /*border-bottom-right-radius: 30px;*/
  /*color: #ffffff;*/
  /*box-shadow: -18px 17px 20px 2px #757373;*/
}

.title-bar div {
  position: absolute;
  top: 80px;
  left: 48px;
  font-weight: bold;
}

.login-box {
  float: right;
  height: 100%;
  -webkit-justify-content: center;
  justify-content: center;
  display: flex;
  align-items: center;
  margin-right: 15%;
}

.box-card {
  width: 480px;
  position: relative;
  box-shadow: -3px 11px 20px 5px #3e3d3d;
  border-radius: 3px;
}

.login-button {
  width: 100%;

}

.errorInfo {
  position: absolute;
  top: -126px;
  width: 227px;
  left: 75px;
}
</style>