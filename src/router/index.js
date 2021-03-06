import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Tabbar from '@/components/Tabbar'
import UserNews from '@/components/UserNews'
import MainIndex from '@/components/MainIndex'
import NewsSquare from '@/components/NewsSquare'
import Registered from '@/components/Registered'
import Letters from '@/components/Letters'
import LetterItem from '@/components/LetterItem'
import UserHome from '@/components/UserHome'
import Setting from '@/components/Setting'
import UserInfo from '@/components/UserInfo'
import Follows from '@/components/Follows'
import Fans from '@/components/Fans'
import PublishNews from '@/components/PublishNews'
import SearchPage from '@/components/SearchPage'
import CircleList from '@/components/CircleList'
import BlogItem from '@/components/BlogItem'
import OtherUserHome from '@/components/OtherUserHome'
import CircleItem from '@/components/CircleItem'
import OtherFans from '@/components/OtherFans'
import OtherFollows from '@/components/OtherFollows'
import UserAgreement from '@/components/UserAgreement'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Tabbar',
      name: 'Tabbar',
      component: Tabbar
    }, {
      path: '/UserNews',
      name: 'UserNews',
      component: UserNews
    }, {
      path: '/MainIndex',
      name: 'MainIndex',
      component: MainIndex
    }, {
      path: '/NewsSquare',
      name: 'NewsSquare',
      component: NewsSquare
    }, {
      path: '/Registered',
      name: 'Registered',
      component: Registered
    }, {
      path: '/Letters',
      name: 'Letters',
      component: Letters
    }, {
      path: '/LetterItem',
      name: 'LetterItem',
      component: LetterItem
    }, {
      path: '/UserHome',
      name: 'UserHome',
      component: UserHome,
      meta: {
        keepAlive: true // 此组件需要被缓存
      }
    }, {
      path: '/Setting',
      name: 'Setting',
      component: Setting
    }, {
      path: '/UserInfo',
      name: 'UserInfo',
      component: UserInfo
    }, {
      path: '/Follows',
      name: 'Follows',
      component: Follows
    }, {
      path: '/Fans',
      name: 'Fans',
      component: Fans
    }, {
      path: '/PublishNews',
      name: 'PublishNews',
      component: PublishNews
    }, {
      path: '/SearchPage',
      name: 'SearchPage',
      component: SearchPage
    }, {
      path: '/CircleList',
      name: 'CircleList',
      component: CircleList
    }, {
      path: '/BlogItem',
      name: 'BlogItem',
      component: BlogItem
    }, {
      path: '/OtherUserHome',
      name: 'OtherUserHome',
      component: OtherUserHome
    }, {
      path: '/CircleItem',
      name: 'CircleItem',
      component: CircleItem
    }, {
      path: '/OtherFans',
      name: 'OtherFans',
      component: OtherFans
    }, {
      path: '/OtherFollows',
      name: 'OtherFollows',
      component: OtherFollows
    }, {
      path: '/UserAgreement',
      name: 'UserAgreement',
      component: UserAgreement
    }
  ]
})
