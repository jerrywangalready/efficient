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
            <h1>登录</h1>
          </el-form-item>
          <el-form-item label="" prop="username">
            <el-input v-model="form.username" placeholder="请输入账号">
              <template #prefix>
                <i class="el-icon-user el-input__icon"> </i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input type="password" v-model="form.password" placeholder="请输入密码" show-password>
              <template #prefix>
                <i class="el-icon-lock el-input__icon"> </i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <!--            <el-checkbox>记住我</el-checkbox>-->
            <el-button type="text" @click="signup">注册账号</el-button>
            <el-button type="text" style="float: right">找回密码</el-button>
          </el-form-item>
          <el-form-item>
            <el-button class="login-button" type="primary" @click="onSubmit" icon="el-icon-key">登录</el-button>
          </el-form-item>
          <el-form-item size="mini">
            <el-alert class="errorInfo" v-show="errorInfo.state" :title="errorInfo.title" type="error" :closable="false"
                      center
                      show-icon/>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import AES from "@/common/AES";
import logo from "@/components/Logo"

export default {
  name: "Login",
  components: {
    logo
  },
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          {required: true, message: '请输入账号', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      },
      errorInfo: {
        state: false,
        title: ""
      }
    }
  },
  mounted() {
    localStorage.clear();
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.login();
        } else {
          return false;
        }
      });
    },
    login() {
      // 清空本地token
      localStorage.clear();

      let encrypt = AES.encrypt(this.form.password);
      this.axios.post("/login", {
        username: this.form.username,
        password: encrypt
      }).then(response => {
        console.log(response);
        if (response.data.code === 0) {

          this.saveInfo2Storage(response);
          this.$router.push({name: 'Home'});

        } else {
          this.errorInfo.state = true;
          this.errorInfo.title = response.data.msg;
        }
      }).catch(error => {

      });
    },
    saveInfo2Storage(response) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', response.data.username);
      localStorage.setItem('role', response.data.auth);
      let now = new Date().getTime();
      localStorage.setItem("hf_time", now);
    },
    signup() {
      this.$router.push({name: 'Signup'})
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