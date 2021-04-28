<template>
  <div style="text-align: center">
    <el-transfer
        v-model="value"
        style="text-align: left; display: inline-block"
        filterable
        :filter-method="filterMethod"
        filter-placeholder="请输入姓名或账号"
        :props="{
          key: 'userName',
          label: 'fullName'
        }"
        :titles="['待选', '已选择']"
        :button-texts="['取消', '选择']"
        :format="{
    noChecked: '${total}',
    hasChecked: '${checked}/${total}'
    }"
        :data="data"
        @change="handleChange"
    >
      <template #default="{option}">
        <span>{{ option.fullName }}</span>
      </template>
    </el-transfer>
  </div>

</template>

<script>
export default {
  name: 'UserTransfer',
  props: {
    title: {
      type: String,
      default: "人员选择"
    },
    visible: {
      type: Boolean,
      default: false
    },
    value: [],
  },
  data: function () {
    return {

      data: []
    }
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      this.axios.post("/user/getUsers", {state: 1}).then(response => {
        // let d = [{userName: "lilei", fullName: "hmm"}]
        // this.data = d
        this.data = response.data
        console.log(response);
      }).catch(err => {
      })
    },
    filterMethod(query, item) {
      if (query.trim().length === 0) {
        return true;
      } else {
        return item.userName.indexOf(query) > -1 || item.fullName.indexOf(query) > -1;
      }
    },
    handleChange(value) {
      console.log(value);
      this.$emit('handleChange', this.value)

    },

  }
};
</script>
