<template>
  <!--  <el-container>-->
  <!--    <el-main style="padding-top: 0">-->
  <el-row>
    <el-col :span="24" style="overflow-x: auto">
      <h1 class="j-title">近期请假人员</h1>
      <el-card>
        <div style="width: 1320px;height: auto">
          <div class="day-label">
            <ul class="leave-officer-bar">
              <li v-for="item in leaveOfficers">
                <span :class="{holiday: item.isHodiday}">{{ item.day }}</span>
              </li>
            </ul>
          </div>
          <div class="officer-box">
            <ul class="leave-officer-bar">
              <li v-for="item in leaveOfficers">
                <el-space direction="vertical" size="large">
                  <el-badge v-for="officer in item.officers" :value="officer.duration" class="item"
                            :type="officer.type">
                    <el-tag class=""
                            :key="officer.label"
                            type="info"
                            effect="plain">
                      <div style="width: 35px; color: #000">
                        {{ officer.label }}
                      </div>
                    </el-tag>
                  </el-badge>
                </el-space>
              </li>
            </ul>
            <div style="clear: both"></div>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="24" style="padding: 0">
      <el-container>
        <el-main style="padding: 10px">
          <h1 class="j-title">我的记录</h1>
          <el-card>
            <div class="block">
              <el-timeline>
                <el-timeline-item timestamp="创建时间：2018-4-12 13:12:05" placement="top">
                  <el-card>
                    <h4>请假</h4>
                    <p>王小虎 提交于 2018/4/12 20:46</p>
                  </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="创建时间：2018/4/3 15:09:16" placement="top">
                  <el-card>
                    <h4>加班</h4>
                    <p>王小虎 提交于 2018/4/3 20:46</p>
                  </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="创建时间：2018/4/2 08:32:01" placement="top">
                  <el-card>
                    <h4>旷工</h4>
                    <p>王小虎 提交于 2018/4/2 20:46</p>
                  </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="创建时间：2018/4/2 08:32:01" placement="top">
                  <el-card>
                    <h4>迟到/早退 超限</h4>
                    <p>王小虎 提交于 2018/4/2 20:46</p>
                  </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="创建时间：2018/4/2 08:32:01" placement="top">
                  <el-card>
                    <h4>漏打卡 超限</h4>
                    <p>王小虎 提交于 2018/4/2 20:46</p>
                  </el-card>
                </el-timeline-item>
              </el-timeline>
            </div>
          </el-card>
        </el-main>
        <el-aside style="padding: 10px">
          <RestBalance></RestBalance>
        </el-aside>
      </el-container>
    </el-col>
  </el-row>
  <el-row>
    <el-col>
      <h1 class="j-title">配置</h1>
      <attendance-config></attendance-config>
    </el-col>
  </el-row>

  <!--  <ul>-->
  <!--    <li v-for="product in saleProducts">-->
  <!--      <span>{{ product.name }}</span>-->
  <!--      <span>${{ product.price }}</span>-->
  <!--    </li>-->
  <!--  </ul>-->
  <!--  <el-button type="primary" @click="reducePrice(3)">buttonCont</el-button>-->
  <!--    </el-main>-->
  <!--    <el-aside>-->


  <!--      <modal-button></modal-button>-->
  <!--    </el-aside>-->
  <!--  </el-container>-->
</template>

<script>
import AttendanceConfig from './Attendance-config'
import RestBalance from './RestBalance'


