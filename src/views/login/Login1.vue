<template>

  <!--  <div class="login-board" style="left: 100px;">-->
  <!--    <el-calendar v-model="value">-->
  <!--    </el-calendar>-->
  <!--  </div>-->
  <div class="login-board">
    <div style="height: 50px">
      <span style="float: left;font-size: 30px;font-family: auto;font-weight: bold;">效率云 | </span>
      <div style="float: left;width: 110px;font-size: 10px; padding: 4px 9px">
        <span style="float: left;">中国电力科学研究院</span>
        <span style="float: left;">信息中心</span>
      </div>
    </div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="账号">
        <el-input v-model="username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="password" placeholder="请输入密码"></el-input>
      </el-form-item>
    </el-form>
    <el-button class="login-button" type="primary" @click="onSubmit" icon="el-icon-arrow-right"></el-button>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    onSubmit:()=> {
      this.$store.state.token = {};
      this.$router.push({name: 'Home'});
    }
  }
}
</script>

<style>
body {
  background-image: url("../../assets/login-bg.png");
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

.login-board .login-button {
  background-image: url("../../assets/login-button.png");
  box-shadow: 8px 10px 14px #000000;
  border: 1px solid #2955d6;
  float: right;
  margin-top: -177px;
  margin-right: 10px;
  font-size: 40px;
}

.login-board .login-button:hover {
  box-shadow: 8px 10px 10px #000000;
}

.login-board .el-form-item {
  margin-bottom: 0;
}
</style>