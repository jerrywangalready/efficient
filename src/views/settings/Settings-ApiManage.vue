<template>
  <h1 class="j-title">Api管理</h1>
  <el-row :gutter="10">
    <el-col :span="24">
      <el-card>
        <div class="button-box">
          <el-button type="primary" size="mini" round>新增</el-button>
        </div>
        <el-table
            :data="tableData.list"
            border
            header-row-class-name="table-header"
            style="width: 100%">
          <el-table-column
              prop="backendApiId"
              label="ID"
              width="180">
          </el-table-column>
          <el-table-column
              prop="backendApiName"
              label="接口名称"
              width="180">
          </el-table-column>
          <el-table-column
              prop="backendApiUrl"
              label="请求路径">
          </el-table-column>
          <el-table-column
              prop="backendApiMethod"
              label="请求类型">
          </el-table-column>
          <el-table-column
              prop="pid"
              label="描述">
          </el-table-column>
          <el-table-column
              prop="backendApiSort"
              label="顺序">
          </el-table-column>
          <el-table-column
              prop="description"
              label="描述">
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
      }
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.axios.post("/apiManage/getApiGrid", {
        pageNum: this.tableData.pageNum,
        pageSize: this.tableData.pageSize
      }).then(response => {
        this.tableData = response.data;
      }).catch(err => {
        console.log(err);
      })
    },
    handleCurrentChange(pageNum) {
      this.tableData.pageNum = pageNum;
      this.init();
    },
    handleSizeChange(pageSize) {
      this.tableData.pageSize = pageSize;
      this.init();
    },
  }
}
</script>

<style scoped>

</style>