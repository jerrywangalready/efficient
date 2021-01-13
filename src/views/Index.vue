<template>
  <el-container>
    <el-header>
      <el-menu :default-active="$route.name" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="Home" @click="to('Home')">首页</el-menu-item>
        <el-menu-item index="Attendance" @click="to('Attendance')">考勤</el-menu-item>
        <el-menu-item index="Performance" disabled>绩效</el-menu-item>
        <el-menu-item index="Workbench" disabled>工作台</el-menu-item>
        <el-menu-item index="Settings" @click="to('Settings')">设置</el-menu-item>
      </el-menu>
      <div class="name-board">
        <span style="margin: 0 10px">{{ token.fullname }}</span>
        <el-button type="text" @click="logout">[退出]</el-button>
      </div>
    </el-header>
    <el-main>
      <router-view></router-view>
      <router-view name="config"></router-view>
    </el-main>
    <el-footer>

    </el-footer>
  </el-container>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from "vuex";

export default {
  name: "Index",
  data() {
    return {}
  },
  mounted() {

  },
  computed: {
    ...mapGetters([
      "token",
      "saleProducts"
    ])
  },
  methods: {
    to(destination) {
      this.$router.push({name: destination})
    },
    logout() {
      let userInfo = {};
      userInfo.authorized = false;
      this.$store.commit('login', userInfo);
      this.$router.push({name: "Login"})
    }
  }
}
</script>

<style scoped>
/*body {*/
/*  !*background-image: none;*!*/
/*  min-width: 860px;*/
/*  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;*/
/*  overflow: auto;*/
/*}*/

.name-board {
  position: relative;
  float: right;
  margin-top: -60px;
}
</style>