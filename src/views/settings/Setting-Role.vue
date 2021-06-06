<template>
  <h1 class="j-title">角色管理</h1>
  <el-row :gutter="10">
    <el-col :span="24">
      <el-card>
        <div class="button-box">
          <el-button type="primary" round @click="open()" size="mini" icon="el-icon-plus" title="新增"></el-button>
        </div>
        <el-table
            :data="tableData.list"
            border
            header-row-class-name="table-header"
            style="width: 100%">
          <el-table-column prop="roleId" label="ID" width="180"></el-table-column>
          <el-table-column prop="roleName" label="角色名" width="180"></el-table-column>
          <el-table-column prop="description" label="描述"></el-table-column>
          <el-table-column width="173px" prop="" label="操作">
            <template #default="scope">
              <el-button
                  size="mini"
                  type="success"
                  icon="el-icon-user"
                  title="人员"
                  round="true"
                  @click="openUserTransfer(scope.row)">
              </el-button>
              <el-button
                  size="mini"
                  type="warning"
                  icon="el-icon-edit"
                  title="编辑"
                  round="true"
                  @click="open(scope.row)">
              </el-button>
              <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  title="删除"
                  round="true"
                  @click="deleteRole(scope.$index, scope.row)">
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="page-comm"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       v-model:currentPage="tableData.pageNum"
                       :page-sizes="[10, 20, 50, 100]"
                       :page-size="10"
                       layout="sizes, prev, pager, next"
                       :total="tableData.total">
        </el-pagination>
      </el-card>
    </el-col>
  </el-row>
  <el-dialog title="角色信息" v-model="dialogVisible" width="540px">
    <el-form :model="roleForm" :rules="rules" ref="roleForm">
      <el-form-item label="角色名" prop="groupName" label-width="60px">
        <el-input v-model="roleForm.roleName" placeholder="请输角色名"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="groupName" label-width="60px">
        <el-input v-model="roleForm.description" placeholder="请输入描述"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">关 闭</el-button>
            <el-button type="primary" @click="saveRole()">确 定</el-button>
          </span>
    </template>
  </el-dialog>
  <el-dialog :title="currentRole" v-model="userTransferDialogVisible" destroy-on-close width="760px">
    <UserTransfer v-model="users" :value="users"  @handleChange="userChange"></UserTransfer>
    <template #footer>
          <span class="dialog-footer">
            <el-button @click="userTransferDialogVisible = false">关 闭</el-button>
            <el-button type="primary" @click="saveUsers()">确 定</el-button>
          </span>
    </template>
  </el-dialog>
</template>

<script>
import UserTransfer from "@/components/UserTransfer";

export default {
  name: "Setting-Group",
  components: {
    UserTransfer
  },
  data() {
    return {
      dialogVisible: false,
      userTransferDialogVisible: false,
      tableData: {
        list: [],
        pageNum: 1,
        pageSize: 10
      },
      roleForm: {
        roleName: "",
        description: ""
      },
      rules: [],
      currentRole: "",
      users: []
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.axios.post("/role/getRoleGrid", {
        pageNum: this.tableData.pageNum,
        pageSize: this.tableData.pageSize
      }).then(response => {
        this.tableData = response.data;
      }).catch(err => {
        console.log(err);
      })
    },
    handleCurrentChange(pageNum) {
      this.tableData.pageNum = pageNum;
      this.init();
    },
    handleSizeChange(pageSize) {
      this.tableData.pageSize = pageSize;
      this.init();
    },
    open(row) {
      this.roleForm = {};
      if (row !== undefined) {
        this.roleForm.roleId = row.roleId;
        this.roleForm.roleName = row.roleName;
        this.roleForm.description = row.description;
      }
      this.dialogVisible = true;
    },
    saveRole() {
      this.axios.post("/role/saveRole", this.roleForm).then(response => {
        if (response.data) {
          this.$message.success('保存成功!')
          this.dialogVisible = false;
          this.init();
        } else {
          this.$message.error('保存失败!')
        }
      }).catch(err => {
      });
    },
    deleteRole(index, row) {
      this.axios.post("/role/deleteRole", {roleId: row.roleId}).then(response => {
        if (response.data) {
          this.$message.success('删除成功!')
          this.init();
        } else {
          this.$message.error('删除失败!')
        }
      }).catch(err => {
      })
    },
    openUserTransfer(row) {
      this.userTransferDialogVisible = true;
      this.currentRole = row.roleName;
      console.log(this.currentRole);
      this.axios.post("/user/getUsersByRole", {role: this.currentRole}).then(response => {
        this.users = []
        response.data.forEach(item=>{
          this.users.push(item.userName);
        })
      }).catch(err => {
      })
    },
    userChange(users) {
      this.users = users;
    },
    saveUsers() {
      console.log(this.users);
      this.axios.post("/role/joinInRoleUser", {roleName: this.currentRole, userNames: this.users}).then(response => {
        if (response.data) {
          this.$message.success('保存成功!')
          this.userTransferDialogVisible = false;
        } else {
          this.$message.error('保存失败!')
        }
      }).catch(err => {
      })
    }
  }
}
</script>

<style scoped>

</style>