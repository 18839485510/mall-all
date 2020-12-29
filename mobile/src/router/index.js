import Vue from 'vue'
import VueRouter from 'vue-router'

//1.安装VueRouter
Vue.use(VueRouter)
//2.引入组件
import Home from 'pages/home/index.vue'
import Category from 'pages/category/index.vue'
import Cart from 'pages/cart/index.vue'
import User from 'pages/user/index.vue'
import Search from 'pages/search/index.vue'

//3.定义路由
const routes = [
    { path: '/home', component: Home },
    { path: '/category', component: Category },
    { path: '/cart', component: Cart },
    { path: '/user', component: User },
    { path: '/search', component: Search },
    { path: '/', redirect: '/home'},
]

//4.根据路由创建router实例
const router = new VueRouter({
    mode: 'history',//h5 路由
    routes
})
//5.导出router实例

export default router