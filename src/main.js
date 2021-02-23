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
    // if (store.state.token) {
    config.headers.common['Authorization'] = store.state.token;
    // }
    return config;
}, error => {
    return Promise.reject(error);
});
axios.interceptors.response.use(response => {
    if (response.data.dataType === "Authorization" && !response.data.state) {
        store.commit('token', "");
        router.replace({path: "/auth"});
    } else {
        if (response.data.hasOwnProperty("code") && response.data.code === '0') {
            alert('权限不足，请联系管理员！')
        }
        return response;
    }
}, error => {
    if (error.response) {
        switch (error.response.status) {
            case 401:
                this.$store.commit('del_token');
                router.replace({
                    path: '/auth',
                    query: {redirect: router.currentRoute.fullPath}
                })
        }
    }
    return Promise.reject(error.response.data);
})

// import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';

Date.prototype.format = function (fmt) {
    let o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours() % 12 === 0 ? 12 : this.getHours() % 12, //小时
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

createApp(App)
    .use(store)
    .use(router)
    .use(VueAxios, axios)
    .use(ElementPlus, {locale})
    // .use(i18nPlugin, i18nStrings)
    .mount('#app')

