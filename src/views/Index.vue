<template>
  <el-container>
    <el-header>
      <el-menu :default-active="$route.name" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="Home" @click="to('Home')">首页</el-menu-item>
        <el-menu-item index="Attendance" @click="to('Attendance')">考勤</el-menu-item>
        <el-menu-item index="Performance" disabled>绩效</el-menu-item>
        <el-menu-item index="Workbench" disabled>工作台</el-menu-item>
        <el-menu-item index="Settings" @click="to('Settings')">设置</el-menu-item>
      </el-menu>
      <!--      <div class="name-board">-->
      <ul class="name-bar">
        <li>
          <el-avatar size="large"></el-avatar>
<!--          <el-popover-->
<!--              placement="bottom-end"-->
<!--              :width="400"-->
<!--              trigger="hover"-->
<!--          >-->
<!--            <template #reference>-->
<!--              <el-button>{{ fullName }}</el-button>-->
<!--&lt;!&ndash;              <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>&ndash;&gt;-->
<!--            </template>-->
<!--            -->
<!--          </el-popover>-->
        </li>
                  <li><span style="font-size: 14px">{{ fullName }}</span></li>
                  <li>
                    <el-button round @click="logout" size="small">退出</el-button>
        <!--            <el-button icon="el-icon-switch-button" circle @click="logout"></el-button>-->
                  </li>
      </ul>
      <!--      </div>-->
    </el-header>
    <el-main>
      <router-view></router-view>
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
    return {
      fullName: '',
      gridData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  created() {
  },
  mounted() {
    this.init()
  },
  computed: {
    ...mapGetters([
      "token",
      "user"
    ])
  },
  methods: {
    init() {
      this.axios.post("/user/getBasicInfo").then(response => {
        this.fullName = response.data.fullName
      }).catch(err => {
      })
    },
    to(destination) {
      this.$router.push({name: destination})
    },
    logout() {
      this.$store.commit('token', "");
      this.$router.replace({name: "Login"})
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
  margin-top: -47px;
}

.name-bar {
  position: absolute;
  top: 0;
  right: 0;
  list-style: none;
  margin: 0;
  padding: 6px 20px;
}

.name-bar li {
  float: left;
  height: 50px;
  margin-left: 10px;

  -webkit-justify-content: center;
  justify-content: center;
  display: flex;
  align-items: center;
}
</style>