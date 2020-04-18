// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './assets/rem'
import './assets/reset.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import { Form, Notify, Tabbar, TabbarItem, Col, Row, Icon, Sticky, Cell, CellGroup, Button, List, PullRefresh, Grid, GridItem, Image, Overlay, Dialog, Divider, Tab, Tabs, NavBar, Toast, Field, Tag, Uploader, Search, Picker, Popup } from 'vant'
import Router from 'vue-router'

Vue.use(Popup)
Vue.use(Picker)
Vue.use(Search)
Vue.use(Uploader)
Vue.use(Tag)
Vue.use(Field)
Vue.use(Toast)
Vue.use(NavBar)
Vue.use(Router)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Divider)
Vue.use(Overlay)
Vue.use(Image)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(PullRefresh)
Vue.use(List)
Vue.use(Button)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Sticky)
Vue.use(Dialog)
Vue.use(Tabbar).use(TabbarItem).use(Notify).use(Form).use(Col).use(Row).use(Icon)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
