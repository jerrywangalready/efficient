import {createApp} from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

// App.prototype.$axios = axios; // 挂载到原型上 全局可以访问
axios.defaults.baseURL = 'api'
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.interceptors.request.use(config => {
    console.log(config);
    // if (store.state.token) {
        config.headers.common['Authentication-Token'] = '{sid:"8g73hj4hhhbsd", username:"gweu"}';
        // config.headers.common['Authentication-Token'] = store.state.token;
    // }
    return config;
}, error => {
    return Promise.reject(error);
});
axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response) {
        switch (error.response.status) {
            case 401:
                this.$store.commit('del_token');
                router.replace({
                    path: '/login',
                    query: {redirect: router.currentRoute.fullPath}
                })
        }
    }
    return Promise.reject(error.response.data);
})

// import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';

createApp(App).use(store).use(router).use(VueAxios, axios).use(ElementPlus, {locale}).mount('#app')

