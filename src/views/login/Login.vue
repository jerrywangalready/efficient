<template>
  <!--  <div class="bb"></div>-->
  <el-container>
    <el-header class="login-header" height="120px">

    </el-header>
    <el-main class="main-box">
      <div class="image-container"></div>
    </el-main>
    <el-footer>

    </el-footer>
  </el-container>
  <el-drawer
      title="效率云登录"
      v-model="drawer"
      size="600px"
      :modal="false"
      :with-header="false" model-value>
    <div class="login-box">
      <el-form label-position="top" ref="form" :model="form" label-width="80px">
        <el-form-item style="text-align: center">
          <div class="header-box">
            <h1 style="font-size: 60px">效率云</h1>
          </div>
          <!--          <el-card class="box-card header-box" body-style="{ padding: '20px';background: '#f8f8f8'; background-image: 'url(\'../../assets/login-bg.png\')' }">-->
          <!--          </el-card>-->
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="username" placeholder="请输入账号">
            <template #prefix>
              <i class="el-icon-user el-input__icon" @click="handleIconClick"> </i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input type="password" v-model="password" placeholder="请输入密码">
            <template #prefix>
              <i class="el-icon-lock el-input__icon" @click="handleIconClick"> </i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox>记住我</el-checkbox>
          <el-button type="text" style="float: right">找回密码</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="login-button" type="primary" @click="onSubmit" icon="el-icon-key">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-drawer>
  <!--  <div class="login-box"></div>-->
</template>

<script>

export default {
  name: "Login",
  data() {
    return {
      drawer: true,
      username: "",
      password: "",
      form: {}
    }
  },
  methods: {
    onSubmit() {
      this.axios.post("/auth/login", {
        username: this.username,
        password: this.password
      }).then(response => {

      }).catch(error => {

      });
      let userInfo = {};
      userInfo.authorized = true;
      userInfo.username = this.username;
      userInfo.fullname = '曾小贤';
      this.$store.commit('login', userInfo);
      this.$router.push({name: 'Home'});
    }
  }
}
</script>

<style scoped>
.login-header {
  /*background-image: url('../../assets/login-bg.png');*/
  background: #f5f5f5;
  height: 300px;
  box-shadow: 10px 10px 10px #888888;
}

.main-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  height: auto;
  /*background: #abcdef;*/
  background: #f5f5f5;
  padding: 0;

}

.main-box .image-container {
  background-image: url("../../assets/bg-image.jpg");
  height: 1213px;
}

.header-box {
  background-image: url("../../assets/login-bg.png");
  color: #fff;
  text-align: center;
  padding: 7px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .5);
  border-radius: 10px;
  margin-bottom: 100px;
}

.header-box h1 {

}


body {
  background-image: url("../../assets/bg-image.jpg");
  min-width: 860px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

.login-board {
  background-image: url("../../assets/login-board.png");
  border: 1px solid #888888;
  width: 430px;
  height: 230px;
  box-shadow: 35px 35px 60px #000000;
  top: 400px;
  position: absolute;
  right: 200px;
  padding: 40px;
}

.login-board input {
  background: none;
  border-bottom: 1px solid #888888;
  border-radius: 0;
}

.login-board input:hover, .login-board input:focus {
  border: 0;
  border-bottom: 1px solid #888888;
}

.login-board form {
  width: 270px;
  padding: 42px 0;
  margin-left: -40px;
  margin-top: 50px;
  font-weight: bold;
}

.login-board .login-button:hover {
  box-shadow: 8px 10px 10px #000000;
}

.login-board .el-form-item {
  margin-bottom: 0;
}

.login-box {
  top: 50%;
  margin-top: 180px;
  padding: 100px;
}

.login-box .title button {
  font-size: 50px;
  cursor: default;
}

.login-button {
  width: 100%;
  box-shadow: 0 0 12px #888888;
  /*margin-top: 48px;*/
}
</style>