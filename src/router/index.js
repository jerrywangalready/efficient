import {createRouter, createWebHistory} from 'vue-router'
import Home from '@/views/Home.vue'
import Config from '@/views/attendance/Attendance-config'
import store from "@/store/index";


const routes = [
    {
        path: '/login',
        name: 'Login',
        title: '登录',
        component: () => import('@/views/auth/Login')
    },
    {
        path: '/signup',
        name: 'Signup',
        title: '注册',
        component: () => import('@/views/auth/Signup')
    },
    {
        path: '/',
        component: () => import('@/views/Index'),
        children: [
            {
                path: '/home',
                name: 'Home',
                components: {
                    default: Home,
                    'config': Config
                }
            },
            {
                path: '/about',
                name: 'About',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
            },
            {
                path: '/attendance',
                name: 'Attendance',
                title: '考勤',
                component: () => import('@/views/attendance/Attendance-Index.vue')
            },
            {
                path: '/settings',
                name: 'Settings',
                title: '设置',
                component: () => import('@/views/settings/Settings-Index.vue')
            }
        ]
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && to.name !== 'Signup' && store.state.token === "") {
        next({name: 'Login'})
    } else {
        if (to.path === '/' || to.matched.length === 0)
            next({name: 'Home'})
        else
            next()
    }

})

export default router
