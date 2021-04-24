<template>
  <el-tabs type="border-card">
    <el-tab-pane label="打卡记录">
      <clock-in-records-board></clock-in-records-board>
    </el-tab-pane>
    <el-tab-pane label="节假日">
      <attendance-holiday></attendance-holiday>
    </el-tab-pane>
    <el-tab-pane label="角色管理">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
  </el-tabs>
</template>

<script>
import attendanceHoliday from "./Attendance-holiday";
import clockInRecordsBoard from "./clockin/ClockInRecordsBoard";

export default {
  name: "Attendance-config",
  components: {
    attendanceHoliday,
    clockInRecordsBoard
  },
  data() {
    return {
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style scoped>

</style>