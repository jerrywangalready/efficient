<template>
  <el-button class="shadow" type="success" @click="dialogVisible = true">加班</el-button>
  <el-dialog title="加班申请" v-model="dialogVisible" width="490px">
    <el-form :model="overtimeForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="加班日期" required>
        <div class="block">
          <el-date-picker
              v-model="overtimeForm.date"
              type="date"
              placeholder="选择日期"
              style="width: 100%">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="加班时间" required>
        <el-time-picker
            is-range
            v-model="overtimeForm.time"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
       >
        </el-time-picker>
      </el-form-item>
      <el-form-item label="请假事由" prop="desc">
        <el-input type="textarea" v-model="overtimeForm.desc"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('overtimeForm')">确 定</el-button>
          </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "Attendance-overtime",
  data() {
    return {
      dialogVisible: false,
      overtimeForm: {
        date: '',
        time: '',
        name: '',
        type: '',
        leaveTime: '',
        date2: '',
        delivery: false,
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入活动名称', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        type: [
          {required: true, message: '请选择请假类型', trigger: 'change'}
        ],
        leaveTime: [
          {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
        ],
        // type: [
        //   { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        // ],
        resource: [
          {required: true, message: '请选择活动资源', trigger: 'change'}
        ],
        desc: [
          {required: true, message: '请填写活动形式', trigger: 'blur'}
        ]
      },
      defaultTime2: [
        new Date(2000, 1, 1, 12, 0, 0),
        new Date(2000, 2, 1, 8, 0, 0)
      ]
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
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