import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Search from '@/components/search'

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/', name: 'login', component: Login },
        { path: '/search', name: 'search', component: Search }
    ]
})