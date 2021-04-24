<template>
  <div class="button-box">
<!--    <el-button type="primary" size="mini" round>新增</el-button>-->
    <el-upload
        ref="upload"
        class="upload-demo"
        action
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        :limit=limit
        :auto-upload="true"
        :before-upload="beforeUpload"
        :on-change="handleChange"
        :on-remove="handleRemove"
        :on-exceed="handleExceed"
        :on-success="handleSuccess"
        :on-error="handleError"
        :file-list="fileList"
        :http-request="uploadFile"
    >
      <el-button round
          size="small"
          type="primary"
          element-loading-text="拼命加载中..."
          v-loading.fullscreen.lock="fullscreenLoading">导入
      </el-button>
    </el-upload>
  </div>
  <el-table :data="tableData.list"
            style="width: 100%" border
            header-row-class-name="table-header"
            :row-class-name="tableRowClassName">
    <el-table-column prop="fullName" label="姓名" width="180"></el-table-column>
    <el-table-column prop="clockInDate" label="日期" width="180"></el-table-column>
    <el-table-column prop="dayOfWeek" label="星期"></el-table-column>
    <el-table-column prop="clockInInfo" label="打卡信息"></el-table-column>
    <el-table-column prop="createTime" label="导入时间"></el-table-column>
    <el-table-column prop="analyzed" label="异常">
    </el-table-column>
    <el-table-column label="操作" width="200px">
      <template #default="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" round>查看</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" round>撤销</el-button>
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
</template>

<script>
export default {
  name: "Attendance-clock-in-records-board",
  data() {
    return {
      tableData: {
        list: [],
        pageNum: 1,
        pageSize: 10
      },
      fullscreenLoading: false, // 上传文件加载
      limit: 1,  // 上传excell时，同时允许上传的最大数
      fileList: [],   // excel文件列表
    }
  },
  created() {
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.axios.post("/clockIn/getClockInRecords", {
        pageNum: this.tableData.pageNum,
        pageSize: this.tableData.pageSize
      }).then(response => {
        this.tableData = response.data;
      }).catch(err => {
        console.log(err);
      })
    },
    tableRowClassName() {

    },
    handleCurrentChange(pageNum) {
      this.tableData.pageNum = pageNum;
      this.init();
    },
    handleSizeChange(pageSize) {
      this.tableData.pageSize = pageSize;
      this.init();
    },
    // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
    beforeUpload(file) {
      const isText = file.type === 'application/vnd.ms-excel';
      const isTextComputer = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      if (!isText && !isTextComputer) {
        this.fullscreenLoading = false
        this.$message.warning('请上传excel格式文件！')
        return false;
      }
    },

    // 文件状态改变
    handleChange(file, fileList) {
      if (file) {
        this.fileList = fileList.slice(-1)
      }
    },

    // 删除文件
    handleRemove(file, fileList) {
      this.fileList = []
    },
    // 文件超出个数限制
    handleExceed(files, fileList) {
      this.$message.warning(`只能选择 1个文件，当前共选择了 ${files.length + fileList.length} 个`)
    },

    // 文件上传成功
    handleSuccess(res, file, fileList) {
      this.$message.success('文件上传成功')
    },

    // 文件上传失败
    handleError(err, file, fileList) {
      this.$message.error('文件上传失败')
    },

    // 覆盖默认的上传行为，自定义上传的实现
    uploadFile(file) {
      if (this.fileList.length === 0) {
        this.$message.warning('请选择文件')
      } else {
        const data = new FormData()
        const fileUps = file.file
        this.fullscreenLoading = true
        data.append('file', fileUps)

        this.axios.post("/clockIn/import", data, {headers: {'Content-Type': 'multipart/form-data'}}).then(response => {
          console.log(response)
          if (response.data === 'success') {
            this.fullscreenLoading = false
            this.$message({
              type: 'success',
              message: '导入成功'
            })
          }
          this.$refs.upload.clearFiles();//移除文件，防止重复上传
        }).catch(err => {
          this.fullscreenLoading = false
          this.$message.error('导入失败')
          this.$refs.upload.clearFiles();//移除文件，防止重复上传
        })

        // this.axios({
        //   headers: {
        //     'Content-Type': 'multipart/form-data'
        //   },
        //   url: baseurl + '/jfzd/upload',
        //   data: data,
        //   method: 'post'
        // }).then(res=>{
        //
        // },err =>{
        //
        // })
      }
    },
  }
}
</script>

<style scoped>

</style>