export default {
  components: {
    AttendanceConfig,
    RestBalance
  },
  data() {
    return {
      vacationBalance: {
        day: 3,
        hour: 76
      },
      leaveOfficers: [
        {
          day: 30,
          officers: [
            {type: 'success', label: '刘德华', duration: '3时'},
            {type: 'warning', label: '赵四', duration: '3天'}
          ]
        },
        {day: 31, officers: [{type: 'primary', label: '张惠妹', duration: '1天+'}]},
        {
          day: 1,
          officers: [
            {type: 'danger', label: '王菲', duration: '8天'},
            {type: 'success', label: '刘能', duration: '4时'},
            {type: 'success', label: '赵晏', duration: '4时'}]
        },
        {day: 2, isHodiday: true, officers: []},
        {day: 3, isHodiday: true, officers: [{type: 'success', label: '刘能', duration: '4时'}]},
        {day: 4, officers: []},
        {day: 5, officers: []},
        {day: 6, officers: [{type: 'success', label: '刘能', duration: '4时'}]},
        {day: 7, officers: []},
        {day: 8, officers: [{type: 'success', label: '刘能', duration: '4时'}]},
        {day: 9, isHodiday: true, officers: []},
        {day: 10, isHodiday: true, officers: []},
        {day: 11, officers: []}
      ],
      dialogVisible: false,

    }
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
      console.log(row);
      if (row.type === 'leave') {
        return 'warning-row';
      } else if (row.type === 'overtime') {
        return 'success-row';
      }
      return '';
    },

    // handleChange(file, fileList) {
    //   this.fileTemp = file.raw
    //   let fileName = file.raw.name
    //   let fileType = fileName.substring(fileName.lastIndexOf('.') + 1);
    //   // 判断上传文件格式
    //   if (this.fileTemp) {
    //     if ((fileType == 'xlsx') || (fileType == 'xls')) {
    //       this.importf(this.fileTemp)
    //     } else {
    //       this.$message({
    //         type: 'warning',
    //         message: '附件格式错误，请删除后重新上传！'
    //       })
    //     }
    //   } else {
    //     this.$message({
    //       type: 'warning',
    //       message: '请上传附件！'
    //     })
    //   }
    // },
    // // 移除excel表
    // handleRemove(file, fileList) {
    //   this.fileTemp = null
    // },
    // importExcel(){
    //   this.$http({
    //     url: XXXX',
    //     method: 'post',
    //     data: this.accountList
    //   }).then(({data}) => {
    //     if (data && data.code === 0) {
    //       this.$message({
    //         message: '操作成功',
    //         type: 'success',
    //         duration: 1500
    //       })
    //       this.getDataList()
    //     }
    //   })
    //   this.dialogVisible = false;
    // },
    // handleClose(done) {
    //   this.dialogVisible = false;
    // },
    // //导入的方法
    // importf(obj) {
    //   this.dialogVisible = true;
    //   let _this = this;
    //   let inputDOM = this.$refs.inputer;   // 通过DOM取文件数据
    //   this.file = event.currentTarget.files[0];
    //   var rABS = false; //是否将文件读取为二进制字符串
    //   var f = this.file;
    //   var reader = new FileReader();
    //   //if (!FileReader.prototype.readAsBinaryString) {
    //   FileReader.prototype.readAsBinaryString = function (f) {
    //     var binary = "";
    //     var rABS = false; //是否将文件读取为二进制字符串
    //     var pt = this;
    //     var wb; //读取完成的数据
    //     var outdata;
    //     var reader = new FileReader();
    //     reader.onload = function (e) {
    //       var bytes = new Uint8Array(reader.result);
    //       var length = bytes.byteLength;
    //       for (var i = 0; i < length; i++) {
    //         binary += String.fromCharCode(bytes[i]);
    //       }
    //       var XLSX = require('xlsx');
    //       if (rABS) {
    //         wb = XLSX.read(btoa(fixdata(binary)), { //手动转化
    //           type: 'base64'
    //         });
    //       } else {
    //         wb = XLSX.read(binary, {
    //           type: 'binary'
    //         });
    //       }
    //       // outdata就是你想要的东西 excel导入的数据
    //       outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
    //       // excel 数据再处理
    //       let arr = []
    //       outdata.map(v => {
    //         // let jsonString = JSON.stringify(v).replace(/\*/g, '').replace(/\s/ig,'');
    //         let jsonString = JSON.stringify(v).replace(/\//g, '').replace(/\s/ig,'');
    //         debugger;
    //         console.log(jsonString);
    //         v = JSON.parse(jsonString);
    //         let obj = {}
    //         //xxx代表列名
    //         obj.riskType = v.xxx
    //         obj.riskDescription = v.xxx
    //         obj.typeAccident = v.xxx
    //         obj.riskLevel = v.xxx
    //         obj.controlMeasures = v.xxx
    //         obj.hierarchyManage = v.xxx
    //         obj.orgLiableDict = v.xxx
    //         obj.personLiableDict = v.xxx
    //         // obj.id = v.id
    //         arr.push(obj)
    //       })
    //       _this.accountList = [...arr];
    //     }
    //     reader.readAsArrayBuffer(f);
    //   }
    //   if (rABS) {
    //     reader.readAsArrayBuffer(f);
    //   } else {
    //     reader.readAsBinaryString(f);
    //   }
    // },
    handleEdit() {

    },
    handleDelete() {

    }
  }
}
</script>

<style scoped>

.leave-officer-bar {
  list-style: none;
  padding: 0;
  margin: 0;
}

.leave-officer-bar li {
  width: 100px;
  min-height: 33px;
  float: left;
  text-align: center;
}

.officer-box {
  width: 100%;
  min-height: 20px;
  height: auto;
  padding-top: 15px;
}

.day-label {
  width: 100%;
  height: 20px;
  border-bottom: 1px solid #e8eaec;
  padding: 5px 0;
}

.el-col {
  padding: 10px;
}

.holiday {
  color: #F56C6C;
  font-weight: bold;
}

.vacation-balance {
  text-align: right;
  margin: 20px;
}

.vacation-balance span {
  padding: 4px;
}

.vacation-balance .figure {
  font-size: 70px;

}

.vacation-balance .unit {
  font-size: 30px;
}

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>