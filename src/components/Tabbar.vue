<template>
  <van-tabbar route
              v-model="active"
              active-color="#3C827E"
              inactive-color="#000" @change="onChange"
  >
    <van-tabbar-item icon="friends-o" replace to="/MainIndex">动态</van-tabbar-item>
    <van-tabbar-item icon="search" replace to="/NewsSquare">广场</van-tabbar-item>
    <van-tabbar-item icon="chat-o" replace to="/Letters">私信</van-tabbar-item>
    <van-tabbar-item icon="smile-o" replace to="/UserHome">我</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import {Notify} from 'vant'
import Vue from 'vue'

Vue.use(Notify)
export default {
  name: 'Tabbar',
  data () {
    return {
      active: 0
    }
  },
  methods: {
    onChange (index) {
      // Notify({type: 'primary', message: index})
    }
  }
}
</script>

<style scoped>

</style>
