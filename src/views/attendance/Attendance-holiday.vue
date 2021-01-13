<template>
  <el-alert :closable="false"
            title="通过点击日期来标记或取消假期"
            type="info">
  </el-alert>

  <el-calendar v-model="calenderDay" @date-change="change">
    <template #dateCell="{data}">
      <div style="height: 100%; text-align: center;" @click="choseDay(data.day)">
            <span :class="[holidays.filter(item => item === data.day).length > 0 ? 'is-holiday' : '', 'calender-font']">
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
export default {
  name: "Attendance-holiday", data() {
    return {
      calenderDay: '',
      holidays: [],
      holidaysCatch: []
    }
  },
  created: function() {
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
      for (let i = 0; i < this.holidays.length; i++) {
        if (this.holidays[i] === day) {
          checked = true
          delete this.holidays[i];
          this.theDayIsWorkDay(day);
          break;
        }
      }
      if (!checked) {
        this.holidays.push(day);
        this.theDayIsHoliday(day);
      }
    },
    theDayIsHoliday(day) {
      this.holidaysCatch.push({opt: "1", day: day})
    },
    theDayIsWorkDay(day) {
      this.holidaysCatch.push({opt: "-1", day: day})
    },
    initCalendar(date) {
      if (date === undefined) {
        date = new Date();
      }
      let param = {};
      param.year = date.getFullYear();
      param.month = date.getMonth() + 1;

      let that = this;
      this.axios.post("/holiday/getHolidaysByYear", param).then(function (response) {
        that.holidays = response.data;
      }).catch(function (error) {

      });
    },
    initHolidays() {
      this.axios.post("/holiday/initHolidaysByYear", 2021).then(function (response) {
      }).catch(function (error) {

      });
    },
    saveHolidays() {
      this.axios.post("/holiday/updateHolidays", this.holidaysCatch).then(function (response) {
      }).catch(function (error) {

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
  padding: 10px 12px;
  border-radius: 45px;
}

.is-holiday {
  color: #ffffff;
  font-weight: bold;
  background: #F56C6C;

}
</style>
<style>
.el-calendar-day {
  padding: 0 !important;
}
</style>