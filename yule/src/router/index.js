import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
//登陆注册
import login from '@/components/user/login'
import register from '@/components/user/register'

//聊天分享
import chat from '@/components/chat/chat'
import share from '@/components/chat/share'
import text from '@/components/chat/text'
import textdetail from '@/components/chat/textdetail'
import userList from '@/components/user/userList'

//音乐
import music from '@/components/music/music'
import musicdei from '@/components/music/musicdei'

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
        }, {
            path: '/text',
            name: 'text',
            component: text //写文章
        }, {
            path: '/textdetail/:id',
            name: 'textdetail',
            component: textdetail //文章详情
        }, {
            path: '/userList',
            name: 'userList',
            component: userList //我的文章列表
        }, {
            path: '/music',
            name: 'music',
            component: music //音乐
        }, {
            path: '/musicdei',
            name: 'musicdei',
            component: musicdei //音乐
        }
    ]
})