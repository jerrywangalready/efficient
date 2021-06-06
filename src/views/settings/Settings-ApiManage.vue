<template>
  <h1 class="j-title">接口管理</h1>
  <el-row :gutter="10">
    <el-col :span="24">
      <el-card>
        <div class="button-box">
          <el-button class="shadow" type="primary" size="mini" round @click="open()" icon="el-icon-plus" title="新增"></el-button>
        </div>
        <el-table
            :data="tableData.list"
            border
            header-row-class-name="table-header"
            style="width: 100%">
          <el-table-column
              prop="backendApiName"
              label="接口名称"
              width="180">
          </el-table-column>
          <el-table-column
              prop="moduleName"
              label="模块"
              width="180px">
          </el-table-column>
          <el-table-column
              prop="backendApiUrl"
              label="请求路径">
          </el-table-column>
          <el-table-column
              prop="backendApiMethod"
              label="请求类型"
              width="180px">
          </el-table-column>
          <el-table-column
              prop="description"
              label="描述">
          </el-table-column>
          <el-table-column
              width="120px"
              prop=""
              label="操作">
            <template #default="scope">
              <el-button
                  size="mini"
                  type="warning"
                  icon="el-icon-edit"
                  round="true"
                  title="修改"
                  @click="open(scope.row)">
              </el-button>
              <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  title="删除"
                  round="true"
                  @click="deleteAPI(scope.$index, scope.row)">
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
      </el-card>
    </el-col>
  </el-row>

  <el-dialog title="接口信息" destroy-on-close v-model="dialogVisible">
    <el-form ref="apiForm" :model="apiForm" :rules="rules" label-position="right" label-width="100px"
             class="demo-ruleForm">
      <el-form-item label="接口名称" prop="backendApiName">
        <el-input v-model="apiForm.backendApiName" placeholder="接口名称"></el-input>
      </el-form-item>
      <el-form-item label="模块" prop="moduleId">
        <el-select v-model="apiForm.moduleId" placeholder="模块" style="width: 100%">
          <el-option
              v-for="item in moduleList"
              :key="item.value"
              :label="item.moduleName"
              :value="item.moduleId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="请求路径" prop="backendApiUrl">
        <el-input v-model="apiForm.backendApiUrl" placeholder="请求路径"></el-input>
      </el-form-item>
      <el-form-item label="请求类型" prop="backendApiMethod">
        <el-checkbox-group v-model="apiForm.backendApiMethod">
          <el-checkbox label="GET"></el-checkbox>
          <el-checkbox label="POST" checked></el-checkbox>
          <el-checkbox label="PUT"></el-checkbox>
          <el-checkbox label="DELETE"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input type="textarea" v-model="apiForm.description" placeholder="描述"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
          <span class="dialog-footer">
            <el-button class="shadow" @click="dialogVisible = false">关 闭</el-button>
            <el-button class="shadow" type="primary" @click="saveAPI()">确 定</el-button>
          </span>
    </template>
  </el-dialog>
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
      moduleList: [],
      dialogVisible: false,
      deleteButtonVisible: false,
      apiForm: {
        backendApiName: "",
        moduleId: "",
        backendApiUrl: "",
        backendApiMethod: [],
        description: ""
      },
      rules: {
        backendApiName: [
          {required: true, message: '请填写接口名称', trigger: 'blur'}
        ],
        moduleId: [
          {required: true, message: '请选择模块', trigger: 'change'}
        ],
        backendApiUrl: [
          {required: true, message: '请填写路径', trigger: 'blur'}
        ],
        backendApiMethod: [
          {required: true, message: '请选择请求类型', trigger: 'change'}
        ],
        description: [
          {required: true, message: '请填写描述', trigger: 'change'}
        ]
      }


    }
  },
  mounted() {
    this.init();
    this.initModuleList();
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
    initModuleList() {
      this.axios.post("/module/getModuleList").then(response => {
        this.moduleList = response.data;
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
    open(row) {
      this.apiForm = {
        backendApiName: "",
        moduleId: "",
        backendApiUrl: "",
        backendApiMethod: [],
        description: ""
      };
      if (row !== undefined) {
        this.apiForm.backendApiName = row.backendApiName
        this.apiForm.moduleId = row.moduleId
        this.apiForm.backendApiUrl = row.backendApiUrl
        this.apiForm.backendApiMethod = row.backendApiMethod.split(",")
        this.apiForm.description = row.description
      }
      // alert()
      this.dialogVisible = true;
    },

    deleteAPI(index, row) {
      this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.post("/apiManage/deleteApiInfo", {backendApiId: row.backendApiId}).then(response => {
          this.init();
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    saveAPI() {
      this.$refs.apiForm.validate((valid) => {
        if (valid) {
          this.axios.post("/apiManage/saveApiInfo", {
            backendApiName: this.apiForm.backendApiName,
            moduleId: this.apiForm.moduleId,
            backendApiUrl: this.apiForm.backendApiUrl,
            backendApiMethod: this.apiForm.backendApiMethod.toString(),
            description: this.apiForm.description
          }).then(response => {
            console.log(response);
          }).catch(err => {
            console.log(err);
          })
          this.dialogVisible = false;
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>

<style scoped>
</style>