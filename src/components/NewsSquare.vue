<template>
  <div>
    <van-sticky>
      <div style="text-align: center;background-color: white"><span style="line-height: 0.5rem;">动态广场</span></div>
    </van-sticky>
    <van-tabs color="#3C827E" v-model="active" sticky animated>
      <van-tab title="我的关注">
        <UserNews :blogListType="'byFollow'"></UserNews>
      </van-tab>
      <van-tab title="最新动态">
        <UserNews :blogListType="'byTime'"></UserNews>
      </van-tab>

      <van-tab title="原创动态">
        <UserNews :blogListType="'byOriginal'"></UserNews>
      </van-tab>
      <van-tab title="热门圈子">
        <CircleList></CircleList>
      </van-tab>
    </van-tabs>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import UserNews from './UserNews'
import Tabbar from './Tabbar'
import CircleList from './CircleList'

export default {
  name: 'NewsSquare',
  components: {UserNews, Tabbar, CircleList},
  data () {
    return {
      active: 0
    }
  }

}
</script>

<style scoped>

</style>
