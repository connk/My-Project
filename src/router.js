import Vue from 'vue'
import Router from 'vue-router'
import { Toast } from 'vant';

import store from './store'

Vue.use(Router)

let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: () => import('./components/FootNav.vue'),
            children: [
                {
                    path: '/',
                    component: () => import('./views/index/Index.vue')
                },
                {
                    path: '/index',
                    component: () => import('./views/index/Index.vue')
                },
                {
                    path: '/vehicle',
                    component: () => import('./views/vehicle/Vehicle.vue')
                },
                {
                    path: '/my',
                    component: () => import('./views/my/My.vue')
                }
            ]
        },
        {
            path: '/act',
            name: 'act',
            component: () => import('./views/act/Public.vue'),
            children: [
                {
                    path: '/act/bargain',
                    component: () => import('./views/act/bargain/Bargain.vue'),
                    meta:{
                        title:'活动',
                        keepAlive: false
                    }
                },
                {
                    path: '/act/bargain/start',
                    component: () => import('./views/act/bargain/Start.vue'),
                    meta:{
                        title:'发起砍价',
                        isLogin: true
                    }
                },
                {
                    path: '/act/bargain/invite',
                    component: () => import('./views/act/bargain/Invite.vue'),
                    meta:{
                        title:'邀请好友砍价',
                        isLogin: true
                    }
                },
                {
                    path: '/act/bargain/help',
                    component: () => import('./views/act/bargain/Help.vue'),
                    meta:{
                        title:'帮忙砍价'
                    }
                }
            ]
        },
        {
            path: '/test',
            name: 'test',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/Test.vue')
        }
    ]
})


router.beforeEach((to, from, next) => {

    if (to.meta.title) {
        document.title = to.meta.title
    }
    if (to.meta.isLogin) {
        if(!store.state.userInfo){
            Toast.fail('请登录后访问');
            return false;
        }
    }
    next()
})

export default router;
