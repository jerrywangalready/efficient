<template>
  <el-button class="shadow" type="danger" @click="dialogVisible = true">请假</el-button>
  <el-dialog title="请假申请" v-model="dialogVisible" width="540px">
    <el-form :model="leaveForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="请假类型" prop="type">
        <el-select v-model="leaveForm.type" placeholder="请选择请假类型" style="width: 100%">
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
          <el-date-picker
              v-model="leaveForm.leaveTime"
              type="datetimerange"
              align="right"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="defaultTime2">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="请假事由" prop="desc">
        <el-input type="textarea" v-model="leaveForm.desc"></el-input>
      </el-form-item>



<!--      <el-form-item label="即时配送" prop="delivery">-->
<!--        <el-switch v-model="leaveForm.delivery"></el-switch>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="活动性质" prop="type">-->
<!--        <el-checkbox-group v-model="leaveForm.type">-->
<!--          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>-->
<!--          <el-checkbox label="地推活动" name="type"></el-checkbox>-->
<!--          <el-checkbox label="线下主题活动" name="type"></el-checkbox>-->
<!--          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>-->
<!--        </el-checkbox-group>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="特殊资源" prop="resource">-->
<!--        <el-radio-group v-model="leaveForm.resource">-->
<!--          <el-radio label="线上品牌商赞助"></el-radio>-->
<!--          <el-radio label="线下场地免费"></el-radio>-->
<!--        </el-radio-group>-->
<!--      </el-form-item>-->
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
      dialogVisible: false,
      leaveForm: {
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
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择请假类型', trigger: 'change' }
        ],
        leaveTime: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        // type: [
        //   { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        // ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      },
      defaultTime2: [
        new Date(2000, 1, 1, 12, 0, 0),
        new Date(2000, 2, 1, 8, 0, 0)
      ]
    }
  },
  methods:{
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