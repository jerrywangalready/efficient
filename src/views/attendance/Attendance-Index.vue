<template>
  <!--  <el-container>-->
  <!--    <el-main style="padding-top: 0">-->
  <el-row>
    <el-col :span="24" style="overflow-x: auto">
      <h1 class="j-title" style="font-size: 1.2em">近期请假人员</h1>
      <el-card>
        <div style="width: 1320px;height: auto">
          <div class="day-label">
            <ul class="leave-officer-bar">
              <li v-for="item in leaveOfficers">
                <span :class="{holiday: item.isHodiday}">{{ item.day }}</span>
              </li>
            </ul>
          </div>
          <div class="officer-box">
            <ul class="leave-officer-bar">
              <li v-for="item in leaveOfficers">
                <el-space direction="vertical" size="large">
                  <el-badge v-for="officer in item.officers" :value="officer.duration" class="item"
                            :type="officer.type">
                    <el-tag class=""
                            :key="officer.label"
                            type="info"
                            effect="plain">
                      <div style="width: 35px; color: #000">
                        {{ officer.label }}
                      </div>
                    </el-tag>
                  </el-badge>
                </el-space>
              </li>
            </ul>
            <div style="clear: both"></div>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="24" style="padding: 0">
      <el-container>
        <el-main style="padding: 10px">
          <h1 class="j-title">我的记录</h1>
          <el-card>
            <el-table :data="tableData"
                      style="width: 100%"
                      :row-class-name="tableRowClassName">
              <el-table-column prop="date" label="日期" width="180"></el-table-column>
              <el-table-column prop="name" label="姓名" width="180"></el-table-column>
              <el-table-column prop="address" label="地址"></el-table-column>
              <el-table-column label="操作" width="200px">
                <template #default="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                  <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">撤销</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-main>
        <el-aside style="padding: 10px">
          <h1 class="j-title" style="margin: 1em 0">剩余调休</h1>
          <el-card class="box-card vacation-balance" :body-style="{ padding: '20px'}" style="margin: 0">
            <p>
              <span class="figure">{{ vacationBalance.day }}</span>
              <span class="unit">天</span>
              <span class="figure">{{ vacationBalance.hour }}</span>
              <span class="unit">时</span>
            </p>
            <div style="text-align: center; padding-left: 12px">
              <el-space size="medium">
                <AttendanceLeave></AttendanceLeave>
                <AttendanceOvertime></AttendanceOvertime>
              </el-space>
            </div>
          </el-card>
        </el-aside>
      </el-container>
    </el-col>
  </el-row>
  <el-row>
    <el-col>
      <h1 class="j-title">配置</h1>
      <attendance-config></attendance-config>
    </el-col>
  </el-row>

<!--  <ul>-->
<!--    <li v-for="product in saleProducts">-->
<!--      <span>{{ product.name }}</span>-->
<!--      <span>${{ product.price }}</span>-->
<!--    </li>-->
<!--  </ul>-->
<!--  <el-button type="primary" @click="reducePrice(3)">buttonCont</el-button>-->
  <!--    </el-main>-->
  <!--    <el-aside>-->


  <!--      <modal-button></modal-button>-->
  <!--    </el-aside>-->
  <!--  </el-container>-->

</template>

<script>
import AttendanceLeave from './Attendance-leave'
import AttendanceOvertime from './Attendance-overtime'
import AttendanceConfig from './Attendance-config'
import {mapGetters, mapActions, mapMutations} from "vuex";

export default {
  components: {
    AttendanceLeave,
    AttendanceOvertime,
    AttendanceConfig
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
    ...mapGetters([
      "saleProducts"
    ])
  },
  data() {
    return {
      vacationBalance: {
        day: 3,
        hour: 6
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      leaveOfficers: [
        {
          day: 30,
          officers: [
            {type: 'success', label: '刘德华', duration: '3时'},
            {type: 'warning', label: '赵四', duration: '3天'}
          ]
        },
        {day: 31, officers: [{type: 'primary', label: '张惠妹', duration: '1天+'}]},
        {
          day: 1,
          officers: [
            {type: 'danger', label: '王菲', duration: '8天'},
            {type: 'success', label: '刘能', duration: '4时'},
            {type: 'success', label: '赵晏', duration: '4时'}]
        },
        {day: 2, isHodiday: true, officers: []},
        {day: 3, isHodiday: true, officers: [{type: 'success', label: '刘能', duration: '4时'}]},
        {day: 4, officers: []},
        {day: 5, officers: []},
        {day: 6, officers: [{type: 'success', label: '刘能', duration: '4时'}]},
        {day: 7, officers: []},
        {day: 8, officers: [{type: 'success', label: '刘能', duration: '4时'}]},
        {day: 9, isHodiday: true, officers: []},
        {day: 10, isHodiday: true, officers: []},
        {day: 11, officers: []}
      ],
      dialogVisible: false
    }
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
    handleEdit() {

    },
    handleDelete() {

    },
    ...mapActions([
      'syncReducePrice'
    ]),
    ...mapMutations([
      'reducePrice'
    ])
  }
}
</script>

<style scoped>

.leave-officer-bar {
  list-style: none;
  padding: 0;
  margin: 0;
}

.leave-officer-bar li {
  width: 100px;
  min-height: 33px;
  float: left;
  text-align: center;
}

.officer-box {
  width: 100%;
  min-height: 20px;
  height: auto;
  padding-top: 15px;
}

.day-label {
  width: 100%;
  height: 20px;
  border-bottom: 1px solid #e8eaec;
  padding: 5px 0;
}

.el-col {
  padding: 10px;
}

.holiday {
  color: #F56C6C;
  font-weight: bold;
}

.vacation-balance {
  text-align: right;
  margin: 20px;
}

.vacation-balance span {
  padding: 4px;
}

.vacation-balance .figure {
  font-size: 70px;

}

.vacation-balance .unit {
  font-size: 30px;
}
</style>