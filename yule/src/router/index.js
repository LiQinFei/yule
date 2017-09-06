import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
//登陆注册
import login from '@/components/user/login'
import register from '@/components/user/register'

//聊天分享
import chat from '@/components/chat/chat'
import share from '@/components/chat/share'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'index',
            component: index //主页
        }, {
            path: '/login',
            name: 'login',
            component: login //登陆
        },
        {
            path: '/register',
            name: 'register',
            component: register //注册
        }, {
            path: '/chat',
            name: 'chat',
            component: chat //聊天
        }, {
            path: '/share',
            name: 'share',
            component: share //分享
        }
    ]
})