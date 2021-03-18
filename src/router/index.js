import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: () => import('../views/Login')
    },
    {
        path: '/login',
        component: () => import('../views/Login')
    },
    {
        path: '/home',
        component: () => import('../views/Home')
    }
]


const router = new VueRouter({
    routes
})

export default router