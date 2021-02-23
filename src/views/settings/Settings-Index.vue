<template>
  <settingUser></settingUser>
  <settingGroup></settingGroup>
</template>

<script>
import settingUser from './Setting-User';
import settingGroup from './Setting-Group';

export default {
  name: "Settings-Index",
  components: {
    settingUser,
    settingGroup
  },

}
</script>

<style scoped>

</style>