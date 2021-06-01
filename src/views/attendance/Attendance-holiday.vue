<template>
  <el-alert :closable="false"
            title="通过点击日期来标记或取消假期，实心红圆代表休一天，空心红圈代表休半天"
            type="info">
  </el-alert>

  <el-calendar v-model="calenderDay">
    <template #dateCell="{data}">
      <div style="height: 100%; text-align: center;" @click="choseDay(data.day)">
            <span
                :class="['calender-font'
                , holidays.filter(item => item.holiday === data.day && item.during === 'd').length > 0 ?'holiday-d' : ''
                , holidays.filter(item => item.holiday === data.day && item.during === 'pm').length > 0 ? 'holiday-pm':'']">
              {{ data.day.split('-')[2] }}
            </span>
      </div>
    </template>
  </el-calendar>

  <div class="center">
    <!--  <el-button type="primary" @click="initHolidays">initHolidays</el-button>-->
    <el-button v-if="holidaysCatch.length >0 " type="primary" @click="saveHolidays">保存</el-button>
    <el-button v-if="holidaysCatch.length >0 " type="primary" @click="cancel">取消</el-button>

  </div>
</template>

<script>
import {ElMessage} from 'element-plus'
// import myTest from "@/api";
// import {myPost} from '@/api/ajax'
export default {
  name: "Attendance-holiday", data() {
    return {
      calenderDay: new Date(),
      holidays: [],
      holidaysCatch: []
    }
  },
  created: function () {

    this.$nextTick(() => {
      // 点击前一个月
      let prevBtn = document.querySelector(
          ".el-calendar__button-group .el-button-group>button:nth-child(1)"
      );
      prevBtn.addEventListener("click", e => {
        this.initCalendar(this.calenderDay)
      });

      //点击下一个月
      let nextBtn = document.querySelector(
          ".el-calendar__button-group .el-button-group>button:nth-child(3)"
      );
      nextBtn.addEventListener("click", () => {
        this.initCalendar(this.calenderDay)
      });

      //点击今天
      let todayBtn = document.querySelector(
          ".el-calendar__button-group .el-button-group>button:nth-child(2)"
      );
      todayBtn.addEventListener("click", () => {
        this.initCalendar(this.calenderDay)
      });
    });
  },
  mounted() {
    this.initCalendar();
  },
  methods: {
    choseDay(day) {
      let checked = false;
      this.holidays.forEach((item, index, arr) => {
        if (item.holiday === day) {
          checked = true
          if (item.during === 'd') {
            item.during = 'pm'
            this.holidaysCatch.push({opt: "0", day: day})
          } else {
            arr.splice(index, 1);
            this.holidaysCatch.push({opt: "-1", day: day})
          }
          return false;
        }
      })

      if (!checked) {
        this.holidays.push({during: 'd', holiday: day});
        this.holidaysCatch.push({opt: "1", day: day})
        checked = true;
      }
    },
    initCalendar(date) {
      if (date === undefined) {
        date = new Date();
      }
      let param = {};
      param.year = date.getFullYear();
      param.month = date.getMonth() + 1;

      // this.axios.post("/holiday/test", param).then((response) => {
      this.axios.post("/holiday/getHolidaysByYear", param).then((response) => {
        console.log(response);

        this.holidays = response.data;
        // 将catch中暂存的日期补充到holidays对象中
        this.holidaysCatch.forEach(item => {
          if (item.opt === '1') {
            this.holidays.push({during: 'd', holiday: item.day})
          } else if (item.opt === '0') {
            this.holidays.filter(h => h.holiday === item.day)[0].during = 'pm';
          } else {
            this.holidays.forEach((h, index, arr) => {
              if (h.holiday === item.day) {
                this.holidays.splice(index, 1)
              }
            })
          }

        });
      }).catch((error) => {

      });
    },
    initHolidays() {
      this.axios.post("/holiday/initHolidaysByYear", 2021).then((response) => {

      }).catch((error) => {

      });
    },
    saveHolidays() {
      this.axios.post("/holiday/updateHolidays", this.holidaysCatch).then((response) => {
        this.holidaysCatch = [];
        ElMessage.success({
          message: '保存成功!',
          type: 'success'
        });
      }).catch((error) => {

      });
    },
    cancel() {
      this.holidaysCatch = [];
      this.initCalendar()
    }
    ,
    // chargeObjectEqual(obj1, obj2, exclude) {
    //   let propsCurr = Object.getOwnPropertyNames(obj1);
    //   let propsCompare = Object.getOwnPropertyNames(obj2);
    //   if (propsCurr.length !== propsCompare.length) {
    //     return false;
    //   }
    //   for (let i = 0, max = propsCurr.length; i < max; i++) {
    //     let propName = propsCurr[i];
    //     if (exclude.indexOf(propName) > -1) {
    //       continue;
    //     }
    //     if (obj1[propName] !== obj2[propName]) {
    //       return false;
    //     }
    //   }
    //   return true;
    // }
  }
}
</script>

<style scoped>
.calender-font {
  font-size: 21px;
  position: relative;
  top: 30px;
  border-radius: 45px;
  user-select: none;
}

.holiday-d {
  padding: 10px 12px;
  color: #ffffff;
  font-weight: bold;
  background: #F56C6C;
}

.holiday-pm {
  padding: 5px 7px;
  font-weight: bold;
  border: 5px solid #F56C6C;
}

td.next .holiday-d, td.next .holiday-pm, td.prev .holiday-d, td.prev .holiday-pm {
  opacity: 0.5;

}
</style>
<style>
.el-calendar-day {
  padding: 0 !important;
}
</style>