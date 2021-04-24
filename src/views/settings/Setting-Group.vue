<template>
  <h1 class="j-title">项目组</h1>
  <el-row :gutter="10">
    <div class="group" v-for="item in groups">
      <el-card class="box-card">
        <template #header>
          <span>{{ item.groupName }}</span>
          <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-s-tools" @click="updateGroup"></el-button>
        </template>
        <div class="group-box">
          <div>
            <el-tag><i class="el-icon-s-flag"></i> {{ item.leader }}</el-tag>
          </div>
          <el-space wrap style="margin-top: 20px">
            <el-tag v-for="member in item.members" type="success">{{ member.fullName }}</el-tag>
          </el-space>
        </div>
      </el-card>
    </div>
    <div class="add-button-box">
      <el-card class="box-card add-button" shadow="hover" @click="addGroup">
        <div class="group-box" style="padding: 30px">
          <i class="el-icon-plus"></i>
        </div>
      </el-card>
    </div>
  </el-row>
  <el-dialog title="创建组" v-model="dialogVisible" width="540px">
    <el-form :model="groupForm" :rules="rules" ref="groupForm">
      <el-form-item label="名称" prop="groupName" label-width="60px">
        <el-input v-model="groupForm.groupName" placeholder="请输入组名称"></el-input>
      </el-form-item>
      <el-form-item label="组长" prop="leader" label-width="60px">
        <el-select
            v-model="groupForm.leader"
            filterable
            remote
            style="width: 100%"
            placeholder="请输入账号或姓名"
            reserve-keyword
            :remote-method="queryLeader"
            :default-first-option="true"
            :loading="loading">
          <el-option
              v-for="item in leaderOptions"
              :key="item.username"
              :label="item.fullName"
              :value="item.username">
            <span style="float: left">{{ item.fullName }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.username }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="成员" prop="members" label-width="60px">
        <el-select
            v-model="groupForm.members"
            style="width: 100%"
            multiple
            filterable
            remote
            placeholder="请输入账号或姓名"
            reserve-keyword
            :default-first-option="true"
            :remote-method="queryMember"
            :loading="loading">
          <el-option
              v-for="item in memberOptions"
              :key="item.username"
              :label="item.fullName"
              :value="item.username">
            <span style="float: left">{{ item.fullName }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.username }}</span>
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveGroup()">确 定</el-button>
          </span>
    </template>
  </el-dialog>
</template>

<script>
import {ElMessage} from 'element-plus'

export default {
  name: "Setting-Group",
  data() {
    return {
      dialogVisible: false,
      groups: [],
      loading: false,
      leaderOptions: [],
      memberOptions: [],
      groupForm: {
        groupId: "",
        groupName: "",
        leader: "",
        members: ""
      },
      rules: {
        groupName: [
          {required: true, message: '请输入组名称', trigger: 'blur'},
          {max: 50, message: '长度最大50个字符', trigger: 'blur'}
        ],
        leader: [
          {required: true, message: '请选择组长', trigger: 'blur'}
        ],
        members: [
          {required: true, message: '请选择成员', trigger: 'blur'}
        ],
      }
    }
  },
  mounted() {
    this.initGroupList()
  },
  methods: {
    initGroupList() {

      this.axios.post("/group/getGroupsNMembers").then(response => {
        this.groups = response.data
        this.groups.forEach(item => {
          item.members.forEach((member, index, arr) => {
            if (member.leader === "1") {
              item.leader = member.fullName;
              arr.splice(index, 1);
              return false;
            }
          })
        })
      }).catch(err => {
      })

    },
    addGroup() {
      this.dialogVisible = true;
    },
    queryLeader(query) {
      if (query !== '') {
        this.loading = true;
        this.axios.post("/user/getUsers", query).then(response => {
          this.loading = false;
          this.leaderOptions = response.data;
        }).catch(err => {
          this.leaderOptions = [];
        })
      } else {
        this.leaderOptions = [];
      }
    },
    queryMember(query) {
      if (query !== '') {
        this.loading = true;
        this.axios.post("/user/getUsers", query).then(response => {
          this.loading = false;
          this.memberOptions = response.data;

        }).catch(err => {
          this.memberOptions = [];
        })
      } else {
        this.memberOptions = [];
      }
    },
    saveGroup() {
      this.$refs.groupForm.validate((valid) => {
        if (valid) {
          let param = {};
          param.groupId = this.groupForm.groupId;
          param.groupName = this.groupForm.groupName;
          param.members = [];
          param.members.push({username: this.groupForm.leader, leader: "1"})
          this.groupForm.members.forEach(item => {
            param.members.push({username: item, leader: ""})
          })
          this.axios.post("/group/saveGroup", param).then(response => {
            console.log(response.data);
            if (response.data) {
              ElMessage.success({
                message: '保存成功!',
                type: 'success'
              });
              this.dialogVisible = false;
            }
            this.initGroupList();
          }).catch(err => {
          })
        } else {
          return false;
        }
      });
    },
    updateGroup() {

    }
  }
}
</script>

<style scoped>
.group {
  display: block;
  min-height: 1px;
  padding-left: 5px;
  padding-right: 5px;
  float: left;
}

.box-card {
  width: 240px;
}

.box-card .group-box {
  height: 220px;
  overflow: auto;
}

.box-card.add-button .group-box {
  -webkit-justify-content: center;
  justify-content: center;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.box-card.add-button .group-box:hover i {
  color: rgb(198, 226, 255);
}

.box-card.add-button .group-box i {
  font-size: 140px;
  font-weight: bold;
  color: rgb(217, 236, 255);
}

.add-button-box {
  display: block;
  min-height: 1px;
  padding-left: 5px;
  padding-right: 5px;
  float: left
}
</style>