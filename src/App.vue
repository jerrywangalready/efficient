<template>
  <router-view/>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  created() {
    //在页面加载时读取sessionStorage里的状态信息
    // if (sessionStorage.getItem("store")) {
    //   this.$store.replaceState(
    //       Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store")))
    //   )
    // }
    // //在页面刷新时将vuex里的信息保存到sessionStorage里
    // window.addEventListener("beforeunload", () => {
    //   sessionStorage.setItem("store", JSON.stringify(this.$store.state))
    // })
  },
  methods: {
    handleSelect(key, keyPath) {
    }
  }
}
</script>

<style>

body {
  min-width: 860px;
  overflow-x: auto;
  background-color: #f9f9f9;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
}

#app .j-title {
  font-size: 1.2em;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.shadow {
  box-shadow: 0 2px 2px 0 #888888;
}

.center {
  text-align: center;
}
</style>
