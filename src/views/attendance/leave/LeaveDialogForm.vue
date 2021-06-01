<template>
  <el-form :model="leaveForm" :rules="rules" label-position="top" ref="leaveForm" label-width="100px"
           class="demo-ruleForm">
    <el-card class="box-card">
      <el-form-item label="" prop="leaveType">
        <el-select v-model="leaveForm.leaveType" placeholder="请假类型" style="width: 100%" @change="compute">
          <el-option-group
              v-for="group in leaveReasons"
              :key="group.label"
              :label="group.label">
            <el-option
                v-for="item in group.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled">
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.remark }}</span>
            </el-option>
          </el-option-group>
          <template #prefix>
            <i class="el-input__icon el-icon-position"></i>
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="leaveTime" required>
        <el-date-picker v-if="specialLeaveType.includes(leaveForm.leaveType) "
                        v-model="leaveForm.leaveTime"
                        style="width: 100%"
                        align="left"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        @change="compute">
        </el-date-picker>
        <el-date-picker v-else class="leaveTime"
                        v-model="leaveForm.leaveTime"
                        type="datetimerange"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="defaultTime2"
                        :shortcuts="shortcuts"
                        @change="compute"
                        is-range
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="" prop="reason">
        <el-input type="textarea" v-model="leaveForm.reason" placeholder="请假事由"></el-input>
      </el-form-item>
      <el-form-item label="" prop="approver">
        <el-select v-model="leaveForm.approver" placeholder="审批人" style="width: 100%">
          <el-option
              v-for="item in approverList"
              :key="item.userName"
              :label="item.fullName"
              :value="item.userName">
          </el-option>
        </el-select>
      </el-form-item>
    </el-card>

    <el-form-item class="leave-button-box" style="margin-bottom: 0;margin-top: 15px;">

    </el-form-item>
  </el-form>
  <ul class="list-normal settlement">
    <li style="font-weight: bold;">
      <span>总时长</span><span>{{ settlement.duration === 0 ? 0 : settlement.duration + settlement.unit }}</span></li>
    <li><span>减免</span><span>{{ settlement.remit === 0 ? 0 : '- ' + settlement.remit + settlement.unit }}</span></li>
    <el-divider style="margin: 15px 0;"></el-divider>
    <li style="height: 30px; font-size: 20px; color: #888888">
          <span style="float: right; ">实际扣除 <span
              style="color: #de1534; font-size: 20px;margin-left: 5px;">
            {{ settlement.amount === 0 ? 0 : settlement.amount + settlement.unit }}
          </span></span>
    </li>
    <li>
          <span style="float: right; font-size: 10px">
            = 调休 {{ settlement.shift === 0 ? 0 : settlement.shift + settlement.unit }}&nbsp;+
            年假 {{ settlement.annually === 0 ? 0 : settlement.annually + settlement.unit }}
          </span>
    </li>
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
</template>

