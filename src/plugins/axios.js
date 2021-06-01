"use strict";

import axios from 'axios'
import VueAxios from 'vue-axios'
import store from "@/store";
import router from "@/router";
import {ElMessage} from 'element-plus';

axios.defaults.baseURL = 'api'
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.interceptors.request.use(config => {

    if (tokenExpired()) {
        localStorage.clear();
        router.push({name: "Login"});
    }

    if (localStorage.getItem('token')) {
        config.headers.common['Authorization'] = localStorage.getItem('token');
    }
    return config;
}, error => {
    return Promise.reject(error);
});
axios.interceptors.response.use(response => {
    console.log(response);
    if (response.data.code === "401") {
        ElMessage.error({
            message: '登录超时,请重新登录！',
            type: 'error'
        });

        router.replace({
            name: "Login",
            query: {redirect: router.currentRoute.fullPath}
        });
    }
    if (response.data.dataType === "Authorization" && !response.data.state) {
        localStorage.clear();
        router.push({name: "Login"});
    } else {
        if (response.data.hasOwnProperty("code") && response.data.code === '0') {
            // alert('权限不足，请联系管理员！')
            ElMessage.warning({
                message: '权限不足，请联系管理员！',
                type: 'warning'
            });
        }
        return response;
    }
}, error => {
    if (error.response) {
        switch (error.response.status) {
            case 401:
                this.$store.commit('del_token');
                // 清空本地token
                // localStorage.clear();
                router.replace({
                    name: "Login",
                    query: {redirect: router.currentRoute.fullPath}
                });
                break;
            case 500:
                ElMessage.error({
                    message: '服务器内部错误，请联系管理员！',
                    type: 'error'
                });
        }
    }
    return Promise.reject(error.response.data);
})

function tokenExpired() {
    let hf_time = localStorage.getItem("hf_time");
    let now = new Date().getTime();
    let expireTime = 8 * 60 * 60 * 1000;
    return (parseInt(hf_time) + expireTime) < now;
}

export {VueAxios, axios};