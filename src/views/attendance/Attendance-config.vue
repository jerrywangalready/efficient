<template>
  <el-tabs type="border-card">
    <el-tab-pane label="打卡记录">
      <el-button type="primary">导入</el-button>
      <el-table :data="tableData"
                style="width: 100%"
                :row-class-name="tableRowClassName">
        <el-table-column prop="date" label="年份" width="180"></el-table-column>
        <el-table-column prop="date" label="月份" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="日期"></el-table-column>
        <el-table-column prop="address" label="打卡信息"></el-table-column>
        <el-table-column label="操作" width="200px">
          <template #default="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">撤销</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="休息日">
      <attendance-holiday></attendance-holiday>
    </el-tab-pane>
    <el-tab-pane label="角色管理">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
  </el-tabs>
</template>

<script>
import attendanceHoliday from "./Attendance-holiday";

export default {
  name: "Attendance-config",
  components: {
    attendanceHoliday
  },
  data() {
    return {}
  },
  created() {
  },
  mounted() {
  },
  methods: {}
}
</script>

<style scoped>

</style>