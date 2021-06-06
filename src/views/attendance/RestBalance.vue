<template>
  <h1 class="j-title" style="margin: 1em 0">剩余调休</h1>
  <el-card class="box-card" :body-style="{ padding: '20px'}" style="margin: 0">
    <div class="vacation-balance">

    <p>
      <!--              <span class="figure">{{ vacationBalance.day }}</span>-->
      <!--              <span class="unit">天</span>-->
      <span class="figure">{{ vacationBalance.hour }}</span>
      <span class="unit">时</span>
    </p>
    <el-divider></el-divider>
    <ul>
      <li>加班:45</li>
      <li>即将过期14</li>
      <li>年假:80</li>
      <li>(2021-12-14过期)40</li>
    </ul>
    </div>
    <div style="padding-left: 12px">
      <el-space size="medium">
        <!--                <el-upload style="margin-left: 8px;"-->
        <!--                           class="upload-demo inline-block margin-right-10"-->
        <!--                           action=""-->
        <!--                           :on-change="handleChange"-->
        <!--                           :show-file-list="false"-->
        <!--                           :on-remove="handleRemove"-->
        <!--                           :file-list="fileListUpload"-->
        <!--                           :limit="limitUpload"-->
        <!--                           accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"-->
        <!--                           :auto-upload="false">-->
        <!--                  <el-button  type="primary">导入</el-button>-->
        <!--                </el-upload>-->

        <LeaveDialog></LeaveDialog>
        <AttendanceOvertime></AttendanceOvertime>
      </el-space>
    </div>
  </el-card>
</template>

<script>
import LeaveDialog from './leave/LeaveDialog'
import AttendanceOvertime from './Attendance-overtime'

export default {
  components: {
    LeaveDialog,
    AttendanceOvertime
  },
  data() {
    return {
      vacationBalance: {
        day: 3,
        hour: 76
      },

    }
  },
  mounted() {
    this.getTotaledBalance()
  },
  methods: {
    getTotaledBalance() {
      this.axios.post("/balance/getTotaledBalance").then(response => {
        this.vacationBalance.hour = response.data
      }).catch(err => {
      })
    }
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

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>