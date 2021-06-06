<template>
  <h1 class="j-title">用户管理</h1>
  <el-row :gutter="10">
    <el-col :span="24">
      <el-card>
<!--        <div style="width: 100%;height: auto;">-->
          <!--          <el-button type="primary">新增</el-button>-->
          <el-table
              :data="tableData.list"
              border
              header-row-class-name="table-header"
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
                  <el-tag class="role" v-for="(item,index) in (scope.row.roleDescriptions||'').split(',')" :key="index"
                          size="medium">
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
                    round
                    title="修改"
                    type="warning"
                    icon="el-icon-edit"
                    @click="handleEdit(scope.$index, scope.row)">
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination class="page-comm"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         v-model:currentPage="tableData.pageNum"
                         :page-sizes="[10, 20, 50, 100]"
                         :page-size="10"
                         layout="sizes, prev, pager, next"
                         :total="tableData.total">
          </el-pagination>
<!--        </div>-->
      </el-card>
    </el-col>
  </el-row>
</template>

<script>

export default {
  name: "Setting-Group",
  data() {
    return {
      tableData: {
        list: [],
        pageNum: 1,
        pageSize: 10
      },
    }
  },
  mounted() {
    this.initUserGrid();
  },
  methods: {
    initUserGrid() {
      this.axios.post("/user/getUsersGrid", {
        pageNum: this.tableData.pageNum,
        pageSize: this.tableData.pageSize
      }).then(response => {
        this.tableData = response.data;
        console.log(response);
      }).catch(err => {
      })

    },
    handleCurrentChange(pageNum) {
      this.tableData.pageNum = pageNum;
      this.initUserGrid();
    },
    handleSizeChange(pageSize) {
      this.tableData.pageSize = pageSize;
      this.initUserGrid();
    }
  }
}
</script>

<style scoped>
.role {
  margin-right: 10px;
}


</style>