<script>
export default {
  name: "LeaveDialogForm",
  data() {
    return {
      leaveReasons: [
        {
          label: '常用类型',
          options: [
            {label: "调休", value: "shift", remark: ""},
            {label: "病假", value: "sick", remark: "减免一半"},
            {label: "出差", value: "officeAffairs", remark: "不扣调休"}
          ]
        }, {
          label: '请假类型',
          options: [
            {label: "年假", value: "annually", remark: ""},
            {label: "事假", value: "privateAffairs", remark: ""},
            {label: "婚假", value: "marriage", remark: "减免10自然天"},
            {label: "生育假", value: "birth", remark: "减免128自然天"},
            {label: "陪产假", value: "paternity", remark: "减免15自然天"},
            {label: "工伤假", value: "injury", remark: ""},
            {label: "丧假", value: "funeral", remark: "减免3自然天"},
            {label: "其它", value: "other", remark: ""}
          ]
        }

      ],
      specialLeaveType: ['marriage', 'birth', 'paternity', 'funeral'],
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
      leaveForm: {
        leaveType: '',
        leaveTime: '',
        reason: '',
        approver: ''
      },
      rules: {
        leaveType: [
          {required: true, message: '请选择请假类型', trigger: 'change'}
        ],
        leaveTime: [
          {required: true, message: '请选择日期', trigger: 'blur'}
        ],
        approver: [
          {required: true, message: '请选择审批人', trigger: 'change'}
        ],
        reason: [
          {required: true, message: '请填写请假原因', trigger: 'blur'}
        ]
      },
      defaultTime2: [
        new Date(2000, 1, 1, 12, 0, 0),
        new Date(2000, 2, 1, 18, 0, 0)
      ],
      settlement: {
        unit: "",
        duration: 0,
        shift: 0,
        annually: 0,
        remit: 0,
        amount: 0
      },
      defaultTime: [
        new Date(2000, 1, 1, 18, 0, 0),
      ],
      approverList: []
    }
  },
  mounted() {
    this.getBalance()
    this.getUsersByRole();
  },
  methods: {
    getUsersByRole() {
      this.axios.post("/user/getUsersByRole", {role: 'APPROVER'}).then(response => {
        this.approverList = response.data;
      }).catch(err => {
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let dateFormat = "yyyy-MM-dd HH:mm:ss";
          let param = {};
          param.leaveType = this.leaveForm.leaveType;
          if (this.specialLeaveType.includes(param.leaveType)) {
            let s = this.leaveForm.leaveTime[0]
            s.setHours(9);
            param.startDate = s.format(dateFormat);
            let e = this.leaveForm.leaveTime[1]
            e.setHours(18);
            param.endDate = e.format(dateFormat);
          } else {
            param.startDate = this.leaveForm.leaveTime[0].format(dateFormat);
            param.endDate = this.leaveForm.leaveTime[1].format(dateFormat);
          }
          param.reason = this.leaveForm.reason;
          param.approver = this.leaveForm.approver;
          param.duration = this.settlement.amount;
          console.log(param);
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
    getBalance() {
      this.axios.post("/balance/getBalance").then(response => {
        if (response.data.shift === 0) {
          this.leaveReasons[0].options[0].remark = "剩余0时"
          this.leaveReasons[0].options[0].disabled = true
        } else {
          this.leaveReasons[0].options[0].remark = "剩余" + response.data.shift + "小时"
        }
        if (response.data.annually === 0) {
          this.leaveReasons[1].options[0].remark = "剩余0时"
          this.leaveReasons[1].options[0].disabled = true
        } else {
          this.leaveReasons[1].options[0].remark = "剩余" + response.data.annually + "小时"
        }


        console.log(this.leaveReasons);
      }).catch(err => {
      })
    },
    compute() {
      console.log(this.leaveForm.leaveTime);
      if (this.leaveForm.leaveType !== "" && this.leaveForm.leaveTime !== "") {
        let param = {};
        param.leaveType = this.leaveForm.leaveType;
        let dateFormat = "yyyy-MM-dd HH:mm:ss";
        if (this.specialLeaveType.includes(param.leaveType)) {
          let s = this.leaveForm.leaveTime[0]
          s.setHours(9);
          param.startDate = s.format(dateFormat);
          let e = this.leaveForm.leaveTime[1]
          e.setHours(18);
          param.endDate = e.format(dateFormat);
        } else {
          param.startDate = this.leaveForm.leaveTime[0].format(dateFormat);
          param.endDate = this.leaveForm.leaveTime[1].format(dateFormat);
        }

        this.axios.post("/leave/computeSettlement", param).then(response => {
          this.settlement = response.data;
        }).catch(err => {
        })
      }
    },
    cancel() {
      this.$emit('cancel', false)
    }
  }
}
</script>

<style scoped>
.settlement {
  padding: 0 0 0 0;
  margin: 30px 0 0;
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

.box-card {
  padding: 30px 10px 12px;
}



</style>