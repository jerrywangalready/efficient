<template>
  <h1 class="j-title">审批</h1>
  <el-tabs type="border-card">
    <el-tab-pane label="待审批">
      <template v-for="item in approvalOfPending">
        <!-- 请假 -->
        <el-card v-if="item.approveType === 'leave'" class="leave-card box-card"
                 @click="showDetail(item.id)"
                 shadow="hover">
          <template #header>
            <div class="card-header">
              <span style="font-weight: bold">{{ item.userName }}</span>
              <el-button class="button shadow" style="float: right;" type="success" size="mini" :circle="item.check"
                         :round="!item.check"
                         icon="el-icon-check"
                         @mouseover="item.check=false" @mouseleave="item.check=true"
                         v-html="item.check?'<i class=\'el-icon-check\'></i>':'<i class=\'el-icon-check\'></i><span>同意</span>'">
              </el-button>
            </div>
          </template>
          <div class="left-box">
            <el-tag type="warning" effect="dark" size="mini">{{
                item.leaveTypeName
              }}
            </el-tag>
            <span class="duration" style="margin-top: 33px">{{ item.duration }}</span>
            <el-tag effect="plain" size="mini">小时</el-tag>
          </div>
          <div class="right-box">
            <el-row>
              <el-col :span="10" style="text-align: center">
                <span style="display: inline-block;font-weight: bold">{{ item.startDate }}</span>
                <span style="display: inline-block;">{{ item.startTime }}</span>
                <span style="display: inline-block"><el-tag size="mini">{{ item.startWeekDay }}</el-tag></span>
              </el-col>
              <el-col :span="4" class="figure-icon" style="text-align: center">
                <i class="el-icon-arrow-right"></i>
              </el-col>
              <el-col :span="10" style="text-align: center">
                <span style="display: inline-block;font-weight: bold">{{ item.endDate }}</span>
                <span style="display: inline-block;">{{ item.endTime }}</span>
                <span style="display: inline-block"><el-tag size="mini">{{ item.endWeekDay }}</el-tag></span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" style="padding: 8px 8px 0;">
                <span style="display: block; color: #9ba5b8; font-size: 12px">请假事由：</span>
                <span>{{ item.reason }}</span>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <!-- 加班 -->
        <el-card v-else-if="item.approveType === 'overtime'" class="overtime-card box-card"
                 @click="showDetail(item.id)"
                 shadow="hover">
          <template #header>
            <div class="card-header">
              <span style="font-weight: bold">{{ item.userName }}</span>
              <el-button class="button shadow" style="float: right;" type="success" size="mini" :circle="item.check"
                         :round="!item.check"
                         icon="el-icon-check"
                         @mouseover="item.check=false" @mouseleave="item.check=true"
                         v-html="item.check?'<i class=\'el-icon-check\'></i>':'<i class=\'el-icon-check\'></i><span>同意</span>'">
              </el-button>
            </div>
          </template>
          <div class="left-box">
            <el-tag type="success" effect="dark" size="mini">加班</el-tag>
            <span class="duration" style="margin-top: 33px">{{ item.duration }}</span>
            <el-tag effect="plain" size="mini">小时</el-tag>
          </div>
          <div class="right-box">
            <el-row>
              <el-col :span="10" style="text-align: center">
                <span style="display: inline-block;font-weight: bold">{{ item.startDate }}</span>
                <span style="display: inline-block;">{{ item.startTime }}</span>
                <span style="display: inline-block"><el-tag size="mini">{{ item.startWeekDay }}</el-tag></span>
              </el-col>
              <el-col :span="4" class="figure-icon" style="text-align: center">
                <i class="el-icon-arrow-right"></i>
              </el-col>
              <el-col :span="10" style="text-align: center">
                <span style="display: inline-block;font-weight: bold">{{ item.endDate }}</span>
                <span style="display: inline-block;">{{ item.endTime }}</span>
                <span style="display: inline-block"><el-tag size="mini">{{ item.endWeekDay }}</el-tag></span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" style="padding: 8px 8px 0;">
                <span style="display: block; color: #9ba5b8; font-size: 12px">请假事由：</span>
                <span>{{ item.reason }}</span>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </template>
    </el-tab-pane>
    <el-tab-pane label="已审批">
      <el-table
          :data="tableData"
          style="width: 100%">
        <el-table-column
            prop="date"
            label="日期"
            width="180">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            width="180">
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址">
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>

  <el-dialog title="详细信息" destroy-on-close v-model="dialogVisible">
    <el-descriptions title="用户信息">
      <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
      <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
      <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
      <el-descriptions-item label="备注">
        <el-tag size="small">学校</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
    </el-descriptions>
  </el-dialog>
</template>

<script>
import attendanceHoliday from "../Attendance-holiday";
import clockInRecordsBoard from "../clockin/ClockInRecordsBoard";

export default {
  name: "Attendance-config",
  components: {
    attendanceHoliday,
    clockInRecordsBoard
  },
  data() {
    return {
      dialogVisible: false,
      buttonText: "",
      approvalOfPending: [
        {
          approveType: "leave",
          userName: "张三",
          check: true,
          duration: 16,
          leaveTypeName: "陪产假",
          startDate: "05/16",
          startTime: "05:16",
          startWeekDay: "星期一",
          endDate: "05/16",
          endTime: "05:16",
          endWeekDay: "星期三",
          reason: "有事"
        },
        {
          approveType: "overtime",
          userName: "张三",
          check: true,
          duration: 16,
          leaveTypeName: "",
          startDate: "05/16",
          startTime: "05:16",
          startWeekDay: "星期一",
          endDate: "05/16",
          endTime: "05:16",
          endWeekDay: "星期三",
          reason: "有事"
        }
      ],
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    buttonOver() {
      this.but = false
    },
    buttonLeave() {
      this.but = true
      this.buttonText = ""
    },
    showDetail() {
      this.dialogVisible = true;
    }
  }
}
</script>

<style scoped>
.box-card {
  float: left;
  width: 240px;
  cursor: pointer;
  margin-right: 10px;
}

.left-box .duration {
  font-weight: bold;
  font-size: 35px;
  display: block;
  line-height: 36px;
}

.left-box {
  position: absolute;
  width: 46px;
  height: 98px;
  text-align: center;
  padding-right: 7px;
}

.right-box {
  float: left;
  margin-left: 57px;
  border-left: 1px solid #cccccc;
  padding-left: 9px;
}

.figure-icon {
  -webkit-justify-content: center;
  justify-content: center;
  display: flex;
  align-items: center;
  color: #aaaaaa;
  font-weight: bold;
}

.date-board {
  text-align: center;
  border: 1px solid #888888;
  padding: 4px;
}

.leave-card {
  border-color: #e6a23c;
  background: #fff6e8;
}

.overtime-card {
  border-color: #67c23a;
  background: #edffe4;

}
</style>