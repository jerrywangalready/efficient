<template>
  <h1 class="j-title">用户管理</h1>
  <el-row :gutter="10">
    <el-col :span="24">
      <el-card>
        <div style="width: 100%;height: auto">
          <!--          <el-button type="primary">新增</el-button>-->
          <el-table
              :data="tableData"
              border
              style="width: 100%">
            <el-table-column
                prop="userName"
                label="账号"
                width="180">
            </el-table-column>
            <el-table-column
                prop="fullName"
                label="姓名"
                width="180">
            </el-table-column>
            <el-table-column
                width="200px"
                prop="entryDate"
                label="入职日期">
            </el-table-column>
            <el-table-column
                prop="roleIds"
                label="角色">
              <template #default="scope">
                <div v-if="scope.row.roleDescriptions" class="name-wrapper">
                  <el-tag class="role" v-for="(item,index) in (scope.row.roleDescriptions||'').split(',')" :key="index" size="medium">
                    {{ item }}
                  </el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column
                width="100px"
                prop="state"
                label="状态">
            </el-table-column>
            <el-table-column
                width="100px"
                prop=""
                label="操作">
              <template #default="scope">
                <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>

export default {
  name: "Setting-Group",
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    this.initUserGrid();
  },
  methods: {
    initUserGrid() {
      this.axios.post("/user/getUsersGrid", {}).then(response => {
        this.tableData = response.data;
        console.log(response);
      }).catch(err => {
      })

    }
  }
}
</script>

<style scoped>
.role {
  margin-right: 10px;
}
</style>