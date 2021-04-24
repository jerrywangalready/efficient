<template>
  <settingUser></settingUser>
  <settingRole></settingRole>
  <settingGroup></settingGroup>
  <settings-api-manage></settings-api-manage>
</template>

<script>
import settingUser from './Setting-User';
import settingRole from './Setting-Role';
import settingGroup from './Setting-Group';
import settingsApiManage from './Settings-ApiManage';

export default {
  name: "Settings-Index",
  components: {
    settingUser,
    settingRole,
    settingGroup,
    settingsApiManage
  },

}
</script>

<style scoped>

</style>