<template>
  <el-button class="shadow" type="success" @click="dialogVisible = true" round>加班</el-button>
  <el-dialog custom-class="gray-background" title="加班申请" v-model="dialogVisible" width="490px">
    <el-form :model="overtimeForm" label-position="top" :rules="rules" ref="overtimeForm" label-width="100px"
             class="demo-ruleForm">
      <el-card class="box-card">
        <el-form-item label="加班日期" required>
          <div class="block">
            <el-date-picker
                v-model="overtimeForm.overtimeDate"
                type="date"
                placeholder="选择日期"
                style="width: 100%">
            </el-date-picker>
          </div>
        </el-form-item>
        <!--      <el-form-item label="加班时间" required>-->
        <!--        <el-time-picker-->
        <!--            is-range-->
        <!--            v-model="overtimeForm.time"-->
        <!--            range-separator="-"-->
        <!--            start-placeholder="开始时间"-->
        <!--            end-placeholder="结束时间"-->
        <!--            placeholder="选择时间范围"-->
        <!--       >-->
        <!--        </el-time-picker>-->
        <!--      </el-form-item>-->
        <el-form-item label="加班事由" prop="desc">
          <el-input type="textarea" v-model="overtimeForm.reason"></el-input>
        </el-form-item>
      </el-card>
    </el-form>
    <ul class="list-normal settlement">
      <li style="font-weight: bold;">
        <span>总时长</span><span>12</span></li>
      <el-divider style="margin: 15px 0;"></el-divider>
    </ul>
    <el-row class="leave-button-box" :gutter="5">
      <el-col :span="19">
        <el-button class="button-hover" type="primary" style="width: 100%"
                   @click="submitForm('leaveForm')">确 定
        </el-button>
      </el-col>
      <el-col :span="5">
        <el-button class="button-hover" @click="cancel" style="width: 100%">取 消</el-button>
      </el-col>
    </el-row>
    <!--    <template #footer>-->
    <!--          <span class="dialog-footer">-->
    <!--            <el-button @click="dialogVisible = false">取 消</el-button>-->
    <!--            <el-button type="primary" @click="submitForm('overtimeForm')">确 定</el-button>-->
    <!--          </span>-->
    <!--    </template>-->
  </el-dialog>
</template>

<script>
export default {
  name: "Attendance-overtime",
  data() {
    return {
      dialogVisible: false,
      overtimeForm: {
        overtimeDate: '',
        reason: ''
      },
      rules: {
        overtimeDate: [
          {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
        ],
        reason: [
          {required: true, message: '请填写加班事由', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      // todo 选项应该是节假日,默认是最近的节假日
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let param = {};
          param.overtimeDate = this.overtimeForm.overtimeDate.format("yyyy-MM-dd");
          param.reason = this.overtimeForm.reason;
          this.axios.post("/overtime/apply", param).then(response => {
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
.box-card {
}
</style>