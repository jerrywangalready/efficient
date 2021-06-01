<template>
  <el-button class="shadow" type="warning" @click="dialogVisible = true" round>请假</el-button>
  <el-dialog custom-class="gray-background" title="请假申请" v-model="dialogVisible"
             destroy-on-close width="492px">
    <LeaveDialogForm @cancel="cancel"></LeaveDialogForm>
<!--    <template #footer>-->
<!--          <span class="dialog-footer">-->
<!--            <el-button @click="dialogVisible = false">取 消</el-button>-->
<!--            <el-button type="primary" @click="submitForm('leaveForm')">确 定</el-button>-->
<!--          </span>-->
<!--    </template>-->
  </el-dialog>
</template>

<script>
import LeaveDialogForm from "@/views/attendance/leave/LeaveDialogForm";

export default {
  name: "LeaveDialog",
  components: {
    LeaveDialogForm
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  mounted() {
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
    },
    cancel(visible) {
      this.dialogVisible = visible
    }
  }
}
</script>

<style scoped>
.settlement {
  padding: 0 0 0 59px;
  margin: 0;
}

.settlement li {
  height: 25px;
}

.settlement li span:first-child {
  float: left;
}

.settlement li span:last-child {
  float: right;
}

.el-divider {
  margin: 15px 0;
}

.el-dialog {
  background-color: #ffd75e;
}
</style>

