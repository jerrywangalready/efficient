<template>
  <el-button class="shadow" type="danger" @click="dialogVisible = true" round>请假</el-button>
  <el-dialog title="请假申请" v-model="dialogVisible" width="540px">
    <el-form :model="leaveForm" :rules="rules" ref="leaveForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="请假类型" prop="type">
        <el-select v-model="leaveForm.leaveType" placeholder="请选择请假类型" style="width: 100%">
          <el-option label="调休" value="tx"></el-option>
          <el-option label="病假" value="bj"></el-option>
          <el-option label="公出" value="gc"></el-option>
          <el-option label="年假" value="nj"></el-option>
          <el-option label="事假" value="sj"></el-option>
          <el-option label="婚假" value="hj"></el-option>
          <el-option label="生育假" value="birth"></el-option>
          <el-option label="工伤假" value="gs"></el-option>
          <el-option label="丧假" value="sj"></el-option>
          <el-option label="其它" value="other"></el-option>
          <template #prefix>
            <i class="el-input__icon el-icon-position"></i>
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="请假时间" required>
        <div class="block">
          <el-date-picker class="leaveTime"
                          v-model="leaveForm.leaveTime"
                          type="datetimerange"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          :default-time="defaultTime2"
                          :shortcuts="shortcuts"
          >
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="请假事由" prop="reason">
        <el-input type="textarea" v-model="leaveForm.reason"></el-input>
      </el-form-item>
      <el-divider></el-divider>
      <el-steps :active="0" simple>
        <el-step title="申请" icon="el-icon-tickets"></el-step>
        <el-step title="芦鑫" icon="el-icon-s-check"></el-step>
        <el-step title="完成" icon="el-icon-check"></el-step>
      </el-steps>
    </el-form>
    <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('leaveForm')">确 定</el-button>
          </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "Attendance-leave",
  data() {
    return {
      shortcuts: [
        {
          text: '昨天',
          value: (() => {
            const start = new Date()
            start.setHours(9)
            start.setMinutes(0)
            start.setSeconds(0)
            start.setTime(start.getTime() - 1000 * 3600 * 24)
            const end = new Date()
            end.setTime(start.getTime() + 3600 * 1000 * 9)
            return [start, end]
          })()
        },
        {
          text: '今天上午',
          value: (() => {
            const start = new Date()
            start.setHours(9)
            start.setMinutes(0)
            start.setSeconds(0)
            start.setTime(start.getTime())
            const end = new Date()
            end.setTime(start.getTime() + 3600 * 1000 * 3)
            return [start, end]
          })()
        },
        {
          text: '今天下午',
          value: (() => {
            const start = new Date()
            start.setHours(13)
            start.setMinutes(0)
            start.setSeconds(0)
            start.setTime(start.getTime())
            const end = new Date()
            end.setTime(start.getTime() + 3600 * 1000 * 5)
            return [start, end]
          })()
        },
        {
          text: '明天',
          value: (() => {
            const start = new Date()
            start.setHours(9)
            start.setMinutes(0)
            start.setSeconds(0)
            start.setTime(start.getTime() + 3600 * 1000 * 24)
            const end = new Date()
            end.setTime(start.getTime() + 3600 * 1000 * 9)
            return [start, end]
          })()
        }
      ],
      dialogVisible: false,
      leaveForm: {
        leaveType: '',
        leaveTime: [],
        reason: ''
      },
      rules: {
        leaveType: [
          {required: true, message: '请选择请假类型', trigger: 'change'}
        ],
        leaveTime: [
          {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
        ],
        reason: [
          {required: true, message: '请填写请假原因', trigger: 'blur'}
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
          let dateFormat = "yyyy-MM-dd HH:mm:ss";
          let param = {};
          param.leaveType = this.leaveForm.leaveType;
          param.startDate = this.leaveForm.leaveTime[0].format(dateFormat);
          param.endDate = this.leaveForm.leaveTime[1].format(dateFormat);
          param.reason = this.leaveForm.reason;
          this.axios.post("/leave/apply", param).then(response => {
            if (response.data) {
              this.dialogVisible = false;
            }
          }).catch(err => {
          })
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